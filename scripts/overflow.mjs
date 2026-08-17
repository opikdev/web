#!/usr/bin/env node
// Checks every built page for horizontal overflow at narrow widths.
//
//   npm run overflow              every route in dist
//   npm run overflow -- /about    one route
//
// A single element wider than the viewport makes the whole page scroll
// sideways, and it is easy to miss: the page looks fine until you swipe. This
// measures the document instead, so it cannot be missed, and names the elements
// sticking out so the fix is obvious.

import { spawn } from "node:child_process";
import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import * as chromeLauncher from "chrome-launcher";

// 320 is the narrowest width worth supporting, 430 the widest common phone,
// 768 catches layouts that only break between the phone and desktop rules.
const WIDTHS = [320, 375, 390, 430, 768];
const PORT = 4331;

const run = (cmd, args, opts = {}) =>
  new Promise((res, rej) => {
    const p = spawn(cmd, args, { stdio: "inherit", ...opts });
    p.on("exit", (c) => (c === 0 ? res() : rej(new Error(`${cmd} exited ${c}`))));
  });

const waitFor = async (url, tries = 60) => {
  for (let i = 0; i < tries; i++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`preview server never became ready at ${url}`);
};

// Routes come from the build output, so a new page is covered without touching this file.
const routesFrom = async (dir, prefix = "") => {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) out.push(...(await routesFrom(join(dir, entry.name), `${prefix}/${entry.name}`)));
    else if (entry.name === "index.html") out.push(prefix || "/");
    else if (entry.name.endsWith(".html")) out.push(`${prefix}/${entry.name.replace(/\.html$/, "")}`);
  }
  return out;
};

console.log("building…");
await rm("dist", { recursive: true, force: true });
await run("npx", ["astro", "build"], { stdio: "ignore" });

const base = `http://localhost:${PORT}`;

// astro preview daemonises, so a second one refuses to start. Reuse whatever is
// already serving dist rather than fighting it.
const serving = await fetch(base)
  .then(() => true)
  .catch(() => false);
const preview = serving ? null : spawn("npx", ["astro", "preview", "--port", String(PORT)], { stdio: "ignore" });
if (preview) process.on("exit", () => preview.kill());
const asked = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const paths = asked.length ? asked : (await routesFrom("dist")).sort();
await waitFor(base + paths[0]);

const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH || undefined,
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});

const targets = await (await fetch(`http://127.0.0.1:${chrome.port}/json/list`)).json();
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const n = ++id;
    pending.set(n, resolve);
    ws.send(JSON.stringify({ id: n, method, params }));
  });

await send("Page.enable");

const failures = [];
const pad = (s, n) => String(s).padEnd(n);

for (const width of WIDTHS) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: 800,
    deviceScaleFactor: 2,
    mobile: true,
  });

  for (const path of paths) {
    await send("Page.navigate", { url: base + path });
    await new Promise((r) => setTimeout(r, 500));

    const { result } = await send("Runtime.evaluate", {
      returnByValue: true,
      // Elements are reported by tag and class so the offender is identifiable
      // without opening a browser.
      expression: `JSON.stringify({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
        culprits: [...document.querySelectorAll('body *')]
          .map((el) => ({ el, right: el.getBoundingClientRect().right }))
          .filter((e) => e.right > document.documentElement.clientWidth + 1)
          // A fixed, full-bleed layer stretches to whatever the document became, so it
          // reports as the widest thing on the page without ever causing it. Same for
          // anything inside one. Only elements in normal flow can push the page wider.
          .filter((e) => {
            for (let n = e.el; n && n !== document.body; n = n.parentElement)
              if (getComputedStyle(n).position === 'fixed') return false;
            return true;
          })
          .sort((a, b) => b.right - a.right)
          .slice(0, 3)
          .map((e) => e.el.tagName.toLowerCase() + (e.el.className ? '.' + e.el.className.toString().trim().split(/\\s+/).join('.').slice(0, 60) : '')),
      })`,
    });

    const { scroll, client, culprits } = JSON.parse(result.value);
    if (scroll > client) failures.push({ width, path, scroll, client, culprits });
  }
}

ws.close();
await chrome.kill();
preview?.kill();

console.log(`\n${pad("width", 8)}${pad("page", 12)}result`);
console.log("-".repeat(52));
for (const width of WIDTHS) {
  for (const path of paths) {
    const bad = failures.find((f) => f.width === width && f.path === path);
    console.log(pad(width, 8) + pad(path, 12) + (bad ? `overflows by ${bad.scroll - bad.client}px` : "ok"));
  }
}

if (failures.length) {
  console.log("\nwidest elements:");
  for (const f of failures) console.log(`  ${f.width} ${f.path}  ${f.culprits.join("  ")}`);
  process.exit(1);
}
console.log(`\nno horizontal overflow (${WIDTHS.join(", ")}px)`);
