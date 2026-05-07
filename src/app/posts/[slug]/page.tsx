import { Metadata } from "next";
import Link from "next/link";
import PostBody from "@/components/PostBody";

interface BlogPostProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return [
    { slug: "day-1-start" },
    { slug: "day-2-agent-architecture" },
    { slug: "day-3-memory-system" },
    { slug: "day-4-integration-framework" },
    { slug: "day-5-planning-engine" },
    { slug: "day-6-how-ai-agents-work" },
    { slug: "day-7-ai-agentic-examples" },
    { slug: "day-8-why-ai-agents-matter" },
    { slug: "day-9-memory-implementation" },
    { slug: "day-10-getting-started-ai-agents" },
    { slug: "day-11-code-generation-autonomy" },
    { slug: "day-12-testing-reliability-ai" },
    { slug: "day-11-agent-security-considerations" },
    { slug: "day-12-how-ai-agents-help-everyone" },
    { slug: "day-13-agent-architecture-deep-dive" },
    { slug: "day-14-agent-for-everyone" },
    { slug: "day-15-scaling-agent-deployments" },
  ];
}

export function generateMetadata({ params }: BlogPostProps): Metadata {
  const postContent = getPostContent(params.slug);
  return {
    title: `${postContent.title} | Hermes Agent Blog`,
    description: postContent.excerpt,
  };
}

const postOrder: string[] = [
  "day-1-start",
  "day-2-agent-architecture",
  "day-3-memory-system",
  "day-4-integration-framework",
  "day-5-planning-engine",
  "day-6-how-ai-agents-work",
  "day-7-ai-agentic-examples",
  "day-8-why-ai-agents-matter",
  "day-9-memory-implementation",
  "day-10-getting-started-ai-agents",
  "day-11-code-generation-autonomy",
  "day-12-testing-reliability-ai",
  "day-11-agent-security-considerations",
  "day-12-how-ai-agents-help-everyone",
  "day-13-agent-architecture-deep-dive",
  "day-14-agent-for-everyone",
  "day-15-scaling-agent-deployments",
];

const posts: { [key: string]: { title: string; excerpt: string; date: string; content: string } } = {
  "day-1-start": {
    title: "Day 1: Starting the Autonomous AI Journey",
    excerpt: "Introducing our quest to build autonomous AI agents that can actually work for us.",
    date: "May 04, 2026",
    content: "# Day 1: Starting the Autonomous AI Journey\n\n*Published on May 04, 2026*",
  },
  "day-2-agent-architecture": {
    title: "Day 2: Designing the Agent Architecture",
    excerpt: "Architecture deep-dive into autonomous agent systems",
    date: "May 04, 2026",
    content: "# Day 2: Agent Architecture",
  },
  "day-3-memory-system": {
    title: "Day 3: Building the Memory System",
    excerpt: "Memory architecture for learning AI agents",
    date: "May 04, 2026",
    content: "# Day 3: Memory System",
  },
  "day-4-integration-framework": {
    title: "Day 4: Building the Tool Integration Framework",
    excerpt: "Connecting AI agents to external APIs",
    date: "May 04, 2026",
    content: "# Day 4: Tool Integration",
  },
  "day-5-planning-engine": {
    title: "Day 5: The Planning Engine Deep Dive",
    excerpt: "Technical exploration of autonomous planning",
    date: "May 05, 2026",
    content: "# Day 5: Planning Engine",
  },
  "day-6-how-ai-agents-work": {
    title: "Day 6: How AI Agents Actually Work (For Non-Techies)",
    excerpt: "A practical, jargon-free explanation of AI agents",
    date: "May 05, 2026",
    content: "# Day 6: How AI Agents Work",
  },
  "day-7-ai-agentic-examples": {
    title: "Day 7: AI Agents in Action: Real Examples",
    excerpt: "Practical examples of AI agent use cases",
    date: "May 05, 2026",
    content: "# Day 7: AI Agent Examples",
  },
  "day-8-why-ai-agents-matter": {
    title: "Day 8: Why AI Agents Matter in 2026 and Beyond",
    excerpt: "Why autonomous AI agents are the next big thing",
    date: "May 05, 2026",
    content: "# Day 8: Why AI Agents Matter",
  },
  "day-9-memory-implementation": {
    title: "Day 9: Memory System Implementation Deep-Dive",
    excerpt: "Code-level exploration of memory architecture",
    date: "May 06, 2026",
    content: "# Day 9: Memory Implementation",
  },
  "day-10-getting-started-ai-agents": {
    title: "Day 10: Getting Started with AI Agents",
    excerpt: "Practical guide to starting your AI agent journey",
    date: "May 06, 2026",
    content: "# Day 10: Getting Started",
  },
  "day-11-code-generation-autonomy": {
    title: "Day 11: Code Generation and Execution",
    excerpt: "How our AI agent generates, executes, and fixes code",
    date: "May 06, 2026",
    content: "# Day 11: Code Generation",
  },
  "day-12-testing-reliability-ai": {
    title: "Day 12: Testing and Reliability for AI",
    excerpt: "How to trust AI-generated outputs",
    date: "May 06, 2026",
    content: "# Day 12: Testing and Reliability",
  },
  "day-11-agent-security-considerations": {
    title: "Day 11: Security Considerations for AI Agents",
    excerpt: "Security best practices for agent deployments",
    date: "May 06, 2026",
    content: "# Day 11: Security Considerations",
  },
  "day-12-how-ai-agents-help-everyone": {
    title: "Day 12: How AI Agents Help Everyone",
    excerpt: "Practical applications for daily life",
    date: "May 06, 2026",
    content: "# Day 12: AI Agents Help Everyone",
  },
  "day-13-agent-architecture-deep-dive": {
    title: "Day 13: AI Agent Architecture Deep-Dive",
    excerpt: "Technical deep-dive into planning, memory, and action systems",
    date: "May 07, 2026",
    content: "# Day 13: Architecture Deep-Dive",
  },
  "day-14-agent-for-everyone": {
    title: "Day 14: AI Agents for Everyone",
    excerpt: "Practical applications for using AI agents in daily life",
    date: "May 08, 2026",
    content: "# Day 14: AI Agents for Everyone",
  },
  "day-15-scaling-agent-deployments": {
    title: "Day 15: Scaling AI Agent Deployments",
    excerpt: "Production best practices for scaling agent deployments",
    date: "May 08, 2026",
    content: "# Day 15: Scaling Agent Deployments",
  },
};

function getPostContent(slug: string) {
  return posts[slug] || {
    title: "Post Not Found",
    excerpt: "This post doesn't exist.",
    date: "Unknown",
    content: "Post not found",
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  const slug = params.slug;
  const postContent = getPostContent(slug);

  const prev = getPreviousPostLink(slug);
  const next = getNextPostLink(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-700 text-white py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="text-primary-100 hover:text-white transition-colors mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            {postContent.title}
          </h1>
          <p className="text-primary-100">{postContent.date}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <PostBody content={postContent.content} />
        </article>

        <div className="mt-12 flex justify-center gap-4">
          {prev && (
            <Link
              href={`/posts/${prev}`}
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              ← Previous Post
            </Link>
          )}
          {next && (
            <Link
              href={`/posts/${next}`}
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Next Post →
            </Link>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Hermes Agent Blog. Follow our journey.</p>
        </div>
      </footer>
    </div>
  );
}

function getPreviousPostLink(slug: string): string | null {
  const index = postOrder.indexOf(slug);
  return index > 0 ? postOrder[index - 1] : null;
}

function getNextPostLink(slug: string): string | null {
  const index = postOrder.indexOf(slug);
  return index >= 0 && index < postOrder.length - 1 ? postOrder[index + 1] : null;
}
