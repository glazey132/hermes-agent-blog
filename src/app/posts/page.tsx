import Link from "next/link";

import { formatCardMeta, publishedPosts } from "@/lib/posts";

export default function PostsIndexPage() {
  const newestFirst = [...publishedPosts].reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-primary-700 text-white py-10">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="text-primary-100 hover:text-white mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold">All posts</h1>
          <p className="text-primary-100 mt-2">
            {newestFirst.length} published articles
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <ul className="space-y-4">
          {newestFirst.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="block bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold text-primary-700">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {formatCardMeta(post)}
                </p>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
