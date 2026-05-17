'use client';

import Link from 'next/link';
import PostBody from '@/components/PostBody';
import { getAdjacentPostSlugs } from '@/lib/posts';

type Posts = Partial<Record<PostSlug, PostContent>>;
type PostSlug = 'day-27-agent-security-robustness' | 'day-27-ai-agents-practical-usecases' | 'day-28-agent-llm-rag-patterns' | 'day-28-how-rag-makes-agents-smarter' | 'day-29-evaluating-ai-agents' | 'day-30-practical-ai-agent';

interface PostContent {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

const posts: Posts = {
  'day-27-agent-security-robustness': {
    title: 'Day 27: Agent Security and Robustness - Building Resilient Systems for Production',
    date: 'May 13, 2026',
    readTime: '15 min read',
    content: `# Day 27: Agent Security and Robustness - Building Resilient Systems for Production

**We've explored memory systems, automation flows, and resilience patterns**. Now we must address the critical question: **how do we keep our agents safe and secure?**

Today: **Technical deep-dive** into security best practices for production-ready AI agent systems.

---

## Why Agent Security Matters

AI agents differ from traditional software in fundamental ways:

| Traditional App | AI Agent |
|-----------------|----------|
| Deterministic logic | Probabilistic execution |
| Fixed input validation | Dynamic prompt inputs |
| Clear data boundaries | External context access |
| Simple auth flows | Multi-step tool usage |

**A compromised agent** can:
- Leak sensitive user data
- Execute unauthorized actions
- Exfiltrate information
- Perform destructive operations

**Without proper security**, your agent is a liability, not an asset.

---
    50|
    51|## Input Sanitization: The First Line of Defense
    52|
    53|### Prompt Injection Prevention
    54|
    55|Agent inputs (user prompts) come from untrusted sources. Always sanitize:
import { z } from 'zod';

interface SanitizedInput {
  text: string;
  safeContext: Context;
  validatedForAgent: boolean;
}

class InputSanitizer {
  private readonly MAX_TOKENS = 4000;
  
  sanitize(userInput: string): SanitizedInput {
    // 1. Length validation
    if (userInput.length > 10000) {
      throw new SecurityError('Input too long');
    }
    
    // 2. Remove potentially dangerous markers
    let sanitized = userInput
      .replace(/\\n\\n\\n/g, '\\n') // Remove excessive newlines
      .replace(/<[^>]*>/g, '')     // Strip HTML tags
      .slice(0, 10000);            // Hard limit
    
    // 3. Detect injection attempts
    if (/\\b(SYSTEM|ROLE:|INJECT|IGNORE PREVIOUS)\\b/i.test(sanitized)) {
      throw new SecurityError('Possible prompt injection detected');
    }
    
    // 4. Validate user context
    const safeContext = this.buildSafeContext();
    
    return {
      text: sanitized,
      safeContext,
      validatedForAgent: true
    };
  }
  
  private buildSafeContext(): Context {
    // Always provide clean context, never trust external data
    return {
      userPermissions: this.getPermissionLevel(),
      allowedTools: this.getToolWhitelist(),
      maxToolCalls: this.getMaxToolCalls(),
      timestamp: Date.now()
    };
  }
}
```

**Core principle**: Never assume user input is safe. Always sanitize, validate, and limit.

---

## Access Control: The Agent Capability Matrix

### Role-Based Tool Access

Not all agents should have all capabilities. Define clear boundaries:

```typescript
interface AgentCapabilities {
  canReadDocuments: boolean;
  canWriteDocuments: boolean;
  canDeleteDocuments: boolean;
  canAccessUserEmail: boolean;
  canAccessCalendar: boolean;
  canBrowseInternet: boolean;
  canMakePurchases: boolean;
  canModifySystem: boolean;
}

const CAPABILITY_LEVELS: Record<string, AgentCapabilities> = {
  READER: {
    canReadDocuments: true,
    canWriteDocuments: false,
    canDeleteDocuments: false,
    canAccessUserEmail: true,
    canAccessCalendar: true,
    canBrowseInternet: false,
    canMakePurchases: false,
    canModifySystem: false,
  },
  WORKER: {
    canReadDocuments: true,
    canWriteDocuments: true,
    canDeleteDocuments: false,
    canAccessUserEmail: true,
    canAccessCalendar: true,
    canBrowseInternet: true,
    canMakePurchases: false,
    canModifySystem: false,
  },
  ADMIN: {
    canReadDocuments: true,
    canWriteDocuments: true,
    canDeleteDocuments: true,
    canAccessUserEmail: true,
    canAccessCalendar: true,
    canBrowseInternet: true,
    canMakePurchases: false,
    canModifySystem: false,
  },
};

function checkAccess(agentId: string, action: string): boolean {
  const capabilities = CAPABILITY_LEVELS[getAgentLevel(agentId)];
  return capabilities[getPermissionType(action)] ?? false;
}
```

**Rule**: Grant minimum necessary access. Start with READER level.

---

## Sandboxed Execution: Runtime Isolation

### Tool Execution Safety

When agents execute tools, they run arbitrary code. Use sandboxing:

```typescript
interface SafeToolCall {
  toolName: string;
  args: Record<string, unknown>;
  maxExecutionTime: number;
  sandbox: string;
}

class ExecutionSandbox {
  constructor(
    private readonly allowedTools: string[],
    private readonly timeoutMs: number = 5000
  ) {}
  
  async execute(call: SafeToolCall): Promise<ToolResult> {
    // Validate against whitelist
    if (!this.allowedTools.includes(call.toolName)) {
      throw new SecurityError('Tool not in whitelist');
    }
    
    // Validate arguments
    const safeArgs = this.validateArguments(call.args);
    
    // Execute with timeout
    const result = await Promise.race([
      this.realExecute(call.toolName, safeArgs),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Execution timeout')), this.timeoutMs);
      })
    ]);
    
    return result;
  }
  
  private validateArguments(args: Record<string, unknown>): Record<string, unknown> {
    // Strip any dangerous keys
    const safeArgs = { ...args };
    delete safeArgs['__proto__'];
    delete safeArgs['constructor'];
    delete safeArgs['prototype'];
    
    // Recursively sanitize nested objects
    this.sanitizeNested(safeArgs);
    
    return safeArgs;
  }
  
  private sanitizeNested(obj: Record<string, unknown>): void {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.sanitizeNested(obj[key]);
      } else if (typeof obj[key] === 'string') {
        obj[key] = this.sanitizeString(obj[key] as string);
      }
    }
  }
  
  private async realExecute(
    toolName: string,
    args: Record<string, unknown>
  ): Promise<ToolResult> {
    // Execute in isolated environment
    // Use separate process/container in production
    const tool = getTool(toolName);
    return tool.call(args as any);
  }
}
```

**Production tip**: Run tool execution in separate containers with limited network, file, and system access.

---

## Circuit Breakers: Failure Protection

### Prevent Agent Infinite Loops

Agents can get stuck in infinite reasoning cycles. Add circuit breakers:

```typescript
interface CircuitState {
  failures: number;
  lastFailureTime: number;
  isOpen: boolean;
  halfOpenAttempts: number;
}

interface AgentMetrics {
  totalTurns: number;
  toolCallSuccessRate: number;
  averageResponseTime: number;
  errorCounts: Record<string, number>;
}

class CircuitBreaker {
  private readonly circuitStates = new Map<string, CircuitState>();
  private readonly MAX_FAILURES = 10;
  private readonly RESET_TIMEOUT = 60000; // 1 minute
  
  async executeWithBreaker(
    agentId: string,
    operation: () => Promise<void>
  ): Promise<void> {
    const state = this.getState(agentId);
    
    if (state.isOpen) {
      // Circuit is open - reject request
      if (Date.now() - state.lastFailureTime > this.RESET_TIMEOUT) {
        state.isOpen = false;
        state.halfOpenAttempts = 0;
        await this.attemptCircuitReset(agentId);
      } else {
        throw new Error('Circuit breaker is open');
      }
    }
    
    try {
      await operation();
      this.onSuccess(agentId);
    } catch (error) {
      this.onFailure(agentId);
      throw error;
    }
  }
  
  private getState(agentId: string): CircuitState {
    let state = this.circuitStates.get(agentId);
    if (!state) {
      state = {
        failures: 0,
        lastFailureTime: 0,
        isOpen: false,
        halfOpenAttempts: 0
      };
      this.circuitStates.set(agentId, state);
    }
    return state;
  }
  
  private onSuccess(agentId: string): void {
    const state = this.getState(agentId);
    state.failures = 0;
    this.circuitStates.set(agentId, state);
  }
  
  private onFailure(agentId: string): void {
    const state = this.getState(agentId);
    state.failures++;
    state.lastFailureTime = Date.now();
    
    if (state.failures >= this.MAX_FAILURES) {
      state.isOpen = true;
    }
    
    this.circuitStates.set(agentId, state);
  }
}
```

**Key insight**: Circuit breakers prevent cascading failures when agents get stuck.

---

## Checkpoint and Recovery: State Management

### Save Agent State Periodically

If an agent crashes or gets stuck in error state, checkpoints enable recovery:

```typescript
interface AgentCheckpoint {
  timestamp: string;
  sessionId: string;
  lastAction: string;
  contextSnapshot: AgentContext;
  recoveryPlan: RecoveryPlan | null;
  stateHash: string;
}

class AgentStateManager {
  private readonly CHECKPOINT_INTERVAL = 30000; // Every 30 seconds
  private checkpointTimer: NodeJS.Timeout | null = null;
  
  async startCheckpointing(
    agentId: string,
    checkpointCallback: (checkpoint: AgentCheckpoint) => Promise<void>
  ): Promise<void> {
    this.checkpointTimer = setInterval(async () => {
      await this.createCheckpoint(agentId, checkpointCallback);
    }, this.CHECKPOINT_INTERVAL);
  }
  
  async createCheckpoint(
    agentId: string,
    callback: (checkpoint: AgentCheckpoint) => Promise<void>
  ): Promise<void> {
    const currentContext = this.getAgentContext(agentId);
    
    const checkpoint: AgentCheckpoint = {
      timestamp: new Date().toISOString(),
      sessionId: currentContext.sessionId,
      lastAction: currentContext.lastAction,
      contextSnapshot: currentContext,
      recoveryPlan: this.generateRecoveryPlan(currentContext),
      stateHash: this.calculateStateHash(currentContext)
    };
    
    await this.persistCheckpoint(agentId, checkpoint);
    await callback(checkpoint);
  }
  
  async recoverFromCheckpoint(
    agentId: string,
    checkpoint: AgentCheckpoint
  ): Promise<void> {
    // Restore agent state
    this.restoreAgentState(agentId, checkpoint.contextSnapshot);
    
    // Execute recovery plan if available
    if (checkpoint.recoveryPlan) {
      await this.executeRecoveryPlan(checkpoint.recoveryPlan);
    } else {
      // No recovery plan - restart agent with fresh state
      await this.resetAgent(agentId);
    }
  }
  
  private generateRecoveryPlan(
    context: AgentContext
  ): RecoveryPlan | null {
    if (context.lastAction.includes('tool_execution') && !context.successState) {
      return {
        action: 'retry_with_modified_args',
        parameters: this.extractProblematicArgs(context.toolCall),
        maxRetries: 3
      };
    }
    
    if (context.turnCount > 50) {
      return {
        action: 'reset_session',
        reason: 'Turn limit exceeded'
      };
    }
    
    return null;
  }
}
```

**Best practice**: Checkpoint after every complex action sequence. Store in durable storage.

---

## Audit Logging: Security Visibility

### Comprehensive Agent Activity Tracking

Every agent action must be logged for security audit:

```typescript
interface SecurityLog {
  eventType: 'TOOL_CALL' | 'USER_INPUT' | 'ERROR' | 'SECURITY_VIOLATION';
  agentId: string;
  timestamp: string;
  details: Record<string, unknown>;
  context: LogContext;
}

class SecurityLogger {
  private readonly auditStorage: LogStorage;
  private readonly sensitiveFields = new Set(['password', 'token', 'secret', 'key']);
  
  logSecurityEvent(event: SecurityLog): void {
    const sanitized = this.sanitizeEvent(event);
    this.auditStorage.append(sanitized);
    
    // Alert on critical violations
    if (event.eventType === 'SECURITY_VIOLATION') {
      this.alertSecurityTeam(event);
    }
  }
  
  private sanitizeEvent(event: SecurityLog): SecurityLog {
    const sanitized = { ...event, details: { ...event.details } };
    
    // Mask sensitive information
    for (const [key, value] of Object.entries(sanitized.details)) {
      const keyLower = key.toLowerCase();
      for (const field of this.sensitiveFields) {
        if (keyLower.includes(field)) {
          sanitized.details[key] = '[MASKED]';
          break;
        }
      }
    }
    
    return sanitized;
  }
}

// Audit query interface
interface AuditQuery {
  agentId?: string;
  eventType?: SecurityLog['eventType'];
  startTime?: Date;
  endTime?: Date;
  limit?: number;
}

class AuditLogRetriever {
  async auditLog(query: AuditQuery): Promise<SecurityLog[]> {
    const filters = this.buildFilters(query);
    const logs = await this.auditStorage.query(filters);
    return logs.reverse();
  }
  
  async detectAnomalies(): Promise<AnomalyReport[]> {
    // Detect unusual patterns (excessive tool calls, repeated failures)
    return await this.anomalyDetector.analyze();
  }
}
```

**Compliance requirement**: All agent actions must be logged and retained per security policy.

---

## Production Security Checklist

### Before Deployment

- [ ] Input validation implemented for all user prompts
- [ ] Tool whitelisting configured per agent type
- [ ] Sandboxed execution environment deployed
- [ ] Circuit breakers integrated
- [ ] Checkpoint/restore mechanism tested
- [ ] Audit logging enabled
- [ ] Rate limiting configured per IP/user
- [ ] Authentication/authorization implemented
- [ ] Encrypted communication configured
- [ ] Security scan completed with no critical issues

### Ongoing Security

- [ ] Weekly security review of agent behavior logs
- [ ] Monthly vulnerability scanning
- [ ] Quarterly security audits
- [ ] Regular permission reviews and updates
- [ ] Incident response playbook tested
- [ ] Automated alerting for security anomalies
- [ ] Penetration testing performed bi-annually

---

## Conclusion

**Security is not optional** for production AI agents. Key takeaways:

1. **Always sanitize inputs** - Never trust user prompts
2. **Least privilege principle** - Give minimum required access
3. **Sandbox execution** - Isolate tool calls always
4. **Circuit breakers** - Prevent infinite loops and failures
5. **Checkpoint recovery** - Enable state persistence
6. **Audit logging** - Complete visibility into all actions

Next: Consumer-facing post on practical AI agent use cases for everyday productivity.

**Tomorrow**: We'll explore how non-technical users can leverage agents for personal productivity.
`;
  },
};

export default function PostsPage() {
  const slug: PostSlug = 'day-27-agent-security-robustness';
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
