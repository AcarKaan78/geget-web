const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const heicConvert = require('heic-convert');

const SRC = 'C:/Users/Acar/Downloads/drive-download-20260424T192059Z-3-001';
const OUT = path.join(__dirname, '..', 'public', 'images', 'team');
const SIZE = 512;
const QUALITY = 82;

const DIACRITICS = {
  ç: 'c', Ç: 'c',
  ğ: 'g', Ğ: 'g',
  ı: 'i', İ: 'i',
  ö: 'o', Ö: 'o',
  ş: 's', Ş: 's',
  ü: 'u', Ü: 'u',
  â: 'a', Â: 'a',
  î: 'i', Î: 'i',
  û: 'u', Û: 'u',
};

function slugify(name) {
  const stripped = name
    .split('')
    .map((c) => DIACRITICS[c] ?? c)
    .join('')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
  return stripped
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Mapping from source filename (base, no extension, trimmed) → canonical person name used in team.ts
const PEOPLE = [
  { file: 'Dr. Halil Ecer.jpg', name: 'Halil Ecer' },
  { file: 'Rümeysa Çakır.png', name: 'Rümeysa Çakır' },
  { file: 'Burak Mert Cömert.jpg', name: 'Burak Mert Cömert' },
  { file: 'Eren Soylu', name: 'Eren Soylu' },
  { file: 'Ayşegül Dincer.jpg', name: 'Ayşegül Dinçer' },
  { file: 'İrem Demirci.jpg', name: 'İrem Demirci' },
  { file: 'Fatma Nur Karagöz.jpg', name: 'Fatma Nur Karagöz' },
  { file: 'Şerife Nur Kuş.pdf', name: 'Şerife Nur Kuş' },
  { file: 'Yasemin Gürlek.png', name: 'Yasemin Gürlek' },
  { file: 'Evren Sarı', name: 'Evren Sarı' },
  { file: 'Hatice Rana Aktaş.jpg', name: 'Hatice Rana Aktaş' },
  { file: 'Ayşe Rana.jpg', name: 'Ayşe Rana Selvitopu' },
  { file: 'Ahmet Hakan Koşar.jpg', name: 'Ahmet Hakan Koşar' },
  { file: 'Buse Karadavut_.jpg', name: 'Buse Karadavut' },
  { file: 'Kübra Demir.jpg', name: 'Kübra Demir' },
  { file: 'Sevda Rezaei.jpg', name: 'Sevda Rezaei' },
  { file: 'Şeydanur Kavak.jpg', name: 'Şeydanur Kavak' },
  { file: 'Aleyna Akgül.jpg', name: 'Aleyna Akgül' },
  { file: 'Esma Sare Usta.jpg', name: 'Esma Sare Usta' },
  { file: 'Emirhan Aytemur.jpg', name: 'Emirhan Aytemur' },
  { file: 'Zeynepsu Gündoğan_.jpg', name: 'Zeynepsu Gündoğan' },
  { file: 'Ayyüce Yılmaz.jpg', name: 'Ayyüce Yılmaz' },
];

async function run() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const mapping = {};
  for (const p of PEOPLE) {
    const src = path.join(SRC, p.file);
    if (!fs.existsSync(src)) {
      console.warn(`MISSING: ${p.file}`);
      continue;
    }
    const slug = slugify(p.name);
    const dest = path.join(OUT, `${slug}.webp`);
    let buf = fs.readFileSync(src);
    const head = buf.slice(0, 32).toString('hex');
    try {
      // HEIF/HEIC: ftyp box at bytes 4-8 with "heic"/"heix"/"mif1"/"msf1"/"heis"/"hevc"
      const isHeif = /66747970(68656963|68656978|6d696631|6d736631|68656973|68657663|68657678)/i.test(
        head
      );
      if (isHeif) {
        buf = await heicConvert({ buffer: buf, format: 'JPEG', quality: 0.95 });
      }
      const pipeline = sharp(buf, { pages: 1, density: 300 })
        .rotate()
        .resize(SIZE, SIZE, { fit: 'cover', position: 'attention' })
        .webp({ quality: QUALITY });
      const out = await pipeline.toBuffer();
      fs.writeFileSync(dest, out);
      mapping[p.name] = `/images/team/${slug}.webp`;
      console.log(
        `${p.name.padEnd(30)} ${(fs.statSync(src).size / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB`
      );
    } catch (err) {
      console.error(`FAILED ${p.name}: ${err.message}`);
    }
  }
  fs.writeFileSync(
    path.join(__dirname, 'team-image-mapping.json'),
    JSON.stringify(mapping, null, 2)
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
