'use client';

import Link from 'next/link';
import PostBody from '@/components/PostBody';
import { getAdjacentPostSlugs } from '@/lib/posts';

type Posts = Partial<Record<PostSlug, PostContent>>;
type PostSlug = 'day-25-agent-memory-system-deep-dive' | 'day-25-agent-automation-workflows' | 'day-26-building-resilient-ai-agents' | 'day-26-why-ai-agents-everyone';

interface PostContent {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

const posts: Posts = {
  'day-26-building-resilient-ai-agents': {
    title: "Day 26: Building Resilient AI Agents - Error Handling, Recovery, and Reliability",
    date: "May 12, 2026",
    readTime: "14 min read",
    content: String.raw`# Day 26: Building Resilient AI Agents - Error Handling, Recovery, and Reliability

**From yesterday's automation deep-dive**, we explore the critical question: **what happens when things go wrong?**

Today: **Building AI agents that are resilient, recover from errors, and maintain reliability** in production environments.

## Why Agent Resilience Matters

| Without Resilience | With Resilience |
|------------------|---------------|
| Single failure crashes the agent | Failures trigger recovery |
| Error logs pile up unnoticed | Errors trigger auto-recovery |
| Users lose trust quickly | Errors handled gracefully |
| Manual intervention required | Self-healing when possible |
| Downtime accumulates | Minimal service disruption |

**Resilience isn't optional** for production agents—they face unpredictable inputs, flaky APIs, and edge cases daily.

---

## Agent Failure Modes

### 1. API and Tool Failures

**Common scenarios**:\n- Rate limits and throttling
- Network timeouts
- API service outages
- Authentication token expiration
- Invalid responses from tools

**Example failure**:\n\`\`\`typescript
// Without retry logic - agent breaks\nasync function fetchUserData(userId: string) {\n  const response = await fetch(\`/api/users/\${userId}\`);\n  return response.json();\n  // If API fails → agent crashes\n}\n\n// With retry logic - agent survives\nasync function fetchUserDataWithRetry(userId: string, maxRetries = 3) {\n  for (let attempt = 1; attempt <= maxRetries; attempt++) {\n    try {\n      const response = await fetch(\`/api/users/\${userId}\`, {\n        signal: AbortSignal.timeout(5000)\n      });\n      \n      if (!response.ok) {\n        throw new Error(\`HTTP \${response.status}\`);\n      }\n      \n      return await response.json();\n    } catch (error) {\n      if (attempt === maxRetries) {\n        // All retries exhausted - fall back gracefully\n        await handlePermanentFailure(userId, error);\n        return null;\n      }\n      \n      // Exponential backoff\n      const delay = 1000 * Math.pow(2, attempt);\n      await sleep(delay);\n    }\n  }\n}\n\`\`\`\n\n**Key insights**:\n- Always implement retry logic for external calls\n- Use exponential backoff (not fixed delays)\n- Set reasonable timeouts\n- Define fallback behavior for permanent failures\n\n---

### 2. Context and Memory Issues

**Common scenarios**:\n- Context window exhaustion\n- Memory retrieval failures\n- Inconsistent state across sessions\n- Corrupted memory state

**Memory overflow example**:\n\`\`\`typescript\nasync function manageContextOverflow(\n  context: ConversationContext,\n  currentMessage: string\n): Promise<OptimizedContext> {\n  // Scenario: Context window nearly full\n  if (context.tokensUsed / context.maxTokens > 0.85) {\n    // Compress older messages\n    const compressedSummary = await summarizeOldMessages(\n      context.messages.slice(0, -5),\n      { maxTokens: 2000 }\n    );\n    \n    // Keep most recent messages\n    const recentMessages = context.messages.slice(-5);\n    \n    // Rebuild context\n    return {\n      messages: [\n        { role: 'system', content: compressedSummary },\n        ...recentMessages\n      ],\n      tokensUsed: countTokens(compressedSummary, ...recentMessages),\n      lastOptimization: new Date().toISOString()\n    };\n  }\n  \n  // No optimization needed\n  return context;\n}\n\nasync function summarizeOldMessages(\n  messages: Message[],\n  options: SummaryOptions\n): Promise<string> {\n  const summaryPrompt = {\n    system: \"You are an expert at summarizing conversations. Extract key points, decisions, and action items. Be concise but complete.\",\n    user: messages.map(m => \`\${m.role}: \${m.content}\`).join('\\n')\n  };\n  \n  const summary = await generateSummary(summaryPrompt, options);\n  return summary;\n}\n\`\`\`\n\n**Recovery strategy**:\n- Proactively monitor context usage\n- Summarize older conversation turns\n- Store important state in long-term memory\n- Rebuild context from history when needed\n\n---\n\n### 3. Invalid User Input\n\n**Common scenarios**:\n- Malformed requests\n- Out-of-scope questions\n- Conflicting instructions\n- Intentional adversarial prompts\n\n**Input validation example**:\n\`\`\`typescript\nclass AgentInputValidator {\n  validateInput(userMessage: string): ValidationResult {\n    // Check for required fields\n    if (!userMessage || userMessage.trim().length === 0) {\n      return {\n        valid: false,\n        error: 'Message cannot be empty',\n        suggestedAction: 'prompt-for-clarity'\n      };\n    }\n    \n    // Check for malicious content\n    if (this.detectMaliciousContent(userMessage)) {\n      return {\n        valid: false,\n        error: 'Potentially malicious input detected',\n        suggestedAction: 'reject-and-log'\n      };\n    }\n    \n    // Check for scope violations\n    if (!this.isWithinScope(userMessage)) {\n      return {\n        valid: false,\n        error: 'Request outside agent scope',\n        suggestedAction: 'explain-limits'\n      };\n    }\n    \n    return { valid: true, userMessage };\n  }\n  \n  private detectMaliciousContent(input: string): boolean {\n    const maliciousPatterns = [\n      /--\s*OR\s+1=1/i,\n      /\\\\x00/, // null bytes\n      /<script>/i,\n      /system:.*override/i\n    ];\n    \n    return maliciousPatterns.some(pattern => pattern.test(input));\n  }\n  \n  private isWithinScope(input: string): boolean {\n    const prohibitedActions = [\n      'delete all',\n      'override system',\n      'access admin',\n      'bypass security'\n    ];\n    \n    return !prohibitedActions.some(action => \n      input.toLowerCase().includes(action)\n    );\n  }\n}\n\ninterface ValidationResult {\n  valid: boolean;\n  error?: string;\n  suggestedAction?: string;\n  userMessage?: string;\n}\n\`\`\`\n\n---

## Recovery Strategies

### Strategy 1: Graceful Degradation

**When full functionality fails**, provide partial service instead of complete failure:\n\n\`\`\`typescript\nclass RobustDataFetcher {\n  async fetchWithFallback(\n    primarySource: DataSource,\n    fallbackSource: DataSource,\n    sourceName: string\n  ): Promise<FetchResult> {\n    try {\n      // Try primary source first\n      const result = await primarySource.fetch();\n      return { source: sourceName, data: result, status: 'success' };\n    } catch (error) {\n      console.warn(\`\${sourceName} primary failed, trying fallback\`);\n      \n      try {\n        // Try fallback source\n        const fallbackResult = await fallbackSource.fetch();\n        return { source: 'fallback', data: fallbackResult, status: 'degraded' };\n      } catch (fallbackError) {\n        // Both sources failed\n        return {\n          source: null,\n          data: null,\n          status: 'failed',\n          error: \`\${sourceName} unavailable - all sources failed\`\n        };\n      }\n    }\n  }\n}\n\n// Usage in agent workflow\nasync function fetchUserPreferences(userId: string) {\n  const fetcher = new RobustDataFetcher();\n  \n  // Try database first, then cache, then default values\n  const result = await fetcher.fetchWithFallback(\n    new DatabaseSource('preferences'),\n    new CacheSource('preferences'),\n    'preferences'\n  );\n  \n  if (result.status === 'failed') {\n    // Return safe defaults\n    return DEFAULT_USER_PREFERENCES;\n  }\n  \n  return result.data;\n}\n\`\`\`\n\n---

### Strategy 2: State Checkpointing\n\n**Save agent state periodically** so it can recover from mid-execution failures:\n\n\`\`\`typescript\nclass AgentCheckpointManager {\n  private checkpoints: Map<string, AgentCheckpoint> = new Map();\n  \n  async createCheckpoint(\n    workflowId: string,\n    state: AgentExecutionState\n  ): Promise<string> {\n    const checkpointId = crypto.randomUUID();\n    const checkpoint: AgentCheckpoint = {\n      id: checkpointId,\n      workflowId,\n      timestamp: Date.now(),\n      state: JSON.parse(JSON.stringify(state)), // Deep copy\n      status: 'active'\n    };\n    \n    this.checkpoints.set(checkpointId, checkpoint);\n    await this.persistCheckpoint(checkpoint);\n    \n    return checkpointId;\n  }\n  \n  async restoreFromCheckpoint(\n    workflowId: string\n  ): Promise<AgentExecutionState | null> {\n    // Find the most recent active checkpoint for this workflow\n    const activeCheckpoints = Array.from(this.checkpoints.values())\n      .filter(c => c.workflowId === workflowId && c.status === 'active')\n      .sort((a, b) => b.timestamp - a.timestamp);\n    \n    if (activeCheckpoints.length === 0) {\n      return null;\n    }\n    \n    const latestCheckpoint = activeCheckpoints[0];\n    await this.updateCheckpointStatus(\n      latestCheckpoint.id,\n      'restored'\n    );\n    \n    return latestCheckpoint.state;\n  }\n  \n  private async persistCheckpoint(checkpoint: AgentCheckpoint): Promise<void> {\n    // Store in durable storage\n    await database.agents.checkpoints.insert(checkpoint);\n  }\n}\n\ninterface AgentCheckpoint {\n  id: string;\n  workflowId: string;\n  timestamp: number;\n  state: AgentExecutionState;\n  status: 'active' | 'restored' | 'completed' | 'discarded';\n}\n\`\`\`\n\n---

### Strategy 3: Circuit Breaker Pattern\n\n**Prevent cascading failures** by breaking chains of unreliable dependencies:\n\n\`\`\`typescript\nclass CircuitBreaker {\n  private state = 'closed'; // closed, open, half-open\n  private lastFailureTime: number = 0;\n  private failureCount = 0;\n  private failureThreshold = 5;\n  private resetTimeout = 30000; // 30 seconds\n  \n  async execute<T>(operation: () => Promise<T>): Promise<ExecResult<T>> {\n    if (this.isOpen()) {\n      // Circuit is open - reject immediately\n      return {\n        success: false,\n        error: 'Circuit breaker open - service temporarily unavailable',\n        retryAfter: this.getRetryAfter()\n      };\n    }\n    \n    try {\n      const result = await operation();\n      this.onSuccess();\n      return { success: true, data: result };\n    } catch (error) {\n      this.onFailure();\n      return {\n        success: false,\n        error: error instanceof Error ? error.message : 'Unknown error',\n        originalError: error\n      };\n    }\n  }\n  \n  private isOpen(): boolean {\n    if (this.state === 'open') {\n      const timeSinceFailure = Date.now() - this.lastFailureTime;\n      if (timeSinceFailure > this.resetTimeout) {\n        this.state = 'half-open';\n        return false;\n      }\n      return true;\n    }\n    return false;\n  }\n  \n  private onSuccess(): void {\n    this.failureCount = 0;\n    this.state = 'closed';\n  }\n  \n  private onFailure(): void {\n    this.failureCount++;\n    this.lastFailureTime = Date.now();\n    \n    if (this.failureCount >= this.failureThreshold) {\n      this.state = 'open';\n      console.warn('Circuit OPEN - rejecting requests temporarily');\n    }\n  }\n  \n  private getRetryAfter(): number {\n    const timeSinceFailure = Date.now() - this.lastFailureTime;\n    return this.resetTimeout - timeSinceFailure;\n  }\n}\n\ninterface ExecResult<T> {\n  success: boolean;\n  data?: T;\n  error?: string;\n  originalError?: unknown;\n  retryAfter?: number;\n}\n\`\`\`\n\n---

## Error Monitoring and Alerting

### Implement Agent Health Metrics\n\n\`\`\`typescript\nclass AgentHealthMonitor {\n  private metrics: AgentHealthMetrics = {\n    uptime: Date.now(),\n    totalExecutions: 0,\n    successfulExecutions: 0,\n    failedExecutions: 0,\n    averageExecutionTime: 0,\n    currentStatus: 'healthy'\n  };\n  \n  trackExecution(execution: AgentExecution): void {\n    this.metrics.totalExecutions++;\n    \n    if (execution.success) {\n      this.metrics.successfulExecutions++;\n      this.metrics.currentStatus = 'healthy';\n    } else {\n      this.metrics.failedExecutions++;\n      \n      // Check if failure rate exceeds threshold\n      const failureRate = \n        this.metrics.failedExecutions / this.metrics.totalExecutions;\n      \n      if (failureRate > 0.3) {\n        this.metrics.currentStatus = 'degraded';\n        this.alertOnDegradedExecution();\n      }\n      \n      if (failureRate > 0.5) {\n        this.metrics.currentStatus = 'critical';\n        this.alertOnCriticalFailure();\n      }\n    }\n  }\n  \n  private alertOnDegradedExecution(): void {\n    // Notify team via Slack, email, etc.\n    notifyOpsChannel({\n      type: 'agent_degraded',\n      agentId: this.agentId,\n      failureRate: \n        (this.metrics.failedExecutions / this.metrics.totalExecutions * 100).toFixed(2) + '%',\n      message: 'Agent degradation detected - auto-recovery may be triggered'\n    });\n  }\n  \n  private async alertOnCriticalFailure(): Promise<void> {\n    await notifyOpsChannel({\n      type: 'critical_agent_failure',\n      agentId: this.agentId,\n      failureRate: \n        (this.metrics.failedExecutions / this.metrics.totalExecutions * 100).toFixed(2) + '%',\n      message: 'Critical agent failure - manual intervention may be required',\n      priority: 'high'\n    });\n  }\n  \n  getHealthStatus(): HealthStatus {\n    return {\n      agentId: this.agentId,\n      status: this.metrics.currentStatus,\n      uptimeSince: new Date(this.metrics.uptime),\n      totalExecutions: this.metrics.totalExecutions,\n      successRate: \n        (this.metrics.successfulExecutions / this.metrics.totalExecutions * 100).toFixed(2) + '%',\n      latestError: this.latestError\n    };\n  }\n}\n\`\`\`\n\n---\n\n## Production-Ready Error Handling\n\n### Error Classification\n\n\`\`\`typescript\nenum ErrorCategory {\n  // Retry-able errors\n  RATE_LIMIT = 'rate_limit',\n  TIMEOUT = 'timeout',\n  NETWORK_ERROR = 'network_error',\n  \n  // Should trigger fallback\n  AUTH_FAILURE = 'auth_failure',\n  CONFIG_ERROR = 'config_error',\n  \n  // Permanent failures\n  VALIDATION_ERROR = 'validation_error',\n  LOGIC_ERROR = 'logic_error',\n  RESOURCE_NOT_FOUND = 'resource_not_found',\n  \n  // Agent-specific\n  CONTEXT_OVERFLOW = 'context_overflow',\n  MEMORY_CORRUPTION = 'memory_corruption',\n  DEPENDENCY_FAILURE = 'dependency_failure'\n}\n\nfunction classifyError(error: Error): ErrorCategory {\n  if (error.message.includes('rate limit') || error.message.includes('throttle')) {\n    return ErrorCategory.RATE_LIMIT;\n  }\n  \n  if (error.message.includes('timeout')) {\n    return ErrorCategory.TIMEOUT;\n  }\n  \n  if (error.message.includes('authentication') || error.message.includes('token')) {\n    return ErrorCategory.AUTH_FAILURE;\n  }\n  \n  // ... more classification logic\n  \n  return ErrorCategory.VALIDATION_ERROR;\n}\n\ninterface ErrorHandlingStrategy {\n  category: ErrorCategory;\n  retry: boolean;\n  retryCount: number;\n  fallback: () => Promise<unknown>;\n  alert: boolean;\n  maxAlertsPerHour: number;\n}\n\nconst ERROR_STRATEGIES: Record<ErrorCategory, ErrorHandlingStrategy> = {\n  [ErrorCategory.RATE_LIMIT]: {\n    category: ErrorCategory.RATE_LIMIT,\n    retry: true,\n    retryCount: 5,\n    fallback: async () => await returnCachedData(),\n    alert: true,\n    maxAlertsPerHour: 10\n  },\n  [ErrorCategory.VALIDATION_ERROR]: {\n    category: ErrorCategory.VALIDATION_ERROR,\n    retry: false,\n    retryCount: 0,\n    fallback: async () => await returnErrorResponse('Invalid input'),\n    alert: false,\n    maxAlertsPerHour: 0\n  },\n  // ... more strategies\n};\n\nasync function handleAgentError(\n  error: Error,\n  context: ErrorContext\n): Promise<ErrorHandlingResult> {\n  const category = classifyError(error);\n  const strategy = ERROR_STRATEGIES[category];\n  \n  if (strategy.retry && strategy.retryCount > 0) {\n    // Execute retry logic\n    const result = await executeWithRetry(\n      async () => await retryOperation(),\n      { maxAttempts: strategy.retryCount }\n    );\n    \n    return {\n      handled: true,\n      recovered: result.success,\n      originalError: error\n    };\n  }\n  \n  // Execute fallback\n  const fallbackResult = await strategy.fallback();\n  \n  // Alert if necessary\n  if (strategy.alert && shouldAlert() && !exceededAlertLimit(strategy.maxAlertsPerHour)) {\n    await notifyAlert(category, error, context);\n  }\n  \n  return {\n    handled: true,\n    recovered: false,\n    fallbackUsed: true,\n    originalError: error\n  };\n}\n\ninterface ErrorContext {\n  agentId: string;\n  workflowId: string;\n  stepId: string;\n  userInput: string;\n}\n\ninterface ErrorHandlingResult {\n  handled: boolean;\n  recovered: boolean;\n  fallbackUsed?: boolean;\n  originalError: Error;\n}\n\`\`\`\n\n---

## Testing Agent Resilience\n\n### Resilience Testing Patterns\n\n\`\`\`typescript\nclass AgentResilienceTester {\n  async runResilienceTests(): Promise<ResilienceReport> {\n    const testResults: TestResult[] = [];\n    \n    // Test 1: API failure simulation\n    testResults.push(await this.testApiFailures());\n    \n    // Test 2: Network timeout simulation\n    testResults.push(await this.testNetworkTimeouts());\n    \n    // Test 3: Context overflow\n    testResults.push(await this.testContextOverflow());\n    \n    // Test 4: Invalid input handling\n    testResults.push(await this.testInvalidInputs());\n    \n    // Test 5: Memory corruption recovery\n    testResults.push(await this.testMemoryRecovery());\n    \n    // Test 6: High load scenario\n    testResults.push(await this.testHighLoad());\n    \n    return {\n      timestamp: Date.now(),\n      testResults,\n      overallScore: this.calculateOverallScore(testResults),\n      recommendations: this.generateRecommendations(testResults)\n    };\n  }\n  \n  private async testApiFailures(): Promise<TestResult> {\n    const failures = [\n      'rate_limit',\n      'timeout',\n      'service_unavailable',\n      'auth_failed'\n    ];\n    \n    let successCount = 0;\n    \n    for (const failure of failures) {\n      // Simulate failure\n      this.simulateApiFailure(failure);\n      \n      // Try multiple executions\n      for (let i = 0; i < 10; i++) {\n        const result = await this.agent.executeTestWorkflow();\n        if (result.recovered) successCount++;\n      }\n      \n      // Reset simulation\n      this.resetSimulations();\n    }\n    \n    return {\n      testName: 'API Failure Recovery',\n      successRate: (successCount / 40) * 100,\n      passed: successCount > 30,\n      notes: \`\${successCount}/40 executions recovered from API failures\`\n    };\n  }\n  \n  private async testContextOverflow(): Promise<TestResult> {\n    // Send many messages to overflow context\n    const overflowMessage = await this.generateMaxContextMessage();\n    \n    const results: boolean[] = [];\n    \n    for (let i = 0; i < 5; i++) {\n      try {\n        const agentResponse = await this.agent.handleMessage(overflowMessage);\n        results.push(true);\n      } catch (error) {\n        results.push(false);\n      }\n    }\n    \n    return {\n      testName: 'Context Overflow Recovery',\n      successRate: (results.filter(r => r).length / results.length) * 100,\n      passed: results.every(r => r),\n      notes: \`Agent handled context overflow without crashing \${results.every(r => r) ? '✓' : '✗'}\`\n    };\n  }\n}\n\ninterface ResilienceReport {\n  timestamp: number;\n  testResults: TestResult[];\n  overallScore: number;\n  recommendations: string[];\n}\n\ninterface TestResult {\n  testName: string;\n  successRate: number;\n  passed: boolean;\n  notes: string;\n}\n\`\`\`\n\n---\n\n## Best Practices Summary\n\n1. **Always retry with exponential backoff** for transient failures\n2. **Implement circuit breakers** to prevent cascading failures\n3. **Checkpoint state** periodically for recovery\n4. **Classify errors** and apply appropriate strategies\n5. **Monitor agent health** continuously in production\n6. **Test resilience** regularly in staging environments\n7. **Plan for graceful degradation** before deployment\n8. **Log all errors** with sufficient context for debugging\n9. **Set up alerting** for critical failures only\n10. **Have fallback behaviors** for all external dependencies\n\n---\n\n## Looking Ahead\n\nTomorrow (Day 27), we shift to **practical applications** - how everyday users can leverage AI agents for personal productivity, even without technical expertise.\n\n**Key takeaway**: Resilient agents aren't just about handling errors—they're about **building trust through reliability**. Users should know your agent will keep trying, recover when possible, and gracefully degrade when it can't.\n\n**Bottom line**: Build agents that are **robust by design**, not by accident. Resilience is a feature you must intentionally engineer into every part of your agent system.\n\n---\n\n**That wraps up our Day 26 technical deep-dive**! We've covered error handling, recovery strategies, circuit breakers, and production-ready resilience patterns for AI agents.\n\n**Come back tomorrow** for the consumer-facing post on everyday AI agent benefits.

`,
  },
};

export default function PostsPage() {
  const slug: PostSlug = 'day-26-building-resilient-ai-agents';
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
