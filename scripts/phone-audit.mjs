#!/usr/bin/env node
/**
 * Phone-number audit.
 *
 * The site has one business number, but it is NOT all read from `lib/site.ts`:
 * ~180 instances are baked as literal strings into the `content/**` JSON that
 * drives the service, city, county and blog pages. A number change therefore
 * has to sweep those too, and nothing in the type system catches a miss.
 *
 * This script fails if it finds any US phone number in the deployable site
 * that is not the current `PHONE` / `SMS.supportNumber`. Run it after any
 * number change, and before pushing content edits.
 *
 *   node scripts/phone-audit.mjs      (or: pnpm test:phone)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");

/** Directories that ship to production. `audits/`, `ghl/` and `archive/` do not. */
const SCAN_DIRS = ["app", "components", "lib", "content"];
const SCAN_FILES = ["public/llms.txt", "public/ai-actions.json"];
const EXTS = [".ts", ".tsx", ".json", ".txt"];

/**
 * Read the allowed numbers out of `lib/site.ts` rather than hardcoding them,
 * so this script can never disagree with the site it is auditing.
 */
const site = readFileSync(join(ROOT, "lib", "site.ts"), "utf8");
const allowed = new Set();
for (const key of ["display", "href", "digits", "supportNumber", "supportHref"]) {
  const m = site.match(new RegExp(key + ':\\s*"([^"]+)"'));
  if (!m) continue;
  const digits = m[1].replace(/\D/g, "");
  allowed.add(digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits);
}
if (allowed.size === 0) {
  console.error("phone-audit: could not read any number out of lib/site.ts");
  process.exit(2);
}

/**
 * Matches US numbers in every format the site uses: "(844) 647-2257",
 * "844-647-2257", "+1-844-647-2257", "tel:8446472257".
 */
const PHONE_RE = /(tel:)?(?:\+?1[\s.-]?)?\(?([2-9]\d{2})\)?[\s.-]{0,2}(\d{3})[\s.-]?(\d{4})/g;

const DIGIT = /\d/;

/**
 * Comment lines are skipped: they never render, and they are where the history
 * of superseded numbers (and the Google Ads customer id, which looks exactly
 * like a phone number) legitimately lives.
 */
const COMMENT = /^\s*(?:\/\/|\/?\*)/;

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (EXTS.some((e) => entry.endsWith(e))) yield full;
  }
}

const targets = [
  ...SCAN_DIRS.flatMap((d) => [...walk(join(ROOT, d))]),
  ...SCAN_FILES.map((f) => join(ROOT, ...f.split("/"))),
];

const findings = [];
for (const file of targets) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (COMMENT.test(line)) return;
      for (const m of line.matchAll(PHONE_RE)) {
        const [text, telPrefix, area, mid, last] = m;

        // Reject matches that are a slice out of a longer digit run — Google
        // CIDs, place ids and tracking labels are full of 10-digit windows.
        if (DIGIT.test(line[m.index - 1] ?? "")) continue;
        if (DIGIT.test(line[m.index + text.length] ?? "")) continue;

        // A real number on this site is always either `tel:`-prefixed or
        // separated. A bare digit run is an id, not a phone number.
        if (!telPrefix && /^\d+$/.test(text)) continue;

        if (allowed.has(area + mid + last)) continue;

        findings.push({
          file: relative(ROOT, file).split(sep).join("/"),
          line: i + 1,
          found: text,
          snippet: line.trim().slice(0, 120),
        });
      }
    });
}

const pretty = [...allowed].map((d) => `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`);
console.log(`phone-audit: scanned ${targets.length} files; allowed ${pretty.join(", ")}`);

if (findings.length === 0) {
  console.log("phone-audit: OK - no stray phone numbers.");
  process.exit(0);
}

console.error(`\nphone-audit: ${findings.length} stray phone number(s):\n`);
for (const f of findings) {
  console.error(`  ${f.file}:${f.line}  ${f.found}`);
  console.error(`      ${f.snippet}`);
}
process.exit(1);
