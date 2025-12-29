// Типы для работы с сурами Корана

export interface Surah {
  number: number;
  name: string;
  name_tabasaran: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

export interface Ayah {
  number: number;
  text_arabic: string;
  text_transliteration: string;
  text_russian: string;
  text_tabasaran: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

// Типы для API ответа
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

// Типы для переводов на табасаранском
export interface TabasaranTranslation {
  suraNumber: number;
  suraName: string;
  ayahs: {
    ayahNumber: number;
    translation: string;
  }[];
}

