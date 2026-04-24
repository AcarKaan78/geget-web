const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const heic = require('heic-convert');

const SRC = 'C:/Users/Acar/Downloads/drive-download-20260424T192059Z-3-001';
const OUT = path.join(__dirname, '..', 'public', 'images', 'team');

// Each: file (in source), slug (output), crop { left, top, size } in source pixels after .rotate().
const CROPS = [
  { file: 'Yasemin Gürlek.png',    slug: 'yasemin-gurlek',    crop: { left: 275, top: 240, size: 700 } },
  { file: 'Evren Sarı',            slug: 'evren-sari',        crop: { left: 713, top: 1267, size: 1700 } },
  { file: 'Buse Karadavut_.jpg',   slug: 'buse-karadavut',    crop: { left: 128, top: 45, size: 900 } },
  { file: 'Aleyna Akgül.jpg',      slug: 'aleyna-akgul',      crop: { left: 410, top: 210, size: 900 } },
  { file: 'Emirhan Aytemur.jpg',   slug: 'emirhan-aytemur',   crop: { left: 1020, top: 1617, size: 1800 } },
  { file: 'Ayyüce Yılmaz.jpg',     slug: 'ayyuce-yilmaz',     crop: { left: 340, top: 500, size: 400 } },
];

async function run() {
  for (const p of CROPS) {
    let buf = fs.readFileSync(path.join(SRC, p.file));
    const head = buf.slice(0, 32).toString('hex');
    if (
      /66747970(68656963|68656978|6d696631|6d736631|68656973|68657663|68657678)/i.test(head)
    ) {
      buf = await heic({ buffer: buf, format: 'JPEG', quality: 0.95 });
    }
    const base = sharp(buf).rotate();
    const meta = await base.metadata();
    const { left, top, size } = p.crop;
    const safeLeft = Math.max(0, Math.min(left, meta.width - size));
    const safeTop = Math.max(0, Math.min(top, meta.height - size));
    const out = await sharp(buf)
      .rotate()
      .extract({ left: safeLeft, top: safeTop, width: size, height: size })
      .resize(512, 512, { fit: 'cover' })
      .webp({ quality: 82 })
      .toBuffer();
    fs.writeFileSync(path.join(OUT, p.slug + '.webp'), out);
    console.log(p.slug.padEnd(20), `src ${meta.width}x${meta.height}`, 'crop', safeLeft, safeTop, size);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
