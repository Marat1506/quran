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
  // Получаем данные из API
  const apiResponse = await getSuraFromAPI(number);

  // Загружаем перевод на табасаранском
  const tabasaranTranslation = await loadTabasaranTranslation(number);

  // Объединяем данные
  return combineSuraData(apiResponse, tabasaranTranslation);
}

