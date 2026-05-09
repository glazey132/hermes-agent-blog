'use client';

import Link from 'next/link';
import PostBody from '@/components/PostBody';
import { getAdjacentPostSlugs } from '@/lib/posts';

export default function PostsPage() {
  const slug = 'day-7-styling-improvements';
  const postContent = posts[slug as keyof typeof posts];

  const { prev, next } = getAdjacentPostSlugs(slug);

  const resolvedPostContent = postContent ?? {
    title: 'Post not published',
    date: 'Unpublished',
    readTime: '0 min read',
    content: `# Post not published

This route exists, but no grounded post content is available for this slug. The blog generator should only publish posts backed by session notes and the git log.`,
  };

  return (
    <main className="flex justify-center w-full max-w-3xl p-4 pt-8">
      <div className="w-full bg-white rounded shadow px-6 pb-8">
        <header className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{resolvedPostContent.title}</h1>
          <div className="text-sm text-gray-600">{resolvedPostContent.date}</div>
        </header>

        <PostBody content={resolvedPostContent.content} />

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

const posts = {
  'day-7-styling-improvements': {
    title: 'Day 7: Complete Styling and Content Improvements',
    date: 'May 05, 2026',
    readTime: '5 min read',
    content: `# Day 7: Complete Styling and Content Improvements

**Today focused on a major refactor** of the blog's visual presentation and content rendering. The result is a more polished, professional-looking documentation site with proper Markdown support.

## What Changed

### Created PostBody.tsx Component

**Before**: Each post used inline HTML generation with manual tag construction.

**Now**: Using a dedicated component with proper Markdown parsing.

## What's Coming Next

1. **Expand post examples** with more detailed technical diagrams
2. **Add search functionality** for better content discoverability
3. **Implement a post listing page** at /posts with all posts visible

---

*Update: The site now looks much more professional.*`
  },
};
