import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const suras = [90, 94, 99, 100, 106, 111];
const cacheDir = path.join(process.cwd(), 'data', 'api-cache');

for (const suraNumber of suras) {
  const target = path.join(cacheDir, `sura_${suraNumber}.json`);
  if (fs.existsSync(target)) {
    console.log(`Skip sura ${suraNumber}`);
    continue;
  }

  const url = `https://api.alquran.cloud/v1/surah/${suraNumber}/editions/quran-uthmani,en.transliteration,ru.kuliev`;
  console.log(`Downloading sura ${suraNumber}...`);

  const raw = execFileSync(
    'curl',
    ['-sS', '--max-time', '120', url],
    { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }
  );

  const parsed = JSON.parse(raw);
  fs.writeFileSync(target, JSON.stringify(parsed, null, 2), 'utf8');
  console.log(`Saved sura ${suraNumber}`);
}
