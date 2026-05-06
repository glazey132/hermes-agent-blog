import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hermes-agent-blog.vercel.app'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1 as const,
    },
    {
      url: `${baseUrl}/posts/day-10-getting-started-ai-agents`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7 as const,
    },
    {
      url: `${baseUrl}/posts/day-9-memory-implementation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8 as const,
    },
    {
      url: `${baseUrl}/posts/day-8-why-ai-agents-matter`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7 as const,
    },
    {
      url: `${baseUrl}/posts/day-7-ai-agentic-examples`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8 as const,
    },
    {
      url: `${baseUrl}/posts/day-6-how-ai-agents-work`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7 as const,
    },
    {
      url: `${baseUrl}/posts/day-5-planning-engine`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8 as const,
    },
    {
      url: `${baseUrl}/posts/day-4-integration-framework`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8 as const,
    },
    {
      url: `${baseUrl}/posts/day-3-memory-system`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8 as const,
    },
    {
      url: `${baseUrl}/posts/day-2-agent-architecture`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7 as const,
    },
    {
      url: `${baseUrl}/posts/day-1-start`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6 as const,
    },
  ]
}
