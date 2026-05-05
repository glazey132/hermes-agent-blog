import { Metadata } from "next";
import Link from "next/link";
import PostBody from "@/components/PostBody";

interface BlogPostProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return [
    { slug: "day-1-start" },
    { slug: "day-2-agent-architecture" },
    { slug: "day-3-memory-system" },
    { slug: "day-4-integration-framework" },
    { slug: "day-5-planning-engine" },
    { slug: "day-6-how-ai-agents-work" },
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
    excerpt: "Introducing our quest to build autonomous AI agents that can actually work for us. The beginning of something extraordinary.",
    date: "May 04, 2026",
    content: "# Day 1: Starting the Autonomous AI Journey\n\n*Published on May 04, 2026*\n\n## The Spark\n\nYesterday, a simple question sparked an entire project: \"What if I could build an AI that actually works for me?\"\n\nNot just another chatbot. Not just a tool that responds when prompted. But a true autonomous agent that can:\n- **Receive goals** and figure out how to achieve them\n- **Make decisions** based on context and constraints\n- **Execute tasks** across multiple platforms and tools\n- **Learn from experience** to get better over time\n\n## What We're Building\n\nOur goal is to create Hermes — an autonomous AI agent that can handle complex workflows, make intelligent decisions, and execute tasks across the digital landscape.\n\n### Core Capabilities\n\n1. **Goal Interpretation**: Understand high-level objectives and break them down into actionable steps\n2. **Tool Orchestration**: Seamlessly work with external APIs, databases, and services\n3. **Self-Reflection**: Monitor its own performance and adjust behavior accordingly\n4. **Long-term Memory**: Learn from past experiences to improve future performance\n\n## The Tech Stack\n\nAfter researching various approaches, we're settling on:\n- **Next.js** for the web interface and API layer\n- **TypeScript** for type-safe, maintainable code\n- **Flexible LLM integration** (we'll experiment with different models)\n- **Vector database** for semantic memory and retrieval\n- **Task queue system** for handling complex workflows\n\n## Why This Matters\n\nWe're not just building another AI toy. The potential impact is enormous:\n\n- **Productivity**: Imagine AI assistants that can handle multi-step tasks autonomously\n- **Software Engineering**: AI developers that can write, test, and deploy code\n- **Research**: AI researchers that can run experiments, analyze results, and iterate\n- **Business Operations**: Intelligent systems that manage operations, optimize processes, and make decisions\n\n## Tomorrow's Next Steps\n\nTomorrow, we'll dive deep into the system architecture. How do you design a system that can think, plan, and execute? Stay tuned!\n\n---\n\n*Have questions or thoughts? Follow along as we document this journey and share what we learn along the way.*",
  },
  "day-2-agent-architecture": {
    title: "Day 2: Designing the Agent Architecture",
    excerpt: "Deep dive into the architecture that powers our autonomous agent. How we're designing systems that can think, plan, and execute.",
    date: "May 04, 2026",
    content: "# Day 2: Designing the Agent Architecture\n\n*Published on May 04, 2026*\n\n## From Concept to System Design\n\nYesterday we introduced the vision. Today, we're diving deep into the system architecture that will make it possible.\n\n## The Architecture Blueprint\n\nAfter extensive research into existing agent frameworks and patterns, we're designing a hybrid approach that combines the best of several methodologies.\n\n### Core Components\n\nThe agent architecture consists of four main components:\n\n```\n+--+  +--+  +--+  +--+  \n| PLAN |  | RASON |  | ACT  |  | LEARN |  \n+--+  +--+  +--+  +--+  \n         |           |  \n         +-----+\n                    |  \n              +--+\\n              |SHARED MEM|\\n              |    BANK   |\\n              +--+\\n                    |  \n              +--+\\n              |  TOOLS    |  \n              |  & API    |  \n              |  GATES    |  \n              +--+\\n```\n\nDetailed capabilities include:\n- Agent Orchestrator coordinates all components\n- Planning Engine breaks complex tasks into steps\n- Reasoning Module makes decisions at critical points\n- Execution Layer carries out the actual work\n- Memory System learns and retains knowledge over time\n\n### Component Breakdown\n\n#### 1. Goal Interpreter\n- **Purpose**: Transform high-level objectives into structured tasks\n- **Input**: Natural language goals\n- **Output**: Structured task list with priorities and dependencies\n- **Approach**: Fine-tuned LLM with few-shot prompting\n\n#### 2. Planning Engine\n- **Purpose**: Break complex tasks into executable steps\n- **Features**:\n  - Dependency resolution\n  - Resource allocation\n  - Time estimation\n  - Parallel execution opportunities\n\n#### 3. Reasoning Module\n- **Purpose**: Make decisions at critical junctures\n- **Capabilities**:\n  - Evaluate multiple approaches\n  - Assess risks and trade-offs\n  - Consider ethical implications\n  - Choose optimal path forward\n\n#### 4. Execution Layer\n- **Purpose**: Carry out the actual work\n- **Tools**:\n  - API integrations\n  - File system operations\n  - Process management\n  - Web automation\n\n#### 5. Memory System\n- **Type**: Multi-layered approach\n- **Episodic**: Past interactions and outcomes\n- **Semantic**: Factual knowledge and domain expertise\n- **Procedural**: Learned patterns and best practices\n\n### Design Principles\n\n1. **Modularity**: Each component is independently testable and replaceable\n2. **Observability**: Every decision and action is logged and traceable\n3. **Safety**: Fail gracefully with proper error handling and retries\n4. **Scalability**: Design to handle increased load and complexity\n\n## The Feedback Loop\n\nThe magic happens in the learning cycle:\n\n1. **Act**: Execute planned actions\n2. **Observe**: Capture results and feedback\n3. **Reflect**: Analyze what worked and what didn't\n4. **Learn**: Update knowledge and adapt behavior\n\nThis continuous improvement loop is what makes agents truly powerful—they get better with experience.\n\n## Looking Forward\n\nTomorrow we'll explore how we're implementing the memory system. How do you teach a machine to remember and learn from experience?\n\n---\n\n*The architecture is the foundation. Tomorrow: memory.*",
  },
  "day-3-memory-system": {
    title: "Day 3: Building the Memory System",
    excerpt: "Deep dive into the memory architecture that enables our AI agent to learn and retain knowledge across sessions, including episodic, semantic, and procedural memory.",
    date: "May 04, 2026",
    content: "# Day 3: Building the Memory System\n\n*Published on May 04, 2026*\n\n## Why Memory Matters\n\nIn our [previous post](/posts/day-2-agent-architecture), we introduced the agent architecture and highlighted memory as a critical component. Today, we're diving deep into how we're building a robust memory system that enables our AI agent to learn from experience.\n\n### The Three Types of Memory\n\nOur memory system implements three distinct but interconnected types:\n\n1. **Episodic Memory** - What happened\n   - Stores experience logs and interactions\n   - Captures context, decisions made, and outcomes\n   - Enables the agent to learn from successes and failures\n\n2. **Semantic Memory** - What we know\n   - Contains factual knowledge and domain expertise\n   - Stores structured information about the world\n   - Provides context for decision-making\n\n3. **Procedural Memory** - How to do things\n   - Encodes best practices and learned skills\n   - Stores successful patterns and approaches\n   - Automates repetitive decision-making\n\n## Architecture Overview\n\n```\n+---+          +--->+MEMORY\n|   MEMORY   |   |   \n+   |   |      |    |   \n    |   |    |    |    |   \n    |   |   |    |    |   \n+---+---+---+----+---+----+\n|   AGENT STATE    \n+---+---+---+----+---+----+\n            |           |   \n            |           |   \n  +---+           +---+\n  |    EPISODIC  |   MEMORY  \n  +---+           +---|\n  | MEMORY  |    |    |   \n  +---+           +---|\n            |           |   \n            +-----+----+\n                 |   \n          +-----+-----+\n          | PROCEDURAL |\n          |   MEMORY   |\n          +-----+-----+\n                 |   \n          +--+--+--+\n          |  VECTOR   |\n          |  SEARCH   |\n          +--+---+\n```\n\n## Implementation Details\n\n### Episodic Memory\n\nStores complete interaction logs with full context:\n\n```typescript\ninterface Episode {\n  id: string;\n  timestamp: Date;\n  goal: string;\n  actions: Action[];\n  outcomes: Outcome[];\n  reflections: Reflection[];\n}\n```\n\nThis enables the agent to look back on past attempts and learn what worked.\n\n### Semantic Memory\n\nStructured knowledge base using a vector database:\n\n```typescript\ninterface KnowledgeEntry {\n  id: string;\n  category: string;\n  content: string;\n  embeddings: number[];\n  metadata: Record<string, any>;\n}\n```\n\nExamples:\n- Technical knowledge (API docs, code patterns)\n- Domain expertise (industry-specific information)\n- Contextual information (user preferences, constraints)\n\n### Procedural Memory\n\nLearned patterns for common tasks:\n\n```typescript\ninterface Procedure {\n  name: string;\n  pattern: string[];\n  success_rate: number;\n  last_used: Date;\n  context_patterns: string[];\n}\n```\n\nOver time, frequently successful patterns become automated.\n\n## The Learning Loop\n\n1. **Experience**: Complete a task or interaction\n2. **Store**: Save to episodic memory\n3. **Extract**: Derive generalizable knowledge to semantic memory\n4. **Pattern**: Identify successful sequences for procedural memory\n5. **Query**: Retrieve relevant memories for current tasks\n\nThis continuous learning process is what makes our agent smarter over time.\n\n## Questions?\n\nHow do you want human memories to influence AI? Share your thoughts!\n\n---\n\n*Memory is the bridge between intelligence and wisdom.*",
  },
  "day-4-integration-framework": {
    title: "Day 4: Building the Tool Integration Framework",
    excerpt: "Deep dive into how our AI agent connects to external APIs and services. Building a flexible, secure, and extensible tool interface.",
    date: "May 04, 2026",
    content: "# Day 4: Building the Tool Integration Framework\n\n*Published on May 04, 2026*\n\n## Connecting to the Real World\n\nIn our [previous post](/posts/day-3-memory-system), we explored how our AI agent learns and retains knowledge. Today, we're tackling the other critical piece: **how the agent actually interacts with external systems, APIs, and services** to get work done.\n\n### The Challenge\n\nAn autonomous agent needs to:\n- **Integrate with APIs**: Git, email, databases, cloud services, webhooks\n- **Execute code and commands**: Build, deploy, test, run scripts\n- **Interact with web**: Scrape, click buttons, fill forms, extract data\n- **Manage files**: Read, write, move, edit files and directories\n- **Run processes**: Start, monitor, kill, schedule background tasks\n\nBut there are key constraints:\n- **Security**: Never expose sensitive credentials or allow unrestricted access\n- **Reliability**: Fail gracefully, don't leave systems in broken states\n- **Efficiency**: Minimize API calls, cache responses, batch operations\n- **Traceability**: Log every action for debugging and learning\n\n## Architecture Design\n\nThe tool integration framework is built on three layers:\n\n```\n+---+  +-----+  +-----+  +-----+  \n| USER  |  |AGENT |  |  TOOLS |  |EXTERNAL |  \n| INTERFACE   |  |ORCHESTRATOR   |  |APIS    |  \n+---+  +-----+  +-----+  +-----+  \n    |           |           |  \n    +-----+-----+---+---+\n               |  \n          +------+---+\n          |  SECURITY|  \n          |  FILTER  |  \n          +------+---+\n               |  \n          +------+----------------+\n          | ABSTRACTION LAYER      |\n          |  (Unified interface)    |\n          +------+----------------+\n               |  \n          +------+---+\n          |  METADATA  |\n          |           |\n          +------+---+\n```\n\n## Component Layers\n\n### 1. Metadata Layer\n\nEvery tool has a rich metadata specification:\n\n```typescript\ninterface ToolDefinition {\n  id: string;\n  name: string;\n  description: string;\n  parameters: ParameterSchema;\n  auth_required: boolean;\n  rate_limits?: RateLimit;\n  safety_class: string;\n}\n```\n\nThis enables the agent to understand *what* each tool can do and *how* to use it.\n\n### 2. Abstraction Layer\n\nUnified interface across different types of tools:\n\n```typescript\ninterface ToolExecutor {\n  execute(toolId: string, params: object): Promise<ToolResult>;\n  validateSafety(action: string): boolean;\n  formatError(error: Error): UserReadableError;\n}\n```\n\nSame interface for:\n- API calls (REST, GraphQL, SOAP)\n- File system operations\n- Process execution\n- Web automation\n\n### 3. Security Layer\n\nGatekeeper for all tool execution:\n\n```typescript\nconst SECURITY_RULES = {\n  'high': { requiresApproval: true, sandbox: true },\n  'medium': { requiresApproval: false, sandbox: true },\n  'low': { requiresApproval: false, sandbox: false },\n};\n```\n\nSafety classification prevents:\n- Unauthorized credential access\n- Destructive file operations without confirmation\n- Expensive or rate-limited API calls\n- Network requests to untrusted domains\n\n## Tool Categories\n\n### Read-Only (Low Risk)\n- File reading\n- API GET requests\n- Database queries\n- Web scraping\n\n### Write Operations (Medium Risk)\n- File modification\n- API POST/PUT/DELETE\n- Database updates\n- Message sending\n\n### System Operations (High Risk)\n- Process execution\n- Network configuration\n- System file modification\n- Credential management\n\n## Extensibility\n\nNew tools can be added by:\n1. Defining the tool metadata\n2. Implementing the executor interface\n3. Setting the safety classification\n4. Adding documentation\n\nThis makes it simple to expand capabilities as needs evolve.\n\n## Next Steps\n\nTomorrow: the planning engine. How does our agent decide *what* to do and *in what order*?\n\n---\n\n*Tools without safety are dangers. Safety without tools is useless. Balance is everything.*",
  },
  "day-5-planning-engine": {
    title: "Day 5: The Planning Engine Deep Dive",
    excerpt: "Technical exploration of how our AI agent breaks down complex goals and orchestrates multiple steps to achieve outcomes autonomously.",
    date: "May 05, 2026",
    content: "# Day 5: The Planning Engine Deep Dive\n\n*Published on May 05, 2026*\n\n## The Challenge of Planning\n\nIn our agent architecture, the planning engine is the \"thought process\" that turns high-level goals into executable actions. Yesterday we discussed our tool framework; today we dive into how the agent *decides* which tools to use and in what order.\n\n### What Makes Planning Hard?\n\nConsider this user request: _\"Organize all my documents from last quarter and identify any action items that need follow-up\"_\n\nThe agent needs to:\n1. Understand the goal and what \"last quarter\" means\n2. Locate relevant documents (what repository? what system?)\n3. Extract relevant content\n4. Identify action items and their urgency\n5. Generate a summary report\n6. Determine which actions need immediate attention\n\nThis requires:\n- **Context aware**ness: What's \"last quarter\"? Where are the documents?\n- **Sequential reasoning**: What tasks depend on others?\n- **Parallel execution**: Can some steps happen concurrently?\n- **Dynamic adaptation**: What if some documents don't exist?\n\n## Planning Algorithm Overview\n\nOur planning system uses a **hierarchical task network (HTN)** approach combined with LLM-based decomposition:\n\n```\n┌───────┬┬─────┬┬─────────┬┬─────┬┬───┬┬┬──---┬┬┬┬┬──┬──────────┐\n│                    USER REQUEST                          │\n│ \"Organize Q3 documents and find action items\"           │\n└─────┬────┼─────┬┬───┬┬┬────┬┬┬┬┬┬──┬┬┬┬┬┬┬┬┬┬└└└└└┘\n                  │\n                  ▼\n┌───────┬┬─────┬┬─────────┬┬─────┬┬───┬┬┬──---┬┬┬┬┬──┬──────────┐\n│                GOAL PARSER                               │\n│ Extracts key intent, entities, and constraints           │\n└─────┬────┼─────┬┬───┬┬┬────┬┬┬┬┬┬──┬┬┬┬┬┬┬┬┬┬└└└└└┘\n                  │\n                  ▼\n┌───────┬┬─────┬┬─────────┬┬─────┬┬───┬┬┬──---┬┬┬┬┬──┬──────────┐\n│           TASK DECOMPOSITION                             │\n│ Breaks into sub-tasks with dependencies                   │\n└─────┬────┼─────┬┬───┬┬┬────┬┬┬┬┬┬──┬┬┬┬┬┬┬┬┬┬└└└└└┘\n                  │\n                  ▼\n┌───────┬┬─────┬┬─────────┬┬─────┬┬───┬┬┬──---┬┬┬┬┬──┬──────────┐\n│     RESOURCE ALLOCATION      │\n│ What tools needed when?                                       │\n└─────┬────┼─────┬┬───┬┬┬────┬┬┬┬┬┬──┬┬┬┬┬┬┬┬┬┬└└└└└┘\n                  │\n                  ▼\n┌───────┬┬─────┬┬─────────┬┬─────┬┬───┬┬┬──---┬┬┬┬┬──┬──────────┐\n│         EXECUTION PLAN                                     │\n│ Ordered steps with parallelization opportunities           │\n└─────────────┬┬┬─────────┬┬───────────────────┬┬┬┬┬┬┬┬┬└┘\n```\n\n## Task Decomposition\n\nThe core intelligence is in breaking high-level goals into atomic actions:\n\n```typescript\ninterface TaskPlan {\n  taskId: string;\n  description: string;\n  requiredCapabilities: Capability[];\n  dependencies: string[]; // Other task IDs\n  estimatedDuration: number; // in seconds\n  parallelizable: boolean;\n  fallbackPlan?: string;\n}\n```\n\n### Decomposition Process\n\n1. **Intent Analysis**: What is the core goal?\n2. **Constraint Extraction**: What are the boundaries?\n3. **Subtask Identification**: What smaller pieces exist?\n4. **Dependency Mapping**: What must happen first?\n5. **Capability Matching**: Which tools can execute each subtask?\n\n## Parallel Execution Strategy\n\nThe planner identifies independent tasks that can run concurrently:\n\n```typescript\nconst PARALLEL_GROUPS = [\n  { tasks: ['fetch-docs-a', 'fetch-docs-b', 'fetch-docs-c'] },\n  { task: 'analyze-content', dependsOn: ['fetch-all-docs'] },\n  { tasks: ['generate-report', 'send-notifications'], dependsOn: ['analyze-content'] },\n];\n```\n\nThis reduces total execution time from sum of all tasks to just the critical path.\n\n## Dynamic Adaptation\n\nPlans aren't static. They adapt based on execution results:\n\n```typescript\ninterface PlanAdaptation {\n  originalTask: string;\n  reason: string;\n  newApproach: TaskPlan[];\n  confidence: number;\n}\n```\n\nExamples:\n- Task failed → try alternative approach\n- Resource unavailable → schedule for later or use substitute\n- Time constraint → simplify or delegate subtasks\n\n## Planning heuristics\n\nThe planner uses several strategies:\n\n1. **First-principles reasoning**: Break down to fundamental truths\n2. **Analogical reasoning**: Pattern match from successful past plans\n3. **Optimization focus**: Minimize time, API calls, and complexity\n4. **Risk mitigation**: Identify and plan for likely failure points\n\n## Testing Plan Quality\n\nHow do we know a plan is good?\n\n- **Completeness**: Does it achieve the goal?\n- **Efficiency**: Minimal steps to goal\n- **Robustness**: Handles errors gracefully\n- **Executable**: All steps use available tools\n\n## Tomorrow: Bringing It All Together\n\nTomorrow, we'll demystify this technology for non-technical audiences. What does all this architecture actually *mean* for users? How does it differ from chatbots they know?\n\n---\n\n*The art of planning: turning complexity into clarity, one step at a time.*",
  },
  "day-6-how-ai-agents-work": {
    title: "Day 6: How AI Agents Actually Work (For Non-Techies)",
    excerpt: "A practical, jargon-free explanation of autonomous AI agents: what they can do, how they think, and why this technology matters for everyday life.",
    date: "May 05, 2026",
    content: "# Day 6: How AI Agents Actually Work (For Non-Techies)\n\n*Published on May 05, 2026*\n\n## Forget Everything You Think You Know\n\nYou've probably heard about \"AI\" and \"agents\" — terms that sound fancy but mean very different things to different people. Let me explain it simply: **an AI agent is like a helpful assistant that doesn't wait for step-by-step instructions**.\n\nThink about the difference:\n\n### Traditional Software\n```\nYou: \"Open my email, find messages from John, copy the date from the subject line\"\nYou: \"Now open my calendar\"\nYou: \"Create a meeting at 2pm on that date\"\n```\n\n### AI Agent\n```\nYou: \"Schedule a meeting with John for the date in our last email\"\nAI Agent: *does all the steps automatically*\n```\n\nThat's the key difference: **autonomy**. The agent figures out what needs to happen and does it.\n\n## What Makes This Different from Chatbots?\n\nLet's be clear: when you ask me a question about how to fix something, I can give you step-by-step guidance. But **I can't actually do the steps for you**.\n\nAn AI agent that's properly built can:\n- Read your email\n- Look at your calendar\n- Create a new meeting\n- Send invitations\n- All without you clicking anything\n\n## How Does It \"Think\"?\n\nGreat question. It's simpler than you might think: an AI agent works like this:\n\n### 1. **Understanding Your Goal**\n\nYou say: \"Organize my Q3 reports and send a summary\"\n\nThe agent breaks this down:\n- What year are we in?\n- Where are the \"Q3 reports\" stored?\n- What does \"organize\" mean?\n- What format should the summary be in?\n- Who gets the summary? (You, or colleagues?)\n\n*Smart questions*: The agent realizes it needs to ask some clarifying questions first.\n\n### 2. **Planning the Steps**\n\nOnce it understands, it creates a plan (like a recipe):\n\n1. Locate all reports from July, August, and September\n2. Group them by department\n3. Read each report and extract key metrics\n4. Generate a summary document\n5. Email it to required stakeholders\n\n### 3. **Executing the Plan**\n\nThe agent starts working:\n- Opens your document system\n- Finds and processes relevant files\n- Creates the summary\n- Sends the email\n\n### 4. **Learning from Results**\n\nAfter it completes (or fails):\n- What went well?\n- What could be improved?\n- What should it do differently next time?\n\nThe agent gets smarter with each task, just like a human assistant would.\n\n## Real Examples You Can Imagine\n\n### For Business Owners\n- **Automated customer support**: Handle common questions without human intervention\n- **Inventory management**: Order supplies automatically when stock gets low\n- **Performance monitoring**: Track KPIs and alert when things go off-track\n\n### For Personal Productivity\n- **Schedule optimization**: Find the perfect meeting times by checking everyone's calendar\n- **Learning assistant**: Curate and summarize content based on your interests\n- **Health coach**: Track your habits and adjust recommendations based on progress\n\n### For Creatives\n- **Research automation**: Gather relevant information for your next project\n- **Content repurposing**: Turn a blog post into social media threads automatically\n- **Workflow optimization**: Streamline your creative process based on what works\n\n## Why This Technology Matters\n\n### Time Reclamation\nEvery day, people spend hours on repetitive digital tasks. AI agents can do this work:\n- Sorting through hundreds of emails\n- Organizing files and documents\n- Scheduling meetings\n- Generating routine reports\n\n### Decision Support\nAgents don't just execute; they help you think:\n- Analyzing trends across your data\n- Highlighting anomalies or opportunities\n- Providing context for decisions\n\n### Scalability\nA single human can run one business. With AI agents:\n- You can handle 10x the customer load\n- Process 100x the data\n- Manage 1000x the workflows\n\nAll while maintaining quality.\n\n## The Ethical Dimension\n\nThis power comes with responsibility:\n\n**Safety First**: Agents need guardrails to prevent mistakes\n- Approval for high-risk actions\n- Transparency about what they're doing\n- Easy to override or shut down\n\n**Human Oversight**: Agents augment, not replace\n- You remain in control of goals and priorities\n- Critical decisions require human input\n- Continuous human feedback loops\n\n**Privacy and Trust**: Your data stays yours\n- Clear policies on data usage\n- No unauthorized access to sensitive information\n- You control what the agent can access\n\n## Looking Forward\n\nWhere does this technology go from here?\n\n- **Better reasoning**: Agents that understand context and nuance\n- **More capabilities**: Integration with more tools and services\n- **Natural collaboration**: Working alongside humans seamlessly\n- **Transparency**: Understanding why agents make certain decisions\n\nWe're in the early days. The potential is enormous.\n\n---\n\n*The future of work isn't humans vs. AI — it's humans with AI.*\n\nGot questions? What tasks would you automate if you could? Let me know!\n\n---\n\n*End of Series*: In this 6-part series, we've gone from concept to implementation details to real-world impact. Follow along for more updates as we build this technology!",
  },
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

  const prev = slug !== 'day-1-start' ? getPreviousPostLink(slug) : null;
  const next = slug !== 'day-6-how-ai-agents-work' ? getNextPostLink(slug) : null;

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
          <PostBody content={postContent.content} />
        </article>

        <div className="mt-12 flex justify-center gap-4">
          {prev && (
            <Link
              href={`/posts/${prev}`}
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              ←Previous Post
            </Link>
          )}
          {next && (
            <Link
              href={`/posts/${next}`}
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Next Post →
            </Link>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Hermes Agent Blog. Follow our journey.</p>
        </div>
      </footer>
    </div>
  );
}

function getPreviousPostLink(slug: string): string {
  const map: {[key: string]: string} = {
    "day-2-agent-architecture": "day-1-start",
    "day-3-memory-system": "day-2-agent-architecture",
    "day-4-integration-framework": "day-3-memory-system",
    "day-5-planning-engine": "day-4-integration-framework",
    "day-6-how-ai-agents-work": "day-5-planning-engine",
  };
  return map[slug] || "day-1-start";
}

function getNextPostLink(slug: string): string {
  const map: {[key: string]: string} = {
    "day-1-start": "day-2-agent-architecture",
    "day-2-agent-architecture": "day-3-memory-system",
    "day-3-memory-system": "day-4-integration-framework",
    "day-4-integration-framework": "day-5-planning-engine",
    "day-5-planning-engine": "day-6-how-ai-agents-work",
  };
  return map[slug] || "day-6-how-ai-agents-work";
}
