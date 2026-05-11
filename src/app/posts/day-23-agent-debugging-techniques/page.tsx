'use client';

import Link from 'next/link';
import PostBody from '@/components/PostBody';
import { getAdjacentPostSlugs } from '@/lib/posts';

type Posts = Partial<Record<PostSlug, PostContent>>;
type PostSlug = 'day-22-practical-agent-patterns' | 'day-23-agent-debugging-techniques';

interface PostContent {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

const posts: Posts = {
  'day-22-practical-agent-patterns': {
    title: "Day 22: Real-World Agent Patterns - Using AI Agents with Human Judgment in the Loop",
    date: "May 09, 2026",
    readTime: "14 min read",
    content: String.raw`# Day 22: Real-World Agent Patterns - Using AI Agents with Human Judgment in the Loop

**We've covered planning, memory, observability** - but the real question is: **How do you actually deploy agents safely in production** while keeping human oversight?

Today: **Practical patterns** for AI agents, from the most autonomous to the most controlled, based on real-world use cases.

## The Autonomy Spectrum

Not all agents need full autonomy. In fact, for most applications, **partial autonomy is safer and more effective**.

### Pattern 1: Assisted Decision-Making

**Best for**: High-stakes decisions where human judgment is essential.

**Use cases**:
- Financial transactions over $1000
- Content publishing
- Infrastructure changes
- Legal/compliance actions

Benefits:
- Leverages AI's speed
- Retains human judgment
- Creates audit trail

---

### Pattern 2: Human-Approved Workflow Execution

**Best for**: Multi-step tasks requiring oversight.

**Use cases**:
- Development workflows
- Content pipelines
- Data analysis tasks

Benefits:
- Safe multi-step tasks
- Human intervention when needed
- Learns from corrections

---

### Pattern 3: Monitoring and Alerting

**Best for**: Operations requiring visibility.

**Use cases**:
- Production monitoring
- Security alerts
- Performance tracking

Benefits:
- 24/7 monitoring
- Reduces alert fatigue
- Provides context

---

### Pattern 4: Draft and Review

**Best for**: Content creation and generation.

**Use cases**:
- Blog post drafting
- Initial code generation
- Technical documentation
- Email drafting

Benefits:
- Fast first drafts
- Human creative control
- Reduces initial effort

---

## Choosing the Right Pattern

**Assisted Decision-Making**: Significant consequences, human expertise needed, compliance required

**Workflow Execution**: Sequential steps, clear verification, iterative refinement

**Monitoring Alerting**: Continuous visibility, anomaly detection, human response exists

**Draft and Review**: Content creation, fast iteration, human quality essential

---

## Best Practices

1. Start conservative (high human oversight)
2. Document decisions and track outcomes
3. Measure actual time saved
4. Iterate on boundaries
5. Keep humans in the loop until ready for full autonomy

---

*Next up *(Day 23): We'll dive deep into **debugging AI agents** - how do you know what's going wrong when your agent makes a mistake?*
`,
  },
};

export default function PostsPage() {
  const slug: PostSlug = 'day-23-agent-debugging-techniques';
  const postContent = posts[slug];

  const { prev, next } = getAdjacentPostSlugs(slug);

  const resolvedPostContent = postContent ?? {
    title: 'Post not published',
    date: 'Unpublished',
    readTime: '0 min read',
    content: `# Post not published

This route exists, but no grounded post content is available for this slug.`,
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
