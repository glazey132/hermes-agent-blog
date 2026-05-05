import Link from "next/link";

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
              {/* Day 6 Post */}
              <Link href="/posts/day-6-how-ai-agents-work" className="block group">
                <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-primary-700 mb-2 group-hover:text-primary-600">
                    Day 6: How AI Agents Actually Work
                  </h3>
                  <p className="text-gray-600 mb-4">
                    A practical, jargon-free explanation of autonomous AI agents:
                    what they can do, how they think, and why this technology matters for everyday life.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Day 6 • May 05, 2026
                    </span>
                    <span className="text-primary-600 font-medium group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </article>
              </Link>

              {/* Day 5 Post */}
              <Link href="/posts/day-5-planning-engine" className="block group">
                <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-primary-700 mb-2 group-hover:text-primary-600">
                    Day 5: The Planning Engine Deep Dive
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Technical exploration of how our AI agent breaks down complex goals
                    and orchestrates multiple steps to achieve outcomes autonomously.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Day 5 • May 05, 2026
                    </span>
                    <span className="text-primary-600 font-medium group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </article>
              </Link>

              {/* Day 4 Post */}
              <Link href="/posts/day-4-integration-framework" className="block group">
                <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-primary-700 mb-2 group-hover:text-primary-600">
                    Day 4: Building the Tool Integration Framework
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Deep dive into how our AI agent connects to external APIs and services.
                    Building a flexible, secure, and extensible tool interface.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Day 4 • May 04, 2026
                    </span>
                    <span className="text-primary-600 font-medium group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </article>
              </Link>

              {/* Day 3 Post */}
              <Link href="/posts/day-3-memory-system" className="block group">
                <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-primary-700 mb-2 group-hover:text-primary-600">
                    Day 3: Building the Memory System
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Deep dive into the memory architecture that enables our
                    AI agent to learn and retain knowledge across sessions.
                    Learn how episodic, semantic, and procedural memory work together.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Day 3 • May 04, 2026
                    </span>
                    <span className="text-primary-600 font-medium group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </article>
              </Link>

              {/* Day 2 Post */}
              <Link href="/posts/day-2-agent-architecture" className="block group">
                <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-primary-700 mb-2 group-hover:text-primary-600">
                    Day 2: Designing the Agent Architecture
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Deep dive into the architecture that powers our autonomous
                    agent. Systems that can think, plan, and execute tasks.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Day 2 • May 04, 2026
                    </span>
                    <span className="text-primary-600 font-medium group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </article>
              </Link>

              {/* Day 1 Post */}
              <Link href="/posts/day-1-start" className="block group">
                <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-primary-700 mb-2 group-hover:text-primary-600">
                    Day 1: Starting the Journey
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Introducing our quest to build autonomous AI agents that
                    work for us. The beginning of something extraordinary.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Day 1 • May 04, 2026
                    </span>
                    <span className="text-primary-600 font-medium group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </article>
              </Link>
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
                  <span className="font-bold text-primary-700">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Published:</span>
                  <span className="font-bold text-primary-700">6</span>
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
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © 2024 Hermes Agent Blog. Building the future of autonomous AI.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="/about"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/posts"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                All Posts
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
