// Статическая информация о сурах для случаев, когда API недоступен

export interface StaticSuraInfo {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
}

export const STATIC_SURA_INFO: Record<number, StaticSuraInfo> = {
  1: {
    number: 1,
    name: "الفاتحة",
    englishName: "Al-Faatiha",
    englishNameTranslation: "The Opening",
    revelationType: "Meccan",
    numberOfAyahs: 7
  },
  39: {
    number: 39,
    name: "الزمر",
    englishName: "Az-Zumar",
    englishNameTranslation: "The Groups",
    revelationType: "Meccan",
    numberOfAyahs: 75
  },
  40: {
    number: 40,
    name: "غافر",
    englishName: "Ghafir",
    englishNameTranslation: "The Forgiver",
    revelationType: "Meccan",
    numberOfAyahs: 85
  },
  47: {
    number: 47,
    name: "محمد",
    englishName: "Muhammad",
    englishNameTranslation: "Muhammad",
    revelationType: "Medinan",
    numberOfAyahs: 38
  },
  70: {
    number: 70,
    name: "المعارج",
    englishName: "Al-Ma'arij",
    englishNameTranslation: "The Ascending Stairways",
    revelationType: "Meccan",
    numberOfAyahs: 44
  },
  72: {
    number: 72,
    name: "الجن",
    englishName: "Al-Jinn",
    englishNameTranslation: "The Jinn",
    revelationType: "Meccan",
    numberOfAyahs: 28
  },
  76: {
    number: 76,
    name: "الإنسان",
    englishName: "Al-Insaan",
    englishNameTranslation: "The Man",
    revelationType: "Medinan",
    numberOfAyahs: 31
  },
  78: {
    number: 78,
    name: "النبأ",
    englishName: "An-Naba",
    englishNameTranslation: "The Tidings",
    revelationType: "Meccan",
    numberOfAyahs: 40
  },
  89: {
    number: 89,
    name: "الفجر",
    englishName: "Al-Fajr",
    englishNameTranslation: "The Dawn",
    revelationType: "Meccan",
    numberOfAyahs: 30
  },
  94: {
    number: 94,
    name: "الشرح",
    englishName: "Ash-Sharh",
    englishNameTranslation: "The Relief",
    revelationType: "Meccan",
    numberOfAyahs: 8
  },
  99: {
    number: 99,
    name: "الزلزلة",
    englishName: "Az-Zalzala",
    englishNameTranslation: "The Earthquake",
    revelationType: "Medinan",
    numberOfAyahs: 8
  },
  100: {
    number: 100,
    name: "العاديات",
    englishName: "Al-Aadiyaat",
    englishNameTranslation: "The Courser",
    revelationType: "Meccan",
    numberOfAyahs: 11
  },
  111: {
    number: 111,
    name: "المسد",
    englishName: "Al-Masad",
    englishNameTranslation: "The Palm Fibre",
    revelationType: "Meccan",
    numberOfAyahs: 5
  }
};

export function getStaticSuraInfo(number: number): StaticSuraInfo | null {
  return STATIC_SURA_INFO[number] || null;
}