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
  // Проверяем доступность суры
  if (!isSuraAvailable(number)) {
    throw new Error(`Sura ${number} is not available in Tabasaran translation yet`);
  }

  // Загружаем перевод на табасаранском
  const tabasaranTranslation = await loadTabasaranTranslation(number);

  if (!tabasaranTranslation) {
    throw new Error(`No Tabasaran translation found for sura ${number}`);
  }

  // Всегда получаем данные из API - без fallback
  const apiResponse = await getSuraFromAPI(number);
  
  if (!apiResponse || !apiResponse.data || apiResponse.data.length === 0) {
    throw new Error(`API returned empty data for sura ${number}`);
  }

  return combineSuraData(apiResponse, tabasaranTranslation);
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