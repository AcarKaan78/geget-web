const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const heic = require('heic-convert');

const SRC_OLD = 'C:/Users/Acar/geget-web/drive-download-20260424T192059Z-3-001';
const SRC_NEW = 'C:/Users/Acar/geget-web/images';
const OUT = path.join(__dirname, '..', 'public', 'images', 'team');
const SIZE = 512;
const QUALITY = 82;

// Re-cropped (centered on face) entries — extract is applied AFTER .rotate().
const RECROPS = [
  { src: SRC_OLD, file: 'Burak Mert Cömert.jpg', slug: 'burak-mert-comert', crop: { left: 170, top: 0,   size: 400 } },
  { src: SRC_OLD, file: 'Eren Soylu',            slug: 'eren-soylu',         crop: { left: 1099, top: 1528, size: 1800 } },
  { src: SRC_OLD, file: 'Yasemin Gürlek.png',    slug: 'yasemin-gurlek',     crop: { left: 418, top: 358, size: 478 } },
  { src: SRC_OLD, file: 'Sevda Rezaei.jpg',      slug: 'sevda-rezaei',       crop: { left: 1099, top: 1385, size: 1800 } },
  { src: SRC_OLD, file: 'Emirhan Aytemur.jpg',   slug: 'emirhan-aytemur',    crop: { left: 956, top: 1532, size: 1800 } },
];

// New photos from /images (auto-cover, attention-based).
const NEW = [
  { src: SRC_NEW, file: 'Emir Aslan.jpeg',       slug: 'emir-aslan' },
  { src: SRC_NEW, file: 'Kübra Demir.jpeg',      slug: 'kubra-demir' },
  { src: SRC_NEW, file: 'Mehmet Alı Şahin.jpeg', slug: 'mehmet-ali-sahin' },
  { src: SRC_NEW, file: 'Münevver Ertürk.jpeg',  slug: 'munevver-erturk' },
];

async function readMaybeHeic(file) {
  let buf = fs.readFileSync(file);
  const head = buf.slice(0, 32).toString('hex');
  if (/66747970(68656963|68656978|6d696631|6d736631|68656973|68657663|68657678)/i.test(head)) {
    buf = await heic({ buffer: buf, format: 'JPEG', quality: 0.95 });
  }
  return buf;
}

async function run() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  for (const p of RECROPS) {
    const buf = await readMaybeHeic(path.join(p.src, p.file));
    const meta = await sharp(buf).rotate().metadata();
    const { left, top, size } = p.crop;
    const safeLeft = Math.max(0, Math.min(left, meta.width - size));
    const safeTop = Math.max(0, Math.min(top, meta.height - size));
    const out = await sharp(buf)
      .rotate()
      .extract({ left: safeLeft, top: safeTop, width: size, height: size })
      .resize(SIZE, SIZE, { fit: 'cover' })
      .webp({ quality: QUALITY })
      .toBuffer();
    fs.writeFileSync(path.join(OUT, p.slug + '.webp'), out);
    console.log('recrop', p.slug.padEnd(22), `(rotated ${meta.width}x${meta.height})`, 'crop', safeLeft, safeTop, size);
  }

  for (const p of NEW) {
    const buf = await readMaybeHeic(path.join(p.src, p.file));
    const out = await sharp(buf)
      .rotate()
      .resize(SIZE, SIZE, { fit: 'cover', position: 'attention' })
      .webp({ quality: QUALITY })
      .toBuffer();
    fs.writeFileSync(path.join(OUT, p.slug + '.webp'), out);
    console.log('new   ', p.slug.padEnd(22), `${(out.length / 1024).toFixed(0)}KB`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
