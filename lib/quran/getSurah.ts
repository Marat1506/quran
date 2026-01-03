// Главная функция для получения суры с объединенными данными

import { getSuraFromAPI } from '@/lib/api/quran';
import { loadTabasaranTranslation } from '@/lib/translations/loader';
import { combineSuraData } from '@/lib/quran/combine';
import { Surah } from '@/types/surah';

/**
 * Получает суру с объединенными данными из API и переводов
 * @param number Номер суры (1-114)
 */
export async function getSurah(number: number): Promise<Surah> {
  try {
    // Список доступных сур
    const availableSuras = [1, 39, 40, 47, 70, 72, 76, 78, 89, 94, 99, 100, 111];
    
    if (!availableSuras.includes(number)) {
      throw new Error(`Sura ${number} is not available in Tabasaran translation yet`);
    }

    // Получаем данные из API
    const apiResponse = await getSuraFromAPI(number);

    // Загружаем перевод на табасаранском
    const tabasaranTranslation = await loadTabasaranTranslation(number);

    if (!tabasaranTranslation) {
      console.warn(`No Tabasaran translation found for sura ${number}, using API data only`);
    }

    // Объединяем данные
    return combineSuraData(apiResponse, tabasaranTranslation);
  } catch (error) {
    console.error(`Failed to load sura ${number}:`, error);
    throw error;
  }
}


/**
 * Получает список доступных сур с табасаранским переводом
 */
export function getAvailableSuraNumbers(): number[] {
  return [1, 39, 40, 47, 70, 72, 76, 78, 89, 94, 99, 100, 111];
}

/**
 * Проверяет, доступна ли сура с табасаранским переводом
 */
export function isSuraAvailable(number: number): boolean {
  return getAvailableSuraNumbers().includes(number);
}