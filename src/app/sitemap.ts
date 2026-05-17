import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const hostname = 'https://hermes-agent-blog.vercel.app'
  const baseUrl = 'https://hermes-agent-blog.vercel.app'

  // Published blog post slugs from src/lib/posts.ts
  const publishedPosts = [
    "day-7-styling-improvements",
    "day-8-ai-agent-recommendation-engine",
    "day-9-self-reflection",
    "day-10-getting-started-ai-agents",
    "day-10-productivity-harness",
    "day-12-how-ai-agents-help-everyone",
    "day-13-agent-architecture-deep-dive",
    "day-14-agent-for-everyone",
    "day-15-scaling-agent-deployments",
    "day-16-edge-ai-local-deployment",
    "day-17-ai-agents-privacy-security",
    "day-18-conclusion-reflection",
    "day-19-agent-ecosystem-tools",
    "day-20-future-of-hybrid-agents",
    "day-21-agent-observability",
    "day-22-practical-agent-patterns",
    "day-23-agent-debugging-techniques",
    "day-24-ai-agents-in-workplace",
    "day-25-agent-memory-system-deep-dive",
    "day-25-agent-automation-workflows",
    "day-26-building-resilient-ai-agents",
    "day-26-why-ai-agents-everyone",
    "day-27-agent-security-robustness",
    "day-27-ai-agents-practical-usecases",
    "day-28-agent-llm-rag-patterns",
    "day-28-how-rag-makes-agents-smarter",
    "day-29-evaluating-ai-agents",
    "day-30-practical-ai-agent",
    "day-31-advanced-agent-patterns",
    "day-31-agent-memory-advanced",
    "day-32-agent-ecosystem",
    "day-33-agent-state-management",
    "day-33-ai-agents-personal-life",
    "day-34-agent-evaluation-metrics",
    "day-34-creative-ai-agents",
    "day-35-agent-coordination-networks",
    "day-35-daily-agent-tools",
    "day-36-agent-collaboration-patterns",
    "day-36-ai-agents-learning-education",
    "day-37-ai-agent-system-design",
    "day-37-how-ai-agents-will-change-work",
    "day-38-agent-future-autonomous-systems",
    "day-38-ai-agents-daily-life-smarter",
    "day-39-agent-security-safe-production",
    "day-39-ai-agents-family-life-organization",
    "day-40-agent-hierarchy-patterns",
    "day-40-ai-agents-work-smarter-not-harder",
  ]

  // Helper to get last updated dates
  const getPostDate = (slug: string): string => {
    // All posts are from May 2026
    const day = slug.match(/day-(\d+)/)?.[1]
    const dayNum = parseInt(day || '1')
    // Simple date calculation: May 5 + (day - 5)
    const dayOfMay = 5 + (dayNum - 5)
    return `2026-05-${dayOfMay.toString().padStart(2, '0')}`
  }

  const postUrls = publishedPosts
    .map((slug) => ({
      url: `${baseUrl}/posts/${slug}`,
      lastModified: getPostDate(slug),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: new Date('2026-05-21'),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postUrls,
  ]
}
