import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hermes-agent-blog.vercel.app';
  const postSlugs = [
    'day-22-practical-agent-patterns',
    'day-21-agent-observability',
    'day-20-future-of-hybrid-agents',
    'day-19-agent-ecosystem-tools',
    'day-18-conclusion-reflection',
    'day-17-ai-agents-privacy-security',
    'day-16-edge-ai-local-deployment',
    'day-15-scaling-agent-deployments',
    'day-14-agent-for-everyone',
    'day-13-agent-architecture-deep-dive',
    'day-12-how-ai-agents-help-everyone',
    'day-12-testing-reliability-ai',
    'day-11-agent-security-considerations',
    'day-11-code-generation-autonomy',
    'day-10-getting-started-ai-agents',
    'day-9-memory-implementation',
    'day-8-why-ai-agents-matter',
    'day-7-ai-agentic-examples',
    'day-6-how-ai-agents-work',
    'day-5-planning-engine',
    'day-4-integration-framework',
    'day-3-memory-system',
    'day-2-agent-architecture',
    'day-1-start',
  ];
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1 as const,
    },
    ...postSlugs.map((slug, index) => ({
      url: `${baseUrl}/posts/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: index < 6 ? 0.8 as const : 0.7 as const,
    })),
  ]
}
