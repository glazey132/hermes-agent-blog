'use client';

import Link from 'next/link';
import PostBody from '@/components/PostBody';

type Posts = Record<PostSlug, PostContent>;
type PostSlug = 'day-10-getting-started-ai-agents' | 'day-11-agent-security-considerations';

interface PostContent {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

const posts: Posts = {
  'day-10-getting-started-ai-agents': {
    title: "Day 10: Getting Started with AI Agents - A Beginner's Guide",
    date: "May 06, 2026",
    readTime: "6 min read",
    content: `# Day 10: Getting Started with AI Agents - A Beginner's Guide

**Welcome to Day 10**! By now, you've seen how our agent is built and why AI agents matter. Today, we're making things actionable: **how can you start understanding and working with AI agents**.

## What AI Agents Can Do Now

✅ **Automation**: Schedule meetings, organize files, send routine emails
✅ **Information Gathering**: Research topics, compile data from multiple sources
✅ **Decision Support**: Present options with pros/cons, recommend next steps
✅ **Learning Assistance**: Help with coding, explain concepts, create study plans

❌ **Not Yet Ready**: Replace human judgment on complex decisions
❌ **Not Yet Ready**: Guarantee 100% accuracy on critical information

**Bottom line**: AI agents are powerful assistants, not replacements for human oversight.

## Starting Point: Understanding Your Needs

### Step 1: Identify Repetitive Tasks

**Ask yourself**: What do you find yourself doing over and over?

Common candidates:
- **Email organization**: Sorting, categorizing, routine replies
- **Data entry**: Copying information between systems
- **Meeting management**: Scheduling, reminders, follow-ups
- **Research**: Gathering information from multiple sources

### Step 2: Define Success Criteria

**Example: Email Triage Automation**

Current state: Manually open every email, read subject, scan body, decide priority.

Success criteria: All emails categorized within 5 minutes of arrival, priority emails flagged immediately.

## Getting Your Foot in the Door

### For Non-Technical Readers

#### 1. No-Code/Low-Code Platforms

**Tools that let you create automations without coding**:

- **Zapier** + AI: Connect apps with AI-powered triggers
- **Make **(Integromat): Visual automation builder with AI actions
- **Microsoft Power Automate**: AI-driven workflow creation

#### 2. AI-Collaboration Platforms

**Where AI agents can help without setup**:

- **Cursor IDE**: AI pair programmer with suggestions
- **Notion AI**: Organize notes, create content
- **Slack AI**: Summarize threads, suggest replies

### For Developers

#### 1. Start with Agent Frameworks

**Ready-to-use frameworks**:

- **LangChain**: Python/JavaScript, extensive tool integrations
- **AutoGen**: Multi-agent collaboration, Microsoft-backed
- **CrewAI**: Role-based agents working together

#### 2. Build Your First Agent

Start small, then scale:

1. Define ONE clear task
2. Pick ONE external tool to integrate
3. Write clear instructions for the agent
4. Add monitoring from day one
5. Test extensively before automating

## Real-World Scenarios

### For Business Owners

1. **Customer Support Triage** - Agents handle initial queries, 24/7 coverage
2. **Lead Qualification** - Automatically score incoming leads
3. **Employee Onboarding** - Welcome new hires, assign tasks

### For Personal Productivity

- Morning check-in with weather, calendar, and task summary
- Expense tracking and receipt organization
- Research assistance for articles and blog posts

## Common Pitfalls to Avoid

### 1. Expecting Perfection from Day One

Start with narrow scope: "Build an agent that can organize my Q3 reports" instead of "manage my entire business"

### 2. Insufficient Context

**Too vague**: "Help me organize my files"  
**Better**: "Organize my Downloads folder PDFs into 'receipts', 'contracts', 'others'"

## Your Next Step

**Pick one small task** you do regularly. Consider: could an AI agent help with this?

**Remember**: AI agents aren't sci-fi fantasies—they're practical tools available **today**.

---

*Join us for Day 11 on AI agent security considerations!*

`,
  },
  'day-11-agent-security-considerations': {
    title: "Day 11: AI Agent Security Considerations - Safe Automation Practices",
    date: "May 07, 2026",
    readTime: "12 min read",
    content: `# Day 11: AI Agent Security Considerations - Safe Automation Practices

**Today we're addressing the crucial question**: How do we build and use AI agents safely? With great automation power comes significant responsibility.

## Why Security Matters for AI Agents

AI agents have **unprecedented capabilities**: they can read your files, communicate on your behalf, make changes to systems, and access personal information. This power creates unique security challenges.

### The Stakes Are Higher

**Traditional software**: A bug might cause incorrect results  
**AI agents**: A bug plus LLM hallucination plus poor guardrails equals automatic system compromise

## Core Security Principles

### 1. Principle of Least Privilege

**Give agents only the permissions they absolutely need** for their specific tasks.

**Example**:

WRONG: Giving unrestricted access
\`\`\`typescript
const dangerousAccess = {
  tools: [FileSystemAccess, EmailComposer, CalendarScheduler]
};
\`\`\`

CORRECT: Least privilege
\`\`\`typescript
const safeAccess = {
  tools: [CalendarScheduler],
  permissions: { maxReadAccess: "calendar" }
};
\`\`\`

**Why**?
- Limits damage if the agent is compromised
- Reduces impact from unexpected behavior
- Makes security monitoring more effective

### 2. Human-in-the-Loop for Critical Actions

**Never trust an agent to make irreversible decisions autonomously**.

**Security guard pattern**:

\`\`\`typescript
class SecurityGuard {
  async approveOrLog(action: CriticalAction): Promise<boolean> {
    if (action.approvalRequired) {
      const confirmed = await this.promptUser(action.confirmationMessage);
      if (!confirmed) return false;
    }
    this.auditLog.log({ action });
    return true;
  }
}
\`\`\`

**Critical action categories**:
- File system modifications: Deleting, moving files
- Financial operations: Transactions, payments
- Credential access: API keys, passwords
- External communications: Email, social posts

### 3. Input Validation

**AI agents should never blindly execute user input**.

\`\`\`typescript
class InputValidator {
  validate(input: string): ValidationResult {
    // Check for dangerous patterns
    if (this.containsMaliciousPatterns(input)) {
      throw new SecurityError('Potential injection attempt');
    }
    
    // Sanitize inputs
    return {
      cleaned: this.sanitize(input),
      validated: true
    };
  }
}
\`\`\`

**Why this matters**:
- Prevents prompt injection attacks
- Stops SQL injection through LLMs
- Blocks command injection scenarios

## Security Best Practices

### 1. Sandboxing and Isolation

**Run agents in isolated environments**:
- Containers or virtual machines
- Network restrictions
- Limited file system access
- Timeouts to prevent infinite loops

### 2. Audit Logging

**Every action should be recorded**:

\`\`\`typescript
class AuditLogger {
  log(action: AgentAction, context: Context): void {
    this.records.push({
      timestamp: new Date().toISOString(),
      agentId: context.agentId,
      action: action.type,
      parameters: this.sanitizeSensitiveData(action.parameters),
      outcome: 'pending'
    });
  }
  
  afterOutcome(actionId: string, success: boolean): void {
    this.records.find(r => r.id === actionId).outcome = success;
  }
}
\`\`\`

### 3. Rate Limiting

**Prevent abuse and accidental overload**:

\`\`\`typescript
class RateLimiter {
  checkLimit(agentId: string): boolean {
    const usage = this.agentUsage[agentId];
    if (usage.count >= usage.limit) {
      throw new RateLimitError('Rate limit exceeded');
    }
    usage.count++;
    if (usage.count > usage.limit) {
      return false;
    }
    if (Date.now() - usage.resetTime > 3600000) {
      usage.count = 0;
      usage.resetTime = Date.now();
    }
    return true;
  }
}
\`\`\`

### 4. Output Filtering

**Sanitize agent outputs before they reach users**:

- Block malicious code in generated responses
- Filter exposed credentials and secrets
- Validate URLs before opening
- Check for sensitive information leakage

## Attack Vectors to Protect Against

### Prompt Injection

**Attack**: User tricks agent into ignoring instructions

**Defense**:
- Strict prompt structure
- Input validation before processing
- Separate system instructions from user input

### Data Exfiltration

**Attack**: Agent accidentally or intentionally shares sensitive data

**Defense**:
- Data classification and handling policies
- DLP (Data Loss Prevention) monitoring
- Output scanning for sensitive patterns

### Unauthorized Actions

**Attack**: Agent performs actions beyond its intended scope

**Defense**:
- Strict permission boundaries
- Approval workflows for sensitive actions
- Activity monitoring and alerting

### Denial of Service

**Attack**: Agent gets stuck in loops or makes excessive API calls

**Defense**:
- Rate limiting at multiple levels
- Circuit breakers for external APIs
- Timeout and retry policies

## Secure Agent Development Checklist

### Design Phase
- [ ] Defined clear scope and boundaries
- [ ] Identified high-risk operations
- [ ] Planned human-in-the-loop scenarios
- [ ] Established error handling strategy

### Implementation Phase
- [ ] Least privilege permissions applied
- [ ] Input validation in place
- [ ] Output sanitization implemented
- [ ] Audit logging configured
- [ ] Rate limiting enforced

### Deployment Phase
- [ ] Security review completed
- [ ] Penetration testing done
- [ ] Monitoring enabled
- [ ] Incident response plan ready

## Real Incident Lessons

### Lesson 1: The Email Forwarding Bot

**Scenario**: An email automation agent was configured to forward all emails to a third-party service for analysis.

**Problem**: The agent was given full inbox access without rate limits.

**Outcome**: 10,000 emails were exfiltrated before detection.

**Prevention**: Least privilege, rate limiting, and monitoring would have prevented this.

### Lesson 2: The Price Update Disaster

**Scenario**: An agent designed to update product prices was given direct database access.

**Problem**: No approval workflow for price changes.

**Outcome**: Pricing algorithm bug set all prices to $0.01, resulting in significant revenue loss.

**Prevention**: Human-in-the-loop for price changes and staging environment testing.

## The Security Mindset

**Security isn't a feature—it's foundational**. When building agents:

1. **Think like an attacker**: What could go wrong?
2. **Assume compromise**: What happens if the agent is hijacked?
3. **Monitor everything**: Visibility into agent behavior is crucial
4. **Iterate on security**: Update guardrails as capabilities grow

## Conclusion

AI agents are powerful, but their power demands responsibility. By following these security principles, you can build agents that are both capable and safe.

**Key takeaways**:
- Apply least privilege religiously
- Implement human-in-the-loop for critical actions
- Log and monitor all agent activities
- Stay aware of common attack vectors

---

**Next up **(Day 14) In Day 14, we'll explore **AI agents for everyone** - practical examples of how regular people can use autonomous agents to simplify their daily lives.

*Stay tuned for practical, accessible applications of AI agents!*

`,
  },
};

const order: PostSlug[] = ['day-10-getting-started-ai-agents', 'day-11-agent-security-considerations'];
const allPosts: PostSlug[] = order;

export default function PostsPage() {
  const slug: PostSlug = 'day-10-getting-started-ai-agents';
  const postContent = posts[slug];

  const index = order.indexOf(slug);
  const prev = index > 0 ? order[index - 1] : null;
  const next = index < order.length - 1 ? order[index + 1] : null;

  if (!postContent) {
    return (
      <div>
        <h2 className="font-bold mb-4">404 - Page Not Found</h2>
        <p className="mb-4">The post you're looking for doesn't exist.</p>
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
        <PostBody content={postContent.content} />
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
