import { NextResponse } from 'next/server';
import { loadTabasaranTranslation, getAvailableTranslations } from '@/lib/translations/loader';

export async function GET() {
  const results = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    availableTranslations: [] as number[],
    loadTests: {} as Record<number, any>,
    errors: [] as string[]
  };

  try {
    // Получаем список доступных переводов
    results.availableTranslations = await getAvailableTranslations();
    
    // Тестируем загрузку каждой суры
    const testSuras = [1, 39, 40, 47, 70, 72, 76, 78, 89, 94, 99, 100, 111];
    
    for (const suraNum of testSuras) {
      try {
        const startTime = Date.now();
        const translation = await loadTabasaranTranslation(suraNum);
        const loadTime = Date.now() - startTime;
        
        results.loadTests[suraNum] = {
          success: !!translation,
          loadTime: loadTime,
          ayahCount: translation?.ayahs?.length || 0,
          suraName: translation?.suraName || null,
          fileSize: translation ? JSON.stringify(translation).length : 0
        };
      } catch (error) {
        results.loadTests[suraNum] = {
          success: false,
          error: error.message,
          loadTime: -1
        };
        results.errors.push(`Sura ${suraNum}: ${error.message}`);
      }
    }
    
  } catch (error) {
    results.errors.push(`General error: ${error.message}`);
  }

  return NextResponse.json(results, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
  });
}