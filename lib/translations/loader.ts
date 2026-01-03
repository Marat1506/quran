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
    
    // Проверяем существование файла
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const translation: TabasaranTranslation = JSON.parse(fileContent);
    
    return translation;
  } catch {
    // В production может быть ошибка, если файл не найден - это нормально
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
    console.error('Failed to get available translations:', error);
    return [];
  }
}

