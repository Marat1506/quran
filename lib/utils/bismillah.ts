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
  
  // Бисмиллях всегда имеет фиксированную длину - 38 символов
  // "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ " (включая пробел в конце)
  const bismillahLength = 38;
  
  // Если текст начинается с символов Бисмиллях, убираем их
  if (cleanedText.length > bismillahLength) {
    // Проверяем что текст действительно начинается с арабских символов Бисмиллях
    const possibleBismillah = cleanedText.substring(0, bismillahLength).trim();
    
    // Если в начале есть арабские символы "بِسْمِ" (начало Бисмиллях)
    if (possibleBismillah.startsWith('بِسْمِ')) {
      cleanedText = cleanedText.substring(bismillahLength).trim();
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