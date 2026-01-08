// Статический список доступных сур с переводом на табасаранский
// Этот список нужно обновлять при добавлении новых переводов

export const AVAILABLE_SURAS = [
//  40
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