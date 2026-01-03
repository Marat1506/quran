// Главная функция для получения суры с объединенными данными

import { getSuraFromAPI } from '@/lib/api/quran';
import { loadTabasaranTranslation } from '@/lib/translations/loader';
import { combineSuraData } from '@/lib/quran/combine';
import { Surah } from '@/types/surah';
import { getAvailableSuras, isSuraAvailable } from '@/lib/translations/available-suras';

/**
 * Получает суру с объединенными данными из API и переводов
 * @param number Номер суры (1-114)
 */
export async function getSurah(number: number): Promise<Surah> {
  console.log(`getSurah called for sura ${number}`);
  
  // Проверяем доступность суры
  if (!isSuraAvailable(number)) {
    console.error(`Sura ${number} is not in available list`);
    throw new Error(`Sura ${number} is not available in Tabasaran translation yet`);
  }

  // Загружаем перевод на табасаранском
  console.log(`Loading Tabasaran translation for sura ${number}...`);
  const tabasaranTranslation = await loadTabasaranTranslation(number);

  if (!tabasaranTranslation) {
    console.error(`No Tabasaran translation file found for sura ${number}`);
    throw new Error(`No Tabasaran translation found for sura ${number}`);
  }
  console.log(`Tabasaran translation loaded for sura ${number}`);

  // Всегда получаем данные из API - без fallback
  console.log(`Fetching API data for sura ${number}...`);
  try {
    const apiResponse = await getSuraFromAPI(number);
    console.log(`API response received for sura ${number}, data length: ${apiResponse?.data?.length || 0}`);
    
    if (!apiResponse || !apiResponse.data || apiResponse.data.length === 0) {
      console.error(`API returned empty data for sura ${number}`);
      throw new Error(`API returned empty data for sura ${number}`);
    }

    console.log(`Combining data for sura ${number}...`);
    return combineSuraData(apiResponse, tabasaranTranslation);
  } catch (apiError) {
    console.error(`API error for sura ${number}:`, apiError);
    console.error('API error details:', apiError instanceof Error ? apiError.message : String(apiError));
    throw apiError;
  }
}


/**
 * Получает список доступных сур с табасаранским переводом
 */
export function getAvailableSuraNumbers(): number[] {
  return getAvailableSuras();
}

/**
 * Проверяет, доступна ли сура с табасаранским переводом
 */
export function isSuraAvailableForTranslation(number: number): boolean {
  return isSuraAvailable(number);
}