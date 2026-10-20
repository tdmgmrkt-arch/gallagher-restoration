import { readdir, unlink, readFile, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// sharp is a transitive dep (Next pulls it in), so pnpm's strict layout keeps it
// out of top-level node_modules. Resolve it from the .pnpm store rather than
// hardcoding a version-pinned path the way scripts/convert-city-heros.mjs does.
async function loadSharp() {
  try {
    return require("sharp");
  } catch {}
  const store = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "node_modules",
    ".pnpm",
  );
  for (const entry of await readdir(store)) {
    if (!entry.startsWith("sharp@")) continue;
    return require(join(store, entry, "node_modules", "sharp"));
  }
  throw new Error("sharp not found — run `pnpm install` first");
}
const sharp = await loadSharp();

/**
 * Converts raw blog hero exports in `public/blog/` to 1600px-wide WebP.
 *
 * Accepts png/jpg/jpeg/avif/tif/tiff so it does not matter what the image tool
 * exported. The source file is deleted only after the WebP is written.
 *
 * IMPORTANT: `public/blog/` still holds legacy .jpg heroes from the original
 * WordPress migration, and those .jpg files are the ones the eight legacy posts
 * actually reference. Converting and deleting them would 404 those posts. So a
 * bare run converts ONLY sources that no blog JSON references:
 *
 *   node scripts/convert-blog-heros.mjs              # safe: skips referenced files
 *   node scripts/convert-blog-heros.mjs a.png b.png  # explicit, converts just these
 *   node scripts/convert-blog-heros.mjs --all        # force everything (rarely right)
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "blog");
const contentDir = join(root, "content", "blog");
const SOURCE_EXT = /\.(png|jpe?g|avif|tiff?)$/i;

const argv = process.argv.slice(2);
const forceAll = argv.includes("--all");
const explicit = argv.filter((a) => !a.startsWith("--"));

// Every image path referenced by a blog post, as a bare filename.
const referenced = new Set();
for (const f of await readdir(contentDir)) {
  if (!f.endsWith(".json")) continue;
  const post = JSON.parse(await readFile(join(contentDir, f), "utf8"));
  if (post.image) referenced.add(post.image.split("/").pop());
}

const entries = await readdir(dir);
const allSources = [];
for (const f of entries) {
  if (!SOURCE_EXT.test(f)) continue;
  if (!(await stat(join(dir, f))).isFile()) continue;
  allSources.push(f);
}

let sources = [];
let skipped = [];

if (explicit.length > 0) {
  sources = explicit;
} else if (forceAll) {
  sources = allSources;
} else {
  sources = allSources.filter((f) => !referenced.has(f));
  skipped = allSources.filter((f) => referenced.has(f));
}

if (sources.length === 0) console.log("Nothing to convert.");

for (const file of sources) {
  const src = join(dir, file);
  const outName = file.replace(SOURCE_EXT, ".webp");
  const out = join(dir, outName);

  const { width, height } = await sharp(src).metadata();
  await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(out);
  await unlink(src);

  const ratio = (width / height).toFixed(2);
  const flag = Math.abs(width / height - 16 / 9) > 0.15 ? "  <-- not 16:9" : "";
  console.log(`${file} -> ${outName}  (${width}x${height}, ${ratio}:1)${flag}`);
}

if (skipped.length > 0) {
  console.log(
    `\nSkipped ${skipped.length} source file(s) that a blog post references ` +
      `directly (pass --all to convert them anyway, and update the JSON):`,
  );
  for (const f of skipped) console.log(`  ${f}`);
}
