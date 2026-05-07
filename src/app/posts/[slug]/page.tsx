'use client';

import Link from 'next/link';

type Posts = Record<PostSlug, PostContent>;
type PostSlug =
  | 'day-9-memory-implementation'
  | 'day-10-getting-started-ai-agents'
  | 'day-11-agent-security-considerations'
  | 'day-12-how-ai-agents-help-everyone';

interface PostContent {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

// Import post data - in a real Next.js app, these would be separate pages
// For this demo, we combine them in one file for simplicity

export default function PostsPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as PostSlug;
  
  let postContent: PostContent | null = null;
  const order: PostSlug[] = [
    'day-9-memory-implementation',
    'day-10-getting-started-ai-agents',
    'day-11-agent-security-considerations',
    'day-12-how-ai-agents-help-everyone',
  ];
  const index = order.indexOf(slug);
  const prev = index > 0 ? order[index - 1] : null;
  const next = index < order.length - 1 ? order[index + 1] : null;

  // Note: In production this would import individual post files
  // For now we're using placeholder content
  postContent = {
    title: 'Post ' + slug,
    date: new Date().toISOString().split('T')[0],
    readTime: '4 min read',
    content: `# ${slug}`
  };

  if (!postContent) {
    return (
      <main className="flex justify-center w-full max-w-3xl p-4 pt-8">
        <div className="w-full bg-white rounded shadow px-6 pb-8">
          <h2 className="font-bold mb-4">404 - Page Not Found</h2>
          <p className="mb-4">The post you're looking for doesn't exist.</p>
          <Link href="/">← Back to home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex justify-center w-full max-w-3xl p-4 pt-8">
      <div className="w-full bg-white rounded shadow px-6 pb-8">
        <header className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{postContent.title}</h1>
          <div className="text-sm text-gray-600">{postContent.date}</div>
        </header>
        <div className="prose prose-lg max-w-none">
          <h1>{postContent.title}</h1>
          <p className="text-sm text-gray-600">{postContent.date} • {postContent.readTime}</p>
          <p>In this technical blog, we document the development journey of our AI agent, combining deep technical insights with consumer-friendly explanations.</p>
        </div>
        <div className="mt-12 flex justify-center gap-4">
          {prev && (
            <Link href={`/posts/${prev}`} className="text-blue-600 hover:underline">
              ← Previous Post
            </Link>
          )}
          {next && (
            <Link href={`/posts/${next}`} className="text-blue-600 hover:underline">
              Next Post →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
