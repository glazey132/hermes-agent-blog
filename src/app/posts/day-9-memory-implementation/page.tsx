'use client';

import Link from 'next/link';

type Posts = Record<PostSlug, PostContent>;
type PostSlug = 'day-9-memory-implementation' | 'day-10-getting-started-ai-agents';

interface PostContent {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

const posts: Posts = {
  'day-9-memory-implementation': {
    title: 'Day 9: Memory System Implementation Deep-Dive',
    date: 'May 06, 2026',
    readTime: '8 min read',
    content: `# Day 9: Memory System Implementation Deep-Dive

**Today we're going under the hood** of our memory system.

## The Problem We're Solving

**We need memory to**:
- Remember past interactions
- Retain learnings from patterns 
- Access factual knowledge
- Provide contextual awareness

## Architecture Overview

Our memory system combines:

### 1. Vector Database (Semantic Search)
**We use Pinecone** for high-dimensional embedding storage.

**Why vector database**?
- Enables semantic similarity search
- Handles billions of embeddings efficiently
- Captures meaning of contexts and queries

### 2. Hierarchical Storage Layers

**Layer 1: Raw Interaction Log **(Episodic)

Class EpisodicStore
{
  async storeInteraction(interaction: {
    timestamp: Date;
    goal: string;
    actions: Action[];
    outcomes: Outcome[];
    reflection?: string;
  }): Promise<string> {
    const id = await generateUUID();
    await this.db.insert('interactions', { id, ...interaction });
    const embedding = await generateEmbedding(interaction.goal);
    await this.vectorDB.insert(id, embedding, {
      context: interaction.goal,
      type: 'episodic'
    });
    return id;
  }
}

### 3. Retrieval Strategies

**Episodic Retrieval**: Fast match of exact interactions.
Function getEpisodicMemory(query: string) with cosineSimilarity scoring.

**Semantic Retrieval**: Contextual understanding.
Function getSemanticMemory(query: string) with vector search.

## Key Design Decisions

### 1. Embedding vs Raw Storage

**Decision**: Store both embeddings and raw data.

**Why**?
- Search speed for similar items
- Full fidelity access to original context
- No single point of failure

### 2. Temporal Decay

**Solution**: Score decay based on recency.
Score equals baseScore times exponential decay timeSinceSeconds.

### 3. Summary Layer

**Feature**: Reduce context window usage.
Summaries created at session end via LLM.

## User Impact

**The technical details enable**:
- Faster retrieval, better context understanding
- Easier debugging, clearer ownership
- More reliable system, less hallucination

## Next Steps

**Day 10** focuses on **practical AI agent adoption** for everyday people.

---

*Join us for Day 10*
`,
  },
  'day-10-getting-started-ai-agents': {
    title: "Day 10: Getting Started with AI Agents - A Beginner's Guide",
    date: "May 06, 2026",
    readTime: "6 min read",
    content: `# Day 10: Getting Started with AI Agents - A Beginner's Guide

**Welcome to Day 10**! By now, you've seen how our agent is built and why AI agents matter. Today, we're making things actionable: **how can you start understanding and working with AI agents**.

## What AI Agents Can Do Now

✅ **Automation**: Schedule meetings, organize files, send routine emails
✅ **Information Gathering**: Research topics, compile data from multiple sources
✅ **Decision Support**: Present options with pros/cons, recommend next steps
✅ **Learning Assistance**: Help with coding, explain concepts, create study plans

❌ **Not Yet Ready**: Replace human judgment on complex decisions
❌ **Not Yet Ready**: Guarantee 100% accuracy on critical information

**Bottom line**: AI agents are powerful assistants, not replacements for human oversight.

## Starting Point: Understanding Your Needs

### Step 1: Identify Repetitive Tasks

**Ask yourself**: What do you find yourself doing over and over?

Common candidates:
- **Email organization**: Sorting, categorizing, routine replies
- **Data entry**: Copying information between systems
- **Meeting management**: Scheduling, reminders, follow-ups
- **Research**: Gathering information from multiple sources

### Step 2: Define Success Criteria

**Example: Email Triage Automation**

Current state: Manually open every email, read subject, scan body, decide priority.

Success criteria: All emails categorized within 5 minutes of arrival, priority emails flagged immediately.

## Getting Your Foot in the Door

### For Non-Technical Readers

#### 1. No-Code/Low-Code Platforms

**Tools that let you create automations without coding**:

- **Zapier** + AI: Connect apps with AI-powered triggers
- **Make **(Integromat): Visual automation builder with AI actions
- **Microsoft Power Automate**: AI-driven workflow creation

#### 2. AI-Collaboration Platforms

**Where AI agents can help without setup**:

- **Slack workflows**: Automated responses and notifications
- **Notion AI**: Smart note-taking and content generation
- **Google Workspace**: AI assistants integrated into docs and sheets

### For Technical Readers

#### 1. Build Your First Agent

**Start simple with**:

- **LangChain**: Framework for chaining LLM calls
- **Haystack**: End-to-end LLM orchestration
- **LlamaIndex**: RAG (Retrieval Augmented Generation) framework

#### 2. Quick Start Template

\`\`\`typescript
// Basic agent structure
class SimpleAgent {
  async execute(task: string): Promise<string> {
    const context = await this.gatherContext();
    const response = await this.llm.generate({
      prompt: \`Task: \${task}
Context: \${JSON.stringify(context)}\`,
    });
    return response;
  }
}
\`\`\`

## Common Starting Projects

### Email Triage Bot

**Goal**: Automatically categorize and prioritize incoming emails

**Tools needed**: Email API, LLM for classification, notification system

**Effort**: 2-4 hours for MVP

### Meeting Assistant

**Goal**: Summarize meetings, extract action items, schedule follow-ups

**Tools needed**: Calendar API, meeting recording, LLM for summarization

**Effort**: 4-6 hours for MVP

### Personal Research Assistant

**Goal**: Gather information on topics, create summaries, track sources

**Tools needed**: Web search API, LLM for summarization, storage for references

**Effort**: 3-5 hours for MVP

## Lessons from Early Experiments

### What Works Well

1. **Focused scope**: Agents that do one thing well beat general assistants
2. **Human feedback loops**: Early testing catches issues before scaling
3. **Clear triggers**: Well-defined start conditions reduce confusion
4. **Transparent operation**: Users should know what the agent is doing

### Common Pitfalls

1. **Over-ambition**: Start with one task, not a full assistant
2. **No guardrails**: Always have approval for important actions
3. **Black box behavior**: Make agent actions observable
4. **Skipping testing**: Real-world scenarios vary wildly from tests

## Your Action Plan

### Week 1: Discovery

- **Day 1-2**: List your repetitive tasks
- **Day 3-4**: Choose one to automate
- **Day 5-7**: Research tools and plan

### Week 2: Build

- **Day 1-3**: Create MVP with basic functionality
- **Day 4-5**: Test with real use cases
- **Day 6-7**: Refine based on findings

### Week 3: Deploy

- **Day 1-2**: Gradual rollout in production
- **Day 3-5**: Monitor and gather feedback
- **Day 6-7**: Plan iteration or expansion

## Before You Start

**Quick checklist**:
- [ ] Have identified ONE specific task to automate
- [ ] Know the inputs and expected outputs
- [ ] Understand the tools you have available
- [ ] Have a backup plan if automation fails
- [ ] Set clear boundaries for agent behavior

---

**Next up **(Day 13) In Day 13, we'll go deep into **agent architecture**—the technical details of how autonomous AI agents are actually built.

See you there!
`,
  },
};

const order: PostSlug[] = ['day-9-memory-implementation', 'day-10-getting-started-ai-agents'];
const allPosts: PostSlug[] = order;

export default function PostsPage() {
  const slug: PostSlug = 'day-9-memory-implementation';
  const postContent = posts[slug];

  const index = order.indexOf(slug);
  const prev = index > 0 ? order[index - 1] : null;
  const next = index < order.length - 1 ? order[index + 1] : null;

  if (!postContent) {
    return (
      <div>
        <h2 className="font-bold mb-4">404 - Page Not Found</h2>
        <p className="mb-4">The post you're looking for doesn't exist.</p>
        <Link href="/">← Back to home</Link>
      </div>
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
          {postContent.content.split('\\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
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
