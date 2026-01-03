'use client';

import { useEffect, useState } from 'react';

interface DebugResult {
  timestamp: string;
  environment: string;
  availableTranslations: number[];
  loadTests: Record<number, {
    success: boolean;
    loadTime: number;
    ayahCount: number;
    suraName: string | null;
    fileSize: number;
    error?: string;
  }>;
  errors: string[];
}

export default function DebugPage() {
  const [result, setResult] = useState<DebugResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-suras');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Failed to run debug test:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTest();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Диагностика сур...</h1>
        <div className="animate-pulse">Загрузка...</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Ошибка диагностики</h1>
        <button 
          onClick={runTest}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Повторить тест
        </button>
      </div>
    );
  }

  const successCount = Object.values(result.loadTests).filter(test => test.success).length;
  const totalCount = Object.keys(result.loadTests).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Диагностика сур</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <p><strong>Время:</strong> {result.timestamp}</p>
        <p><strong>Среда:</strong> {result.environment}</p>
        <p><strong>Успешно загружено:</strong> {successCount} из {totalCount}</p>
        <p><strong>Доступные переводы:</strong> {result.availableTranslations.join(', ')}</p>
      </div>

      {result.errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Ошибки:</h2>
          <ul className="list-disc list-inside">
            {result.errors.map((error, index) => (
              <li key={index} className="text-red-700">{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Результаты загрузки по сурам:</h2>
        
        {Object.entries(result.loadTests).map(([suraNum, test]) => (
          <div 
            key={suraNum}
            className={`p-4 border rounded ${
              test.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">
                  Сура {suraNum} {test.success ? '✅' : '❌'}
                </h3>
                {test.success ? (
                  <div className="text-sm text-gray-600">
                    <p>Название: {test.suraName}</p>
                    <p>Аятов: {test.ayahCount}</p>
                    <p>Размер файла: {test.fileSize} байт</p>
                    <p>Время загрузки: {test.loadTime}мс</p>
                  </div>
                ) : (
                  <div className="text-sm text-red-600">
                    <p>Ошибка: {test.error || 'Неизвестная ошибка'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button 
          onClick={runTest}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Повторить тест
        </button>
      </div>
    </div>
  );
}