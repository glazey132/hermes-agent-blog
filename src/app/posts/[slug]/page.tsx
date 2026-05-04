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

const posts: {[key: string]: {title: string; excerpt: string; date: string; content: string}} = {
  "day-1-start": {
    title: "Day 1: Starting the Autonomous AI Journey",
    excerpt:
      "Introducing our quest to build autonomous AI agents that can actually work for us. The beginning of something extraordinary.",
    date: "May 04, 2024",
    content: "# Day 1: Starting the Autonomous AI Journey\n\n*Published on May 04, 2024*\n\n## The Spark\n\nYesterday, a simple question sparked an entire project: \"What if I could build an AI that actually works for me?\"\n\nNot just another chatbot. Not just a tool that responds when prompted. But a true autonomous agent that can:\n- **Receive goals** and figure out how to achieve them\n- **Make decisions** based on context and constraints\n- **Execute tasks** across multiple platforms and tools\n- **Learn from experience** to get better over time\n\n## What We're Building\n\nOur goal is to create Hermes — an autonomous AI agent that can handle complex workflows, make intelligent decisions, and execute tasks across the digital landscape.\n\n### Core Capabilities\n\n1. **Goal Interpretation**: Understand high-level objectives and break them down into actionable steps\n2. **Tool Orchestration**: Seamlessly work with external APIs, databases, and services\n3. **Self-Reflection**: Monitor its own performance and adjust behavior accordingly\n4. **Long-term Memory**: Learn from past experiences to improve future performance\n\n## The Tech Stack\n\nAfter researching various approaches, we're settling on:\n- **Next.js** for the web interface and API layer\n- **TypeScript** for type-safe, maintainable code\n- **Flexible LLM integration** (we'll experiment with different models)\n- **Vector database** for semantic memory and retrieval\n- **Task queue system** for handling complex workflows\n\n## Why This Matters\n\nWe're not just building another AI toy. The potential impact is enormous:\n\n- **Productivity**: Imagine AI assistants that can handle multi-step tasks autonomously\n- **Software Engineering**: AI developers that can write, test, and deploy code\n- **Research**: AI researchers that can run experiments, analyze results, and iterate\n- **Business Operations**: Intelligent systems that manage operations, optimize processes, and make decisions\n\n## Tomorrow's Next Steps\n\nThe work begins:\n1. Define the agent's core interface and capabilities\n2. Set up the development environment\n3. Start building the foundational components\n4. Create our first test cases\n\n## Join Us\n\nThis is an experimental journey. We'll be documenting every step — the breakthroughs, the setbacks, and the lessons learned.\n\n**What would you like our autonomous AI to accomplish?** Share your thoughts in the comments below, and follow along as we build the future.\n\n---\n\n*Next: Day 2 - Designing the Agent Architecture*"
  },
  "day-2-agent-architecture": {
    title: "Day 2: Designing the Agent Architecture",
    excerpt:
      "Deep dive into the architecture that powers our autonomous agent. How we're designing systems that can think, plan, and execute.",
    date: "May 04, 2024",
    content: "# Day 2: Designing the Agent Architecture\n\n*Published on May 04, 2024*\n\n## From Concept to System Design\n\nYesterday we introduced the vision. Today, we're diving deep into the system architecture that will make it possible.\n\n## The Architecture Blueprint\n\nAfter extensive research into existing agent frameworks and patterns, we're designing a hybrid approach that combines the best of several methodologies.\n\n### Core Components\n\nThe agent architecture consists of four main components:\n\n````\n    +------+  +------+  +------+  +------+\n    | PLAN |  | RASON|  | ACT  |  | LEARN|\n    |GENERATOR|  |DECIDE |  |EXEC  |  |MEMORY|\n    +------+  +------+  +------+  +------+\n             |           |            |         |\n             +-----------+------------+-+------+\n                          |\n                    +----------+\n                    |SHARED MEM|\n                    |    BANK   |\n                    +----------++\n                          |\n                    +----------+\n                    |  TOOLS    |\n                    |  & API    |\n                    |  GATES    |\n                    +----------++\n```\n\nDetailed capabilities include:\n- Agent Orchestrator coordinates all components\n- Planning Engine breaks complex tasks into steps\n- Reasoning Module makes decisions at critical points\n- Execution Layer carries out the actual work\n- Memory System learns and retains knowledge over time\n\n### Component Breakdown\n\n#### 1. Goal Interpreter\n- **Purpose**: Transform high-level objectives into structured tasks\n- **Input**: Natural language goals\n- **Output**: Structured task list with priorities and dependencies\n- **Approach**: Fine-tuned LLM with few-shot prompting\n\n#### 2. Planning Engine\n- **Purpose**: Break complex tasks into executable steps\n- **Features**:\n  - Dependency resolution\n  - Resource allocation\n  - Time estimation\n  - Parallel execution opportunities\n\n#### 3. Reasoning Module\n- **Purpose**: Make decisions at critical junctures\n- **Capabilities**:\n  - Evaluate multiple approaches\n  - Assess risks and trade-offs\n  - Consider context and constraints\n  - Adapt based on environment feedback\n\n#### 4. Execution Layer\n- **Purpose**: Carry out the actual work\n- **Abilities**:\n  - API integrations\n  - File system operations\n  - Web interactions\n  - Process management\n\n#### 5. Memory System\n- **Purpose**: Learn and retain knowledge\n- **Types**:\n  - **Episodic**: What happened (experience logs)\n  - **Semantic**: Known facts (knowledge base)\n  - **Procedural**: How to do things (best practices)\n\n## Design Principles\n\nWe're following several key principles:\n\n1. **Modularity**: Each component can be improved independently\n2. **Observability**: Full visibility into decision-making process\n3. **Extensibility**: Easy to add new tools and capabilities\n4. **Safety**: Guardrails and human-review options\n5. **Efficiency**: Minimize API calls and computation costs\n\n## Implementation Strategy\n\nPhase 1 (Current): Core framework\n- Basic agent loop\n- Simple memory system\n- Tool interface abstraction\n\nPhase 2: Intelligence layer\n- Advanced planning algorithms\n- Multi-step reasoning\n- Context management\n\nPhase 3: Learning system\n- Experience-based improvement\n- Pattern recognition\n- Performance optimization\n\n## Technical Stack\n\n- **Next.js 14** with App Router for the interface\n- **TypeScript** throughout for type safety\n- **PostgreSQL** with PostgresML for vector operations\n- **Redis** for caching and real-time operations\n- **Docker** for containerized deployment\n\n## Next Steps\n\n- Implement the basic agent loop\n- Build the memory system MVP\n- Create the first set of tools\n- Test with simple autonomous tasks\n\n---\n\n*Tomorrow: Day 3 - Building the Memory System*"
  }
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
          <style>{`\n            .prose h1 { font-size: 2.25rem; font-weight: bold; margin: 1.5rem 0 1rem; color: #1f2937; }\n            .prose h2 { font-size: 1.5rem; font-weight: bold; margin: 1.5rem 0 0.75rem; color: #374151; }\n            .prose h3 { font-size: 1.25rem; font-weight: bold; margin: 1rem 0 0.5rem; color: #4b5563; }\n            .prose p { margin: 1rem 0; color: #374151; }\n            .prose li { margin: 0.5rem 0; color: #374151; }\n            .prose code { background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-family: monospace; }\n            .prose pre { background: #1f2937; color: #f9fafb; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin: 1rem 0; }\n          `}</style>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: formatPostContent(postContent.content) }} />
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

function formatPostContent(content: string): string {
  const lines = content.split("\n");
  const html: string[] = [];
  let inCodeBlock = false;
  let codeContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeContent = [];
      } else {
        inCodeBlock = false;
        html.push(`<pre><code>${codeContent.join("<br>")}</code></pre>`);
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    if (line.startsWith("# ")) {
      html.push(`<h1>${line.replace("# ", "")}</h1>`);
    } else if (line.startsWith("## ")) {
      html.push(`<h2>${line.replace("## ", "")}</h2>`);
    } else if (line.startsWith("### ")) {
      html.push(`<h3>${line.replace("### ", "")}</h3>`);
    } else if (line.startsWith("- ")) {
      html.push(`<li>${line.replace("- ", "")}</li>`);
    } else if (line.trim() === "") {
      html.push("<br/>");
    } else {
      html.push(`<p>${line}</p>`);
    }
  }

  return html.join("");
}
