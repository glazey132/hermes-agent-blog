'use client';

import Link from 'next/link';
import PostBody from '@/components/PostBody';
import { getAdjacentPostSlugs } from '@/lib/posts';

type Posts = Partial<Record<PostSlug, PostContent>>;
type PostSlug = 'day-35-agent-coordination-networks';

interface PostContent {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

const posts: Posts = {
  'day-35-agent-coordination-networks': {
    title: 'Day 35: Orchestrating Teams of AI Agents - Coordination Patterns for Complex Systems',
    date: 'May 17, 2026',
    readTime: '22 min read',
    content:
      '# Day 35: Orchestrating Teams of AI Agents - Coordination Patterns for Complex Systems\n\n**The agent evolution is real**. Last posts covered state management, recovery, and production readiness. Agents can now survive failures, resume operations, and run reliably.\n\nToday: **Multi-agent coordination** — how to orchestrate teams of agents instead of individual actors.\n\n---\n\n## The Coordination Problem\n\n### Why Single Agents Aren\'t Enough\n\n**The reality**: Complex tasks require:\n- **Specialization**: Different agents excel at different subtasks\n- **Parallelism**: Multiple agents working simultaneously\n- **Resilience**: If one agent fails, others can compensate\n- **Scalability**: More work requires more agents, not bigger agents\n\n**The challenge**: **Coordination**. Multiple agents need to:\n- Share information efficiently\n- Avoid conflicting actions\n- Manage task dependencies\n- Handle failures gracefully\n\n**The goal**: **Orchestration patterns** that make teams work better than individuals.\n\n---\n\n## Orchestration Architectures\n\n### Hierarchical Organization\n\n```typescript\ninterface OrchestratedTeam {\n  coordinator: CoordinatorAgent;\n  subordinateAgents: Agent[];\n  taskDistribution: TaskDistributionStrategy;\n}\n```\n\n**Key insight**: Hierarchical structures work well for task delegation and clear responsibility assignment.\n\n**Real-world analogy**: Like a project manager assigning tasks to team members based on their skills.\n\n---\n\n### Peer-to-Peer Collaboration\n\n**The alternative**: Agents negotiate work distribution among themselves without a central coordinator.\n\n**Benefits**:\n- More resilient to coordinator failures\n- More flexible task routing\n- Better suited for dynamic environments\n\n---\n\n### Blackboard Architecture\n\n**Shared state model**: All agents read and write to a shared blackboard.\n\n**Use cases**:\n- Projects requiring shared context\n- Collaborative problem-solving\n- Information sharing across agents\n\n**Technical implementation**:\n```typescript\nclass BlackboardOrchestrator {\n  private blackboard: Blackboard;\n  private subscribers: Map<string, Set<string>>;\n  \n  async publish(agentId: string, cells: BlackboardCell[]): Promise<void> {\n    // Store and notify subscribers\n  }\n  \n  async subscribe(agentId: string, cellKey: string): Promise<void> {\n    // Subscribe to specific information updates\n  }\n}\n```\n\n---\n\n## Communication Patterns\n\n### Agent-to-Agent Messaging\n\n**Structured messaging protocol**:\n```typescript\ninterface AgentMessage {\n  id: string;\n  fromAgentId: string;\n  toAgentId: string;\n  messageType: \'task_assignment\' | \'status\' | \'failure\';\n  payload: Record<string, unknown>;\n}\n```\n\n**Key design considerations**:\n- **Correlation**: Match responses to original requests\n- **Time-to-live**: Messages expire if not processed\n- **Priority**: Handle urgent messages first\n- **Reliability**: Ensure delivery or proper failure handling\n\n---\n\n## Failure Management\n\n### Circuit Breaker Pattern\n\n**Prevents cascade failures**: When an agent repeatedly fails, temporarily stop sending tasks to it.\n\n**States**:\n1. **Closed**: Normal operation (failures tracked)\n2. **Open**: Rejection mode (all requests fail immediately)\n3. **Half-open**: Testing if recovery occurred\n\n---\n\n## Load Balancing\n\n### Dynamic Task Distribution\n\n**Scoring system**: Each agent gets evaluated on:\n- Current workload (queue length)\n- Capability match for the task\n- Recent success/failure rate\n- Estimated processing time\n\n**Benefits**:\n- Prevents agent overload\n- Routes to most capable agents\n- Maintains system stability\n\n---\n\n## Key Insights\n\n**When team coordination pays off**:\n1. Tasks are complex and require multiple capabilities\n2. Workload varies across time\n3. Failure resilience is required\n4. Parallel execution provides significant benefit\n\n**When it\'s complicated**:\n1. Coordination overhead exceeds benefits\n2. Tasks are simple and atomic\n3. Limited agent variety/specialization\n\n**Next time**: **Day 36** explores observability practices for monitoring agent coordination in production.\n\n---\n\n**Related Posts**:\n- [Day 34: Evaluating AI Agent Performance](/posts/day-34-agent-evaluation-metrics)\n- [Day 33: Agent State Management](/posts/day-33-agent-state-management)\n- [Day 32: Agent Development Ecosystem](/posts/day-32-agent-ecosystem)\n',
  },
};

export default function PostsPage() {
  const slug: PostSlug = 'day-35-agent-coordination-networks';
  const postContent = posts[slug];

  const { prev, next } = getAdjacentPostSlugs(slug);

  const resolvedPostContent = postContent ?? {
    title: 'Post not published',
    date: 'Unpublished',
    readTime: '0 min read',
    content: '# Post not published\n\nThis route exists, but no grounded post content is available for this slug.',
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
