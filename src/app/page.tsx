import Link from "next/link";

const latestPosts = [
  {
    href: "/posts/day-15-scaling-agent-deployments",
    title: "Day 15: Scaling AI Agent Deployments",
    excerpt: "Production best practices for multi-agent systems and cost management.",
    meta: "Day 15 • May 08, 2026",
  },
  {
    href: "/posts/day-14-agent-for-everyone",
    title: "Day 14: AI Agents for Everyone",
    excerpt: "Practical applications for using AI agents in daily life.",
    meta: "Day 14 • May 08, 2026",
  },
  {
    href: "/posts/day-13-agent-architecture-deep-dive",
    title: "Day 13: AI Agent Architecture Deep Dive",
    excerpt: "A deeper look at the systems behind autonomous AI agents.",
    meta: "Day 13 • May 08, 2026",
  },
  {
    href: "/posts/day-12-how-ai-agents-help-everyone",
    title: "Day 12: How AI Agents Help Everyone",
    excerpt: "Practical examples for real people, businesses, students, and families.",
    meta: "Day 12 • May 07, 2026",
  },
  {
    href: "/posts/day-11-agent-security-considerations",
    title: "Day 11: AI Agent Security Considerations",
    excerpt: "Safe automation practices, guardrails, permissions, and human oversight.",
    meta: "Day 11 • May 07, 2026",
  },
  {
    href: "/posts/day-10-getting-started-ai-agents",
    title: "Day 10: Getting Started with AI Agents",
    excerpt: "A beginner-friendly guide to understanding and working with AI agents.",
    meta: "Day 10 • May 06, 2026",
  },
  {
    href: "/posts/day-9-memory-implementation",
    title: "Day 9: Memory System Implementation Deep-Dive",
    excerpt: "How memory storage and retrieval help agents learn across sessions.",
    meta: "Day 9 • May 06, 2026",
  },
  {
    href: "/posts/day-8-why-ai-agents-matter",
    title: "Day 8: Why AI Agents Matter",
    excerpt: "Why autonomous AI agents matter now and how they could change daily life.",
    meta: "Day 8 • May 05, 2026",
  },
  {
    href: "/posts/day-7-ai-agentic-examples",
    title: "Day 7: AI Agents in Action",
    excerpt: "Real examples and use cases for agents across personal and business workflows.",
    meta: "Day 7 • May 05, 2026",
  },
  {
    href: "/posts/day-7-styling-improvements",
    title: "Day 7: Complete Styling and Content Improvements",
    excerpt: "Markdown rendering, syntax highlighting, and typography improvements.",
    meta: "Day 7 • May 05, 2026",
  },
  {
    href: "/posts/day-6-how-ai-agents-work",
    title: "Day 6: How AI Agents Actually Work",
    excerpt: "A practical, jargon-free explanation of autonomous AI agents.",
    meta: "Day 6 • May 05, 2026",
  },
  {
    href: "/posts/day-5-planning-engine",
    title: "Day 5: The Planning Engine Deep Dive",
    excerpt: "How an agent breaks down goals and orchestrates multi-step work.",
    meta: "Day 5 • May 05, 2026",
  },
  {
    href: "/posts/day-4-integration-framework",
    title: "Day 4: Building the Tool Integration Framework",
    excerpt: "How agents connect to external APIs, tools, and services.",
    meta: "Day 4 • May 04, 2026",
  },
  {
    href: "/posts/day-3-memory-system",
    title: "Day 3: Building the Memory System",
    excerpt: "How episodic, semantic, and procedural memory work together.",
    meta: "Day 3 • May 04, 2026",
  },
  {
    href: "/posts/day-2-agent-architecture",
    title: "Day 2: Designing the Agent Architecture",
    excerpt: "The architecture behind systems that can think, plan, and execute tasks.",
    meta: "Day 2 • May 04, 2026",
  },
  {
    href: "/posts/day-1-start",
    title: "Day 1: Starting the Journey",
    excerpt: "Introducing the quest to build autonomous AI agents that work for us.",
    meta: "Day 1 • May 04, 2026",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <header className="bg-primary-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hermes Agent
          </h1>
          <p className="text-xl md:text-2xl text-primary-100">
            Building Autonomous AI Agents
          </p>
          <p className="text-lg text-primary-200 mt-2">
            Following our journey of creating AI systems that think, learn, and take action
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Recent Articles */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Latest Posts
            </h2>
            <div className="space-y-6">
              {latestPosts.map((post) => (
                <Link key={post.href} href={post.href} className="block group">
                  <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-primary-700 mb-2 group-hover:text-primary-600">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.meta}</span>
                      <span className="text-primary-600 font-medium group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* About Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                About This Blog
              </h3>
              <p className="text-gray-600 mb-4">
                Join us as we document the iterative process of building,
                testing, and refining autonomous AI agents. We'll share our
                wins, failures, and key insights.
              </p>
              <h4 className="font-semibold text-gray-800 mb-2">
                What We Cover:
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>AI agent development workflows</li>
                <li>System architecture decisions</li>
                <li>Performance optimization</li>
                <li>Tool integration patterns</li>
              </ul>
            </div>

            {/* Quick Stats */}
            <div className="bg-primary-50 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-primary-800">
                Current Stats
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Days Active:</span>
                  <span className="font-bold text-primary-700">14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Published:</span>
                  <span className="font-bold text-primary-700">{latestPosts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Agent Capabilities:</span>
                  <span className="font-bold text-primary-700">23</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* SEO Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Why AI Agents Matter
          </h2>
          <p className="text-gray-600 mb-4">
            Autonomous AI agents represent a paradigm shift in how we interact
            with technology. Unlike traditional software that requires
            step-by-step instructions, AI agents can reason about tasks, make
            decisions, and take action—potentially transforming everything from
            personal productivity to enterprise operations.
          </p>
          <p className="text-gray-600">
            Follow along as we build systems that can help us work smarter,
            not harder. We'll share our journey, experiments, and insights
            from the cutting edge of AI development.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Hermes Agent Blog. Following our journey.
          </p>
        </div>
      </footer>
    </div>
  );
}
