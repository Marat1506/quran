import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://quran-bice-ten.vercel.app'
  
  // Список доступных сур
  const availableSurahs = [40, 47, 70, 72, 78]
  
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
    {
      url: `${baseUrl}/surahs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...surahPages,
  ]
}