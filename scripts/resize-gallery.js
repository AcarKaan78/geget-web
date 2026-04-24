const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '..', 'public', 'images', 'galeri');
const MAX_WIDTH = 1600;
const QUALITY = 80;

async function run() {
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f));
  for (const file of files) {
    const p = path.join(dir, file);
    const input = fs.readFileSync(p);
    const before = input.length;
    const buf = await sharp(input)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(p, buf);
    const after = buf.length;
    console.log(
      `${file.padEnd(45)} ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
    );
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
