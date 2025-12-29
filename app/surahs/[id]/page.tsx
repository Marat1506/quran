import { notFound } from 'next/navigation';
import { getSurah } from '@/lib/quran/getSurah';
import { SurahContent } from '@/components/Quran/SurahContent';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const surahId = parseInt(id);

  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    return {
      title: 'Сура не найдена',
    };
  }

  try {
    const surah = await getSurah(surahId);
    return {
      title: `Сура ${surah.number} - ${surah.name} | Коран на табасаранском`,
      description: `Сура ${surah.number} "${surah.name}" с переводом на табасаранский язык. ${surah.numberOfAyahs} аятов.`,
    };
  } catch (error) {
    return {
      title: 'Ошибка загрузки суры',
    };
  }
}

export default async function SurahPage({ params }: Props) {
  const { id } = await params;
  const surahId = parseInt(id);

  // Валидация номера суры
  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    notFound();
  }

  let surah;
  try {
    surah = await getSurah(surahId);
  } catch (error) {
    console.error(`Failed to load sura ${surahId}:`, error);
    notFound();
  }

  return <SurahContent surah={surah} />;
}
