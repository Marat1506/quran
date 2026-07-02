import fs from 'fs';
import path from 'path';

const [, , suraNumber] = process.argv;
if (!suraNumber) {
  console.error('Usage: node scripts/write-cache-from-stdin.mjs <suraNumber> < raw.json');
  process.exit(1);
}

const raw = fs.readFileSync(0, 'utf8').trim();
const parsed = JSON.parse(raw);
const target = path.join(process.cwd(), 'data', 'api-cache', `sura_${suraNumber}.json`);
fs.writeFileSync(target, JSON.stringify(parsed, null, 2), 'utf8');
console.log(`Wrote ${target}`);
