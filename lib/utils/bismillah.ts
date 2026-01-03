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
  
  // Проверяем все возможные варианты Бисмиллях
  for (const pattern of BISMILLAH_PATTERNS) {
    if (cleanedText.startsWith(pattern)) {
      // Убираем Бисмиллях и возможные пробелы после него
      cleanedText = cleanedText.substring(pattern.length).trim();
      return cleanedText;
    }
  }
  
  // Если точное совпадение не найдено, используем более гибкий подход
  // Бисмиллях всегда начинается с "بِسْمِ" и имеет примерно 38-40 символов
  if (cleanedText.startsWith('بِسْمِ')) {
    // Ищем конец Бисмиллях - он заканчивается на "الرَّحِيمِ" или "ٱلرَّحِيمِ"
    const endPatterns = ['الرَّحِيمِ', 'ٱلرَّحِيمِ', 'الرحيم'];
    
    for (const endPattern of endPatterns) {
      const endIndex = cleanedText.indexOf(endPattern);
      if (endIndex > 0) {
        // Убираем Бисмиллях включая найденное окончание
        cleanedText = cleanedText.substring(endIndex + endPattern.length).trim();
        return cleanedText;
      }
    }
    
    // Если не нашли окончание, используем фиксированную длину (38 символов)
    if (cleanedText.length > 38) {
      cleanedText = cleanedText.substring(38).trim();
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