const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.resolve(__dirname, '..', 'WhatsApp Image 2026-03-01 at 20.16.58.jpeg');
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'images');

/**
 * Flood-fill from the four corners through near-white pixels, marking them
 * as transparent. Preserves white pixels that are enclosed by non-white
 * (e.g. the white "GEGET" letters inside the blue diamond).
 */
function floodFillTransparent(rgba, width, height, threshold = 20) {
  const total = width * height;
  const visited = new Uint8Array(total);
  const queue = new Int32Array(total);
  let qHead = 0;
  let qTail = 0;

  function idx(x, y) {
    return y * width + x;
  }

  function isNearWhite(i) {
    const off = i * 4;
    const r = rgba[off];
    const g = rgba[off + 1];
    const b = rgba[off + 2];
    const a = rgba[off + 3];
    if (a < 250) return true; // already transparent counts as outside
    return (
      r >= 255 - threshold &&
      g >= 255 - threshold &&
      b >= 255 - threshold
    );
  }

  function push(x, y) {
    const i = idx(x, y);
    if (visited[i]) return;
    if (!isNearWhite(i)) return;
    visited[i] = 1;
    queue[qTail++] = i;
  }

  // Seed from every border pixel (robust against small imperfections)
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (qHead < qTail) {
    const i = queue[qHead++];
    const x = i % width;
    const y = (i - x) / width;
    if (x > 0) push(x - 1, y);
    if (x < width - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < height - 1) push(x, y + 1);
  }

  // Apply alpha: flooded pixels → transparent
  for (let i = 0; i < total; i++) {
    if (visited[i]) {
      rgba[i * 4 + 3] = 0;
    }
  }
  return rgba;
}

async function buildColorMark(src, dstBase) {
  const meta = await sharp(src).metadata();

  // Trim, square, then flood-fill the outside to transparent
  const { data: trimBuf, info: trimInfo } = await sharp(src)
    .ensureAlpha()
    .trim({ background: { r: 255, g: 255, b: 255, alpha: 1 }, threshold: 12 })
    .toBuffer({ resolveWithObject: true });

  const { width: tw, height: th } = trimInfo;
  const size = Math.max(tw, th);
  const padX = Math.floor((size - tw) / 2);
  const padY = Math.floor((size - th) / 2);

  const squaredBuf = await sharp(trimBuf)
    .extend({
      top: padY,
      bottom: size - th - padY,
      left: padX,
      right: size - tw - padX,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  floodFillTransparent(squaredBuf.data, squaredBuf.info.width, squaredBuf.info.height, 22);

  const pngBuf = await sharp(squaredBuf.data, {
    raw: {
      width: squaredBuf.info.width,
      height: squaredBuf.info.height,
      channels: 4,
    },
  })
    .png()
    .toBuffer();

  await sharp(pngBuf).resize(512, 512).png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, `${dstBase}.png`));
  await sharp(pngBuf).resize(512, 512).webp({ quality: 92 }).toFile(path.join(OUT_DIR, `${dstBase}.webp`));
  await sharp(pngBuf).resize(192, 192).png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, `${dstBase}@sm.png`));

  console.log(`✔ ${dstBase}.png/.webp/@sm  (src ${meta.width}x${meta.height} → trim ${tw}x${th} → square ${size}x${size} → transparent outside)`);
}

async function buildWhiteSilhouette(src, dstBase) {
  const { data: trimBuf, info: trimInfo } = await sharp(src)
    .ensureAlpha()
    .trim({ background: { r: 255, g: 255, b: 255, alpha: 1 }, threshold: 12 })
    .toBuffer({ resolveWithObject: true });

  const { width: tw, height: th } = trimInfo;
  const size = Math.max(tw, th);
  const padX = Math.floor((size - tw) / 2);
  const padY = Math.floor((size - th) / 2);

  const squaredBuf = await sharp(trimBuf)
    .extend({
      top: padY,
      bottom: size - th - padY,
      left: padX,
      right: size - tw - padX,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = squaredBuf.info.width;
  const h = squaredBuf.info.height;
  floodFillTransparent(squaredBuf.data, w, h, 22);

  // Now recolor every non-transparent pixel to white, keeping alpha.
  const data = squaredBuf.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 0) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }

  const pngBuf = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toBuffer();

  await sharp(pngBuf).resize(512, 512).png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, `${dstBase}.png`));
  console.log(`✔ ${dstBase}.png (white silhouette, transparent bg)`);
}

(async () => {
  if (!fs.existsSync(SRC)) {
    console.error('Source not found:', SRC);
    process.exit(1);
  }
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await buildColorMark(SRC, 'logo-mark');
  await buildWhiteSilhouette(SRC, 'logo-mark-white');
})();
