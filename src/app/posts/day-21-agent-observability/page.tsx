'use client';

import Link from 'next/link';
import PostBody from '@/components/PostBody';
import { getAdjacentPostSlugs } from '@/lib/posts';

type Posts = Partial<Record<PostSlug, PostContent>>;
type PostSlug = 'day-21-agent-observability' | 'day-22-practical-agent-patterns';

interface PostContent {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

const posts: Posts = {
  'day-21-agent-observability': {
    title: "Day 21: Observability for AI Agents - Monitoring, Logging, and Debugging Production Agents",
    date: "May 09, 2026",
    readTime: "12 min read",
    content: `# Day 21: Observability for AI Agents - Monitoring, Logging, and Debugging Production Agents

**Today's deep-dive**: How do you know if your AI agent is working correctly? What metrics should you track? How do you debug when things go wrong?

**The answer**: Observability - the practice of understanding what your system is doing based on its outputs. For AI agents, this is even more critical because they make autonomous decisions that aren't always deterministic.

## Why Observability Matters for Agents

### The Opaque Decision Problem

Unlike traditional software where you can trace execution flows, AI agents involve probabilistic decision-making:

**Traditional software**:
\`\`\`
User clicks "Submit"
  → Form validation runs
  → Database query executes
  → Result displayed
\`\`\`

**AI agent**:
\`\`\`
User requests "Organize my files"
  → Agent considers 23 possible actions
  → LLM scores each by relevance (0.72-0.94 range)
  → Agent decides to: 1) Read file list 2) Categorize by date 3) Move 17 files
  → Each step involves multiple model calls
\`\`\`

**The challenge**: How do you debug when the agent's reasoning doesn't match expectations?

## Key Agent Observability Signals

### 1. Decision Quality Metrics

**Confidence Scores**

Track the model's self-assessed confidence for each decision:

\`\`\`typescript
interface AgentDecisionMetrics {
  // Decision confidence (0-1)
  confidence: number;
  
  // What alternatives were considered
  alternatives: Array<{
    action: string;
    score: number;
    reason: string;
  }>;
  
  // How long reasoning took
  reasoningDurationMs: number;
  
  // Context tokens processed
  contextTokens: number;
}

// Track decision quality over time
class DecisionQualityTracker {
  private decisions: AgentDecisionMetrics[] = [];
  
  recordDecision(decision: AgentDecisionMetrics): void {
    this.decisions.push(decision);
    
    // Alert on low confidence
    if (decision.confidence < 0.6) {
      this.alertLowConfidence(decision);
    }
    
    // Alert on unusual alternatives
    if (decision.alternatives.some(a => a.score > 0.9)) {
      this.alertHighAlternativeScore(decision);
    }
  }
  
  // Calculate decision quality score over time
  getQualityTrend(days: number): TrendAnalysis {
    const recent = this.decisions.filter(
      d => Date.parse(d.timestamp) > Date.now() - days * 24 * 60 * 60 * 1000
    );
    
    return {
      avgConfidence: avg(recent.map(d => d.confidence)),
      avgReasoningTime: avg(recent.map(d => d.reasoningDurationMs)),
      trend: this.calculateTrend(recent.map(d => d.confidence)),
      anomalies: this.detectAnomalies(recent)
    };
  }
}
\`\`\`

**Latency Patterns**

Monitor how long different tasks take:

\`\`\`typescript
interface TaskLatencyProfile {
  taskType: string;
  avgLatencyMs: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  successRate: number;
  retries: number;
}

class LatencyMonitor {
  private taskLatencies = new Map<string, number[]>();
  
  recordLatency(taskType: string, latencyMs: number): void {
    const latencies = this.taskLatencies.get(taskType) || [];
    latencies.push(latencyMs);
    
    // Keep rolling window of last 1000 samples
    if (latencies.length > 1000) {
      latencies.shift();
    }
    
    this.taskLatencies.set(taskType, latencies);
    
    // Check for latency spikes
    if (this.isLatencySpike(taskType, latencyMs)) {
      this.alertLatencySpike(taskType, latencyMs);
    }
  }
  
  private isLatencySpike(taskType: string, current: number): boolean {
    const historical = this.taskLatencies.get(taskType) || [];
    if (historical.length < 50) return false;
    
    const avg = historical.reduce((a, b) => a + b, 0) / historical.length;
    const std = Math.sqrt(
      historical.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / historical.length
    );
    
    return current > avg + 3 * std;
  }
}
\`\`\`

### 2. Context Understanding Signals

**Token Usage Tracking**

Monitor tokens consumed per interaction:

\`\`\`typescript
class TokenUsageTracker {
  private sessionTokens = new Map<string, TokenUsage>();
  
  recordTokenUsage(sessionId: string, tokens: TokenUsage): void {
    const session = this.sessionTokens.get(sessionId) || {
      totalTokens: 0,
      inputTokens: 0,
      outputTokens: 0,
      breakdown: new Map<string, number>(),
      cost: 0
    };
    
    session.totalTokens += tokens.total;
    session.inputTokens += tokens.input;
    session.outputTokens += tokens.output;
    session.cost += tokens.cost;
    
    for (const [component, count] of tokens.breakdown) {
      session.breakdown.set(
        component, 
        (session.breakdown.get(component) || 0) + count
      );
    }
    
    this.sessionTokens.set(sessionId, session);
    
    // Alert on budget thresholds
    if (session.cost > 10.00) {
      this.alertBudgetWarning(sessionId, session.cost);
    }
  }
  
  getTokenBreakdown(sessionId: string): ComponentBreakdown {
    const session = this.sessionTokens.get(sessionId);
    if (!session) return {};
    
    return {
      planning: session.breakdown.get('planning') || 0,
      toolCalls: session.breakdown.get('tools') || 0,
      memoryAccess: session.breakdown.get('memory') || 0,
      output: session.breakdown.get('output') || 0,
      total: session.totalTokens
    };
  }
}
\`\`\`

**Memory Access Patterns**

Understand how the agent's memory system is being used:

\`\`\`typescript
interface MemoryAccessLog {
  timestamp: string;
  accessType: 'read' | 'write' | 'delete';
  memoryType: 'episodic' | 'semantic' | 'procedural' | 'working';
  relevanceScore?: number;
  retrievedItems: string[];
  decisionJustification?: string;
}

class MemoryObservability {
  private accessLogs: MemoryAccessLog[] = [];
  
  logAccess(log: MemoryAccessLog): void {
    this.accessLogs.push(log);
    
    // Detect unusual patterns
    if (this.isMemoryStarvation(log)) {
      this.alertMemoryStarvation(log);
    }
    
    if (this.isMemoryLeak(log)) {
      this.alertMemoryLeak(log);
    }
  }
  
  private isMemoryStarvation(log: MemoryAccessLog): boolean {
    // High frequency reads with low relevance
    const recentReads = this.accessLogs.filter(
      a => a.accessType === 'read' && 
           Date.parse(log.timestamp) - Date.parse(a.timestamp) < 60 * 1000
    );
    
    const lowRelevance = recentReads.filter(a => 
      !a.relevanceScore || a.relevanceScore < 0.3
    ).length;
    
    return lowRelevance > recentReads.length * 0.8;
  }
}
\`\`\`

### 3. Action Outcome Signals

**Success Rate Tracking**

Monitor whether agent actions achieve intended outcomes:

\`\`\`typescript
interface ActionOutcome {
  actionType: string;
  intent: string;
  success: boolean;
  actualOutcome: string;
  expectedOutcome: string;
  feedbackSignal?: string;
  latencyMs: number;
}

class ActionOutcomeTracker {
  private outcomes: ActionOutcome[] = [];
  
  recordOutcome(outcome: ActionOutcome): void {
    this.outcomes.push(outcome);
    
    // Track success rate by action type
    this.updateSuccessRate(outcome);
    
    // Detect action failures
    if (!outcome.success) {
      this.analyzeFailure(outcome);
    }
    
    // Check for action loops (same action repeated with failures)
    if (this.detectActionLoop(outcome)) {
      this.alertActionLoop(outcome);
    }
  }
  
  private detectActionLoop(outcome: ActionOutcome): boolean {
    const recentFailures = this.outcomes.filter(o => 
      o.actionType === outcome.actionType && 
      !o.success &&
      Date.parse(outcome.timestamp) - Date.parse(o.timestamp) < 300 * 1000
    );
    
    // Alert if 3 consecutive failures for same action
    return recentFailures.length >= 3;
  }
  
  getActionSuccessRates(): Record<string, number> {
    const byType = new Map<string, { success: number; total: number }>();
    
    for (const outcome of this.outcomes) {
      const stats = byType.get(outcome.actionType) || { success: 0, total: 0 };
      stats.total += 1;
      if (outcome.success) stats.success += 1;
      byType.set(outcome.actionType, stats);
    }
    
    return Object.fromEntries(
      Array.from(byType.entries()).map(([type, stats]) => [
        type, 
        (stats.success / stats.total) * 100
      ])
    );
  }
}
\`\`\`

## Building an Observability Dashboard

### Dashboard Components

**Real-Time Agent Health Panel**:

\`\`\`typescript
interface AgentHealthMetrics {
  active: boolean;
  decisionsPerMinute: number;
  avgDecisionConfidence: number;
  currentTask: string | null;
  memoryUsage: {
    workingSet: number;
    episodicCount: number;
    semanticCount: number;
  };
  tokenBudgetRemaining: number;
  tokenBudgetTotal: number;
}

class AgentHealthDashboard {
  renderMetrics(metrics: AgentHealthMetrics): React.ReactNode {
    return (
      <div className="dashboard-panel">
        <h3>Agent Health</h3>
        
        <HealthStatus status={metrics.active ? 'active' : 'idle'} />
        <ActivityGraph rate={metrics.decisionsPerMinute} />
        
        <ConfidenceMeter value={metrics.avgDecisionConfidence} />
        
        <TaskIndicator task={metrics.currentTask} />
        
        <MemoryUsage {...metrics.memoryUsage} />
        
        <TokenBudget
          remaining={metrics.tokenBudgetRemaining}
          total={metrics.tokenBudgetTotal}
        />
      </div>
    );
  }
}
\`\`\`

**Historical Performance Analysis**:

\`\`\`typescript
class HistoricalAnalysis {
  async generateWeeklyReport(startDate: Date, endDate: Date): Promise<AgentReport> {
    const dailyData = await this.collectDailyData(startDate, endDate);
    
    return {
      summary: {
        totalInteractions: dailyData.reduce((sum, day) => sum + day.interactions, 0),
        avgConfidence: this.calculateAvg(dailyData, 'confidence'),
        avgLatency: this.calculateAvg(dailyData, 'latency'),
        successRate: this.calculateSuccessRate(dailyData),
        costTotal: dailyData.reduce((sum, day) => sum + day.cost, 0),
      },
      trends: {
        confidence: this.analyzeTrend(dailyData.map(d => d.confidence)),
        latency: this.analyzeTrend(dailyData.map(d => d.latency)),
        usage: this.analyzeTrend(dailyData.map(d => d.interactions)),
      },
      insights: this.generateInsights(dailyData),
      recommendations: this.generateRecommendations(dailyData),
    };
  }
  
  private generateInsights(data: DailyMetrics[]): Insight[] {
    const insights: Insight[] = [];
    
    // Confidence degradation over time
    if (data.length > 7) {
      const firstWeek = data.slice(0, 7);
      const secondWeek = data.slice(7);
      
      const firstAvg = this.calculateAvg(firstWeek, 'confidence');
      const secondAvg = this.calculateAvg(secondWeek, 'confidence');
      
      if (secondAvg < firstAvg - 0.1) {
        insights.push({
          type: 'warning',
          message: 'Decision confidence has decreased over the past week',
          severity: 'medium',
          suggestion: 'Review recent interactions for patterns causing lower confidence'
        });
      }
    }
    
    // High latency correlation
    const highLatencyDays = data.filter(d => d.latency > 5000);
    if (highLatencyDays.length > 0) {
      insights.push({
        type: 'info',
        message: \`\${highLatencyDays.length} days had high decision latency\`,
        severity: 'low',
        suggestion: 'Consider optimizing frequently-used action paths'
      });
    }
    
    return insights;
  }
}
\`\`\`

### Alerting Strategies

**Warning Conditions**:

\`\`\`typescript
interface AlertConfig {
  condition: string;
  threshold: number | string;
  windowMs: number;
  message: string;
  severity: 'info' | 'warning' | 'critical';
}

class AgentAlerts {
  private alertConfigs: AlertConfig[] = [
    {
      condition: 'low_confidence',
      threshold: 0.5,
      windowMs: 3600000, // 1 hour
      message: 'Agent making low-confidence decisions',
      severity: 'warning'
    },
    {
      condition: 'high_latency',
      threshold: 10000, // 10 seconds
      windowMs: 300000, // 5 minutes
      message: 'Agent response time exceeding threshold',
      severity: 'warning'
    },
    {
      condition: 'failure_rate',
      threshold: 0.2, // 20% failure rate
      windowMs: 3600000,
      message: 'Agent action failure rate above threshold',
      severity: 'critical'
    },
    {
      condition: 'token_budget',
      threshold: '10%', // Below 10% remaining
      windowMs: 86400000, // 24 hours
      message: 'Token budget consumption rate high',
      severity: 'warning'
    },
  ];
  
  configureAlerts(configs: AlertConfig[]): void {
    this.alertConfigs = configs;
    // Apply to monitoring system
    this.setupMonitoring(configs);
  }
  
  async evaluateAlerts(metrics: RealTimeMetrics): Promise<Alert[] | null> {
    const alerts: Alert[] = [];
    
    for (const config of this.alertConfigs) {
      if (await this.conditionMet(config, metrics)) {
        alerts.push({
          type: config.condition,
          severity: config.severity,
          message: config.message,
          timestamp: new Date(),
          thresholds: {
            value: this.getMetric(config.condition, metrics),
            threshold: config.threshold,
            windowMs: config.windowMs
          },
          recommendedAction: this.getRecommendedAction(config.condition)
        });
      }
    }
    
    return alerts.length > 0 ? alerts : null;
  }
  
  private getRecommendedAction(condition: string): string {
    const actions: Record<string, string> = {
      'low_confidence': 'Review decision logs and context quality',
      'high_latency': 'Check model performance and cache effectiveness',
      'failure_rate': 'Audit recent action outcomes for patterns',
      'token_budget': 'Review agent efficiency and consider optimization'
    };
    
    return actions[condition] || 'Investigate system metrics';
  }
}
\`\`\`

## Debugging Common Agent Issues

### Scenario 1: Agent Making Poor Decisions

**Symptoms**: Low confidence scores, incorrect action choices

**Debug Steps**:

\`\`\`typescript
async function debugPoorDecisions(sessionId: string): Promise<Diagnosis> {
  const logs = await getAgentLogs(sessionId, {
    filter: { confidence: { lt: 0.6 } }
  });
  
  const patterns = analyzeDecisionPatterns(logs);
  
  return {
    diagnosis: patterns.confidenceBreakdown < 0.5 
      ? 'Context quality issues'
      : patterns.actionAlignment < 0.6
      ? 'Intent-action misalignment'
      : 'General uncertainty',
    
    contributingFactors: [
      ...patterns.contextGaps,
      ...patterns.toolAvailabilityIssues,
      ...patterns.uncertaintyIndicators
    ],
    
    recommendations: [
      patterns.contextGaps.length > 0 
        ? 'Improve context collection for this task type'
        : patterns.toolAvailabilityIssues.length > 0
        ? 'Ensure required tools are available'
        : 'Consider providing clearer intent specifications'
    ]
  };
}
\`\`\`

### Scenario 2: Agent Not Completing Tasks

**Symptoms**: Tasks timeout, actions don't produce expected results

**Debug Steps**:

\`\`\`typescript
async function debugIncompleteTasks(sessionId: string): Promise<Diagnosis> {
  const actionHistory = await getActionHistory(sessionId);
  
  const bottleneck = identifyBottleneck(actionHistory);
  
  return {
    diagnosis: bottleneck.type,
    details: {
      currentTask: bottleneck.task,
      stuckAtStep: bottleneck.step,
      repeatedAttempts: bottleneck.repeatedAttempts,
      lastError: bottleneck.lastError
    },
    recommendations: [
      'Review step configuration',
      'Verify tool availability',
      'Check context windows',
      'Consider task decomposition'
    ]
  };
}
\`\`\`

## Practical Observability Setup

### Implementation Checklist

**Before Deploying**:
- [ ] Configure confidence score alerting
- [ ] Set up token budget monitoring
- [ ] Define success metrics for each action type
- [ ] Create baseline latency expectations
- [ ] Establish memory usage thresholds
- [ ] Set up integration with external logging (Datadog, New Relic, etc.)

**Daily Operations**:
- [ ] Review daily summary dashboard
- [ ] Check for anomalies in decision patterns
- [ ] Monitor token budget consumption
- [ ] Review failed actions and their causes

**Weekly Review**:
- [ ] Analyze weekly performance trends
- [ ] Review confidence score distributions
- [ ] Update baseline metrics based on learned patterns
- [ ] Identify improvement opportunities

## Summary

**Key Observability Principles for AI Agents**:

1. **Track decisions, not just outcomes** - Understand why agents choose actions
2. **Monitor confidence levels** - Low confidence signals uncertainty
3. **Profile latency patterns** - Understand where time is spent
4. **Track token usage** - Cost management requires visibility
5. **Measure memory effectiveness** - Is the agent's knowledge being used well?
6. **Set up automated alerting** - Don't wait for users to report problems

**Next Step**: **Day 22** will cover practical patterns for using AI agents effectively in daily workflows - the consumer-facing companion to this technical deep-dive.\n`,
  },
};


export default function PostsPage() {
    const slug: PostSlug = 'day-21-agent-observability';
    const postContent = posts[slug];
  const { prev, next } = getAdjacentPostSlugs(slug);

  const resolvedPostContent = postContent ?? {
    title: 'Post not published',
    date: 'Unpublished',
    readTime: '0 min read',
    content: `# Post not published

This route exists, but no grounded post content is available for this slug. The blog generator should only publish posts backed by session notes and the git log.`,
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
