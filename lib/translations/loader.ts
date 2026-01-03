// Функции для загрузки переводов на табасаранском из JSON файлов

import { TabasaranTranslation } from '@/types/surah';
import fs from 'fs';
import path from 'path';

const translationsDir = path.join(process.cwd(), 'data', 'translations');

/**
 * Загружает перевод суры на табасаранском из JSON файла
 * Работает только на сервере (SSR)
 * @param suraNumber Номер суры
 */
export async function loadTabasaranTranslation(
  suraNumber: number
): Promise<TabasaranTranslation | null> {
  try {
    const filePath = path.join(translationsDir, `sura_${suraNumber}_tabasaran.json`);
    
    console.log(`[Sura ${suraNumber}] Attempting to load from: ${filePath}`);
    console.log(`[Sura ${suraNumber}] Working directory: ${process.cwd()}`);
    console.log(`[Sura ${suraNumber}] Translations dir: ${translationsDir}`);
    
    // Проверяем существование директории
    if (!fs.existsSync(translationsDir)) {
      console.error(`[Sura ${suraNumber}] Translations directory does not exist: ${translationsDir}`);
      return null;
    }

    // Проверяем существование файла
    if (!fs.existsSync(filePath)) {
      console.log(`[Sura ${suraNumber}] File not found: ${filePath}`);
      
      // Попробуем найти файл в директории
      const files = fs.readdirSync(translationsDir);
      const expectedFileName = `sura_${suraNumber}_tabasaran.json`;
      const foundFile = files.find(f => f === expectedFileName);
      
      console.log(`[Sura ${suraNumber}] Looking for: ${expectedFileName}`);
      console.log(`[Sura ${suraNumber}] Available files:`, files);
      console.log(`[Sura ${suraNumber}] Found match: ${foundFile || 'none'}`);
      
      return null;
    }

    const stats = fs.statSync(filePath);
    console.log(`[Sura ${suraNumber}] File size: ${stats.size} bytes`);

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log(`[Sura ${suraNumber}] Content length: ${fileContent.length} chars`);
    
    const translation: TabasaranTranslation = JSON.parse(fileContent);
    
    console.log(`[Sura ${suraNumber}] Successfully parsed JSON, ayahs: ${translation.ayahs?.length || 0}`);
    return translation;
  } catch (error) {
    console.error(`[Sura ${suraNumber}] Failed to load:`, {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    });
    return null;
  }
}

/**
 * Получает список всех доступных переводов
 * Работает только на сервере (SSR)
 */
export async function getAvailableTranslations(): Promise<number[]> {
  try {
    if (!fs.existsSync(translationsDir)) {
      console.error('Translations directory does not exist:', translationsDir);
      return [];
    }

    const files = fs.readdirSync(translationsDir);
    console.log('All files in translations directory:', files);
    const suraNumbers: number[] = [];

    for (const file of files) {
      const match = file.match(/sura_(\d+)_tabasaran\.json/);
      if (match) {
        const suraNum = parseInt(match[1], 10);
        suraNumbers.push(suraNum);
        console.log(`Found sura file: ${file} -> sura ${suraNum}`);
      } else {
        console.log(`Skipped file (does not match pattern): ${file}`);
      }
    }

    const sorted = suraNumbers.sort((a, b) => a - b);
    console.log('Available translations found:', sorted.length, 'suras:', sorted);
    console.log('Missing sura 78?', !sorted.includes(78));
    return sorted;
  } catch (error) {
    console.error('Failed to get available translations:', error instanceof Error ? error.message : String(error));
    return [];
  }
}

