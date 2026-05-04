import MetadataRoute from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hermes-agent-blog.vercel.app'
  
  const posts = [
    '/posts/day-1-start',
    '/posts/day-2-agent-architecture',
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...posts.map((post) => ({
      url: baseUrl + post,
      lastModified: new Date('2024-05-04'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
