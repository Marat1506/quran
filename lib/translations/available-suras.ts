// Статический список доступных сур с переводом на табасаранский
// Этот список нужно обновлять при добавлении новых переводов

export const AVAILABLE_SURAS = [
  1, 39, 40, 47, 70, 72, 76, 78, 89, 94, 99, 100, 111
] as const;

export type AvailableSuraNumber = typeof AVAILABLE_SURAS[number];

/**
 * Проверяет, доступна ли сура с переводом на табасаранский
 */
export function isSuraAvailable(suraNumber: number): suraNumber is AvailableSuraNumber {
  return AVAILABLE_SURAS.includes(suraNumber as AvailableSuraNumber);
}

/**
 * Получает список всех доступных сур
 * Эта функция работает как на сервере, так и на клиенте
 */
export function getAvailableSuras(): number[] {
  return [...AVAILABLE_SURAS];
}