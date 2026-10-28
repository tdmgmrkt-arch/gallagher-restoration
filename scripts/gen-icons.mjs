/**
 * Generates the app icon set from the badge logo master.
 *
 * Run after the logo changes:  node scripts/gen-icons.mjs
 *
 * Source is design-reference/assets/gallagher_badge_logo.png (1912x1596 RGBA)
 * rather than public/gallagher_badge_logo.webp — Satori's image loader handles
 * PNG reliably, and that file is the transparent master anyway.
 *
 * Rasterizing runs through next/og (bundled with Next) so this needs no extra
 * dependency. Note the "next/og.js" import: this is plain Node ESM with no
 * bundler to apply the package export map.
 */
import { ImageResponse } from "next/og.js";
import { readFileSync, writeFileSync } from "node:fs";

const LOGO = readFileSync("design-reference/assets/gallagher_badge_logo.png");
const LOGO_URI = "data:image/png;base64," + LOGO.toString("base64");

// The badge is wider than it is tall (1.198:1), so fitting it into a square
// canvas is width-constrained — height just letterboxes.
const ASPECT = 1912 / 1596;

/**
 * @param size   square canvas edge, in px
 * @param pad    fraction of the edge kept clear on each side
 * @param bg     canvas fill, or "transparent"
 */
async function png(size, { pad = 0, bg = "transparent" } = {}) {
  const w = Math.round(size * (1 - pad * 2));
  const h = Math.round(w / ASPECT);
  const res = new ImageResponse(
    {
      type: "div",
      key: null,
      props: {
        style: {
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: bg,
        },
        children: {
          type: "img",
          key: null,
          props: { src: LOGO_URI, width: w, height: h },
        },
      },
    },
    { width: size, height: size },
  );
  return Buffer.from(await res.arrayBuffer());
}

/** ICO container. Entries carry PNG payloads, which every browser since IE11 reads. */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
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
  icoImages.push({ size, data: await png(size) });
}
writeFileSync("app/favicon.ico", ico(icoImages));
console.log(`app/favicon.ico      ${icoSizes.join(", ")}px, transparent`);

// Browsers that pick this over the .ico get a high-DPI frame.
writeFileSync("app/icon.png", await png(192));
console.log("app/icon.png         192px, transparent");

// iOS renders a transparent apple-touch-icon on black and applies its own
// rounded mask, so this one is opaque and padded to keep the mask off the badge.
writeFileSync("app/apple-icon.png", await png(180, { pad: 0.08, bg: "#F4F5F1" }));
console.log("app/apple-icon.png   180px, opaque + padded for the iOS mask");
