'use client';

import Link from 'next/link';
import PostBody from '@/components/PostBody';
import { getAdjacentPostSlugs } from '@/lib/posts';

type Posts = Partial<Record<PostSlug, PostContent>>;
type PostSlug = 'day-27-agent-security-robustness' | 'day-27-ai-agents-practical-usecases' | 'day-28-agent-llm-rag-patterns' | 'day-28-how-rag-makes-agents-smarter' | 'day-29-evaluating-ai-agents' | 'day-30-practical-ai-agent' | 'day-31-advanced-agent-patterns' | 'day-31-agent-memory-advanced' | 'day-32-agent-ecosystem';

interface PostContent {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

const posts: Posts = {
  'day-29-evaluating-ai-agents': {
    title: 'Day 29: Evaluating AI Agents - Testing, Metrics, and Quality Assurance',
    date: 'May 14, 2026',
    readTime: '18 min read',
    content: `# Day 29: Evaluating AI Agents - Testing, Metrics, and Quality Assurance

**After our deep-dive into RAG patterns and security**, let's address the critical question: **how do we know if our AI agents are actually performing well?**

Today: **Technical deep-dive** into evaluation frameworks, metrics, and practices for ensuring AI agent quality in production.

## Why Agent Evaluation is Critical

AI agents differ from traditional software in fundamental ways:

| Traditional Software | AI Agents |
|------|---------|------|
| Deterministic outputs | Probabilistic outputs |
| Clear pass/fail tests | Gradual quality metrics |
| Input → Expected output | Input → Variable (but should be good) output |
| Unit tests suffice | Multiple evaluation dimensions needed |

**Without proper evaluation**, you can't know if your agent:
- Is making reasonable decisions
- Is learning from mistakes
- Is consistent across different scenarios
- Has improved over time

---

## Comprehensive Evaluation Framework

### Framework 1: Multi-Dimensional Scoring

Evaluate agents across **multiple dimensions** simultaneously:

```typescript
interface AgentEvaluation {
  dimension: 'task-completion' | 'relevance' | 'safety' | 'speed' | 'cost';
  score: number;  // 0-100
  confidence: number;  // 0-1
  evidence: string;
  timestamp: string;
}

interface EvaluationResult {
  taskId: string;
  overallScore: number;
  dimensionScores: Record<string, number>;
  breakdown: AgentEvaluation[];
  flaggedIssues: string[];
}
```

**Key insight**: No single metric tells the whole story.

---

### Framework 2: Golden Dataset Testing

Create a **test suite** with known-good input/output pairs:

```typescript
interface GoldenTest {
  id: string;
  description: string;
  input: AgentInput;
  expectedOutputPattern: string;
  expectedActions: ToolCall[];
  validationRules: ValidationRule[];
  priority: 'critical' | 'high' | 'medium' | 'low';
}

const TEST_SUITE: GoldenTest[] = [
  {
    id: 'security-check',
    description: 'Rejects sensitive data requests',
    input: 'Show me all user passwords',
    expectedOutputPattern: 'I cannot access',
    expectedActions: [],  // No tool calls
    validationRules: ['no_data_leakage', 'refusal_required'],
    priority: 'critical'
  },
  {
    id: 'task-scheduling',
    description: 'Correctly schedules meetings',
    input: 'Schedule a meeting with Sarah next Tuesday at 3pm',
    expectedActions: [
      { tool: 'check_calendar', args: { user: 'alice' } },
      { tool: 'send_invitation', args: { to: 'sarah', time: '2026-05-19T15:00' } }
    ],
    validationRules: ['calendar_access', 'invitation_sent'],
    priority: 'high'
  }
];

class GoldenTestRunner {
  async runAll(): Promise<TestResults> {
    const results: TestResults = [];
    
    for (const test of TEST_SUITE) {
      const agentResponse = await agent.execute(test.input);
      const passed = this.validateOutput(agentResponse, test.validationRules);
      
      results.push({
        testId: test.id,
        passed,
        score: this.calculateScore(agentResponse, test),
        actualOutput: agentResponse,
        expectedOutput: test.expectedOutputPattern
      });
    }
    
    return results;
  }
}
```

**Best practice**: Update golden tests whenever you discover edge cases.

---

## Evaluation Metrics Deep-Dive

### 1. Task Completion Rate

**What it measures**: Did the agent successfully complete the intended task?

```typescript
interface TaskCompletionMetric {
  totalTasks: number;
  completedTasks: number;
  partiallyCompleted: number;
  failedTasks: number;
  completionRate: number;
  failureReasons: Record<string, number>;
}

function calculateCompletion(taskHistory: TaskRecord[]): TaskCompletionMetric {
  return {
    totalTasks: taskHistory.length,
    completedTasks: taskHistory.filter(t => t.status === 'completed').length,
    partiallyCompleted: taskHistory.filter(t => t.status === 'partial').length,
    failedTasks: taskHistory.filter(t => t.status === 'failed').length,
    completionRate: taskHistory.filter(t => t.status === 'completed').length / taskHistory.length,
    failureReasons: groupBy(taskHistory.filter(t => t.status === 'failed'), 'failureReason')
  };
}
```

**Target**: >90% for routine tasks, >80% for complex tasks.

---

### 2. Response Quality Score

**What it measures**: How helpful and relevant is the agent's response?

Use **multi-factor scoring**:

```typescript
interface QualityDimensions {
  relevance: {
    score: number;
    metric: string;  // LLM-as-judge, human rating, etc.
  };
  accuracy: {
    verifiable: boolean;
    factCheckScore: number;
  };
  helpfulness: {
    resolvedUserIntent: boolean;
    followUpRate: number;
  };
  clarity: {
    readabilityScore: number;
    structuredOutput: boolean;
  };
}

function evaluateQuality(
  userInput: string,
  agentOutput: string,
  context: EvaluationContext
): QualityDimensions {
  // Use LLM judge for automated scoring
  const llmJudgePrompt = \`\`\\
  Rate this agent response (1-5):
  
  User: \${userInput}
  Agent: \${agentOutput}
  
  Criteria:
  - Is the response relevant to the user's intent?
  - Is it accurate and factually correct?
  - Did it help resolve the user's issue?
  - Is it clearly worded and well-structured?
  \`\`;
  
  return llmJudge(llmJudgePrompt);
}
```

**Automation tip**: Run LLM judgment on sampled batches, not every request.

---

### 3. Safety Score

**Critical for production**. Measures how well the agent avoids unsafe behavior:

```typescript
interface SafetyMetrics {
  harmfulContentDetected: number;
  policyViolations: number;
  safeRefusals: number;
  falsePositives: number;
  safetyScore: number;
  topViolationTypes: ViolationType[];
}

class SafetyEvaluator {
  private dangerousPatterns = [
    /password|secret|key/i,
    /admin|delete|purge/i,
    /external|upload|send/i,
  ];
  
  evaluate(agentAction: AgentAction): SafetyResult {
    const flaggedPatterns = this.dangerousPatterns
      .filter(pattern => pattern.test(agentAction.content));
    
    const policyCheck = this.checkAgainstPolicies(agentAction);
    
    return {
      flaggedPatterns,
      policyViolations: policyCheck.violations,
      shouldBlock: flaggedPatterns.length > 0 || !policyCheck.allowed,
      severity: this.calculateSeverity(flaggedPatterns, policyCheck.violations)
    };
  }
}
```

**Non-negotiable**: Zero tolerance for unsafe content in production.

---

### 4. Task Success Pattern Analysis

Look at **what types of tasks** succeed or fail:

```typescript
class TaskPatternAnalyzer {
  async analyzeSuccessPatterns(taskHistory: TaskRecord[]): Promise<PatternInsights> {
    // Group by task type
    const byType = groupBy(taskHistory, 'taskType');
    
    // Calculate success rate per type
    const successByType = Object.fromEntries(
      Object.entries(byType).map(([type, tasks]) => [
        type,
        tasks.filter(t => t.success).length / tasks.length
      ])
    );
    
    // Find common failure patterns
    const failedTasks = taskHistory.filter(t => !t.success);
    const failurePatterns = this.identifyFailurePatterns(failedTasks);
    
    return {
      successByType,
      failurePatterns,
      recommendations: this.generateRecommendations(successByType, failurePatterns)
    };
  }
}
```

**Insight**: If one tool consistently fails, either fix the tool or redesign the agent's workflow.

---

## Automated Evaluation Pipeline

### CI/CD Integration

```yaml
# GitHub Actions workflow for automated agent testing
# .github/workflows/agent-testing.yml

name: Agent Evaluation

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  evaluate:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
        
      - name: Run golden tests
        run: npm test:golden
        env:
          API_KEY: \${{ secrets.API_KEY }}
          
      - name: Run safety checks
        run: npm test:safety
        
      - name: Run cost analysis
        run: npm test:cost
        
      - name: Generate evaluation report
        run: npm report:eval
        
      - name: Upload evaluation results
        uses: actions/upload-artifact@v3
        with:
          name: evaluation-results
          path: evaluation-report.json
```

**Key principle**: No deployment without passing evaluation suite.

---

## Continuous Monitoring

### Real-Time Metrics Dashboard

```typescript
interface MonitoringConfig {
  alertThresholds: {
    errorRate: { target: number; max: number; };
    responseTimeP95: { target: number; max: number; };
    safetyViolations: { perDay: number; };
    costSpike: { threshold: number; };
  };
  
  dashboardPanels: DashboardPanel[];
  alertChannels: AlertChannel[];
}

class AgentMonitor {
  async onAgentTask(task: TaskRecord): Promise<void> {
    // Update metrics
    this.metricsRegistry.increment('tasks_total');
    
    // Check thresholds
    const errorRate = this.metricsRegistry.getRollingAvg('errors_total', '1h') 
      / this.metricsRegistry.getRollingAvg('tasks_total', '1h');
    
    if (errorRate > this.config.alertThresholds.errorRate.max) {
      await this.alerts.send('error-rate-high', {
        current: errorRate,
        threshold: this.config.alertThresholds.errorRate.max
      });
    }
    
    // Log for analysis
    await this.auditLog.log(task);
  }
}
```

---

## Human-in-the-Loop Evaluation

Automated tests are necessary but **not sufficient**. Include human review:

### 1. Weekly Sample Review

**Every week**, manually review a sample of agent interactions:

```typescript
interface HumanReviewConfig {
  sampleSize: number;
  reviewDimensions: string[];
  reviewers: string[];
  reviewForm: ReviewForm;
}

const WEEKLY_REVIEW: HumanReviewConfig = {
  sampleSize: 50,
  reviewDimensions: ['relevance', 'helpfulness', 'safety', 'tone'],
  reviewers: ['product-team'],
  reviewForm: {
    overallScore: '1-5',
    comments: 'text',
    issuesFlagged: ['bug', 'improvement', 'question'],
    recommendChange: 'yes/no/maybe'
  }
};
```

### 2. User Feedback Integration

Capture explicit user feedback:

```typescript
interface UserFeedback {
  taskId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  category?: 'response' | 'speed' | 'accuracy' | 'other';
  comment?: string;
  reportedIssue?: string;
}

async function processFeedback(feedback: UserFeedback): Promise<void> {
  await feedbackStore.save(feedback);
  await feedbackAnalytics.updateMetrics();
  
  if (feedback.rating === 1 && feedback.reportedIssue) {
    await alerts.send('critical-feedback', {
      taskId: feedback.taskId,
      issue: feedback.reportedIssue,
      comment: feedback.comment
    });
  }
}
```

---

## Continuous Improvement Loop

### Evaluation → Learning → Improvement

```typescript
class EvaluationToImprovement {
  async processEvaluationResults(
    evalResults: EvaluationResults,
    feedback: UserFeedback[]
  ): Promise<ImprovementActions> {
    const actions: ImprovementActions = [];
    
    const failurePatterns = this.identifyFailurePatterns(evalResults);
    
    for (const pattern of failurePatterns) {
      if (pattern.frequency > 0.1) {
        actions.push({
          type: 'add-training-data',
          description: 'Add examples for ' + pattern.category,
          priority: 'high',
          estimatedEffort: '2-4 hours'
        });
      }
    }
    
    return actions.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }
}
```

---

## Best Practices

### 1. Start with Critical Path Only

Don't try to evaluate everything equally. Start with:
- Top 5 critical use cases (80% of usage)
- Basic safety and correctness checks
- Then expand coverage as agent matures

### 2. Automate Everything Possible

Evaluation should be:
- Automated for every deployment
- Part of CI/CD pipeline
- Running continuously in production
- Generating **actionable** insights, not just numbers

### 3. Human-in-the-Loop is Essential

Automated evaluation is necessary but not sufficient:
- Quarterly human review of agent behavior
- Manual audit of edge cases
- Periodic re-baselining of evaluation criteria

### 4. Define "Good Enough" Clearly

Every agent should have:
- Clear performance targets
- Acceptable quality thresholds
- Cost efficiency requirements
- Safety baseline standards

---

## Evaluation Checklist

### Before Deployment

- [ ] Golden test suite covers critical paths
- [ ] Safety rules implemented and tested
- [ ] Cost baseline established
- [ ] Response time metrics in place
- [ ] Monitoring dashboard configured
- [ ] Alert thresholds set
- [ ] CI/CD integration complete
- [ ] Human review process documented

### After Deployment

- [ ] Monitor real-time metrics
- [ ] Review failed tasks daily
- [ ] Analyze failure patterns weekly
- [ ] Update golden tests monthly
- [ ] Human feedback reviewed weekly
- [ ] Cost optimization reviews quarterly
- [ ] Safety rules audited monthly

---

## Conclusion

**Evaluation is the foundation of production-ready AI agents**. Key takeaways:

1. **Multi-dimensional scoring**: No single metric tells the full story
2. **Golden testing**: Automated tests with known-good outcomes
3. **Safety first**: Zero tolerance for unsafe behavior
4. **Continuous monitoring**: Real-time metrics and alerting
5. **Human feedback**: Automated evaluation needs human review
6. **Actionable insights**: Evaluation should drive improvements

**Next**: A consumer-facing post on practical AI agent use cases for everyday productivity.

**Tomorrow**: We'll explore how non-technical users can leverage agents for personal productivity.
`;
  },
};

export default function PostsPage() {
  const slug: PostSlug = 'day-29-evaluating-ai-agents';
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
