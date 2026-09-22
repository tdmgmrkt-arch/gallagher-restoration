/**
 * Generates the `html.a11y-text-N` CSS rules used by the accessibility widget.
 *
 * Type on this site is authored as fixed px / clamp() Tailwind arbitrary values
 * (`text-[15px]`, `text-[clamp(30px,4vw,52px)]`), so a root font-size bump does
 * nothing. Instead we scan the source for every text utility actually in use and
 * emit a scaled override per size step. The >=1024px block mirrors the desktop
 * readability scale already in globals.css so the two stay in agreement.
 *
 * Run after adding new text sizes:
 *   node scripts/gen-a11y-text-scale.mjs
 * then paste the output over the generated block at the bottom of app/globals.css.
 */
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components", "lib"];
const STEPS = [
  [1, 1.125],
  [2, 1.25],
  [3, 1.375],
];

// Mirrors the "Desktop readability scale" block in app/globals.css.
const DESKTOP = {
  9: 12,
  10: 15,
  11: 15,
  12: 14,
  13: 15,
  14: 16.5,
  15: 18,
  16: 19.5,
  17: 21,
  18: 22,
  20: 24,
  22: 26,
  26: 30,
};

// Decorative display numerals — never scaled.
const EXCLUDE_PX = new Set([160]);

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".tsx") || p.endsWith(".ts")) out.push(p);
  }
  return out;
}

const source = ROOTS.flatMap((r) => walk(r))
  .map((f) => readFileSync(f, "utf8"))
  .join("\n");

const pxSizes = [
  ...new Set(
    [...source.matchAll(/text-\[(\d+)px\]/g)]
      .map((m) => Number(m[1]))
      .filter((n) => !EXCLUDE_PX.has(n)),
  ),
].sort((a, b) => a - b);

const clamps = [
  ...new Set(
    [...source.matchAll(/text-\[clamp\((\d+(?:\.\d+)?)px,(\d+(?:\.\d+)?)vw,(\d+(?:\.\d+)?)px\)\]/g)].map(
      (m) => m[0],
    ),
  ),
].sort();

// Tailwind arbitrary values are full of brackets, parens and commas. Matching
// them through [class~="..."] avoids a wall of backslash escapes, and the extra
// attribute selector also lifts specificity above the plain utility.
const sel = (cls) => `[class~="${cls}"]`;
const round = (n) => Number(n.toFixed(2));

const out = [];
out.push("/* --- a11y text scale (generated: scripts/gen-a11y-text-scale.mjs) ---------");
out.push("   Three user-selectable size steps. Higher specificity than both the base");
out.push("   utilities and the desktop readability scale below, so no !important.");
out.push("   -------------------------------------------------------------------------- */");

for (const [step, factor] of STEPS) {
  const rules = [];
  for (const px of pxSizes) {
    rules.push(`html.a11y-text-${step} ${sel(`text-[${px}px]`)} { font-size: ${round(px * factor)}px; }`);
  }
  for (const c of clamps) {
    const [, min, vw, max] = c.match(/clamp\((\d+(?:\.\d+)?)px,(\d+(?:\.\d+)?)vw,(\d+(?:\.\d+)?)px\)/);
    rules.push(
      `html.a11y-text-${step} ${sel(c)} { font-size: clamp(${round(Number(min) * factor)}px, ${round(
        Number(vw) * factor,
      )}vw, ${round(Number(max) * factor)}px); }`,
    );
  }
  out.push(rules.join("\n"));
  out.push("");
}

out.push("@media (min-width: 1024px) {");
for (const [step, factor] of STEPS) {
  for (const px of pxSizes) {
    const base = DESKTOP[px];
    if (base === undefined) continue;
    out.push(
      `  html.a11y-text-${step} ${sel(`text-[${px}px]`)} { font-size: ${round(base * factor)}px; }`,
    );
  }
}
out.push("}");

process.stdout.write(out.join("\n") + "\n");
