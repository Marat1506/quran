import fs from 'fs';
import path from 'path';

const [, , suraNumber, sourcePath] = process.argv;

if (!suraNumber || !sourcePath) {
  console.error('Usage: node scripts/import-cache.mjs <suraNumber> <sourceJsonPath>');
  process.exit(1);
}

const target = path.join(process.cwd(), 'data', 'api-cache', `sura_${suraNumber}.json`);
const raw = fs.readFileSync(sourcePath, 'utf-8');
const parsed = JSON.parse(raw);
fs.writeFileSync(target, JSON.stringify(parsed, null, 2), 'utf-8');
console.log(`Saved ${target}`);
