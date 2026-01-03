// Главная функция для получения суры с объединенными данными

import { getSuraFromAPI } from '@/lib/api/quran';
import { loadTabasaranTranslation } from '@/lib/translations/loader';
import { combineSuraData, createFallbackSura } from '@/lib/quran/combine';
import { Surah } from '@/types/surah';
import { getAvailableSuras, isSuraAvailable } from '@/lib/translations/available-suras';

/**
 * Получает суру с объединенными данными из API и переводов
 * @param number Номер суры (1-114)
 */
export async function getSurah(number: number): Promise<Surah> {
  try {
    // Проверяем доступность суры
    if (!isSuraAvailable(number)) {
      throw new Error(`Sura ${number} is not available in Tabasaran translation yet`);
    }

    // Загружаем перевод на табасаранском
    const tabasaranTranslation = await loadTabasaranTranslation(number);

    if (!tabasaranTranslation) {
      throw new Error(`No Tabasaran translation found for sura ${number}`);
    }

    // Пытаемся получить данные из API
    try {
      const apiResponse = await getSuraFromAPI(number);
      return combineSuraData(apiResponse, tabasaranTranslation);
    } catch (apiError) {
      console.warn(`API failed for sura ${number}, using fallback data:`, apiError);
      // Используем fallback данные если API недоступен
      return createFallbackSura(number, tabasaranTranslation);
    }
  } catch (error) {
    console.error(`Failed to load sura ${number}:`, error);
    throw error;
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