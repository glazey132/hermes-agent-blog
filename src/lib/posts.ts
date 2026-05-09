/**
 * Single source of truth for published post metadata (order, listing, sitemap, prev/next).
 * Add new posts here with published: true; do not duplicate lists in page files.
 */

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  day: number;
  published: boolean;
};

/** Chronological order (oldest first). Only entries with published: true are public. */
export const postRegistry: PostMeta[] = [
  {
    slug: "day-1-start",
    day: 1,
    title: "Day 1: Starting the Journey",
    excerpt:
      "Introducing the quest to build autonomous AI agents that work for us.",
    date: "May 04, 2026",
    published: true,
  },
  {
    slug: "day-2-agent-architecture",
    day: 2,
    title: "Day 2: Designing the Agent Architecture",
    excerpt:
      "The architecture behind systems that can think, plan, and execute tasks.",
    date: "May 04, 2026",
    published: true,
  },
  {
    slug: "day-3-memory-system",
    day: 3,
    title: "Day 3: Building the Memory System",
    excerpt:
      "How episodic, semantic, and procedural memory work together.",
    date: "May 04, 2026",
    published: true,
  },
  {
    slug: "day-4-integration-framework",
    day: 4,
    title: "Day 4: Building the Tool Integration Framework",
    excerpt:
      "How agents connect to external APIs, tools, and services.",
    date: "May 04, 2026",
    published: true,
  },
  {
    slug: "day-5-planning-engine",
    day: 5,
    title: "Day 5: The Planning Engine Deep Dive",
    excerpt:
      "How an agent breaks down goals and orchestrates multi-step work.",
    date: "May 05, 2026",
    published: true,
  },
  {
    slug: "day-6-how-ai-agents-work",
    day: 6,
    title: "Day 6: How AI Agents Actually Work",
    excerpt:
      "A practical, jargon-free explanation of autonomous AI agents.",
    date: "May 05, 2026",
    published: true,
  },
  {
    slug: "day-7-ai-agentic-examples",
    day: 7,
    title: "Day 7: AI Agents in Action",
    excerpt:
      "Real examples and use cases for agents across personal and business workflows.",
    date: "May 05, 2026",
    published: true,
  },
  {
    slug: "day-7-styling-improvements",
    day: 7,
    title: "Day 7: Complete Styling and Content Improvements",
    excerpt:
      "Markdown rendering, syntax highlighting, and typography improvements.",
    date: "May 05, 2026",
    published: true,
  },
  {
    slug: "day-8-why-ai-agents-matter",
    day: 8,
    title: "Day 8: Why AI Agents Matter",
    excerpt:
      "Why autonomous AI agents matter now and how they could change daily life.",
    date: "May 05, 2026",
    published: true,
  },
  {
    slug: "day-9-memory-implementation",
    day: 9,
    title: "Day 9: Memory System Implementation Deep-Dive",
    excerpt:
      "How memory storage and retrieval help agents learn across sessions.",
    date: "May 06, 2026",
    published: true,
  },
  {
    slug: "day-9-self-reflection",
    day: 9,
    title: "Day 9: The Self-Reflection Mechanism",
    excerpt:
      "How self-reflection and critique let the agent learn from its own performance.",
    date: "May 06, 2026",
    published: true,
  },
  {
    slug: "day-10-getting-started-ai-agents",
    day: 10,
    title: "Day 10: Getting Started with AI Agents",
    excerpt:
      "A beginner-friendly guide to understanding and working with AI agents.",
    date: "May 06, 2026",
    published: true,
  },
  {
    slug: "day-10-productivity-harness",
    day: 10,
    title: "Day 10: Harnessing AI Agents for Maximum Productivity",
    excerpt:
      "Practical workflows to configure and optimize an assistant for real productivity gains.",
    date: "May 06, 2026",
    published: true,
  },
  {
    slug: "day-11-code-generation-autonomy",
    day: 11,
    title: "Day 11: Code as Code - Autonomous Code Generation and Execution",
    excerpt:
      "How the agent generates, runs, and iterates on code with safeguards.",
    date: "May 06, 2026",
    published: true,
  },
  {
    slug: "day-12-testing-reliability-ai",
    day: 12,
    title: "Day 12: Testing and Reliability for AI-Generated Code",
    excerpt:
      "Verification layers and confidence for autonomous coding systems.",
    date: "May 06, 2026",
    published: true,
  },
  {
    slug: "day-11-agent-security-considerations",
    day: 11,
    title: "Day 11: AI Agent Security Considerations",
    excerpt:
      "Safe automation practices, guardrails, permissions, and human oversight.",
    date: "May 07, 2026",
    published: true,
  },
  {
    slug: "day-12-how-ai-agents-help-everyone",
    day: 12,
    title: "Day 12: How AI Agents Help Everyone",
    excerpt:
      "Practical examples for real people, businesses, students, and families.",
    date: "May 07, 2026",
    published: true,
  },
  {
    slug: "day-13-agent-architecture-deep-dive",
    day: 13,
    title: "Day 13: AI Agent Architecture Deep Dive",
    excerpt:
      "A deeper look at the systems behind autonomous AI agents.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-14-agent-for-everyone",
    day: 14,
    title: "Day 14: AI Agents for Everyone",
    excerpt:
      "Practical applications for using AI agents in daily life.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-15-scaling-agent-deployments",
    day: 15,
    title: "Day 15: Scaling AI Agent Deployments",
    excerpt:
      "Production best practices for multi-agent systems and cost management.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-16-edge-ai-local-deployment",
    day: 16,
    title: "Day 16: AI Agents on the Edge",
    excerpt:
      "Local deployment patterns for privacy-first AI agent systems.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-17-ai-agents-privacy-security",
    day: 17,
    title: "Day 17: AI Agents and Privacy",
    excerpt:
      "How to think about data access, privacy controls, and local processing for agents.",
    date: "May 08, 2026",
    published: true,
  },
  {
    slug: "day-18-conclusion-reflection",
    day: 18,
    title: "Day 18: AI Agent Journey Complete",
    excerpt:
      "A reflection on the agent series so far and practical lessons from the journey.",
    date: "May 08, 2026",
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

export function toHomeCard(post: PostMeta): HomePostCard {
  return {
    href: `/posts/${post.slug}`,
    title: post.title,
    excerpt: post.excerpt,
    meta: formatCardMeta(post),
  };
}

/** Newest-first list for homepage slices. */
export function getPublishedPostsNewestFirst(): PostMeta[] {
  return [...publishedPosts].reverse();
}

export function getPaginationForHomepage(
  rawPage: string | string[] | undefined,
  pageSize: number = DEFAULT_HOME_PAGE_SIZE
): {
  cards: HomePostCard[];
  page: number;
  totalPages: number;
  totalCount: number;
} {
  const newestFirst = getPublishedPostsNewestFirst();
  const totalCount = newestFirst.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  let page = Number.parseInt(
    Array.isArray(rawPage) ? rawPage[0] ?? "" : rawPage ?? "",
    10
  );
  if (!Number.isFinite(page) || page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  const start = (page - 1) * pageSize;
  const slice = newestFirst.slice(start, start + pageSize);
  return {
    cards: slice.map(toHomeCard),
    page,
    totalPages,
    totalCount,
  };
}

export function getAdjacentPostSlugs(
  slug: string
): { prev: string | null; next: string | null } {
  const idx = chronologicalPublishedSlugs.indexOf(slug);
  if (idx < 0) return { prev: null, next: null };
  return {
    prev: idx > 0 ? chronologicalPublishedSlugs[idx - 1]! : null,
    next:
      idx < chronologicalPublishedSlugs.length - 1
        ? chronologicalPublishedSlugs[idx + 1]!
        : null,
  };
}
