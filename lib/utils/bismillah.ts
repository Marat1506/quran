// Утилиты для работы с Бисмиллях

// Различные варианты написания Бисмиллях в API (только арабский)
const BISMILLAH_PATTERNS = [
  'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', // Точно как в твоем примере
  'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',   // Стандартный вариант
  'بسم الله الرحمن الرحيم',                // Без диакритики
];

/**
 * Проверяет, нужно ли добавлять Бисмиллях для данной суры
 * Бисмиллях добавляется для всех сур кроме 1-й (Фатиха) и 9-й (Тауба)
 */
export function shouldAddBismillah(suraNumber: number): boolean {
  return suraNumber !== 1 && suraNumber !== 9;
}

/**
 * Убирает Бисмиллях из начала арабского текста
 * Используется для первого аята сур, где API включает Бисмиллях в текст аята
 */
export function removeBismillahFromText(text: string): string {
  if (!text) return text;
  
  let cleanedText = text.trim();
  
  // Извлекаем точный паттерн из реального текста API
  // Ищем первое слово после Бисмиллях - "تَنزِيلُ"
  const afterBismillahIndex = cleanedText.indexOf('تَنزِيلُ');
  
  if (afterBismillahIndex > 0) {
    // Если нашли "تَنزِيلُ", значит до него был Бисмиллях
    cleanedText = cleanedText.substring(afterBismillahIndex).trim();
    return cleanedText;
  }
  
  // Альтернативный способ - ищем другие характерные слова после Бисмиллях
  const commonWordsAfterBismillah = [
    'تَنزِيلُ', // Сура 39
    'حم',      // Суры начинающиеся с Хам
    'الم',     // Суры начинающиеся с Алиф-лам-мим
    'قُلْ',    // Суры начинающиеся с "Скажи"
    'يَا',     // Суры начинающиеся с "О"
    'إِذَا',   // Суры начинающиеся с "Когда"
    'وَ',      // Суры начинающиеся с "И"
  ];
  
  for (const word of commonWordsAfterBismillah) {
    const wordIndex = cleanedText.indexOf(word);
    if (wordIndex > 0) {
      cleanedText = cleanedText.substring(wordIndex).trim();
      return cleanedText;
    }
  }
  
  return cleanedText;
}

/**
 * Убирает Бисмиллях из транслитерации (не трогаем, оставляем как есть)
 */
export function removeBismillahFromTransliteration(text: string): string {
  // Для транслитерации ничего не делаем, так как API не включает туда Бисмиллях
  return text;
}

/**
 * Убирает Бисмиллях из русского перевода (не трогаем, оставляем как есть)
 */
export function removeBismillahFromRussian(text: string): string {
  // Для русского перевода ничего не делаем, так как API не включает туда Бисмиллях
  return text;
}