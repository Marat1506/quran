'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Surah } from '@/types/surah';
import { AyahDisplay } from './AyahDisplay';

export function SurahContent({ surah }: { surah: Surah }) {
  const [showTransliteration, setShowTransliteration] = useState(true);
  const showTabasaran = true; // Табасаранский перевод всегда включен

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-1 py-4">
        {/* Breadcrumbs */}
        <nav className="mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Link href="/" className="hover:text-black">
              Главная
            </Link>
            <span>/</span>
            <span className="text-black">Сура {surah.number}</span>
          </div>
        </nav>

        {/* Заголовок суры */}
        <div className="text-center mb-6 p-4 bg-gray-50 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">
            {surah.name}
          </h1>
          {surah.name_tabasaran && (
            <h2 className="text-xl mb-2 text-gray-700">
              {surah.name_tabasaran}
            </h2>
          )}
          <p className="text-base text-gray-600 mb-3">
            {surah.englishName} - {surah.englishNameTranslation}
          </p>
          <div className="flex justify-center gap-4 flex-wrap text-xs text-gray-600">
            <span>Сура {surah.number}</span>
            <span>
              {surah.revelationType === 'Meccan' ? 'Мекканская' : 'Мединская'}
            </span>
            <span>{surah.numberOfAyahs} аятов</span>
          </div>
        </div>

        {/* Переключатель транслитерации */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg flex flex-wrap gap-4 items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showTransliteration}
              onChange={(e) => setShowTransliteration(e.target.checked)}
              className="mr-2 w-4 h-4"
            />
            <span className="text-sm font-medium">Транслитерация</span>
          </label>
        </div>

        {/* Аяты */}
        <div>
          {surah.ayahs.map((ayah) => (
            <AyahDisplay
              key={ayah.number}
              ayah={ayah}
              showTransliteration={showTransliteration}
              showTabasaran={showTabasaran}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

