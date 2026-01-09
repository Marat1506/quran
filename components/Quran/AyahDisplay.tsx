'use client';

import { Ayah } from '@/types/surah';

interface Props {
  ayah: Ayah;
  suraNumber: number;
  showTransliteration?: boolean;
  showTabasaran?: boolean;
}

export function AyahDisplay({ 
  ayah, 
  suraNumber,
  showTransliteration = true, 
  showTabasaran = true 
}: Props) {
  const isBismillah = ayah.numberInSurah === 0;

  return (
    <div className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
      {/* Номер аята (убираем заголовок для Бисмиллях) */}
      {!isBismillah && (
        <div className="flex items-center mb-3">
          <span className="text-sm text-gray-600 font-medium">
            {suraNumber}:{ayah.numberInSurah}
          </span>
        </div>
      )}

      {/* Арабский текст */}
      <div className="mb-3 text-right">
        <div 
          className="text-2xl leading-relaxed text-gray-900"
          dir="rtl"
          style={{ fontFamily: "'Amiri', 'Times New Roman', serif" }}
        >
          {ayah.text_arabic}
        </div>
      </div>

      {/* Транслитерация */}
      {showTransliteration && ayah.text_transliteration && (
        <div className="mb-2">
          <p className="text-base italic text-gray-600 leading-relaxed">
            {ayah.text_transliteration}
          </p>
        </div>
      )}

      {/* Перевод на табасаранский */}
      {showTabasaran && ayah.text_tabasaran && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 italic mb-1">
            Альберт Гьяжикъаибов
          </p>
          <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-black">
            <p className="text-base leading-relaxed text-gray-900 font-medium">
              {ayah.text_tabasaran}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

