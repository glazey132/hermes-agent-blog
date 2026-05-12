// Blog index generator (Vercel app router / static page pattern)
// All blog posts must be defined as markdown files in src/app/posts/day-N-slug format.
// This registry is the source of truth for navigation, ordering, and rendering.

export interface PostMeta {
  slug: string;
  day: number;
  title: string;
  excerpt: string;
  date: string;
  published: boolean;
}

export const postRegistry: PostMeta[] = [
  // Early experimental posts (some may be removed)
  {
    slug: "day-7-styling-improvements",
    day: 7,
    title: "Day 7: Styling Improvements on Our Blog UI",
    excerpt:
      "How we improved the visual design and user experience of our agent documentation blog.",
    date: "May 05, 2026",
    published: true,
  },
  {
    slug: "day-8-ai-agent-recommendation-engine",
    day: 8,
    title: "Day 8: AI-Powered Recommendations for Developers",
    excerpt:
      "Building a recommendation system using AI agents that suggest relevant projects and resources.",
    date: "May 06, 2026",
    published: true,
  },
  {
    slug: "day-9-self-reflection",
    day: 9,
    title: "Day 9: Self-Reflection in AI Agents",
    excerpt:
      "How agents can review their own outputs and improve through reflective loops.",
    date: "May 06, 2026",
    published: true,
  },
  {
    slug: "day-10-getting-started-ai-agents",
    day: 10,
    title: "Day 10: Getting Started with AI Agents",
    excerpt:
      "A beginner-friendly introduction to building and deploying AI agents in your projects.",
    date: "May 06, 2026",
    published: true,
  },
  {
    slug: "day-10-productivity-harness",
    day: 10,
    title: "Day 10: Harnessing AI for Personal Productivity",
    excerpt:
      "Practical tips for using AI agents to boost your daily productivity and workflow.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-12-how-ai-agents-help-everyone",
    day: 12,
    title: "Day 12: How AI Agents Help Everyone",
    excerpt:
      "Accessible benefits of AI agents for non-technical audiences and everyday tasks.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-13-agent-architecture-deep-dive",
    day: 13,
    title: "Day 13: Agent Architecture Deep Dive",
    excerpt:
      "Technical exploration of modern AI agent architectures and design patterns.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-14-agent-for-everyone",
    day: 14,
    title: "Day 14: Making AI Agents Accessible for Everyone",
    excerpt:
      "Strategies to democratize AI agent adoption across different skill levels.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-15-scaling-agent-deployments",
    day: 15,
    title: "Day 15: Scaling AI Agent Deployments",
    excerpt:
      "Architecture strategies for deploying AI agents at scale in production environments.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-16-edge-ai-local-deployment",
    day: 16,
    title: "Day 16: Edge AI and Local Deployment",
    excerpt:
      "Deploying AI agents on edge devices and local infrastructure for privacy and performance.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-17-ai-agents-privacy-security",
    day: 17,
    title: "Day 17: AI Agents and Privacy Security",
    excerpt:
      "Best practices for maintaining privacy and security when deploying AI agents.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-18-conclusion-reflection",
    day: 18,
    title: "Day 18: Reflection and Lessons Learned",
    excerpt:
      "A reflection on the agent series so far and practical lessons from the journey.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-19-agent-ecosystem-tools",
    day: 19,
    title: "Day 19: The AI Agent Ecosystem and Tools",
    excerpt:
      "Survey of the AI agent development ecosystem and essential tooling recommendations.",
    date: "May 09, 2026",
    published: true,
  },
  {
    slug: "day-20-future-of-hybrid-agents",
    day: 20,
    title: "Day 20: The Future of Hybrid AI Agents",
    excerpt:
      "Exploring hybrid AI agent architectures and emerging trends in agent development.",
    date: "May 09, 2026",
    published: true,
  },
  {
    slug: "day-21-agent-observability",
    day: 21,
    title: "Day 21: Observability for AI Agents",
    excerpt:
      "Monitoring, logging, and debugging patterns for production agent systems.",
    date: "May 09, 2026",
    published: true,
  },
  {
    slug: "day-22-practical-agent-patterns",
    day: 22,
    title: "Day 22: Real-World Agent Patterns",
    excerpt:
      "Practical patterns for using AI agents while keeping human judgment in the loop.",
    date: "May 09, 2026",
    published: true,
  },
  {
    slug: "day-23-agent-debugging-techniques",
    day: 23,
    title: "Day 23: Debugging AI Agents",
    excerpt:
      "Comprehensive debugging techniques and observability patterns for when AI agents make mistakes.",
    date: "May 09, 2026",
    published: true,
  },
  {
    slug: "day-24-ai-agents-in-workplace",
    day: 24,
    title: "Day 24: AI Agents in the Modern Workplace",
    excerpt:
      "How AI agents amplify human creativity in the modern workplace without replacing human judgment.",
    date: "May 09, 2026",
    published: true,
  },
  {
    slug: "day-25-agent-memory-system-deep-dive",
    day: 25,
    title: "Day 25: Agent Memory System Deep Dive - Building AI Systems That Learn",
    excerpt:
      "Technical deep-dive into memory systems for AI agents: long-term, semantic, and ephemeral memory architectures that enable learning and adaptation.",
    date: "May 11, 2026",
    published: true,
  },
  {
    slug: "day-25-agent-automation-workflows",
    day: 25,
    title: "Day 25: Practical Agent Automation - Building Autonomous Workflows",
    excerpt:
      "How to build agents that complete tasks autonomously: sequential, conditional, concurrent, and human-in-the-loop workflow patterns for real-world automation.",
    date: "May 11, 2026",
    published: true,
  },
  {
    slug: "day-26-building-resilient-ai-agents",
    day: 26,
    title: "Day 26: Building Resilient AI Agents - Error Handling and Recovery Strategies",
    excerpt:
      "Technical deep-dive into building resilient AI agents: error classification, retry strategies, circuit breakers, checkpointing, and production-ready reliability patterns.",
    date: "May 12, 2026",
    published: true,
  },
  {
    slug: "day-26-why-ai-agents-everyone",
    day: 26,
    title: "Day 26: Why AI Agents Are for Everyone - Simple Tools for Everyday Life",
    excerpt:
      "Discover how AI agents can transform everyday tasks for non-technical users: email management, research assistance, budgeting, learning, family organization, and personal productivity without coding.",
    date: "May 12, 2026",
    published: true,
  },
  {
    slug: "day-27-agent-security-robustness",
    day: 27,
    title: "Day 27: Agent Security and Robustness - Building Resilient Systems for Production",
    excerpt:
      "Technical deep-dive into securing AI agents for production: input sanitization, access control, sandboxed execution, circuit breakers, checkpoint recovery, audit logging, and compliance frameworks for safe autonomous agents.",
    date: "May 13, 2026",
    published: true,
  },
  {
    slug: "day-27-ai-agents-practical-usecases",
    day: 27,
    title: "Day 27: AI Agents for Personal Productivity - Real-World Use Cases for Every Day",
    excerpt:
      "Practical examples of AI agents enhancing daily life: smart email management, meeting coordination, travel planning, learning companions, budget tracking, meal planning, health monitoring, and family logistics - all without coding.",
    date: "May 13, 2026",
    published: true,
  },
];

export const publishedPosts = postRegistry.filter((post) => post.published);

export const chronologicalPublishedSlugs = publishedPosts.map((p) => p.slug);

const DEFAULT_HOME_PAGE_SIZE = 6;

export type HomePostCard = {
  href: string;
  title: string;
  excerpt: string;
  meta: string;
};

export function formatCardMeta(post: PostMeta): string {
  return `Day ${post.day} • ${post.date}`;
}

/**
 * Given a post slug, return the slugs of the adjacent posts:
 * previous and next (only from published posts).
 */
export function getAdjacentPostSlugs(slug: string): { prev: string | null; next: string | null } {
  const slugs = chronologicalPublishedSlugs;
  const idx = slugs.indexOf(slug);

  if (idx === -1) {
    return { prev: null, next: null };
  }

  const prev = idx > 0 ? slugs[idx - 1] : null;
  const next = idx < slugs.length - 1 ? slugs[idx + 1] : null;

  return { prev, next };
}

/**
 * Build a page title with blog branding.
 */
export function buildTitle(slug: string): string {
  const post = postRegistry.find((p) => p.slug === slug);
  if (!post) return "Hermes Agent Blog";
  return `${post.title} | Hermes Agent Blog`;
}

/**
 * Build a description from the post metadata.
 */
export function buildDescription(slug: string): string {
  const post = postRegistry.find((p) => p.slug === slug);
  if (!post) return "Hermes Agent Blog - documenting the journey of building an AI agent co-founder from scratch.";
  return `${post.excerpt} Day ${post.day}, posted on ${post.date}.`;
}

/**
 * Get post metadata by slug.
 */
export function getPostBySlug(slug: string): PostMeta | undefined {
  const post = postRegistry.find((p) => p.slug === slug);
  return post && post.published ? post : undefined;
}

/**
 * Paginated homepage cards (newest posts first; page size matches DEFAULT_HOME_PAGE_SIZE).
 */
export function getPaginationForHomepage(
  pageParam: string | string[] | undefined
): { cards: HomePostCard[]; page: number; totalPages: number } {
  const newestFirst = [...publishedPosts].reverse();
  const raw = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const parsed = raw ? parseInt(String(raw), 10) : 1;
  const requestedPage = Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
  const totalPages = Math.max(1, Math.ceil(newestFirst.length / DEFAULT_HOME_PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const start = (page - 1) * DEFAULT_HOME_PAGE_SIZE;
  const slice = newestFirst.slice(start, start + DEFAULT_HOME_PAGE_SIZE);
  const cards: HomePostCard[] = slice.map((post) => ({
    href: `/posts/${post.slug}`,
    title: post.title,
    excerpt: post.excerpt,
    meta: formatCardMeta(post),
  }));
  return { cards, page, totalPages };
}

/**
 * Get the first N posts for the homepage.
 */
export function getPostsForHomepage(count = DEFAULT_HOME_PAGE_SIZE): PostMeta[] {
  return publishedPosts.slice(0, count);
}
