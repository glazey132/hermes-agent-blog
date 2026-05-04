import { Metadata } from "next";
import Link from "next/link";

interface BlogPostProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return [
    { slug: "day-1-start" },
    { slug: "day-2-agent-architecture" },
  ];
}

export function generateMetadata({ params }: BlogPostProps): Metadata {
  const postContent = getPostContent(params.slug);
  return {
    title: `${postContent.title} | Hermes Agent Blog`,
    description: postContent.excerpt,
  };
}

function getPostContent(slug: string) {
  const posts = {
    "day-1-start": {
      title: "Day 1: Starting the Autonomous AI Journey",
      excerpt:
        "Introducing our quest to build autonomous AI agents that can actually work for us. The beginning of something extraordinary.",
      date: "May 04, 2024",
      content: `
# Day 1: Starting the Autonomous AI Journey

*Published on May 04, 2024*

## The Spark

Yesterday, a simple question sparked an entire project: *"What if I could build an AI that actually works for me?"*

Not just another chatbot. Not just a tool that responds when prompted. But a true autonomous agent that can:
- **Receive goals** and figure out how to achieve them
- **Make decisions** based on context and constraints
- **Execute tasks** across multiple platforms and tools
- **Learn from experience** to get better over time

## What We're Building

Our goal is to create Hermes — an autonomous AI agent that can handle complex workflows, make intelligent decisions, and execute tasks across the digital landscape.

### Core Capabilities

1. **Goal Interpretation**: Understand high-level objectives and break them down into actionable steps
2. **Tool Orchestration**: Seamlessly work with external APIs, databases, and services
3. **Self-Reflection**: Monitor its own performance and adjust behavior accordingly
4. **Long-term Memory**: Learn from past experiences to improve future performance

## The Tech Stack

After researching various approaches, we're settling on:
- **Next.js** for the web interface and API layer
- **TypeScript** for type-safe, maintainable code
- **Flexible LLM integration** (we'll experiment with different models)
- **Vector database** for semantic memory and retrieval
- **Task queue system** for handling complex workflows

## Why This Matters

We're not just building another AI toy. The potential impact is enormous:

- **Productivity**: Imagine AI assistants that can handle multi-step tasks autonomously
- **Software Engineering**: AI developers that can write, test, and deploy code
- **Research**: AI researchers that can run experiments, analyze results, and iterate
- **Business Operations**: Intelligent systems that manage operations, optimize processes, and make decisions

## Tomorrow's Next Steps

The work begins:
1. Define the agent's core interface and capabilities
2. Set up the development environment
3. Start building the foundational components
4. Create our first test cases

## Join Us

This is an experimental journey. We'll be documenting every step — the breakthroughs, the setbacks, and the lessons learned.

**What would you like our autonomous AI to accomplish?** Share your thoughts in the comments below, and follow along as we build the future.

---

*Next: Day 2 - Designing the Agent Architecture*
`,
    },
    "day-2-agent-architecture": {
      title: "Day 2: Designing the Agent Architecture",
      excerpt:
        "Deep dive into the architecture that powers our autonomous agent. How we're designing systems that can think, plan, and execute.",
      date: "May 04, 2024",
      content: `
# Day 2: Designing the Agent Architecture

*Published on May 04, 2024*

## From Concept to System Design

Yesterday we introduced the vision. Today, we're diving deep into the system architecture that will make it possible.

## The Architecture Blueprint

After extensive research into existing agent frameworks and patterns, we're designing a hybrid approach that combines the best of several methodologies.

### Core Components

```
┌─────────────────────────────────────────────────────────┐
│                    AGENT ORCHESTRATOR                    │
│  (Central intelligence that coordinates all components)  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │   PLAN   │  │  REASON  │  │   ACT    │  │ LEARN    │ │
│  │  GENER-  │  │   AND    │  │   EXEC   │  │   FROM   │ │
│  │  ATOR    │  │  DECIDE  │  │  TASKS   │  │  EXPE-   │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘ │
│       │            │            │             │         │
│  ┌────▼────────────▼────────────▼─────────────▼──────┐   │
│  │              SHARED MEMORY BANK                    │   │
│  │  (Long-term memory, context, learned patterns)    │   │
│  └────────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │          EXTERNAL TOOLS & API GATES               │   │
│  │  (Web scraping, API calls, file operations, etc.)  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Component Breakdown

#### 1. Goal Interpreter
- **Purpose**: Transform high-level objectives into structured tasks
- **Input**: Natural language goals
- **Output**: Structured task list with priorities and dependencies
- **Approach**: Fine-tuned LLM with few-shot prompting

#### 2. Planning Engine
- **Purpose**: Break complex tasks into executable steps
- **Features**:
  - Dependency resolution
  - Resource allocation
  - Time estimation
  - Parallel execution opportunities

#### 3. Reasoning Module
- **Purpose**: Make decisions at critical junctures
- **Capabilities**:
  - Evaluate multiple approaches
  - Assess risks and trade-offs
  - Consider context and constraints
  - Adapt based on environment feedback

#### 4. Execution Layer
- **Purpose**: Carry out the actual work
- **Abilities**:
  - API integrations
  - File system operations
  - Web interactions
  - Process management

#### 5. Memory System
- **Purpose**: Learn and retain knowledge
- **Types**:
  - **Episodic**: What happened (experience logs)
  - **Semantic**: Known facts (knowledge base)
  - **Procedural**: How to do things (best practices)

## Design Principles

We're following several key principles:

1. **Modularity**: Each component can be improved independently
2. **Observability**: Full visibility into decision-making process
3. **Extensibility**: Easy to add new tools and capabilities
4. **Safety**: Guardrails and human-review options
5. **Efficiency**: Minimize API calls and computation costs

## Implementation Strategy

Phase 1 (Current): Core framework
- Basic agent loop
- Simple memory system
- Tool interface abstraction

Phase 2: Intelligence layer
- Advanced planning algorithms
- Multi-step reasoning
- Context management

Phase 3: Learning system
- Experience-based improvement
- Pattern recognition
- Performance optimization

## Technical Stack

- **Next.js 14** with App Router for the interface
- **TypeScript** throughout for type safety
- **PostgreSQL** with PostgresML for vector operations
- **Redis** for caching and real-time operations
- **Docker** for containerized deployment

## Next Steps

- Implement the basic agent loop
- Build the memory system MVP
- Create the first set of tools
- Test with simple autonomous tasks

---

*Tomorrow: Day 3 - Building the Memory System*
`,
    },
  };

  return posts[slug as keyof typeof posts] || {
    title: "Post Not Found",
    excerpt: "This post doesn't exist.",
    date: "Unknown",
    content: "Post not found",
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  const slug = params.slug;
  const postContent = getPostContent(slug);

  const formatPostContent = (content: string): string => {
    // Basic markdown parsing
    return content;
  };

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
          <div className="prose prose-lg max-w-none">
            {postContent.content.split("\n").map((line, index) => {
              if (line.startsWith("# ")) {
                return (
                  <h1 key={index} className="text-4xl font-bold text-gray-800 mb-6">
                    {line.replace("# ", "")}
                  </h1>
                );
              } else if (line.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="text-3xl font-bold text-gray-800 mb-4 mt-8"
                  >
                    {line.replace("## ", "")}
                  </h2>
                );
              } else if (line.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="text-2xl font-bold text-gray-800 mb-3 mt-6"
                  >
                    {line.replace("### ", "")}
                  </h3>
                );
              } else if (line.startsWith("- ")) {
                return (
                  <li key={index} className="ml-6 mb-2 text-gray-700">
                    {line.replace("- ", "")}
                  </li>
                );
              } else if (line.startsWith("*")) {
                return (
                  <em key={index} className="text-gray-700">
                    {line.replace(/[*]/g, "")}
                  </em>
                );
              } else if (line.includes("|") && line.includes(":")) {
                return null; // Skip meta lines for now
              } else if (line.trim() === "") {
                return <br key={index} />;
              } else {
                return (
                  <p key={index} className="text-gray-700 mb-4">
                    {line}
                  </p>
                );
              }
            })}
          </div>
        </article>

        <div className="mt-12 text-center">
          <Link
            href="/posts/day-1-start"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors mr-4"
          >
            ← Previous Post
          </Link>
          <Link
            href="/posts/day-2-agent-architecture"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Next Post →
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 Hermes Agent Blog. Follow our journey.</p>
        </div>
      </footer>
    </div>
  );
}
