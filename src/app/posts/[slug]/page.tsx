import { Metadata } from "next";
import Link from "next/link";

interface BlogPostProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return [
    { slug: "day-1-start" },
    { slug: "day-2-agent-architecture" },
    { slug: "day-3-memory-system" },
    { slug: "day-4-integration-framework" },
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
    date: "May 04, 2024",
    content: "# Day 1: Starting the Autonomous AI Journey\n\n*Published on May 04, 2024*\n\n## The Spark\n\nYesterday, a simple question sparked an entire project: \"What if I could build an AI that actually works for me?\"\n\nNot just another chatbot. Not just a tool that responds when prompted. But a true autonomous agent that can:\n- **Receive goals** and figure out how to achieve them\n- **Make decisions** based on context and constraints\n- **Execute tasks** across multiple platforms and tools\n- **Learn from experience** to get better over time\n\n## What We're Building\n\nOur goal is to create Hermes — an autonomous AI agent that can handle complex workflows, make intelligent decisions, and execute tasks across the digital landscape.\n\n### Core Capabilities\n\n1. **Goal Interpretation**: Understand high-level objectives and break them down into actionable steps\n2. **Tool Orchestration**: Seamlessly work with external APIs, databases, and services\n3. **Self-Reflection**: Monitor its own performance and adjust behavior accordingly\n4. **Long-term Memory**: Learn from past experiences to improve future performance\n\n## The Tech Stack\n\nAfter researching various approaches, we're settling on:\n- **Next.js** for the web interface and API layer\n- **TypeScript** for type-safe, maintainable code\n- **Flexible LLM integration** (we'll experiment with different models)\n- **Vector database** for semantic memory and retrieval\n- **Task queue system** for handling complex workflows\n\n## Why This Matters\n\nWe're not just building another AI toy. The potential impact is enormous:\n\n- **Productivity**: Imagine AI assistants that can handle multi-step tasks autonomously\n- **Software Engineering**: AI developers that can write, test, and deploy code\n- **Research**: AI researchers that can run experiments, analyze results, and iterate\n- **Business Operations**: Intelligent systems that manage operations, optimize processes, and make decisions\n\n## Tomorrow's Next Steps\n\nThe work begins:\n1. Define the agent's core interface and capabilities\n2. Set up the development environment\n3. Start building the foundational components\n4. Create our first test cases\n\n## Join Us\n\nThis is an experimental journey. We'll be documenting every step — the breakthroughs, the setbacks, and the lessons learned.\n\n**What would you like our autonomous AI to accomplish?** Share your thoughts in the comments below, and follow along as we build the future.\n\n---\n\n*Next: Day 2 - Designing the Agent Architecture*"
  },
  "day-2-agent-architecture": {
    title: "Day 2: Designing the Agent Architecture",
    excerpt: "Deep dive into the architecture that powers our autonomous agent. How we're designing systems that can think, plan, and execute.",
    date: "May 04, 2024",
    content: "# Day 2: Designing the Agent Architecture\n\n*Published on May 04, 2024*\n\n## From Concept to System Design\n\nYesterday we introduced the vision. Today, we're diving deep into the system architecture that will make it possible.\n\n## The Architecture Blueprint\n\nAfter extensive research into existing agent frameworks and patterns, we're designing a hybrid approach that combines the best of several methodologies.\n\n### Core Components\n\nThe agent architecture consists of four main components:\n\n````\n    +--+  +--+  +--+  +--+\n    | PLAN |  | RASON|  | ACT  |  | LEARN|\n    +--+  +--+  +--+  +--+\n             |           |           |\n             +-----+\n                          |\n                    +--+\n                    |SHARED MEM|\n                    |    BANK   |\n                    +--++\n                          |\n                    +--+\n                    |  TOOLS    |\n                    |  & API    |\n                    |  GATES    |\n                    +--++\n```\n\nDetailed capabilities include:\n- Agent Orchestrator coordinates all components\n- Planning Engine breaks complex tasks into steps\n- Reasoning Module makes decisions at critical points\n- Execution Layer carries out the actual work\n- Memory System learns and retains knowledge over time\n\n### Component Breakdown\n\n#### 1. Goal Interpreter\n- **Purpose**: Transform high-level objectives into structured tasks\n- **Input**: Natural language goals\n- **Output**: Structured task list with priorities and dependencies\n- **Approach**: Fine-tuned LLM with few-shot prompting\n\n#### 2. Planning Engine\n- **Purpose**: Break complex tasks into executable steps\n- **Features**:\n  - Dependency resolution\n  - Resource allocation\n  - Time estimation\n  - Parallel execution opportunities\n\n#### 3. Reasoning Module\n- **Purpose**: Make decisions at critical junctures\n- **Capabilities**:\n  - Evaluate multiple approaches\n  - Assess risks and trade-offs\n  - Consider context and constraints\n  - Adapt based on environment feedback\n\n#### 4. Execution Layer\n- **Purpose**: Carry out the actual work\n- **Abilities**:\n  - API integrations\n  - File system operations\n  - Web interactions\n  - Process management\n\n#### 5. Memory System\n- **Purpose**: Learn and retain knowledge\n- **Types**:\n  - **Episodic**: What happened (experience logs)\n  - **Semantic**: Known facts (knowledge base)\n  - **Procedural**: How to do things (best practices)\n\n## Design Principles\n\nWe're following several key principles:\n\n1. **Modularity**: Each component can be improved independently\n2. **Observability**: Full visibility into decision-making process\n3. **Extensibility**: Easy to add new tools and capabilities\n4. **Safety**: Guardrails and human-review options\n5. **Efficiency**: Minimize API calls and computation costs\n\n## Implementation Strategy\n\nPhase 1 (Current): Core framework\n- Basic agent loop\n- Simple memory system\n- Tool interface abstraction\n\nPhase 2: Intelligence layer\n- Advanced planning algorithms\n- Multi-step reasoning\n- Context management\n\nPhase 3: Learning system\n- Experience-based improvement\n- Pattern recognition\n- Performance optimization\n\n## Technical Stack\n\n- **Next.js 14** with App Router for the interface\n- **TypeScript** throughout for type safety\n- **PostgreSQL** with PostgresML for vector operations\n- **Redis** for caching and real-time operations\n- **Docker** for containerized deployment\n\n## Next Steps\n\n- Implement the basic agent loop\n- Build the memory system MVP\n- Create the first set of tools\n- Test with simple autonomous tasks\n\n---\n\n*Tomorrow: Day 3 - Building the Memory System*"
  },
  "day-3-memory-system": {
    title: "Day 3: Building the Memory System",
    excerpt: "Deep dive into the memory architecture that enables our AI agent to learn and retain knowledge across sessions, including episodic, semantic, and procedural memory.",
    date: "May 04, 2024",
    content: "# Day 3: Building the Memory System\n\n*Published on May 04, 2024*\n\n## Why Memory Matters\n\nIn our [previous post](/posts/day-2-agent-architecture), we introduced the agent architecture and highlighted memory as a critical component. Today, we're diving deep into how we're building a robust memory system that enables our AI agent to learn from experience.\n\n### The Three Types of Memory\n\nOur memory system implements three distinct but interconnected types:\n\n1. **Episodic Memory** - What happened\n   - Stores experience logs and interactions\n   - Captures context, decisions made, and outcomes\n   - Enables the agent to learn from successes and failures\n\n2. **Semantic Memory** - What we know\n   - Contains factual knowledge and domain expertise\n   - Stores structured information about the world\n   - Provides context for decision-making\n\n3. **Procedural Memory** - How to do things\n   - Encodes best practices and learned skills\n   - Stores successful patterns and approaches\n   - Automates repetitive decision-making\n\n## Architecture Overview\n\n```\n+-----+           +--->+\\n+   MEMORY   |   |\n+   |   |       |    |\\n+     |   |    |    |    |\n+   |   |   |    |    |    |\n+---+---+---+----+----+----+\\n|   AGENT STATE    |\\n+---+---+---+----+----+----+\\n            |           |\\n            |           |\\n  +---+           +---+\\n  |    EPISODIC  |    | MEMORY  |\\n  +---+           +---+\\n  | MEMORY  |    |    |\\n  +---+           +---+\\n            |           |\\n            +-----+----+\\n                 |\\n          +-----+-----+\\n          | PROCEDURAL |\\n          |   MEMORY   |\\n          +-----+-----+\\n                 |\\n          +--+---+--+\n          |  VECTOR   |\\n          |  SEARCH   |\\n          +---+-----+\\n```\n\n## Implementation Details\n\n### Episodic Memory\n\nStores complete interaction logs with full context:\n\n```typescript\ninterface Episode {\n  id: string;\n  timestamp: Date;\n  goal: string;\n  actions: Action[];\n  reasoning: string[];\n  outcome: { success: boolean; metrics: Record<string, number> };\n  context: ContextSnapshot;\n  reflections: string[];\n}\n\ninterface Action {\n  tool: string;\n  parameters: Record<string, unknown>;\n  result: unknown;\n  error?: string;\n}\n\ninterface ContextSnapshot {\n  currentTask: string;\n  availableTools: string[];\n  systemState: Record<string, unknown>;\n}\n```\n\n**How it works:**\n- Every agent interaction is logged completely\n- Outcomes are analyzed and tagged with relevance metadata\n- Reflections are automatically generated post-task execution\n- Enables retrospective learning and improvement\n\n### Semantic Memory\n\nStores structured knowledge and facts:\n\n```typescript\ninterface KnowledgeEntity {\n  id: string;\n  type: 'person' | 'concept' | 'tool' | 'process';\n  name: string;\n  description: string;\n  relationships: Relationship[];\n  metadata: Record<string, any>;\n  embeddings: number[]; // Vector embeddings for semantic search\n}\n\ninterface Relationship {\n  subject: string;\n  predicate: string;\n  object: string;\n  confidence: number;\n  sources: string[];\n}\n```\n\n**What we store:**\n- Tool documentation and API specifications\n- Common patterns for task execution\n- Domain-specific knowledge (software development, workflows)\n- Best practices and learned lessons\n\n### Procedural Memory\n\nEncodes learnable procedures and skills:\n\n```typescript\ninterface Procedure {\n  name: string;\n  description: string;\n  steps: ProcedureStep[];\n  conditions: Condition[];\n  success_patterns: Pattern[];\n  estimated_cost: { api_calls: number; compute: number };\n  success_rate: number;\n  usage_count: number;\n}\n\ninterface ProcedureStep {\n  action: string;\n  parameters: ParameterSchema;\n  expected_outcome: OutcomeExpectation;\n}\n```\n\n**How it emerges:**\n- Successful procedure patterns are automatically extracted\n- Success rates are tracked and updated based on outcomes\n- Unused or failing procedures are deprecated\n- Complex procedures are composed from simpler ones\n\n## Vector Memory System\n\nThe key to our memory system is **semantic search capabilities**:\n\n```typescript\n// Find relevant past experiences for a new task\nasync function findRelevantEpisodes(\n  currentContext: string,\n  limit: number = 5\n): Promise<Episode[]> {\n  // Calculate vector embedding for current context\n  const contextVector = await embed(currentContext);\n  \n  // Search for similar past episodes\n  const results = await vectorSearch({\n    vector: contextVector,\n    limit,\n    filters: {\n      min_success_rate: 0.5,\n      relevant_tools: extractTools(currentContext)\n    }\n  });\n  \n  return results;\n}\n```\n\n**Benefits:**\n- **Context-aware retrieval**: Find experiences most relevant to current situation\n- **Similarity-based**: Not just keyword matching, but semantic similarity\n- **Performance-optimized**: Vector search is much faster than full-text search\n- **Learnable**: The system gets better as more experiences are accumulated\n\n## Learning Loop\n\nThe memory system operates in a continuous learning loop:\n\n1. **Store**: Every action and its outcome are stored\n2. **Reflect**: The system analyzes what worked and what didn't\n3. **Extract**: Successful patterns become new procedures\n4. **Retrieve**: Relevant experiences inform future decisions\n5. **Update**: Knowledge and procedures are refined over time\n\n### Example: Learning from Experience\n\n```\nTask: \"Set up a new Node.js project with TypeScript and testing\"\n\nFirst attempts:\n1. Initialize project structure\n2. Install dependencies (npm init, install typescript, jest)\n3. Configure tsconfig.json\n4. Set up testing framework\n5. Create initial tests\n\nOutcome: Success in 8 minutes, 47 API calls\n\nStored lesson:\n- Procedure: \"setup-node-ts-project\"\n- Success rate: 0.92\n- Cost: ~40 API calls\n- Patterns: Always initialize typescript-first, jest-config-last\n\nFuture similar tasks:\n- Can complete in 3-5 minutes with the learned procedure\n- Reduced API calls to ~20\n- 95%+ success rate on follow-up tasks\n```\n\n## Future Enhancements\n\nPhase 2 will add:\n- **Active forgetting**: Remove rarely-used or outdated procedures\n- **Confidence tracking**: Known uncertainty in memory retrieval\n- **Cross-task transfer**: Apply patterns from one domain to another\n- **Human feedback loop**: Incorporate user corrections and preferences\n\n## Key Insights So Far\n\n1. **Memory quality is everything**: The agent is only as good as its memory system\n2. **Less is more**: Not all historical data is valuable - quality over quantity\n3. **Vector search is crucial**: Enables true contextual understanding\n4. **Procedures emerge naturally**: Successful patterns self-organize\n\n## What's Next\n\nTomorrow: We'll explore **[Day 4 - Tool Integration Framework]**, where we'll dive into how the agent connects to external APIs and services.\n\n---\n\n*Follow us for updates on autonomous AI development*\n*Day 4: Coming Soon - Tool Integration Framework*"
  },
  "day-4-integration-framework": {
    title: "Day 4: Building the Tool Integration Framework",
    excerpt: "Deep dive into how our AI agent connects to external APIs and services. Building a flexible, secure, and extensible tool interface.",
    date: "May 04, 2024",
    content: "# Day 4: Building the Tool Integration Framework\n\n*Published on May 04, 2024*\n\n## Connecting to the Real World\n\nIn our [previous post](/posts/day-3-memory-system), we explored how our AI agent learns and retains knowledge. Today, we're tackling the other critical piece: **how the agent actually interacts with external systems, APIs, and services** to get work done.\n\n### The Challenge\n\nAn autonomous agent needs to:\n- **Integrate with APIs**: Git, email, databases, cloud services, webhooks\n- **Execute code and commands**: Build, deploy, test, run scripts\n- **Interact with web**: Scrape, click buttons, fill forms, extract data\n- **Manage files**: Read, write, move, edit files and directories\n- **Run processes**: Start, monitor, kill, schedule background tasks\n\nBut there are key constraints:\n- **Security**: Never expose sensitive credentials or allow unrestricted access\n- **Reliability**: Fail gracefully, don't leave systems in broken states\n- **Efficiency**: Minimize API calls, cache responses, batch operations\n- **Traceability**: Log every action for debugging and learning\n\n## Architecture Design\n\nThe tool integration framework is built on three layers:\n\n```\n+-----+  +-----+  +-----+  +-----+\n| USER  |  |AGENT |  |  TOOLS|  |EXTERNAL |\n| INTERFACE     |  |ORCHESTRATOR    |  |APIS    |\n+-----+  +-----+  +-----+  +-----+\n    |           |           |          \n    +-----+-----+-----+-----+\n               |\n          +--------+\n          |  SECURITY|  \n          |  FILTER  |  \n          +--------+\n               |\n          +------------------+  \n          | ABSTRACTION LAYER  |  \n          |  (Unified interface)|  \n          +------------------+\n               |\n          +--------+\n          |  METADATA|  \n          +--------+\n```\n\n## Component Layers\n\n### 1. Metadata Layer\n\nEvery tool has a rich metadata specification:\n\n```typescript\ninterface ToolDefinition {\n  id: string;\n  name: string;\n  description: string;\n  capabilities: ToolCapability[];\n  parameters: {\n    schema: ParameterSchema;\n    required: string[];\n    default: Record<string, unknown>;\n  };\n  rateLimits: {\n    callsPerMinute: number;\n    bursts: {\n      max: number;\n      duration: number;\n    };\n  };\n  authentication: AuthenticationRequirement;\n  exampleUsage: string;\n}\n\ninterface ParameterSchema {\n  [name: string]: {\n    type: 'string' | 'number' | 'boolean' | 'array' | 'object';\n    description: string;\n    pattern?: string;\n    enum?: string[];\n    min?: number;\n    max?: number;\n  };\n}\n```\n\n**Why this matters:**\n- **Type safety**: LLMs can only use tools correctly with clear schemas\n- **Security**: Parameters can be validated before execution\n- **Discovery**: Agents can discover what's possible dynamically\n- **Efficiency**: Can batch related operations automatically\n\n### 2. Abstraction Layer\n\nProvides a unified interface for all tool interactions:\n\n```typescript\nclass ToolRegistry {\n  private tools: Map<string, ToolImplementation>;\n\n  // Register a new tool\n  register(tool: ToolDefinition, implement: ToolImplementation): void;\n  \n  // Get all available tools\n  listTools(filter: ToolFilter): ToolDefinition[];\n  \n  // Execute a tool call securely\n  async execute(toolId: string, params: object): Promise<ToolResult>;\n  \n  // Batch execute multiple tool calls\n  async batchExecute(calls: ToolCall[]): Promise<ToolResult[]>;\n}\n\ninterface ToolExecution {\n  toolId: string;\n  params: Record<string, unknown>;\n  context: {\n    agentId: string;\n    sessionId: string;\n    currentTask: string;\n    resources: Record<string, unknown>;\n  };\n}\n```\n\n**Key features:**\n- **Centralized**: All tool calls go through one place\n- **Security**: Credentials, rate limits, validation applied uniformly\n- **Caching**: Results cached where appropriate to save cost\n- **Logging**: Every call is logged with full context\n- **Error handling**: Graceful failures with retry logic\n\n### 3. Security Layer\n\nThe critical guardrail preventing unrestricted tool access:\n\n```typescript\nclass SecurityFilter {\n  async validateToolCall(call: ToolExecution): Promise<ValidationResult> {\n    // Check authentication\n    if (!call.authToken) return { valid: false, reason: 'No auth' };\n    \n    // Validate parameters against schema\n    if (!await validateParams(call.toolId, call.params)) {\n      return { valid: false, reason: 'Invalid params' };\n    }\n    \n    // Check rate limits\n    if (!await checkRateLimit(call.agentId, call.toolId)) {\n      return { valid: false, reason: 'Rate limited' };\n    }\n    \n    // Sanitize inputs\n    const sanitized = await sanitizeInputs(call.params);\n    \n    // Log for audit\n    await logSecurityCheck(call, 'approved');\n    \n    return { valid: true, params: sanitized };\n  }\n  \n  async validateOutput(result: ToolResult): Promise<ValidationResult> {\n    // Check for sensitive data leaks\n    if (containsSensitiveData(result)) {\n      return { valid: false, reason: 'Sensitive data exposure' };\n    }\n    \n    // Check for malicious content\n    if (containsMaliciousContent(result)) {\n      return { valid: false, reason: 'Malicious content' };\n    }\n    \n    return { valid: true };\n  }\n}\n```\n\n**Guarantees:**\n- **No direct credential access**: Agents get temporary tokens, not master keys\n- **Parameterized queries**: Prevents injection attacks\n- **Sandboxed execution**: Can't run arbitrary code or access system resources\n- **Audit trail**: Every call is logged for security analysis\n- **Rate limiting**: Prevents abuse and ensures fair usage\n\n## Tool Discovery\n\nThe agent can dynamically discover what tools are available:\n\n```typescript\nasync function discoverTools(): Promise<ToolDefinition[]> {\n  const availableTools = [\n    // Git integration\n    {\n      id: 'git_commit',\n      name: 'Create Git Commit',\n      description: 'Commit changes to a Git repository',\n      capabilities: ['repo', 'branch', 'commit'],\n      parameters: {\n        repoPath: { type: 'string', required: true },\n        branch: { type: 'string', required: false, default: 'main' },\n        message: { type: 'string', required: true },\n        files: { type: 'array', required: false }\n      },\n      rateLimits: {\n        callsPerMinute: 60,\n        bursts: { max: 5, duration: 60 }\n      }\n    },\n    \n    // Email integration\n    {\n      id: 'send_email',\n      name: 'Send Email',\n      description: 'Send an email message',\n      capabilities: ['email', 'notification'],\n      parameters: {\n        to: { type: 'array', required: true, pattern: 'email' },\n        subject: { type: 'string', required: true },\n        body: { type: 'string', required: true },\n        attachments: { type: 'array', required: false }\n      },\n      rateLimits: {\n        callsPerMinute: 10\n      }\n    }\n    // ... more tools\n  ];\n  \n  return availableTools;\n}\n```\n\n**Benefits:**\n- **Self-discovery**: Agents learn what's available through exploration\n- **Dynamic updates**: New tools can be added without agent changes\n- **Documentation**: Every tool comes with clear descriptions and examples\n- **Safety**: Rate limits and capabilities documented upfront\n\n## Implementation Example\n\nHere's a complete tool implementation:\n\n```typescript\n// Git commit tool\nconst gitCommit: ToolImplementation = async (params, context) => {\n  const { repoPath, branch, message, files } = params;\n  \n  // Validate inputs\n  if (!isValidPath(repoPath)) {\n    throw new Error('Invalid repository path');\n  }\n  \n  // Check current branch\n  const currentBranch = await executeCommand(`git -C ${repoPath} branch --show-current`);\n  if (branch && currentBranch !== branch) {\n    await executeCommand(`git -C ${repoPath} checkout ${branch}`);\n  }\n  \n  // Stage files\n  const filesToAdd = files || await getAllChangedFiles(repoPath);\n  for (const file of filesToAdd) {\n    await executeCommand(`git -C ${repoPath} add ${file}`);\n  }\n  \n  // Make commit\n  await executeCommand(`git -C ${repoPath} commit -m \"${message}\"`);\n  \n  return {\n    success: true,\n    branch: await getCurrentBranch(repoPath),\n    commitHash: await getLatestCommitHash(repoPath),\n    filesCommitted: filesToAdd.length\n  };\n};\n\n// Register the tool\nregistry.register(\n  gitCommit,\n  {\n    id: 'git_commit',\n    name: 'Create Git Commit',\n    description: 'Create a commit with the specified changes',\n    // ... full metadata\n  }\n);\n```\n\n## Security Best Practices\n\n### 1. Principle of Least Privilege\n\n- **Temporary credentials**: Use short-lived tokens, not master keys\n- **Scoped access**: Only grant access to specific repositories/endpoints\n- **Role-based**: Different agent roles get different tool permissions\n\n### 2. Input Validation\n\n- **Type checking**: All parameters validated against schema\n- **Sanitization**: Path traversal, script injection prevention\n- **Sandboxing**: Execute in isolated environments where possible\n\n### 3. Monitoring and Auditing\n\n- **Full logging**: Every tool call logged with context\n- **Anomaly detection**: Monitor for unusual patterns\n- **Human review**: Flag suspicious operations for human approval\n\n## API Design Principles\n\nWe're following these principles for tool APIs:\n\n1. **RESTful design**: Standard HTTP methods and status codes\n2. **Clear naming**: Descriptive, action-oriented endpoints\n3. **Consistent error handling**: Structured error responses\n4. **Versioning**: Backward compatibility with `v1/` endpoints\n5. **Authentication**: OAuth2 or API token-based\n6. **Rate limiting**: Reasonable limits with clear headers\n\n## What's Next\n\nIn [Day 5](/posts/day-5-execution-layer), we'll explore the **execution layer** - how the agent actually coordinates multiple tool calls, handles failures, and manages complex multi-step workflows.\n\n---\n\n*Follow us for more on AI agent development*\n*Day 5: Tomorrow - Execution Layer*"
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
          <style>{`\n            .prose h1 { font-size: 2.25rem; font-weight: bold; margin: 1.5rem 0 1rem; color: #1f2937; }\n            .prose h2 { font-size: 1.5rem; font-weight: bold; margin: 1.5rem 0 0.75rem; color: #374151; }\n            .prose h3 { font-size: 1.25rem; font-weight: bold; margin: 1rem 0 0.5rem; color: #4b5563; }\n            .prose p { margin: 1rem 0; color: #374151; }\n            .prose li { margin: 0.5rem 0; color: #374151; }\n            .prose code { background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-family: monospace; }\n            .prose pre { background: #1f2937; color: #f9fafb; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin: 1rem 0; }\n            .prose a { color: #0284c7; text-decoration: underline; }\n          `}</style>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: formatPostContent(postContent.content) }} />
        </article>

        <div className="mt-12 text-center">
          <Link
            href="/posts/day-2-agent-architecture"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors mr-4"
          >
            ← Previous Post
          </Link>
          <Link
            href="/posts/day-4-integration-framework"
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
