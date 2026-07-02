import { MetadataRoute } from 'next'
import { getAvailableSuras } from '@/lib/translations/available-suras'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://qurantabasaran.ru'
  const availableSurahs = getAvailableSuras()
  
  const surahPages = availableSurahs.map((id) => ({
    url: `${baseUrl}/surahs/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...surahPages,
  ]
}