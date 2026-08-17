#!/usr/bin/env node
// Prints the routes worth auditing for a given diff, one per line.
//
//   node scripts/changed-pages.mjs                 # vs HEAD~1
//   node scripts/changed-pages.mjs origin/main     # vs a base ref
//
// Rules:
//   - a changed page file maps to its route
//   - a changed layout, style, component, or config affects every page, so it
//     widens the set to all routes rather than pretending nothing changed
//   - dynamic routes ([slug]) are skipped: the params are not knowable here

import { execSync } from "node:child_process";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const base = process.argv[2] || "HEAD~1";
const PAGES = "src/pages";

const allRoutes = () => {
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.(astro|md|mdx|html)$/.test(entry)) out.push(toRoute(relative(PAGES, full)));
    }
  };
  if (existsSync(PAGES)) walk(PAGES);
  return out.filter(Boolean);
};

function toRoute(rel) {
  if (/\[.*\]/.test(rel)) return null; // dynamic route, params unknown
  const noExt = rel.replace(/\.(astro|md|mdx|html)$/, "");
  if (noExt === "index") return "/";
  if (noExt.endsWith("/index")) return "/" + noExt.slice(0, -"/index".length);
  return "/" + noExt;
}

let changed = [];
try {
  changed = execSync(`git diff --name-only ${base}...HEAD`, { encoding: "utf8" })
    .split("\n").map((s) => s.trim()).filter(Boolean);
} catch {
  // No such base (first commit, shallow clone): audit everything.
  console.log(allRoutes().join("\n"));
  process.exit(0);
}

// Anything shared invalidates the "only changed pages" shortcut.
const global = changed.some((f) =>
  /^src\/(layouts|components|styles)\//.test(f) ||
  /^(astro\.config|tailwind\.config|package)\./.test(f) ||
  /^public\//.test(f)
);

const routes = global
  ? allRoutes()
  : [...new Set(changed.filter((f) => f.startsWith(PAGES + "/"))
      .map((f) => toRoute(relative(PAGES, f))).filter(Boolean))];

console.log(routes.join("\n"));
