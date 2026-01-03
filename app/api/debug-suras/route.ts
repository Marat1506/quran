import { NextResponse } from 'next/server';
import { loadTabasaranTranslation, getAvailableTranslations } from '@/lib/translations/loader';
import { getAvailableSuras } from '@/lib/translations/available-suras';

export async function GET() {
  const results = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    availableTranslations: [] as number[],
    loadTests: {} as Record<number, any>,
    errors: [] as string[]
  };

  try {
    // Получаем список доступных переводов из статического списка и из файловой системы
    const staticSuras = getAvailableSuras();
    let dynamicSuras: number[] = [];
    
    try {
      dynamicSuras = await getAvailableTranslations();
    } catch (error) {
      console.warn('Failed to get dynamic translations list:', error);
    }
    
    results.availableTranslations = staticSuras;
    
    // Тестируем загрузку каждой суры из статического списка
    const testSuras = staticSuras;
    
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
        const errorMessage = error instanceof Error ? error.message : String(error);
        results.loadTests[suraNum] = {
          success: false,
          error: errorMessage,
          loadTime: -1
        };
        results.errors.push(`Sura ${suraNum}: ${errorMessage}`);
      }
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    results.errors.push(`General error: ${errorMessage}`);
  }

  return NextResponse.json(results, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
  });
}