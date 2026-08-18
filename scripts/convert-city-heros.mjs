import { readdir, rename, unlink } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('C:/Users/Owner/agency/clients/gallagher-restoration/node_modules/.pnpm/sharp@0.35.3_@types+node@20.19.43/node_modules/sharp');

const dir = 'C:/Users/Owner/agency/clients/gallagher-restoration/public/location-page-heros';

function slugFromFilename(name) {
  // e.g. "10_Hemet-A-high-end-editorial-commercial-photograph-o.jfif"
  const withoutExt = name.replace(/\.[^.]+$/, '');
  const afterIndex = withoutExt.replace(/^\d+_/, '');
  // Everything up to "-A-high-end" is the city name
  const cityPart = afterIndex.split('-A-high-end')[0];
  return cityPart
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const files = await readdir(dir);
const jfifs = files.filter((f) => f.toLowerCase().endsWith('.jfif'));

for (const file of jfifs) {
  const slug = slugFromFilename(file);
  const src = join(dir, file);
  const dst = join(dir, `${slug}.webp`);
  await sharp(src).webp({ quality: 82 }).toFile(dst);
  await unlink(src);
  console.log(`${file}  ->  ${slug}.webp`);
}

console.log(`\nDone. Converted ${jfifs.length} files.`);
