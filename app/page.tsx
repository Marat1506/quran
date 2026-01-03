import Link from "next/link";
import { getAvailableTranslations, loadTabasaranTranslation } from "@/lib/translations/loader";
import { getSuraFromAPI } from "@/lib/api/quran";

export const metadata = {
  title: "Суры Корана - Коран на табасаранском",
  description: "Список всех доступных сур Корана с переводом на табасаранский язык",
};

export default async function Home() {
  // Получаем список доступных переводов
  const availableSuras = await getAvailableTranslations();

  // Для каждой суры получаем базовую информацию из API и перевод
  // Используем Promise.allSettled вместо Promise.all, чтобы ошибка одной суры не блокировала остальные
  const surahsListResults = await Promise.allSettled(
    availableSuras.map(async (suraNumber) => {
      const apiResponse = await getSuraFromAPI(suraNumber, ['quran-uthmani']);
      if (!apiResponse.data || apiResponse.data.length === 0) {
        throw new Error(`No data received for sura ${suraNumber}`);
      }
      const sura = apiResponse.data[0];
      const tabasaranTranslation = await loadTabasaranTranslation(suraNumber);
      return {
        number: sura.number,
        name: sura.name,
        nameTabasaran: tabasaranTranslation?.suraName || '',
        englishName: sura.englishName,
        englishNameTranslation: sura.englishNameTranslation,
      };
    })
  );

  // Обрабатываем результаты и логируем ошибки
  const surahsList = surahsListResults.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      const suraNumber = availableSuras[index];
      console.error(`Failed to fetch sura ${suraNumber}:`, result.reason);
      return null;
    }
  });

  const validSurahs = surahsList.filter((s) => s !== null);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-1 py-4">
        {/* Заголовок */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Суры Корана
          </h1>
          <p className="text-base text-gray-600">
            Доступные суры с переводом на табасаранский язык
          </p>
        </div>

        {/* Список сур */}
        {validSurahs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {validSurahs.map((surah) => (
              <Link
                key={surah.number}
                href={`/surahs/${surah.number}`}
                className="block p-3 border-2 border-gray-200 rounded-lg hover:border-black hover:shadow-md transition-all cursor-pointer"
              >
                <div className="mb-1">
                  <span className="text-xs text-gray-600">Сура {surah.number}</span>
                </div>
                <h2 className="text-lg font-bold mb-1 text-black">
                  {surah.name}
                </h2>
                {surah.nameTabasaran && (
                  <p className="text-sm text-gray-700 mt-1">
                    {surah.nameTabasaran}
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Пока нет доступных сур с переводом на табасаранский язык.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
