const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = 'C:/Users/Acar/Downloads/drive-download-20260424T192059Z-3-001/Şerife Nur Kuş.pdf';
const OUT = path.join(__dirname, '..', 'public', 'images', 'team', 'serife-nur-kus.webp');

async function run() {
  const { pdf } = await import('pdf-to-img');
  const doc = await pdf(SRC, { scale: 3 });
  for await (const img of doc) {
    const out = await sharp(img)
      .rotate()
      .resize(512, 512, { fit: 'cover', position: 'attention' })
      .webp({ quality: 82 })
      .toBuffer();
    fs.writeFileSync(OUT, out);
    console.log(`Wrote ${OUT} (${(out.length / 1024).toFixed(0)}KB)`);
    break;
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
