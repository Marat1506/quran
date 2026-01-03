import { getAvailableSuraNumbers } from '@/lib/quran/getSurah';
import Link from 'next/link';

export default function AvailableSurasPage() {
  const availableSuras = getAvailableSuraNumbers();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Доступные суры с табасаранским переводом</h1>
      
      <div className="mb-4">
        <p className="text-gray-600">
          Всего доступно: <strong>{availableSuras.length}</strong> из 114 сур
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableSuras.map(suraNumber => (
          <Link
            key={suraNumber}
            href={`/surahs/${suraNumber}`}
            className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="font-semibold">Сура {suraNumber}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Информация</h2>
        <p className="text-sm text-gray-700">
          Переводы на табасаранский язык добавляются постепенно. 
          Если нужной суры нет в списке, она будет добавлена в ближайшее время.
        </p>
      </div>
    </div>
  );
}