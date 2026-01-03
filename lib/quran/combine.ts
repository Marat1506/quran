// Функции для объединения данных из API и переводов

import { APIResponse } from '@/lib/api/quran';
import { TabasaranTranslation, Surah, Ayah } from '@/types/surah';
import { getStaticSuraInfo } from '@/lib/data/static-sura-info';

/**
 * Объединяет данные из API с переводом на табасаранском
 */
export function combineSuraData(
  apiResponse: APIResponse,
  tabasaranTranslation: TabasaranTranslation | null
): Surah {
  if (!apiResponse.data || apiResponse.data.length === 0) {
    throw new Error('No API data provided');
  }

  // Берем первую суру из ответа (арабский текст)
  const arabicSura = apiResponse.data.find(s => s.edition.identifier === 'quran-uthmani');
  if (!arabicSura) {
    throw new Error('Arabic text not found in API response');
  }

  // Ищем транслитерацию
  const transliterationSura = apiResponse.data.find(s => s.edition.identifier === 'en.transliteration');
  
  // Ищем русский перевод
  const russianSura = apiResponse.data.find(s => s.edition.identifier === 'ru.kuliev');

  // Создаем объединенные аяты
  const combinedAyahs: Ayah[] = arabicSura.ayahs.map((arabicAyah) => {
    const transliterationAyah = transliterationSura?.ayahs.find(a => a.numberInSurah === arabicAyah.numberInSurah);
    const russianAyah = russianSura?.ayahs.find(a => a.numberInSurah === arabicAyah.numberInSurah);
    const tabasaranAyah = tabasaranTranslation?.ayahs.find(a => a.ayahNumber === arabicAyah.numberInSurah);

    return {
      number: arabicAyah.number,
      text_arabic: arabicAyah.text,
      text_transliteration: transliterationAyah?.text || '',
      text_russian: russianAyah?.text || '',
      text_tabasaran: tabasaranAyah?.translation || '',
      numberInSurah: arabicAyah.numberInSurah,
      juz: arabicAyah.juz,
      manzil: arabicAyah.manzil,
      page: arabicAyah.page,
      ruku: arabicAyah.ruku,
      hizbQuarter: arabicAyah.hizbQuarter,
      sajda: arabicAyah.sajda,
    };
  });

  return {
    number: arabicSura.number,
    name: arabicSura.name,
    name_tabasaran: tabasaranTranslation?.suraName || '',
    englishName: arabicSura.englishName,
    englishNameTranslation: arabicSura.englishNameTranslation,
    revelationType: arabicSura.revelationType,
    numberOfAyahs: arabicSura.numberOfAyahs,
    ayahs: combinedAyahs,
  };
}

/**
 * Создает суру используя только статические данные и табасаранский перевод
 * Используется как fallback когда API недоступен
 */
export function createFallbackSura(
  suraNumber: number,
  tabasaranTranslation: TabasaranTranslation
): Surah {
  const staticInfo = getStaticSuraInfo(suraNumber);
  if (!staticInfo) {
    throw new Error(`No static info available for sura ${suraNumber}`);
  }

  // Создаем аяты только с табасаранским переводом
  const ayahs: Ayah[] = tabasaranTranslation.ayahs.map((tabasaranAyah) => ({
    number: tabasaranAyah.ayahNumber,
    text_arabic: '', // Арабский текст недоступен
    text_transliteration: '', // Транслитерация недоступна
    text_russian: '', // Русский перевод недоступен
    text_tabasaran: tabasaranAyah.translation,
    numberInSurah: tabasaranAyah.ayahNumber,
    juz: 0,
    manzil: 0,
    page: 0,
    ruku: 0,
    hizbQuarter: 0,
    sajda: false,
  }));

  return {
    number: staticInfo.number,
    name: staticInfo.name,
    name_tabasaran: tabasaranTranslation.suraName,
    englishName: staticInfo.englishName,
    englishNameTranslation: staticInfo.englishNameTranslation,
    revelationType: staticInfo.revelationType,
    numberOfAyahs: staticInfo.numberOfAyahs,
    ayahs: ayahs,
  };
}