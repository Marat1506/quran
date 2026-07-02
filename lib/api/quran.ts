// Серверные функции для получения данных из API

import { loadSuraFromCache, saveSuraToCache } from './quran-cache';

const API_BASE_URL = 'https://api.alquran.cloud/v1';

export interface APIResponse {
  code: number;
  status: string;
  data: SuraAPI[];
}

export interface SuraAPI {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: AyahAPI[];
  edition: EditionAPI;
}

export interface AyahAPI {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface EditionAPI {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
}

/**
 * Получает суру из внешнего API с указанными изданиями
 * @param number Номер суры (1-114)
 * @param editions Массив идентификаторов изданий
 */
export async function getSuraFromAPI(
  number: number,
  editions: string[] = ['quran-uthmani', 'en.transliteration', 'ru.kuliev']
): Promise<APIResponse> {
  if (number < 1 || number > 114) {
    throw new Error('Sura number must be between 1 and 114');
  }

  const cached = loadSuraFromCache(number);
  if (cached) {
    console.log(`Using cached API data for sura ${number}`);
    return cached;
  }

  const editionsStr = editions.join(',');
  const url = `${API_BASE_URL}/surah/${number}/editions/${editionsStr}`;

  const maxAttempts = 4;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (attempt > 1) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    } else {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    try {
      console.log(`Fetching from API (attempt ${attempt}/${maxAttempts}): ${url}`);

      const response = await fetch(url, {
        cache: "force-cache",
      });

      console.log(`API response status for sura ${number}: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error for sura ${number}: Status ${response.status}, Body: ${errorText}`);
        throw new Error(`API returned status ${response.status}: ${errorText}`);
      }

      const data: APIResponse = await response.json();
      console.log(`API success for sura ${number}: received ${data?.data?.length || 0} editions`);

      if (!data || !data.data || data.data.length === 0) {
        console.error(`API returned empty data for sura ${number}`);
        throw new Error(`API returned empty data for sura ${number}`);
      }

      saveSuraToCache(number, data);
      return data;
    } catch (error) {
      lastError = error;
      console.error(`Failed to fetch sura ${number} from API (attempt ${attempt}):`, error);
    }
  }

  console.error(`API error details:`, lastError instanceof Error ? lastError.message : String(lastError));
  throw lastError;
}

