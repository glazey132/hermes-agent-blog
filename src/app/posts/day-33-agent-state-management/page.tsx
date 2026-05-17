'use client';

import Link from 'next/link';
import PostBody from '@/components/PostBody';
import { getAdjacentPostSlugs } from '@/lib/posts';

type Posts = Partial<Record<PostSlug, PostContent>>;
type PostSlug = 'day-31-advanced-agent-patterns' | 'day-31-agent-memory-advanced' | 'day-32-agent-ecosystem' | 'day-33-agent-state-management';

interface PostContent {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

const posts: Posts = {
  'day-33-agent-state-management': {
    title: 'Day 33: Agent State Management - Building Robust Multi-State Systems',
    date: 'May 16, 2026',
    readTime: '18 min read',
    content: `# Day 33: Agent State Management - Building Robust Multi-State Systems

**After our extensive coverage of multi-agent collaborations and memory architectures**, let's address one of the **most critical but overlooked challenges**: **state management**.

Today: **Technical deep-dive** into state machines, checkpointing, recovery strategies, and production-ready state management for AI agents.

---

## The State Management Crisis

### Why State Management Matters

AI agents that work across multiple steps, maintain context over time, or handle failures **absolutely require robust state management**. Without it:

- Agents lose track of where they are in their workflow
- Failures cause partial or corrupted results
- Recovery is impossible or extremely difficult
- Debugging becomes a nightmare
- Production deployments are risky

**Real example**: An agent researching complex topics over multiple sessions needs to:
- Remember what it's already searched
- Track which sources it's verified
- Keep intermediate findings for synthesis
- Recover gracefully from interruptions
- Know exactly where to resume

---

## Core State Management Patterns

### Pattern 1: Finite State Machines (FSM)

For **deterministic workflows** with clear stages, finite state machines provide structure:

\`\`\`typescript
type WorkflowState = 
  | { status: 'initializing'; data: { initTimestamp: number } }
  | { status: 'planning'; data: { plan: Task[] } }
  | { status: 'executing'; data: { currentTask: Task; completed: Task[] } }
  | { status: 'synthesizing'; data: { findings: Result[] } }
  | { status: 'complete'; data: { finalResult: Result } }
  | { status: 'failed'; data: { error: Error; retryCount: number } }

type StateTransition = {
  from: string;
  to: string;
  guard: (state: AgentState) => boolean;
  action: (state: AgentState) => Promise<AgentState>;
};

class AgentStateManager {
  private state: AgentState = { 
    status: 'initializing', 
    data: { initTimestamp: Date.now() } 
  };
  
  private transitions: Map<string, StateTransition> = new Map();
  
  async executeTransition(transition: StateTransition): Promise<void> {
    // Validate guard condition
    if (!transition.guard(this.state)) {
      throw new Error(\`Transition \${transition.to} not allowed from state \${this.state.status}\`);
    }
    
    // Apply state change
    this.state = await transition.action(this.state);
    
    // Emit lifecycle events
    this.emit('stateChange', {
      oldState: this.state,
      newState: this.state,
      timestamp: Date.now()
    });
  }
  
  async resumeFromSnapshot(snapshot: AgentState): Promise<void> {
    this.state = snapshot;
    this.emit('resumed', { 
      fromSnapshot: true, 
      timestamp: Date.now() 
    });
  }
}
\`\`\`

**When to use**: Clear, deterministic workflows (e.g., research pipelines, transaction processing).

---

### Pattern 2: Event Sourcing

For **complex workflows** where history matters, event sourcing captures every state change:

\`\`\`typescript
interface StateEvent {
  eventId: string;
  eventType: 'task-started' | 'task-completed' | 'context-updated' | 'checkpoint-created';
  timestamp: string;
  payload: Record<string, unknown>;
  metadata: {
    agentId: string;
    version: number;
  };
}

class EventStore {
  private events: StateEvent[] = [];
  
  append(event: StateEvent): void {
    this.events.push(event);
  }
  
  replayFrom(eventId?: string): AgentState {
    const relevantEvents = eventId 
      ? this.events.filter(e => e.eventId > eventId)
      : this.events;
    
    return relevantEvents.reduce((state, event) => {
      return this.applyEvent(state, event);
    }, initialState);
  }
  
  private applyEvent(state: AgentState, event: StateEvent): AgentState {
    switch (event.eventType) {
      case 'task-started':
        return { ...state, activeTask: event.payload.task };
      case 'task-completed':
        return {
          ...state,
          completedTasks: [...state.completedTasks, event.payload.task],
          activeTask: null
        };
      case 'context-updated':
        return {
          ...state,
          context: { ...state.context, ...event.payload.updates }
        };
      default:
        return state;
    }
  }
}
\`\`\`

**Benefits**:
- Complete audit trail
- Easy debugging
- Natural checkpointing
- Can replay any point in time

---

### Pattern 3: Checkpoint-Based Recovery

For **long-running agents**, checkpoint at regular intervals:

\`\`\`typescript
interface Checkpoint {
  checkpointId: string;
  timestamp: string;
  state: AgentStateSnapshot;
  metadata: {
    step: number;
    totalSteps: number;
    estimatedTimeRemaining: number;
  };
}

class CheckpointManager {
  private checkpointStore: Map<string, Checkpoint>;
  private currentCheckpoint: Checkpoint | null = null;
  
  async createCheckpoint(state: AgentState): Promise<void> {
    const checkpoint: Checkpoint = {
      checkpointId: \`ckpt_\${crypto.randomUUID()}\`,
      timestamp: new Date().toISOString(),
      state: this.serializeState(state),
      metadata: {
        step: this.currentStep,
        totalSteps: this.totalSteps,
        estimatedTimeRemaining: this.estimateRemaining()
      }
    };
    
    // Persist to durable storage
    await this.checkpointStore.set(checkpoint.checkpointId, checkpoint);
    this.currentCheckpoint = checkpoint;
    
    // Emit checkpoint event for monitoring
    this.emit('checkpoint-created', checkpoint);
  }
  
  async loadCheckpoint(checkpointId: string): Promise<AgentState> {
    const checkpoint = await this.checkpointStore.get(checkpointId);
    if (!checkpoint) {
      throw new Error(\`Checkpoint \${checkpointId} not found\`);
    }
    
    return this.deserializeState(checkpoint.state);
  }
  
  async recoverFromLastCheckpoint(savedState?: AgentState): Promise<AgentState> {
    // Try to resume from last checkpoint first
    if (this.currentCheckpoint) {
      try {
        return await this.loadCheckpoint(this.currentCheckpoint.checkpointId);
      } catch (error) {
        console.warn('Failed to load last checkpoint, attempting fallback');
      }
    }
    
    // Fall back to saved state if available
    if (savedState) {
      return savedState;
    }
    
    // Ultimate fallback: fresh start
    return freshInitialState();
  }
}
\`\`\`

---

### Pattern 4: Optimistic State Updates

For **responsive UIs and real-time feedback**, update optimistically and recover on failure:

\`\`\`typescript
interface OptimisticUpdate {
  id: string;
  update: Partial<AgentState>;
  rollback: () => void;
  confirmed: boolean;
}

class OptimisticStateManager {
  private updates: Map<string, OptimisticUpdate> = new Map();
  
  async applyOptimisticUpdate(update: Partial<AgentState>): Promise<string> {
    const updateId = crypto.randomUUID();
    
    // Save current state for potential rollback
    const previousState = JSON.parse(JSON.stringify(this.state));
    
    // Apply optimistic update
    this.state = { ...this.state, ...update };
    
    // Create rollback function
    const rollback = () => {
      this.state = previousState;
      this.emit('state-rollback', { updateId, previousState });
    };
    
    // Track the update
    this.updates.set(updateId, {
      id: updateId,
      update,
      rollback,
      confirmed: false
    });
    
    // Notify UI of optimistic update
    this.emit('optimistic-update', { id: updateId, update });
    
    // Confirm after backend response
    const confirmed = await this.confirmUpdate(updateId, update);
    if (!confirmed) {
      // Trigger rollback automatically
      this.updates.get(updateId)?.rollback();
    }
    
    return updateId;
  }
  
  private async confirmUpdate(updateId: string, update: Partial<AgentState>): Promise<boolean> {
    try {
      await this.backend.applyUpdate(update);
      this.updates.get(updateId)?.confirmed = true;
      return true;
    } catch (error) {
      console.error('Backend update failed', error);
      return false;
    }
  }
}
\`\`\`

---

## State Persistence Strategies

### In-Memory State

Fast but loses data on restart:

\`\`\`typescript
class InMemoryStateStore implements StateStore {
  private state: AgentState = initialAgentState;
  
  getState(): AgentState {
    return JSON.parse(JSON.stringify(this.state));
  }
  
  async setState(newState: AgentState): Promise<void> {
    this.state = newState;
  }
}
\`\`\`

### LocalStorage Persistence

Good for browser-based agents:

\`\`\`typescript
class LocalStorageStateStore implements StateStore {
  private STORAGE_KEY = 'agent_state';
  
  async getState(): Promise<AgentState> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as AgentState;
    }
    return initialAgentState;
  }
  
  async setState(state: AgentState): Promise<void> {
    const serialized = JSON.stringify(state, replacer, 2);
    localStorage.setItem(this.STORAGE_KEY, serialized);
  }
}
\`\`\`

### Cloud Storage

For production, persistent across devices:

\`\`\`typescript
class CloudStateStore implements StateStore {
  constructor(private cloudApi: CloudAPI) {}
  
  async getState(userId: string): Promise<AgentState> {
    const result = await this.cloudApi.getDocument(\`agent_state_\${userId}\`);
    if (result) {
      return JSON.parse(result.content) as AgentState;
    }
    return initialAgentState;
  }
  
  async setState(userId: string, state: AgentState): Promise<void> {
    const serialized = JSON.stringify(state, replacer, 2);
    await this.cloudApi.upsertDocument(\`agent_state_\${userId}\`, { content: serialized });
  }
}
\`\`\`

---

## Concurrency and Race Conditions

### Optimistic Locking

Prevent conflicting updates:

\`\`\`typescript
interface VersionedState extends AgentState {
  version: number;
  lastModified: string;
}

class VersionedStateManager {
  private state: VersionedState = {
    ...initialAgentState,
    version: 0,
    lastModified: new Date().toISOString()
  };
  
  async applyUpdate(update: Partial<AgentState>, expectedVersion: number): Promise<boolean> {
    // Check for conflicts
    if (this.state.version !== expectedVersion) {
      throw new ConflictError(
        \`Version conflict: expected \${expectedVersion}, got \${this.state.version}\`,
        this.state
      );
    }
    
    // Apply update
    this.state = {
      ...this.state,
      ...update,
      version: this.state.version + 1,
      lastModified: new Date().toISOString()
    };
    
    return true;
  }
  
  async applyWithRetry(update: Partial<AgentState>, maxRetries = 3): Promise<void> {
    let currentVersion = this.state.version;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        await this.applyUpdate(update, currentVersion);
        return;
      } catch (error) {
        if (isConflictError(error) && i < maxRetries - 1) {
          // Fetch latest state and retry
          currentVersion = this.state.version;
          await this.waitWithBackoff(i);
          continue;
        }
        throw error;
      }
    }
  }
  
  private async waitWithBackoff(attempt: number): Promise<void> {
    const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}
\`\`\`

---

## State Visualization and Debugging

### State Timeline Visualization

\`\`\`typescript
interface StateTimeline {
  events: TimelineEvent[];
  checkpoints: TimelineCheckpoint[];
  currentState: AgentState;
}

class StateDebugger {
  async buildTimeline(agentId: string): Promise<StateTimeline> {
    // Fetch all state events
    const events = await this.stateStore.getEvents(agentId, {
      startTime: yesterday,
      endTime: now
    });
    
    // Build visualization data
    return {
      events: events.map(event => ({
        timestamp: event.timestamp,
        type: event.type,
        description: this.describeEvent(event),
        severity: this.getEventSeverity(event)
      })),
      checkpoints: checkpoints.map(ckpt => ({
        timestamp: ckpt.timestamp,
        step: ckpt.metadata.step,
        estimatedRemaining: ckpt.metadata.estimatedTimeRemaining
      })),
      currentState: await this.stateStore.getState(agentId)
    };
  }
  
  private describeEvent(event: StateEvent): string {
    switch(event.type) {
      case 'task-started':
        return \`Started task: \${event.payload.task.name}\`;
      case 'task-completed':
        return \`Completed task: \${event.payload.task.name} in \${event.payload.duration}s\`;
      default:
        return event.type;
    }
  }
}
\`\`\`

---

## Production Best Practices

### 1. **Always checkpoint before expensive operations**

\`\`\`typescript
async executeMultiStepWorkflow(operations: Operation[]): Promise<Result> {
  // Checkpoint before starting
  await this.checkpointManager.createCheckpoint(await this.getState());
  
  try {
    for (const op of operations) {
      // Checkpoint before each expensive op
      if (op.isExpensive) {
        await this.checkpointManager.createCheckpoint(await this.getState());
      }
      
      await op.execute();
    }
    
    // Final checkpoint on success
    await this.checkpointManager.createCheckpoint(await this.getState());
    
    return { success: true, state: await this.getState() };
  } catch (error) {
    // Recovery path
    const recoveredState = await this.checkpointManager.recoverFromLastCheckpoint();
    return { 
      success: false, 
      state: recoveredState,
      recoveryInfo: {
        fromCheckpoint: true,
        lostOperations: operations.slice()
      }
    };
  }
}
\`\`\`

### 2. **Define explicit state schemas**

\`\`\`typescript
interface AgentStateSchema {
  properties: {
    status: { type: 'string', enum: STATE_ENUMERATION };
    data: { type: 'object', additionalProperties: false, required: string[] };
    version: { type: 'integer', minimum: 0 };
  };
  required: ['status', 'data', 'version'];
}

// Runtime validation
function validateAgentState(state: AgentState): asserts state is ValidatedAgentState {
  const errors = validateSchema(state, AGENT_STATE_SCHEMA);
  if (errors.length > 0) {
    throw new ValidationError('Invalid agent state', errors);
  }
}
\`\`\`

### 3. **Implement state diffs and merge strategies**

\`\`\`typescript
function computeStateDiff(oldState: AgentState, newState: AgentState): StateDiff {
  return {
    statusChanged: oldState.status !== newState.status,
    dataChanged: !deepEqual(oldState.data, newState.data),
    addedFields: Object.keys(newState.data).filter(k => !(k in oldState.data)),
    removedFields: Object.keys(oldState.data).filter(k => !(k in newState.data)),
    changedFields: Object.keys(oldState.data).filter(
      k => k in newState.data && !deepEqual(oldState.data[k], newState.data[k])
    )
  };
}

function mergeStateWithDiff(base: AgentState, diff: StateDiff): AgentState {
  return {
    ...base,
    status: diff.statusChanged ? 'updated' : base.status,
    data: {
      ...base.data,
      ...diff.addedFields.reduce((acc, field) => ({
        ...acc,
        [field]: (base.data as any)[field]
      }), {}),
      ...diff.changedFields.reduce((acc, field) => ({
        ...acc,
        [field]: (base.data as any)[field]
      }), {})
    }
  };
}
\`\`\`

---

## Common Pitfalls to Avoid

### ❌ State Bloat

Never store everything forever:

\`\`\`typescript
// BAD - State grows indefinitely
interface PoorState {
  allTasks: Task[];
  allResults: Result[];
  allLogs: LogEntry[];
}

// GOOD - Keep only what's needed
interface ProperState {
  currentTask: Task | null;
  recentResults: Result[]; // Last 100 only
  activeContext: Context;
  completedTasks: TaskId[]; // IDs only
}
\`\`\`

### ❌ No Error Recovery

\`\`\`typescript
// BAD - No state preservation on error
async execute() {
  const result = await expensiveOperation();
  this.updateState(result);
}

// GOOD - State preserved
async execute() {
  const checkpoint = await this.createCheckpoint();
  try {
    const result = await expensiveOperation();
    this.updateState(result);
    this.deleteCheckpoint(checkpoint.id);
  } catch (error) {
    await this.restoreCheckpoint(checkpoint.id);
    this.handleRecoveryError(error);
    throw error;
  }
}
\`\`\`

### ❌ Inconsistent State Transitions

\`\`\`typescript
// BAD - State machine allows invalid transitions
async transitionTo(newStatus: AgentStatus) {
  this.state.status = newStatus; // Any status possible from any status
}

// GOOD - Explicit transitions
async transitionTo(newStatus: AgentStatus) {
  const allowedTransitions = STATE_TRANSITIONS[this.state.status];
  if (!allowedTransitions.includes(newStatus)) {
    throw new InvalidTransitionError(this.state.status, newStatus);
  }
  this.state.status = newStatus;
}
\`\`\`

---

## Summary

Effective state management is **fundamental** to building production-ready AI agents. The key patterns include:

1. **Finite State Machines** for deterministic workflows
2. **Event Sourcing** for auditable histories
3. **Checkpoint-Based Recovery** for long-running tasks
4. **Optimistic Updates** for responsive user experiences
5. **Versioned State** for concurrent access
6. **State Debugging** for visualization and troubleshooting

**Tomorrow**: We'll explore **AI Agents in Personal Life** - how non-technical users can benefit from agents in their everyday tasks without any coding experience.

---

**Discussion Questions**:
1. What state management patterns would you use for your agent?
2. How do you handle state persistence across different storage mediums?
3. What checkpointing strategies work best for your use cases?

Share your thoughts in the comments!`,
  },
};

export default function PostsPage() {
  const slug: PostSlug = 'day-33-agent-state-management';
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
