// Функции для объединения данных из API с переводами на табасаранском

import { Surah, Ayah } from '@/types/surah';
import { APIResponse, SuraAPI, AyahAPI } from '@/lib/api/quran';
import { TabasaranTranslation } from '@/types/surah';

/**
 * Объединяет данные из API с переводами на табасаранском
 */
export function combineSuraData(
  apiResponse: APIResponse,
  tabasaranTranslation: TabasaranTranslation | null
): Surah {
  if (apiResponse.data.length === 0) {
    throw new Error('No data received from API');
  }

  // Берем первую суру из API (она содержит основную информацию)
  const mainSura = apiResponse.data[0];

  // Создаем карты для разных изданий
  const arabicMap = new Map<number, string>();
  const transliterationMap = new Map<number, string>();
  const russianMap = new Map<number, string>();

  // Заполняем карты данными из API
  for (const sura of apiResponse.data) {
    for (const ayah of sura.ayahs) {
      switch (sura.edition.identifier) {
        case 'quran-uthmani':
          arabicMap.set(ayah.numberInSurah, ayah.text);
          break;
        case 'en.transliteration':
          transliterationMap.set(ayah.numberInSurah, ayah.text);
          break;
        case 'ru.kuliev':
          russianMap.set(ayah.numberInSurah, ayah.text);
          break;
      }
    }
  }

  // Создаем карту переводов на табасаранском
  const tabasaranMap = new Map<number, string>();
  if (tabasaranTranslation) {
    for (const ayahTranslation of tabasaranTranslation.ayahs) {
      tabasaranMap.set(ayahTranslation.ayahNumber, ayahTranslation.translation);
    }
  }

  // Создаем объединенные аяты
  const combinedAyahs: Ayah[] = [];

  // Константа для Бисмилляхи
  const bismillah = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

  // Добавляем Бисмилляхи как отдельный аят (номер 0), если есть перевод
  if (tabasaranMap.has(0)) {
    const firstAyah = mainSura.ayahs[0];
    combinedAyahs.push({
      number: 0,
      text_arabic: bismillah,
      text_transliteration: 'Bismillahir-Rahmanir-Rahim',
      text_russian: 'Во имя Аллаха, Милостивого, Милосердного!',
      text_tabasaran: tabasaranMap.get(0) || '',
      numberInSurah: 0,
      juz: firstAyah.juz,
      manzil: firstAyah.manzil,
      page: firstAyah.page,
      ruku: firstAyah.ruku,
      hizbQuarter: firstAyah.hizbQuarter,
      sajda: false,
    });
  }

  // Обрабатываем остальные аяты
  for (const ayah of mainSura.ayahs) {
    const arabicText = arabicMap.get(ayah.numberInSurah) || '';
    const transliterationText = transliterationMap.get(ayah.numberInSurah) || '';
    const russianText = russianMap.get(ayah.numberInSurah) || '';

    // Если это первый аят и он содержит Бисмилляхи, удаляем её из начала арабского текста и транслитерации
    let processedArabicText = arabicText;
    let processedTransliterationText = transliterationText;
    
    if (ayah.numberInSurah === 1) {
      // Бисмилляхи всегда в начале первого аята (кроме суры 9)
      // Длина Бисмилляхи: 38 символов
      const bismillahLength = 38;
      const bismillahTransliteration = 'Bismillahir-Rahmanir-Rahim';
      const bismillahTransliterationLength = bismillahTransliteration.length;
      
      // Удаляем первые 38 символов (Бисмилляхи) с начала арабского текста
      const trimmedArabic = arabicText.trim();
      if (trimmedArabic.length > bismillahLength) {
        // Удаляем Бисмилляхи и пробелы после неё
        processedArabicText = trimmedArabic.substring(bismillahLength).trim();
      }
      
      // Удаляем Бисмилляхи из начала транслитерации
      const trimmedTransliteration = transliterationText.trim();
      if (trimmedTransliteration.length > bismillahTransliterationLength) {
        // Проверяем, что начинается с Бисмилляхи
        if (trimmedTransliteration.startsWith(bismillahTransliteration)) {
          processedTransliterationText = trimmedTransliteration
            .substring(bismillahTransliterationLength)
            .trim()
            .replace(/^\s*-\s*/, '') // Убираем дефис в начале, если остался
            .trim();
        }
      }
    }

    combinedAyahs.push({
      number: ayah.number,
      text_arabic: processedArabicText,
      text_transliteration: processedTransliterationText,
      text_russian: russianText,
      text_tabasaran: tabasaranMap.get(ayah.numberInSurah) || '',
      numberInSurah: ayah.numberInSurah,
      juz: ayah.juz,
      manzil: ayah.manzil,
      page: ayah.page,
      ruku: ayah.ruku,
      hizbQuarter: ayah.hizbQuarter,
      sajda: ayah.sajda,
    });
  }

  return {
    number: mainSura.number,
    name: mainSura.name,
    name_tabasaran: tabasaranTranslation?.suraName || '',
    englishName: mainSura.englishName,
    englishNameTranslation: mainSura.englishNameTranslation,
    revelationType: mainSura.revelationType,
    numberOfAyahs: mainSura.numberOfAyahs,
    ayahs: combinedAyahs,
  };
}

