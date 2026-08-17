#!/usr/bin/env node
// Audits specific pages, mobile and desktop, against a production build.
//
//   npm run lh -- /                 audit the homepage
//   npm run lh -- / /about          audit two pages
//   npm run lh -- / --mobile        one form factor only
//
// Only the paths you pass are audited. Run it on pages you created or changed,
// not the whole site, so a failure points at the page you just touched.
//
// Dev-server output is never audited: it ships unminified assets and an HMR
// client, so it cannot represent what users get. This builds and previews first.

import { spawn } from "node:child_process";
import { rm, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const REPORT_DIR = ".lighthouse";

// Accessibility, best-practices and SEO are deterministic, so 100 is a fair hard gate.
// Performance is timing-based and fluctuates on shared CI runners, so it is tunable.
const THRESHOLDS = {
  performance: Number(process.env.LH_MIN_PERF ?? 100),
  accessibility: 100,
  "best-practices": 100,
  seo: 100,
};
const PORT = 4331;
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

// Audits a page is meant to fail, because failing them is the correct behaviour.
// A category is only gated on audits outside this list.
const EXPECTED = {
  // An error page must never be indexed. Cloudflare serves this file with a real 404
  // status, and the noindex tag covers the case where a host answers 200 instead.
  // The preview server answers 200, so Lighthouse reads the tag as a mistake.
  "/404": ["is-crawlable"],
};

const args = process.argv.slice(2);
const only = args.find((a) => a === "--mobile" || a === "--desktop")?.slice(2);
// --base https://example.com audits a deployed site instead of building locally.
// That is the only way to measure the real CDN: compression, cache headers, TLS, HTTP/3.
const remote = args.find((a) => a.startsWith("--base="))?.slice("--base=".length);
const paths = args.filter((a) => !a.startsWith("--"));

if (!paths.length) {
  console.error("usage: npm run lh -- /path [/another] [--mobile|--desktop]");
  process.exit(1);
}

const FORM_FACTORS = {
  // Mobile: Lighthouse's default Moto G Power emulation with 4x CPU throttling.
  mobile: {
    formFactor: "mobile",
    screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
    throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4,
      requestLatencyMs: 562.5, downloadThroughputKbps: 1474.56, uploadThroughputKbps: 675 },
  },
  // Desktop: the standard desktop preset, 1x CPU, fast connection.
  desktop: {
    formFactor: "desktop",
    screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
    throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 },
  },
};

const run = (cmd, cmdArgs, opts = {}) =>
  new Promise((res, rej) => {
    const p = spawn(cmd, cmdArgs, { stdio: "inherit", ...opts });
    p.on("exit", (c) => (c === 0 ? res() : rej(new Error(`${cmd} exited ${c}`))));
  });

const waitFor = async (url, tries = 60) => {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`preview server never became ready at ${url}`);
};

const pct = (n) => Math.round(n * 100);
const pad = (s, n) => String(s).padEnd(n);

let preview = null;
const shutdown = () => preview?.kill();

if (remote) {
  console.log(`auditing deployed site ${remote}`);
} else {
  console.log("building…");
  await rm("dist", { recursive: true, force: true });
  await run("npx", ["astro", "build"], { stdio: "ignore" });
  preview = spawn("npx", ["astro", "preview", "--port", String(PORT)], { stdio: "ignore" });
  process.on("exit", shutdown);
  process.on("SIGINT", () => { shutdown(); process.exit(130); });
}

const base = remote ? remote.replace(/\/$/, "") : `http://localhost:${PORT}`;
await waitFor(base + paths[0]);

const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH || undefined,
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"],
});
const factors = only ? [only] : ["mobile", "desktop"];
const rows = [];
let failed = false;

await mkdir(REPORT_DIR, { recursive: true });

for (const path of paths) {
  for (const factor of factors) {
    const { lhr, report } = await lighthouse(base + path, { port: chrome.port, output: "html", logLevel: "error" },
      { extends: "lighthouse:default", settings: FORM_FACTORS[factor] });

    // Full interactive report: filmstrip, opportunities, diagnostics, element screenshots.
    const slug = (path === "/" ? "home" : path.replace(/^\/|\/$/g, "").replace(/\//g, "-")) + `-${factor}`;
    const file = join(REPORT_DIR, `${slug}.html`);
    await writeFile(file, report);

    const scores = Object.fromEntries(CATEGORIES.map((c) => [c, pct(lhr.categories[c].score)]));
    const expected = EXPECTED[path] ?? [];

    // Anything scoring below 1 is what to fix, in impact order.
    const failing = CATEGORIES.flatMap((c) =>
      lhr.categories[c].auditRefs
        .filter((ref) => { const a = lhr.audits[ref.id];
          return a.score !== null && a.score < 1 && ref.weight > 0 && !expected.includes(ref.id); })
        .map((ref) => ({ cat: c, weight: ref.weight, title: lhr.audits[ref.id].title }))
    ).sort((a, b) => b.weight - a.weight);

    // A low score with nothing left to fix is the page behaving as designed.
    const below = CATEGORIES.filter(
      (c) => scores[c] < THRESHOLDS[c] && failing.some((f) => f.cat === c)
    );
    const excused = CATEGORIES.filter((c) => scores[c] < THRESHOLDS[c] && !below.includes(c));
    if (below.length) failed = true;

    rows.push({ path, factor, file, ...scores, below, excused, failing,
      lcp: lhr.audits["largest-contentful-paint"].displayValue,
      cls: lhr.audits["cumulative-layout-shift"].displayValue,
      tbt: lhr.audits["total-blocking-time"].displayValue,
    });
  }
}

await chrome.kill();
shutdown();

console.log(`\n${pad("page", 22)}${pad("form", 9)}${pad("perf", 6)}${pad("a11y", 6)}${pad("best", 6)}${pad("seo", 6)}${pad("LCP", 9)}${pad("CLS", 7)}TBT`);
console.log("-".repeat(84));
for (const r of rows) {
  const mark = (n, c) => (r.below.includes(c) ? `${n}*` : r.excused.includes(c) ? `${n}~` : `${n}`);
  console.log(
    pad(r.path, 22) + pad(r.factor, 9) +
    pad(mark(r.performance, "performance"), 6) + pad(mark(r.accessibility, "accessibility"), 6) +
    pad(mark(r["best-practices"], "best-practices"), 6) + pad(mark(r.seo, "seo"), 6) +
    pad(r.lcp, 9) + pad(r.cls, 7) + r.tbt
  );
}

for (const r of rows.filter((r) => r.failing.length)) {
  console.log(`\n${r.path} (${r.factor}) — what to fix, highest impact first:`);
  for (const f of r.failing.slice(0, 8)) console.log(`  [${f.cat}] ${f.title}`);
}

for (const r of rows.filter((r) => r.excused.length)) {
  console.log(`\n${r.path} (${r.factor}) — ${r.excused.join(", ")} scored low only on audits this page is meant to fail: ${(EXPECTED[r.path] ?? []).join(", ")}`);
}

console.log("\nfull reports (open in a browser):");
for (const r of rows) console.log(`  ${r.file}`);

const gates = Object.entries(THRESHOLDS).map(([c, v]) => `${c} ${v}`).join(", ");
if (failed) {
  console.log(`\nbelow threshold (marked *). gates: ${gates}`);
  process.exit(1);
}
console.log(`\nall gates met (${gates})`);
