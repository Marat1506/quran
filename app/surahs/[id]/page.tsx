import { notFound } from 'next/navigation';
import { getSurah } from '@/lib/quran/getSurah';
import { SurahContent } from '@/components/Quran/SurahContent';
import { Metadata } from 'next';
import { getAvailableSuras } from '@/lib/translations/available-suras';

interface Props {
  params: Promise<{ id: string }>;
}

// Генерируем статические пути для всех доступных сур
export async function generateStaticParams() {
  const availableSuras = getAvailableSuras();
  console.log('generateStaticParams: Available suras:', availableSuras);
  console.log('generateStaticParams: Includes sura 111?', availableSuras.includes(111));
  
  const params = availableSuras.map((suraNumber) => ({
    id: suraNumber.toString(),
  }));
  
  console.log('generateStaticParams: Generated params:', params.map(p => p.id));
  return params;
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
    console.error(`Invalid sura ID: ${id}`);
    notFound();
  }

  let surah;
  try {
    console.log(`Loading sura ${surahId}...`);
    surah = await getSurah(surahId);
    console.log(`Successfully loaded sura ${surahId}`);
  } catch (error) {
    console.error(`Failed to load sura ${surahId}:`, error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    notFound();
  }

  return <SurahContent surah={surah} />;
}
