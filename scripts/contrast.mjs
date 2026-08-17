#!/usr/bin/env node
// Checks every colour used as text against the surfaces it sits on, in both palettes.
//
//   npm run contrast
//
// Lighthouse already audits contrast, but only in whatever colour scheme the browser
// happens to prefer: macOS headless Chrome inherits the system setting, Linux CI does
// not. That made light-mode failures invisible locally and red in CI. This reads the
// tokens straight out of global.css and is the same everywhere.

import { readFile } from "node:fs/promises";

const AA_TEXT = 4.5;
const AA_LARGE = 3; // 24px+, or 19px+ bold. Also the floor for icons and other non-text.

// Every token used as text, and the backgrounds it can land on.
const TEXT_ON = {
  "text-1": ["bg", "surface"],
  "text-2": ["bg", "surface"],
  "text-3": ["bg", "surface"],
  "accent-text": ["bg", "surface"],
  "accent-ink": ["accent"],
};

// Non-text that carries meaning: status dots, the logo mark, focus rings.
// Hairline dividers are deliberately absent: WCAG 1.4.11 covers graphics you need in
// order to understand the content, and a row separator is not one.
const GRAPHIC_ON = {
  "accent-strong": ["bg", "surface"],
};

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (hi + 0.05) / (lo + 0.05);
};

// Tokens come from :root (dark) and the [data-theme="light"] block, which carries the
// same values as the prefers-color-scheme media query.
const css = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");
const block = (selector) => {
  const start = css.indexOf(selector);
  const open = css.indexOf("{", start);
  const body = css.slice(open + 1, css.indexOf("}", open));
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2].toLowerCase()])
  );
};

const dark = block(":root {");
const light = { ...dark, ...block('[data-theme="light"]') };
const palettes = { dark, light };

const rows = [];
let failed = false;

for (const [palette, tokens] of Object.entries(palettes)) {
  for (const [set, floor] of [
    [TEXT_ON, AA_TEXT],
    [GRAPHIC_ON, AA_LARGE],
  ]) {
    for (const [fg, backgrounds] of Object.entries(set)) {
      for (const bg of backgrounds) {
        if (!tokens[fg] || !tokens[bg]) throw new Error(`unknown token ${fg} or ${bg}`);
        const value = ratio(tokens[fg], tokens[bg]);
        const ok = value >= floor;
        if (!ok) failed = true;
        rows.push({ palette, fg, bg, value, floor, ok });
      }
    }
  }
}

const pad = (s, n) => String(s).padEnd(n);
console.log(`${pad("palette", 9)}${pad("foreground", 15)}${pad("on", 10)}${pad("ratio", 8)}min`);
console.log("-".repeat(46));
for (const r of rows) {
  console.log(
    pad(r.palette, 9) + pad(r.fg, 15) + pad(r.bg, 10) +
    pad(r.value.toFixed(2) + (r.ok ? "" : "*"), 8) + r.floor
  );
}

if (failed) {
  console.log("\nbelow minimum (marked *)");
  process.exit(1);
}
console.log(`\nall pairs pass (${AA_TEXT}:1 text, ${AA_LARGE}:1 non-text)`);
