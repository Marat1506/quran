import fs from 'fs';
import path from 'path';

const API_BASE_URL = 'https://api.alquran.cloud/v1';
const AVAILABLE_SURAS = [1, 26, 39, 40, 47, 67, 69, 70, 71, 72, 76, 78, 89, 90, 94, 99, 100, 106, 111];
const cacheDir = path.join(process.cwd(), 'data', 'api-cache');

async function fetchSura(number) {
  const url = `${API_BASE_URL}/surah/${number}/editions/quran-uthmani,en.transliteration,ru.kuliev`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sura ${number}: HTTP ${response.status}`);
  }

  return response.json();
}

async function main() {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  for (const suraNumber of AVAILABLE_SURAS) {
    const filePath = path.join(cacheDir, `sura_${suraNumber}.json`);
    if (fs.existsSync(filePath)) {
      console.log(`Skip sura ${suraNumber}: cache already exists`);
      continue;
    }

    console.log(`Fetching sura ${suraNumber}...`);
    const data = await fetchSura(suraNumber);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    await new Promise((resolve) => setTimeout(resolve, 700));
  }

  console.log('API cache updated');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
