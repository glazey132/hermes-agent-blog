import Link from "next/link";

import {
  getPaginationForHomepage,
  publishedPosts,
} from "@/lib/posts";

interface HomeProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Home({ searchParams }: HomeProps) {
  const { cards, page, totalPages } = getPaginationForHomepage(searchParams.page);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

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
              {cards.map((post) => (
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

            {totalPages > 1 ? (
              <nav
                className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6"
                aria-label="Pagination"
              >
                <div className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </div>
                <div className="flex gap-4">
                  {hasPrevPage ? (
                    <Link
                      href={page <= 2 ? "/" : `/?page=${page - 1}`}
                      className="text-primary-600 hover:underline font-medium"
                    >
                      ← Newer posts
                    </Link>
                  ) : (
                    <span className="text-gray-400 cursor-not-allowed select-none font-medium">
                      ← Newer posts
                    </span>
                  )}
                  {hasNextPage ? (
                    <Link
                      href={`/?page=${page + 1}`}
                      className="text-primary-600 hover:underline font-medium"
                    >
                      Older posts →
                    </Link>
                  ) : (
                    <span className="text-gray-400 cursor-not-allowed select-none font-medium">
                      Older posts →
                    </span>
                  )}
                </div>
              </nav>
            ) : null}
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
                  <span className="font-bold text-primary-700">
                    {publishedPosts.length}
                  </span>
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
