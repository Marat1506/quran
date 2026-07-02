import fs from 'fs';
import path from 'path';
import type { APIResponse } from './quran';

const cacheDir = path.join(process.cwd(), 'data', 'api-cache');

function getCachePath(suraNumber: number): string {
  return path.join(cacheDir, `sura_${suraNumber}.json`);
}

export function loadSuraFromCache(suraNumber: number): APIResponse | null {
  try {
    const filePath = getCachePath(suraNumber);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as APIResponse;
  } catch (error) {
    console.error(`Failed to load API cache for sura ${suraNumber}:`, error);
    return null;
  }
}

export function saveSuraToCache(suraNumber: number, data: APIResponse): void {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  fs.writeFileSync(getCachePath(suraNumber), JSON.stringify(data, null, 2), 'utf-8');
}
