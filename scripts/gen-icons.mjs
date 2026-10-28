/**
 * Rasterizes app/icon.svg into the binary icon files Next.js can't generate
 * itself: the multi-size favicon.ico and the iOS apple-icon.png.
 *
 * Run after editing app/icon.svg:  node scripts/gen-icons.mjs
 *
 * Uses next/og (bundled with Next) as the rasterizer so this needs no extra
 * dependency. ICO entries carry PNG payloads, which every browser since IE11
 * reads and which keeps the file ~15x smaller than BMP entries would.
 */
// "next/og.js", not "next/og" — this runs under plain Node ESM, with no
// bundler to apply the package export map.
import { ImageResponse } from "next/og.js";
import { readFileSync, writeFileSync } from "node:fs";

const SVG = readFileSync("app/icon.svg", "utf8");

/** iOS masks the icon itself, so its source must be a full-bleed square. */
const SQUARE_SVG = SVG.replace(' rx="14"', "");

function dataUri(svg) {
  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

async function png(svg, size) {
  const res = new ImageResponse(
    {
      type: "div",
      key: null,
      props: {
        style: { display: "flex", width: "100%", height: "100%" },
        children: {
          type: "img",
          key: null,
          props: { src: dataUri(svg), width: size, height: size },
        },
      },
    },
    { width: size, height: size },
  );
  return Buffer.from(await res.arrayBuffer());
}

function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette size (0 = truecolor)
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const icoSizes = [16, 32, 48];
const icoImages = [];
for (const size of icoSizes) {
  icoImages.push({ size, data: await png(SVG, size) });
}
writeFileSync("app/favicon.ico", ico(icoImages));
console.log(`app/favicon.ico (${icoSizes.join(", ")}px)`);

writeFileSync("app/apple-icon.png", await png(SQUARE_SVG, 180));
console.log("app/apple-icon.png (180px)");
