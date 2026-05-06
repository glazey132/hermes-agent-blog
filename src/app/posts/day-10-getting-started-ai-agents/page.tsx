'use client';

import Link from 'next/link';

type Posts = Record<PostSlug, PostContent>;

type PostSlug = 
  | 'day-9-memory-implementation'
  | 'day-10-getting-started-ai-agents';

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

**Today we're going under the hood** of our memory system to examine the actual code architecture, database schemas, and retrieval strategies that enable our AI agent to learn across sessions.

## The Problem We're Solving

As we discussed on [Day 3](/posts/day-3-memory-system), autonomous agents need memory to:
- Remember past interactions with users
- Retain learnings from successful/failure patterns
- Access factual knowledge when making decisions
- Provide contextual awareness across multi-step tasks

But **how do you actually build this** in practice? That's what we're tackling today.

## Architecture Overview

Our memory bank is built on a **hybrid architecture** combining:

### 1. Vector Database (Semantic Search)
**We use Pinecone** for high-dimensional embedding storage and similarity检索.

```typescript
// Memory Bank Interface
interface MemoryBank {
  episodic: EpisodicStore;
  semantic: SemanticStore;
  procedural: ProceduralStore;
}
```

**Why vector database?** 
- Enables semantic similarity search (not just keyword matching)
- Handles billions of embeddings efficiently
- Naturally captures the meaning of contexts and queries

### 2. Hierarchical Storage Layers

```typescript
// Layer 1: Raw Interaction Log (Episodic)
class EpisodicStore {
  async storeInteraction(interaction: {
    timestamp: Date;
    goal: string;
    actions: Action[];
    outcomes: Outcome[];
    reflection?: string;
  }): Promise<string> {
    const id = await generateUUID();
    // Store in PostgreSQL with full JSON payload
    await this.db.insert('interactions', { id, ...interaction });
    
    // Create embeddings for semantic search
    const embedding = await generateEmbedding(interaction.goal);
    await this.vectorDB.insert(id, embedding, {
      context: interaction.goal,
      type: 'episodic'
    });
    
    return id;
  }
}
```

## Implementation: Episodic Memory

### Schema Design

**PostgreSQL for structured storage**:

```sql
CREATE TABLE interactions (
  id UUID PRIMARY KEY,
  timestamp TIMESTAMPT DEFAULT NOW(),
  user_goal TEXT NOT NULL,
  plan JSONB,
  actions JSONB,
  outcomes JSONB,
  reflection TEXT,
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_interactions_timestamp ON interactions(timestamp DESC);
CREATE INDEX idx_interactions_type ON interactions(metadata->>'type');
```

**This gives us:**
- Fast timestamp queries for chronological browsing
- Flexible JSON-based metadata for categorization
- Full audit trail of all agent actions

### Example: Storing an Interaction

```typescript
const episode = await episodicStore.storeInteraction({
  timestamp: new Date(),
  goal: "Organize my Q3 documents and identify action items",
  actions: [
    { tool: "file-search", args: { query: "Q3*", directory: "/docs" }, result: [...files] },
    { tool: "document-parser", args: { id: "doc-42" }, result: "Extracted 15 pages of content" },
    { tool: "ai-analyzer", args: { text: "Q3 sales report...", task: "identify action items" }, result: "Found 3 action items: 1. Follow up with sales team 2. Update forecast 3. Review budget allocation" }
  ],
  outcomes: [
    { status: "success", metric: "documents_processed", value: 42 },
    { status: "success", metric: "action_items_found", value: 3 }
  ],
  reflection: "Agent successfully parsed and analyzed Q3 documents. Future improvement: Add document categorization to reduce search time."
});
```

## Semantic Memory: Knowledge Storage

**What makes semantic memory special?** It stores **facts and knowledge** independent of specific interactions.

```typescript
class SemanticStore {
  // Store domain knowledge
  async storeFact(topic: string, fact: string): Promise<void> {
    const embedding = await generateEmbedding(fact);
    
    await this.vectorDB.upsert('knowledge', {
      id: \`\${topic}:\${fact.substring(0, 20)}\`,
      vector: embedding,
      data: {
        topic,
        fact,
        source: 'expert-knowledge',
        lastUpdated: new Date()
      }
    });
  }
  
  // Query by similarity
  async searchKnowledge(query: string, limit: number = 5): Promise<Knowledge[]> {
    const queryEmbedding = await generateEmbedding(query);
    
    return this.vectorDB.similaritySearch('knowledge', {
      vector: queryEmbedding,
      filter: { topic: { $in: ['finance', 'tech', 'productivity'] } },
      limit
    });
  }
}
```

### Knowledge Categorization

We tag knowledge with **topics and contexts**:

```typescript
interface Knowledge {
  topic: 'general' | 'finance' | 'tech' | 'productivity' | 'health';
  fact: string;
  confidence: 0-1;
  sources: string[];
  lastUsed: Date;
  usageCount: number;
}
```

**Why categorization matters:**
- Better retrieval for domain-specific queries
- Easier knowledge maintenance and updates
- Context-aware suggestions

## Procedural Memory: Best Practices

**This is where we encode "how to do things successfully"** based on past experiences.

```typescript
class ProceduralStore {
  // Learn from successful patterns
  async learnPattern(successPattern: {
    context: string;
    actions: Action[];
    outcome: 'very_satisfied' | 'satisfied' | 'neutral';
  }): Promise<void> {
    const patternId = await generateUUID();
    
    // Store the successful sequence
    await this.db.insert('procedural_patterns', {
      id: patternId,
      context: successPattern.context,
      action_sequence: successPattern.actions,
      success_score: successPattern.outcome === 'very_satisfied' ? 3 : 
                     successPattern.outcome === 'satisfied' ? 2 : 1,
      usage_count: 0,
      learned_at: new Date()
    });
    
    // Create embedding for pattern matching
    const contextEmbedding = await generateEmbedding(successPattern.context);
    await this.vectorDB.insert('patterns', {
      id: patternId,
      vector: contextEmbedding,
      data: { patternId }
    });
  }
  
  // Retrieve optimal pattern for current context
  async findOptimalPattern(context: string): Promise<ProceduralPattern[]> {
    const contextEmbedding = await generateEmbedding(context);
    
    const similarPatterns = await this.vectorDB.similaritySearch('patterns', {
      vector: contextEmbedding,
      limit: 3
    });
    
    // Sort by historical success score
    return this.db.query('SELECT * FROM procedural_patterns WHERE id IN (...) ORDER BY success_score DESC');
  }
}
```

## Retrieval Strategies

### Multi-Level Search

When the agent needs information, it performs **hierarchical retrieval**:

```typescript
async retrieveRelevantMemory(context: {
  userGoal: string;
  currentTask: string;
  timeContext: Date;
}): Promise<MemoryResult[]> {
  const results: MemoryResult[] = [];
  
  // Level 1: Procedural patterns (has the agent solved this before?)
  const patterns = await proceduralMemory.findOptimalPattern(context.userGoal);
  if (patterns.length > 0) {
    results.push({
      type: 'procedural',
      confidence: 0.9,
      data: patterns[0],
      relevance: 'high'
    });
  }
  
  // Level 2: Episodic memories (similar past interactions?)
  const similarEpisodes = await episodicMemory.findSimilar(context.userGoal);
  if (similarEpisodes.length > 0) {
    results.push({
      type: 'episodic',
      confidence: 0.8,
      data: similarEpisodes.slice(0, 3),
      relevance: 'high'
    });
  }
  
  // Level 3: Semantic knowledge (what do we know about this?)
  const semanticResults = await semanticMemory.searchKnowledge(context.currentTask);
  if (semanticResults.length > 0) {
    results.push({
      type: 'semantic',
      confidence: 0.7,
      data: semanticResults,
      relevance: 'medium'
    });
  }
  
  // Combine and rank by overall relevance
  return sortByRelevance(results);
}
```

### Embedding Strategy

We use **multiple embedding dimensions** for better context capture:

```typescript
// Different embeddings for different retrieval needs
const embeddings = await embedMultiDimensionalText({
  text: context,
  dimensions: [
    'goal-focused',      // Match by user intent
    'task-focused',      // Match by specific task needs
    'context-focused',   // Match by situational context
    'outcome-focused'    // Match by desired result type
  ]
});

// Store all embeddings
await vectorDB.insertBatch({
  id: memoryId,
  embeddings,
  originalData: memoryData
});
```

## Performance Optimization

### Caching Layer

For frequently accessed memories:

```typescript
class MemoryCache {
  private cache: LRUCache<string, MemoryResult>;
  
  constructor() {
    this.cache = new LRUCache({ 
      max: 1000,
      ttl: 3600000 // 1 hour
    });
  }
  
  async getWithCache(key: string): Promise<MemoryResult | null> {
    const cached = this.cache.get(key);
    if (cached) return cached;
    
    const result = await this.memoryBank.retrieve(key);
    if (result) {
      this.cache.set(key, result);
    }
    return result;
  }
}
```

### Query Optimization

**Indexing strategy for large datasets**:

```sql
-- Composite indexes for common query patterns
CREATE INDEX idx_interactions_goal_ts ON interactions USING GIN(to_tsvector('english', user_goal));
CREATE INDEX idx_patterns_success ON procedural_patterns(success_score DESC, usage_count DESC);
CREATE INDEX idx_semantic_topics ON semantic_store(topic, confidence DESC);
```

## Lessons Learned So Far

### What's Working Well

1. **Vector similarity search** enables finding semantically similar contexts, not just keyword matches
2. **Procedural patterns** significantly reduce planning time by reusing successful sequences
3. **Multi-level retrieval** gives the agent good context awareness without overwhelming the LLM

### Challenges We're Tackling

1. **Memory retention**: How to keep useful information while removing outdated context
2. **Context window management**: Balancing too little vs too much retrieved context
3. **Query latency**: Ensuring fast retrieval even with millions of stored interactions

### Next Steps

In **[Day 10](/posts/day-10-getting-started-ai-agents)**, we'll shift from technical details to practical guidance: **how anyone can get started with understanding AI agents, even without a computer science background**.

---

**Questions?** Our technical team is monitoring feedback. This is a work in progress, and each day we're improving the system based on real usage and learnings.

*Next up: Day 10 - Getting Started with AI Agents*
`,
  },
  
  'day-10-getting-started-ai-agents': {
    title: 'Day 10: Getting Started with AI Agents – A Beginner\'s Guide',
    date: 'May 06, 2026',
    readTime: '6 min read',
    content: `# Day 10: Getting Started with AI Agents – A Beginner's Guide

**Welcome to Day 10**! By now, you've seen how our agent is built (technical minds) and why AI agents matter (everyone). Today, we're making things actionable: **how can you start understanding and working with AI agents**, whether you're a developer, business owner, or just curious.

## What You Need to Know First

Before diving in, let's set some expectations:

### What AI Agents Can Do Now (Realistic Expectations)

✅ **Automation**: Schedule meetings, organize files, send routine emails  
✅ **Information Gathering**: Research topics, compile data from multiple sources  
✅ **Decision Support**: Present options with pros/cons, recommend next steps  
✅ **Learning Assistance**: Help with coding, explain concepts, create study plans  
✅ **Personal Productivity**: Remind you of tasks, track habits, manage calendars  

❌ **Not Yet Ready**: Replace human judgment on complex ethical decisions  
❌ **Not Yet Ready**: Handle everything without any human oversight  
❌ **Not Yet Ready**: Guarantee 100% accuracy on critical information  

**Bottom line**: AI agents are powerful assistants, not replacements for human oversight.

## Starting Point: Understanding Your Needs

### Step 1: Identify Repetitive Tasks

**Ask yourself**: What do you find yourself doing over and over that feels like it *could* be automated?

Common candidates:
- **Email organization**: Sorting, categorizing, routine replies
- **Data entry**: Copying information between systems
- **Meeting management**: Scheduling, reminders, follow-ups
- **Research**: Gathering information from multiple sources
- **Documentation**: Writing status reports, updating wikis

**Example**: "I spend 30 minutes every morning sorting my inbox and tagging important emails"

### Step 2: Define Success Criteria

What would make this task "done" from the agent's perspective?

```
Task: Email triage automation

Current state:
- Manually open every email
- Read subject, scan body
- Decide priority and tag/category
- Flag follow-up items

Success criteria:
- All emails categorized within 5 minutes of arrival
- Priority emails flagged immediately
- Follow-ups scheduled in calendar automatically
- Weekly summary of email activity
```

## Getting Your Foot in the Door

### For Non-Technical Readers

You don't need to code to leverage AI agents. Here are accessible approaches:

#### 1. No-Code/Low-Code Platforms

**Tools that let you create automations without coding**:

- **Zapier** + AI: Connect apps with AI-powered triggers
- **Make (Integromat)**: Visual automation builder with AI actions
- **n8n**: Open-source workflow automation with AI nodes
- **Microsoft Power Automate**: AI-driven workflow creation

**Example workflow you could create today**:
```
Trigger: New email arrives with "urgent" in subject
↓
AI analyzes email content
↓
If high priority: Send Slack notification to team
↓
If needs follow-up: Create task in Asana/Jira
↓
If informational: Archive and tag for later review
```

#### 2. AI-Collaboration Platforms

**Where AI agents can already help without setup**:

- **Cursor IDE**: AI pair programmer that suggests and implements code
- **Notion AI**: Organize notes, create content, extract action items
- **Slack AI**: Summarize threads, suggest replies, organize channels
- **GitHub Copilot**: Code completion, generation, debugging assistance

### For Developers

If you're comfortable with coding, you can go deeper:

#### 1. Start with Agent Frameworks

**Ready-to-use frameworks** for building agents:

- **LangChain**: Python/JavaScript, extensive tool integrations
- **LlamaIndex**: Optimized for data retrieval and agent workflows
- **AutoGen**: Multi-agent collaboration, Microsoft-backed
- **CrewAI**: Role-based agents working together on complex tasks

**Quick start with LangChain**:

```typescript
import { AgentExecutor, createReactAgent } from 'langchain/agents';
import { TavilySearch } from 'langchain/tools';

// Set up tools
const tools = [new TavilySearch({ maxResults: 3 })];

// Create agent
const agent = createReactAgent({
  llm,
  tools,
});

// Execute
const result = await agentExecutor.invoke({
  input: "What are the latest developments in AI agent technology?"
});
```

#### 2. Choose Your Tools

| Goal | Recommended Tool | Why |
|------|-----------------|--|
| Simple automation | LangChain | Large ecosystem, beginner-friendly |
| Data-heavy tasks | LlamaIndex | Optimized RAG, better retrieval |
| Multi-agent system | AutoGen | Built for agent collaboration |
| Production scale | CrewAI | Role-based, organized |

#### 3. Build Your First Agent

**Start small**, then scale:

```
1. Define ONE clear task (not "be helpful")
2. Pick ONE external tool to integrate
3. Write clear instructions for the agent
4. Add monitoring and logging from day one
5. Test extensively before automating critical workflows
```

## Real-World Application Scenarios

### For Business Owners

**Small business automation opportunities**:

1. **Customer Support Triage**
   - Agents handle initial queries, escalate complex issues
   - 24/7 coverage without full-time staff
   - Consistent, standardized responses

2. **Lead Qualification**
   - Automatically score incoming leads
   - Schedule meetings for qualified prospects
   - Update CRM automatically

3. **Employee Onboarding**
   - Welcome new hires, answer common questions
   - Assign onboarding tasks automatically
   - Track completion and follow-ups

### For Developers

**Development workflow improvements**:

1. **Bug Triage and Response**
   - Agent analyzes bug reports, suggests repro steps
   - Searches for similar issues in codebase
   - Proposes fixes with rationale

2. **Documentation Generation**
   - Automatically generate API docs from code
   - Update CHANGELOG based on commits
   - Create tutorials from code examples

3. **Code Review Assistant**
   - Pre-review pull requests before human review
   - Check style consistency and best practices
   - Suggest improvements with explanations

### For Personal Productivity

**DIY automation ideas**:

```
Your morning routine agent:
├─ Check weather → suggest outfit/daily plan
├─ Review calendar → send reminder for upcoming meetings
├─ Scan news feeds → compile brief of topics to watch
├─ Check fitness tracker → share daily goal status
└─ Read important emails → highlight actionable items
```

## Common Pitfalls to Avoid

### 1. Expecting Perfection from Day One

AI agents learn and improve. Start with narrow scope and expand:

```
❌ Wrong: "Build an agent that can manage my entire business"
✅ Right: "Build an agent that can organize my Q3 reports"
```

### 2. Insufficient Context

Agents need proper context to succeed:

```
❌ Too vague: "Help me organize my files"
✅ Better: "Organize my /Downloads folder by categorizing PDFs 
    into 'receipts', 'contracts', 'receipts', others. 
    Place each in corresponding subfolder, log results."
```

### 3. No Feedback Loop

Every automation should have a way to track success:

```
Essential for all agents:
- What action was taken?
- What was the result?
- Did the user agree? (for critical actions)
- What should improve next time?
```

## Tools and Resources to Explore

### Learning Path

**Week 1**: Understand the concepts
- Watch: "How AI Agents Work" videos on YouTube (various creators)
- Read: Blog posts on AI agent examples and applications
- Experiment: Try Cursor IDE's AI features

**Week 2**: Basic automation
- Sign up for Zapier or Make (free tiers available)
- Create 2-3 simple workflows with AI actions
- Document what works and what needs adjustment

**Week 3**: Developer path (optional)
- Pick one framework (LangChain or LlamaIndex recommended)
- Follow the tutorial for "Hello World" agent
- Modify to add one custom tool

**Week 4**: Expand and iterate
- Deploy your agent to a real-use case
- Set up monitoring (log what it does)
- Get feedback and improve

### Curated Resources

| Category | Resource | Cost |
|------|----------|------|
| AI Agent Frameworks | LangChain docs | Free |
| Automation Tools | Zapier guides | Freemium |
| Video Tutorials | YouTube AI agent series | Free |
| Community Support | r/AI, Discord communities | Free |
| Business Use Cases | Vercel AI blog | Free |

## Your Next Step

**Pick one small task** you do regularly and think "could an AI help with this?"

Then choose your path:

- **I want to experiment without coding**
  → Sign up for Zapier/Make and create one workflow this week

- **I'm a developer and want to build**
  → Pick LangChain or AutoGen, run their tutorial, then modify it

- **I want to understand the concepts first**
  → Read our technical posts on [Day 3](/posts/day-3-memory-system) and [Day 5](/posts/day-5-planning-engine)

**Remember**: AI agents aren't sci-fi fantasies anymore—they're practical tools available **today**. The question isn't "if" but "where should you start?"

---

*Join us in Day 11 where we'll explore AI agent security considerations and best practices for safe automation!*

**What task would you automate first? Tell us in our community discussions.**
`,
  },
};

const order: PostSlug[] = [
  'day-9-memory-implementation',
  'day-10-getting-started-ai-agents',
];

const allPosts: PostSlug[] = [
  'day-1-start',
  'day-2-agent-architecture',
  'day-3-memory-system',
  'day-4-integration-framework',
  'day-5-planning-engine',
  'day-6-how-ai-agents-work',
  'day-7-ai-agentic-examples',
  'day-8-why-ai-agents-matter',
  'day-7-styling-improvements',
  'day-9-memory-implementation',
  'day-10-getting-started-ai-agents',
];

export default function PostsPage({ params }: { params: { slug: PostSlug } }) {
  const postContent = posts[params.slug];

  const index = order.indexOf(params.slug);
  const prev = index > 0 ? order[index - 1] : null;
  const next = index < order.length - 1 ? order[index + 1] : null;

  if (!postContent) {
    return (
      <div>
        <h2 className="font-bold mb-4">404 — Page Not Found</h2>
        <p className="mb-4">
          The post you're looking for doesn't exist.
        </p>
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
          {/* Post body content will be rendered by PostBody component */}
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
