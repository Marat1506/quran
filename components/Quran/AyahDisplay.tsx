'use client';

import { Ayah } from '@/types/surah';

interface Props {
  ayah: Ayah;
  showTransliteration?: boolean;
  showTabasaran?: boolean;
}

export function AyahDisplay({ 
  ayah, 
  showTransliteration = true, 
  showTabasaran = true 
}: Props) {
  return (
    <div className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
      {/* Номер аята */}
      {ayah.numberInSurah !== 0 && (
        <div className="flex items-center mb-3">
          <span className="inline-block px-2 py-1 mr-2 text-xs font-semibold text-white bg-black rounded">
            {ayah.numberInSurah}
          </span>
          <span className="text-xs text-gray-600">
            Аят {ayah.numberInSurah}
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
            Альберт Гаджикаибов
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

