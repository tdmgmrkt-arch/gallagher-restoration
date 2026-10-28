/**
 * Generates the app icon set from the badge logo master.
 *
 *   node scripts/gen-icons.mjs
 *
 * Re-run after the logo or the knobs below change, then commit the output.
 *
 * Design: the complete badge sits inside a brand-green disc. Fitting the whole
 * logo matters here -- the badge's bounding box is 1.198:1, but its corners are
 * transparent, so a circular mask at LOGO_FIT = 0.96 of the diameter clips
 * exactly zero visible pixels (measured against the master's alpha, not
 * eyeballed). A naive diagonal fit would be 0.77 and needlessly smaller.
 *
 * The green disc is load-bearing, not decorative: at 16px the badge's interior
 * detail is gone whatever we do, so the disc is what keeps the icon a
 * recognisable brand shape instead of a grey smudge. An off-white disc was
 * tried first and dissolves into light browser chrome.
 *
 * No image dependency: Node's zlib plus a little pixel work covers decode,
 * area-average downscale, and encode. Nothing else in the repo needs sharp.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { deflateSync, inflateSync } from "node:zlib";

const SRC = "design-reference/assets/gallagher_badge_logo.png";
const TILE = "#8ECE34"; // brand green
const LOGO_FIT = 0.96; // logo width as a fraction of the disc diameter
const SS = 4; // supersampling factor, downsampled for anti-aliasing

// --- PNG ---------------------------------------------------------------------

function decodePng(buf) {
  const W = buf.readUInt32BE(16);
  const H = buf.readUInt32BE(20);
  if (buf.readUInt8(24) !== 8 || buf.readUInt8(25) !== 6) {
    throw new Error("expected 8-bit RGBA source");
  }
  let off = 8;
  const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    if (type === "IDAT") idat.push(buf.subarray(off + 8, off + 8 + len));
    off += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat));
  const BPP = 4;
  const stride = W * BPP;
  const img = Buffer.alloc(H * stride);
  let p = 0;
  for (let y = 0; y < H; y++) {
    const filter = raw[p++];
    const line = raw.subarray(p, p + stride);
    p += stride;
    const cur = img.subarray(y * stride, (y + 1) * stride);
    const prev =
      y > 0 ? img.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= BPP ? cur[x - BPP] : 0;
      const b = prev[x];
      const c = x >= BPP ? prev[x - BPP] : 0;
      let v = line[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const q = a + b - c;
        const pa = Math.abs(q - a);
        const pb = Math.abs(q - b);
        const pc = Math.abs(q - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[x] = v & 255;
    }
  }
  return { W, H, img };
}

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let r = 0xffffffff;
  for (const byte of buf) r = CRC_TABLE[(r ^ byte) & 255] ^ (r >>> 8);
  return (r ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(W, H, px) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(6, 9); // colour type: RGBA
  const stride = W * 4;
  const raw = Buffer.alloc(H * (stride + 1));
  for (let y = 0; y < H; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    px.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  return Buffer.concat([
    Buffer.from("89504e470d0a1a0a", "hex"),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// --- rendering ---------------------------------------------------------------

const MASTER = decodePng(readFileSync(SRC));

/** Area-average downscale of the master, premultiplied so edges stay clean. */
function logoAt(w, h) {
  const { W, H, img } = MASTER;
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sx0 = Math.floor((x * W) / w);
      const sx1 = Math.max(sx0 + 1, Math.floor(((x + 1) * W) / w));
      const sy0 = Math.floor((y * H) / h);
      const sy1 = Math.max(sy0 + 1, Math.floor(((y + 1) * H) / h));
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      for (let sy = sy0; sy < sy1; sy++) {
        for (let sx = sx0; sx < sx1; sx++) {
          const s = (sy * W + sx) * 4;
          const al = img[s + 3] / 255;
          r += img[s] * al;
          g += img[s + 1] * al;
          b += img[s + 2] * al;
          a += img[s + 3];
          n++;
        }
      }
      const o = (y * w + x) * 4;
      const aa = a / n;
      const norm = aa / 255;
      out[o] = norm ? Math.min(255, Math.round(r / n / norm)) : 0;
      out[o + 1] = norm ? Math.min(255, Math.round(g / n / norm)) : 0;
      out[o + 2] = norm ? Math.min(255, Math.round(b / n / norm)) : 0;
      out[o + 3] = Math.round(aa);
    }
  }
  return { w, h, px: out };
}

const hex = (c) => [
  parseInt(c.slice(1, 3), 16),
  parseInt(c.slice(3, 5), 16),
  parseInt(c.slice(5, 7), 16),
];

/**
 * @param {number} size  output edge in px
 * @param {{shape?: "circle"|"square", opaque?: boolean}} opts
 */
function render(size, { shape = "circle", opaque = false } = {}) {
  const N = size * SS;
  const [tr, tg, tb] = hex(TILE);
  const lw = Math.max(1, Math.round(LOGO_FIT * N));
  const lh = Math.max(1, Math.round((lw * MASTER.H) / MASTER.W));
  const logo = logoAt(lw, lh);
  const ox = Math.round((N - lw) / 2);
  const oy = Math.round((N - lh) / 2);
  const R = N / 2;

  const big = Buffer.alloc(N * N * 4);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (shape === "circle" && Math.hypot(x + 0.5 - R, y + 0.5 - R) > R) continue;
      let r = tr, g = tg, b = tb;
      const lx = x - ox;
      const ly = y - oy;
      if (lx >= 0 && ly >= 0 && lx < lw && ly < lh) {
        const s = (ly * lw + lx) * 4;
        const al = logo.px[s + 3] / 255;
        r = Math.round(tr * (1 - al) + logo.px[s] * al);
        g = Math.round(tg * (1 - al) + logo.px[s + 1] * al);
        b = Math.round(tb * (1 - al) + logo.px[s + 2] * al);
      }
      const i = (y * N + x) * 4;
      big[i] = r;
      big[i + 1] = g;
      big[i + 2] = b;
      big[i + 3] = 255;
    }
  }

  const out = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let j = 0; j < SS; j++) {
        for (let i = 0; i < SS; i++) {
          const s = ((y * SS + j) * N + (x * SS + i)) * 4;
          const al = big[s + 3] / 255;
          r += big[s] * al;
          g += big[s + 1] * al;
          b += big[s + 2] * al;
          a += big[s + 3];
        }
      }
      const n = SS * SS;
      const aa = a / n;
      const norm = aa / 255;
      const o = (y * size + x) * 4;
      out[o] = norm ? Math.round(r / n / norm) : 0;
      out[o + 1] = norm ? Math.round(g / n / norm) : 0;
      out[o + 2] = norm ? Math.round(b / n / norm) : 0;
      out[o + 3] = opaque ? 255 : Math.round(aa);
    }
  }
  return encodePng(size, size, out);
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
    e.writeUInt8(0, 2); // palette size (0 = truecolour)
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

// --- output ------------------------------------------------------------------

const ICO_SIZES = [16, 32, 48];
writeFileSync(
  "app/favicon.ico",
  ico(ICO_SIZES.map((size) => ({ size, data: render(size) }))),
);
console.log(`app/favicon.ico      ${ICO_SIZES.join(", ")}px disc`);

writeFileSync("app/icon.png", render(192));
console.log("app/icon.png         192px disc");

// iOS composites a transparent apple-touch-icon onto black and then applies its
// own squircle mask, so this one is an opaque square: a disc inside that mask
// would leave black corners.
writeFileSync("app/apple-icon.png", render(180, { shape: "square", opaque: true }));
console.log("app/apple-icon.png   180px square, masked by iOS");
