// Серверные функции для получения данных из API

const API_BASE_URL = 'https://api.alquran.cloud/v1';

export interface APIResponse {
  code: number;
  status: string;
  data: SuraAPI[];
}

export interface SuraAPI {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: AyahAPI[];
  edition: EditionAPI;
}

export interface AyahAPI {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface EditionAPI {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
}

/**
 * Получает суру из внешнего API с указанными изданиями
 * @param number Номер суры (1-114)
 * @param editions Массив идентификаторов изданий
 */
export async function getSuraFromAPI(
  number: number,
  editions: string[] = ['quran-uthmani', 'en.transliteration', 'ru.kuliev']
): Promise<APIResponse> {
  if (number < 1 || number > 114) {
    throw new Error('Sura number must be between 1 and 114');
  }

  const editionsStr = editions.join(',');
  const url = `${API_BASE_URL}/surah/${number}/editions/${editionsStr}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Кешируем на 1 час
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data: APIResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch sura ${number} from API:`, error);
    throw error;
  }
}

