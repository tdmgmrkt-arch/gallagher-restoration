const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const isDir = fs.statSync(p).isDirectory();
    if (isDir) {
      if (!p.includes("node_modules") && !p.includes(".next") && !p.includes("audits")) walk(p, out);
    } else if (f.endsWith(".tsx") || f.endsWith(".ts")) {
      out.push(p);
    }
  }
  return out;
}

const files = walk(process.cwd()).filter((f) => !f.includes("scripts") && !f.includes("node_modules"));

const findings = [];
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  const regex = /<(Image|img)\b[^>]*?(?:>|\/>)/gs;
  const matches = src.match(regex) || [];
  for (const m of matches) {
    const oneline = m.replace(/\s+/g, " ");
    const hasAlt = /\balt=/.test(m);
    const hasSizes = /\bsizes=/.test(m);
    const hasFill = /\bfill\b/.test(m);
    const usesFullWidth = /w-full|object-cover|inset-0/.test(m);
    const rel = f.replace(process.cwd(), "").replace(/\\/g, "/");
    findings.push({ file: rel, oneline, hasAlt, hasSizes, hasFill, usesFullWidth });
  }
}

console.log("Total images found:", findings.length);
console.log();

const needsSizes = findings.filter((x) => !x.hasSizes && (x.hasFill || x.usesFullWidth));
console.log("=== Missing `sizes` (fill or w-full/object-cover) — " + needsSizes.length + " ===");
needsSizes.forEach((x) => {
  console.log("• " + x.file);
  console.log("  → " + x.oneline.slice(0, 180));
});

console.log();
const noAlt = findings.filter((x) => !x.hasAlt);
console.log("=== Missing `alt` — " + noAlt.length + " ===");
noAlt.forEach((x) => {
  console.log("• " + x.file);
  console.log("  → " + x.oneline.slice(0, 180));
});
