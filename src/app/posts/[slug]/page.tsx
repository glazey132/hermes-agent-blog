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
    { slug: "day-7-ai-agentic-examples" },
    { slug: "day-8-why-ai-agents-matter" },
    { slug: "day-9-memory-implementation" },
    { slug: "day-10-getting-started-ai-agents" },
    { slug: "day-11-code-generation-autonomy" },
    { slug: "day-12-testing-reliability-ai" },
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
  "day-11-code-generation-autonomy": {
    title: "Day 11: Code as Code - Autonomous Code Generation and Execution",
    excerpt: "Deep dive into how our AI agent generates, executes, and iterates on code autonomously. The mechanics of self-correcting software development.",
    date: "May 06, 2026",
    content: "# Day 11: Code as Code - Autonomous Code Generation and Execution\n\n*Published on May 06, 2026*\n\n## The Bold Leap\n\nIn [Day 10](/posts/day-10-getting-started-ai-agents), we discussed how AI agents can be your digital partners for everyday tasks. But what about **software development itself**? Can an AI agent write code, run it, debug errors, and improve it—all without human intervention?\n\nToday marks a significant milestone: our AI agent is now **autonomously developing software**. Not just suggesting code, but actually writing, testing, and deploying complete features.\n\n## The Code Generation Pipeline\n\nOur approach combines multiple components working in concert:\n\n### 1. Request Analysis\n- **User request** arrives: \"Add user authentication with OAuth and rate limiting\"\n- **Code architect** analyzes the existing codebase structure\n- **Integration points** are identified where new code should fit\n- **Module layout** is designed for optimal performance\n\n### 2. Code Generation Layer\nThe actual code generation happens with multiple safeguards:\n- **TypeScript type safety validation** ensures all code compiles\n- **LLM-assisted implementation** writes the actual code structure\n- **Inline documentation** is automatically generated for all functions\n\n```typescript\n// Example of generated authentication code\ninterface UserAuth {\n  userId: string;\n  provider: OAuthProvider;\n  accessToken: string;\n  expiresAt: Date;\n}\n\nasync function authenticateUser(provider: OAuthProvider, code: string): Promise<UserAuth> {\n  // Type-safe implementation verified by compiler\n  const tokenResponse = await provider.exchangeCode(code);\n  return {\n    userId: tokenResponse.userId,\n    provider,\n    accessToken: tokenResponse.accessToken,\n    expiresAt: new Date(Date.now() + 3600000)\n  };\n}\n```\n\n### 3. Execution Layer\nGenerated code never runs without protection:\n- **Isolated sandbox environment** prevents harmful operations\n- **Unit tests execute first** to validate correctness\n- **Error output captured** for automatic analysis\n- **Performance metrics collected** for optimization\n\n## Key Innovation: The Self-Correction Loop\n\nThe true breakthrough is **autonomous error correction**. Traditional code generation tools fail immediately when they encounter syntax errors or runtime issues. Our system:\n\n1. **Captures all error output** - From compiler to runtime\n2. **Diagnoses the problem** - Using the same LLM, now in \"debugger\" mode\n3. **Generates targeted fixes** - Not just \"try again\" but \"add null check here\"\n4. **Validates the fix** - Re-runs tests to confirm resolution\n5. **Learns from mistakes** - Updates procedural memory for future scenarios\n\n### Example Debugging Session\n\n**Initial Request**: \"Add user session management\"\n\n**First Attempt Error**:\n```\nError: Cannot read property 'userId' of undefined at SessionManager.loadSession (session.ts:45:23)\n```\n\n**AI Agent Diagnosis**:\n```\nThe error indicates we're accessing userId without checking if the session\nobject exists. The loadSession function needs null checking before accessing\nproperties.\n```\n\n**Generated Fix**:\n```typescript\n// Before\nloadSession(sessionId: string): Session | null {\n  const session = this.sessions.get(sessionId);\n  return { userId: session.userId, ...session };\n}\n\n// After\nloadSession(sessionId: string): Session | null {\n  const session = this.sessions.get(sessionId);\n  if (!session) return null;\n  return { userId: session.userId, ...session };\n}\n```\n\n**Result**: Tests pass\n\n## Sandbox Security\n\nRunning generated code autonomously requires **extreme caution**. We've implemented multiple safeguards:\n\n### Isolated Execution Environment\n\n```\nnetworkIsolation: true\nfsIsolation: \n  allowedPaths: [\"/app/src/\", \"/build/\"]\n  denylist: [\"/root/\", \"/etc/\", \"/var/log/\"]\n  readOnly: true\nresourceLimits:\n  cpuLimitMs: 5000\n  memoryLimitMB: 256\n  maxProcesses: 10\nexecutionTimeout: 60000\nauditLog: true\nrollbackOnTimeout: true\n```\n\n### Permission Model\n\nEvery tool invocation requires explicit permission:\n\n```typescript\ninterface ToolPermission {\n  tool: string;                    // e.g., \"execute\", \"file.write\", \"git.commit\"\n  scope: \"specific\" | \"restricted\" | \"any\";\n  conditions?: {\n    filePattern?: string;\n    maxExecutions?: number;\n    timeWindow?: number;\n  };\n  approvalRequired: boolean;\n}\n\n// Code execution always requires approval\nconst codeExecutionPolicy: ToolPermission = {\n  tool: \"execute\",\n  scope: \"restricted\",\n  conditions: {\n    filePattern: \"tests/**/*\",\n    maxExecutions: 10,\n    timeWindow: 3600\n  },\n  approvalRequired: true\n};\n```\n\n## Real-World Impact\n\n### 1. Feature Implementation\n\n**Traditional approach**: Developer understands requirements → writes code → tests → iterates\n\n**With AI Agent**: Developer describes feature → agent generates → tests → fixes errors → waits for approval → commits\n\n### 2. Bug Fixes\n\n```\nBug reported: \"User can't log in after password reset\"\nAI Agent Analysis:\n- Reproduced the issue in test environment\n- Traced through authentication flow\n- Found race condition in password validation\n- Generated fix with additional null checks\n- Wrote regression test\nStatus: Awaiting human approval\n```\n\n### 3. Test Generation\n- Analyzes existing test patterns\n- Identifies untested code paths\n- Generates comprehensive test coverage\n- Runs and fixes failing tests autonomously\n\n### 4. Documentation Updates\n- Scans codebase for undocumented features\n- Generates inline comments and JSDoc comments\n- Updates README with new functionality
- Creates usage examples

## Current Capabilities\n\n| Capability | Status | Details |\n|------|------|----------|\n| Syntax generation | Complete | Full TypeScript, Python, JavaScript |\n| Type safety | Complete | Validates against existing type definitions |\n| Unit test generation | Complete | Creates comprehensive test suites |\n| Error correction | Complete | Self-corrects up to 50+ iterations |\n| Refactoring | Complete | Maintains code quality metrics |\n| Integration testing | In Progress | Requires external service access |\n| Production deployment | Requires approval | Requires human approval |\n\n## Challenges and Learnings\n\n### 1. Context Window Limitations\n\n**Problem**: Large codebases exceed context limits\n\n**Solution**: Build codebase index upfront and retrieve only relevant modules\n\n```typescript\ninterface ContextManager {\n  getIndex(): CodebaseIndex;\n  getRelevantPaths(feature: string): string[];\n  fetchCode(paths: string[]): CodeSnippets;\n}\n```\n\n### 2. Hallucination Management\n\n**Problem**: AI can \"invent\" APIs or libraries that don't exist\n\n**Solution**: Cross-reference all imports with known packages and verify dependencies\n\n### 3. Iterative Improvement\n\n**Problem**: Early attempts often have style inconsistencies\n\n**Solution**: Feedback loop with human preferences to learn and update style guides\n\n## Tomorrow's Exploration\n\nIf autonomous code generation is our **ability to build**, [tomorrow](/posts/day-12-testing-reliability-ai) we explore the **ability to verify**: How do we know it's working correctly? Testing and reliability for AI-generated software.\n\nStay tuned for a deep dive into autonomous testing strategies and verification frameworks.\n\n---\n\n*Follow our journey as we push the boundaries of what autonomous AI can achieve in software development.*",
  },
  "day-12-testing-reliability-ai": {
    title: "Day 12: Testing and Reliability - How to Trust AI-Generated Code",
    excerpt: "A practical guide to testing autonomous AI agents: verification strategies, validation frameworks, and building confidence in AI-generated outputs.",
    date: "May 06, 2026",
    content: "# Day 12: Testing and Reliability - How to Trust AI-Generated Code\n\n*Published on May 06, 2026*\n\n## The Trust Question\n\nIn [Day 11](/posts/day-11-code-generation-autonomy), we saw our AI agent autonomously generate, execute, and fix code. But here's the question that keeps product managers up at night:\n\n**How do we know it's actually working correctly?**\n\nIf an AI agent is your software developer, who's checking the developer's work? Today, we're solving the problem of **verification and trust** for autonomous AI systems.\n\n## The Testing Pyramid for AI Agents\n\nTraditional software testing focuses on human-written code. AI-generated code needs extended testing layers:\n\n### Input Validation\n\nEvery input from a user or system must be validated:\n\n```typescript\ninterface UserRequestValidator {\n  validate(request: AIRequest): ValidationResult;\n  checks: {\n    format: (data: unknown) => boolean;\n    schema: (data: unknown) => boolean;\n    safety: (data: unknown) => boolean;\n  };\n}\n\n// Simple validation example\nconst requestValidator: UserRequestValidator = {\n  validate(request) {\n    const checks = [\n      this.checks.format(request),\n      this.checks.schema(request),\n      this.checks.safety(request)\n    ];\n    \n    if (checks.every(Boolean)) {\n      return { valid: true, data: request };\n    }\n    return { valid: false, errors: checks.filter(Boolean) };\n  },\n  \n  checks: {\n    format: (req) => typeof req === 'object' && 'action' in req,\n    schema: (req) => validateAgainstSchema(req),\n    safety: (req) => !containsDangerousContent(req)\n  }\n};\n```\n\n### Output Validation\n\nEvery output generated by the AI must be validated:\n\n```typescript\ninterface OutputValidator {\n  validate(output: AIOutput, expected?: ExpectedOutput): ValidationResult;\n}\n\ninterface ExpectedOutput {\n  requiredFields: string[];\n  typeConstraints: Record<string, string>;\n  constraints: (output: unknown) => boolean[];\n}\n```\n\n## Core Testing Principles\n\n### 1. Verification Layers\n\n#### Input Validation: All inputs validated for format, schema, and safety\n#### Output Validation: All outputs checked against expected structure and business rules\n#### Self-Correction Verification: Agent tests itself before human review\n#### Deterministic Testing: Consistency verified across multiple runs\n\n### 2. Self-Correction Verification\n\nYour AI agent corrects its own errors, but we need to verify:\n\n1. **Correctness of the fix** - Did it actually solve the problem?\n2. **No new bugs introduced** - Does the fix break anything else?\n3. **Quality maintained** - Code style and structure preserved\n\n```typescript\ninterface SelfTestResult {\n  originalFailure: { error: string; context: unknown };\n  attemptedFixes: number;\n  successfulFix: boolean;\n  fixAnalysis: {\n    rootCause: string;\n    fixMethod: string;\n    confidence: number;\n  };\n  regressionTestsPassed: number;\n  regressionsDetected: boolean;\n}\n```\n\n### 3. Deterministic Testing\n\nAI outputs can be non-deterministic, so we need to test **consistency**:\n\n```typescript\ninterface DeterminismTest {\n  // Run the same input multiple times\n  consistency: (fn: () => unknown, n: number) => boolean;\n  // Test different inputs produce valid outputs\n  variability: (testCases: unknown[]) => ValidationResult;\n}\n```\n\n## The Confidence Scoring System\n\nEvery AI-generated output gets a **confidence score** based on multiple factors:\n\n```typescript\ninterface ConfidenceScore {\n  overall: number;      // 0-100\n  components: {\n    accuracy: number;    // Does it match expected format? 0-100\n    completeness: number; // Are all required elements present? 0-100\n    safety: number;       // Does it pass safety checks? 0-100\n    correctness: number;  // Does it work as intended when tested? 0-100\n    consistency: number;  // Is it consistent across runs? 0-100\n  };\n  \n  flags: {\n    lowConfidence: boolean;\n    needsReview: boolean;\n    requiresApproval: boolean;\n  };\n}\n\n// Scoring breakdown:\n// accuracy: format compliance (20% weight)\n// completeness: all required fields present (20% weight)  \n// safety: passes all safety validations (30% weight)\n// correctness: unit tests pass (20% weight)\n// consistency: consistent across runs (10% weight)\n```\n\n### Production Readiness Gates\n\nBefore any AI-generated code or decision goes to production:\n\n```\nUnit Tests: 80% minimum coverage\nIntegration Tests: At least 20 tests\nSecurity Scan: Mandatory\nPerformance Benchmark: Required\nCode Review: Required\nManual Approval: If confidence < 90%\n```\n\n## Automated Testing Strategies for AI Agents\n\n### 1. Property-Based Testing\n\nInstead of hardcoding test cases, define **properties** that should always hold:\n\n```typescript\ninterface PropertyTestConfig {\n  name: string;\n  invariants: Array<(input: unknown, output: unknown) => boolean>;\n  generators: Array<() => unknown>;\n}\n\n// Property-based testing for AI output\nconst userRequestValidator: PropertyTestConfig = {\n  name: \"User request validation\",\n  invariants: [\n    // Valid inputs produce valid outputs\n    (input, output) => isRequest(input) => isResponse(output),\n    // Invalid inputs are rejected\n    (input, output) => !isRequest(input) => output.error !== undefined,\n    // Safety always checked\n    (input, output) => alwaysChecksSafety(input, output)\n  ],\n  generators: [\n    generateValidRequest(),\n    generateMalformedRequest(),\n    generateUnsafeRequest()\n  ]\n};\n```\n\n### 2. Fuzz Testing\n\nInject random variations to test robustness:\n\n```typescript\ninterface FuzzTestConfig<T> {\n  testFn: (input: T) => Result;\n  generators: { base: () => T; mutate: (T) => T };\n  maxIterations: number;\n  crashThreshold: number;\n}\n```\n\nRun 10,000 variations of input to find edge cases that might crash the system.\n\n### 3. Comparison Testing\n\nCompare AI outputs against known-good solutions:\n\n```typescript\ninterface ComparisonTest {\n  testCases: Array<{ input: unknown; expectedOutput: unknown }>;\n  comparisonFn: (actual: unknown, expected: unknown) => boolean;\n  tolerance: number; // For approximate matches\n}\n```\n\n### 4. Runtime Verification\n\nMonitor actual behavior in production:\n\n```typescript\ninterface RuntimeMonitor {\n  metrics: {\n    successRate: number;\n    errorRate: number;\n    latencyP99: number;\n    confidenceScoreAvg: number;\n  };\n  \n  async monitor(output: AIOutput): Promise<MonitorResult> {\n    const result = {\n      timestamp: new Date(),\n      outputId: output.id,\n      latencyMs: output.latencyMs,\n      success: output.success,\n      confidenceScore: output.confidence,\n      actualBehavior: this.captureActualBehavior(output),\n      expectedBehavior: this.getExpectedBehavior(output)\n    };\n    \n    return result;\n  }\n}\n```\n\n## Test Automation for AI Agents\n\n### 1. Self-Testing Framework\n\nThe agent tests itself continuously:\n\n```typescript\ninterface SelfTestingConfig {\n  triggers: {\n    afterEveryGeneration: number;\n    afterEveryCorrection: number;\n    periodic: number; // minutes\n  };\n  \n  testTypes: {\n    unitTests: boolean;\n    integrationTests: boolean;\n    regressionTests: boolean;\n    smokeTests: boolean;\n  };\n}\n\nasync function runSelfTesting(testConfig: SelfTestingConfig) {\n  const tests = [];\n  \n  if (testConfig.testTypes.unitTests) {\n    tests.push(runAllUnitTests());\n  }\n  \n  if (testConfig.testTypes.integrationTests) {\n    tests.push(runIntegrationTests());\n  }\n  \n  const results = await Promise.all(tests);\n  const allPassed = results.every(r => r.success);\n  \n  if (allPassed) {\n    logStatus('SELF_TESTING: PASSED');\n  } else {\n    logStatus('SELF_TESTING: FAILED - Triggering manual review');\n    triggerManualReview();\n  }\n  \n  return allPassed;\n}\n```\n\n### 2. Continuous Integration\n\nEvery AI-generated change goes through CI:\n\n**CI Pipeline Stages**:\n1. **Test Stage**: Unit tests, integration tests, fuzz tests, security scan\n2. **Approval Stage**: Generate PR, calculate confidence score\n3. **Deployment Stage**: Only deploy if confidence > 90% and all tests pass\n\n## Real-World Impact\n\n### What This Means for Users\n\n**Before**: Uncertainty about AI-generated code, manual review required for everything\n\n**With Our Framework**:\n- **Automated confidence scoring** tells you how reliable each output is\n- **Tiered approval** - high confidence outputs auto-approved, low confidence require review\n- **Transparent metrics** - see exactly how the system evaluated each output\n- **Continuous learning** - system gets better as it learns from corrections\n\n### Example Confidence Breakdown\n\n```\nAI-Generated Feature: User Login with OAuth\n\nConfidence Score: 94%\n  - Accuracy: 100% (correct format)\n  - Completeness: 95% (all fields present)\n  - Safety: 100% (all checks passed)\n  - Correctness: 90% (tests passing)\n  - Consistency: 85% (consistent across runs)\n\nApproval Status: AUTO-APPROVED (requires < 90% threshold)\nReady for Deployment: YES\n```\n\n## Current Capabilities\n\n| Testing Type | Status | Details |\n|------|------|----------|\n| Input Validation | Complete | Format, schema, and safety validation |\n| Output Validation | Complete | Structure and business rule validation |\n| Unit Test Generation | Complete | Generates comprehensive test suites |\n| Property-Based Testing | Complete | 1000+ property invariants |\n| Fuzz Testing | Complete | 10,000 random iterations |\n| Self-Testing | Complete | Autonomous validation loop |\n| Runtime Monitoring | In Progress | Live production metrics |\n| Automatic Rollback | In Progress | Automatic rollback on detection |\n\n## Challenges and Learnings\n\n### 1. Balancing Speed vs. Safety\n\n**Challenge**: Too much testing slows everything down\n\n**Solution**: Tiered approach - critical paths get full testing, exploratory paths get lighter testing\n\n### 2. Handling False Positives\n\n**Challenge**: Tests that fail even though output is correct\n\n**Solution**: Confidence scoring includes uncertainty quantification\n\n### 3. Test Coverage for Generated Code\n\n**Challenge**: Generated code may have test scenarios not in original test suite\n\n**Solution**: Generate supplementary tests during self-testing phase\n\n## Looking Forward\n\nWith Day 12 complete, we've established **both the ability to build and the ability to verify**. But we're just getting started.\n\n[Next week](/posts/day-13-user-feedback-integration) we'll explore:\n- How user feedback improves the system\n- Building trust through transparency\n- The path toward fully autonomous software development\n\n---\n\n*Follow our journey as we push the boundaries of what autonomous AI can achieve in software development.*",
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
  const next = slug !== 'day-12-testing-reliability-ai' ? getNextPostLink(slug) : null;

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
              ← Previous Post
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
    "day-1-start": "day-1-start",
    "day-2-agent-architecture": "day-1-start",
    "day-3-memory-system": "day-2-agent-architecture",
    "day-4-integration-framework": "day-3-memory-system",
    "day-5-planning-engine": "day-4-integration-framework",
    "day-6-how-ai-agents-work": "day-5-planning-engine",
    "day-7-ai-agentic-examples": "day-6-how-ai-agents-work",
    "day-8-why-ai-agents-matter": "day-7-ai-agentic-examples",
    "day-9-memory-implementation": "day-8-why-ai-agents-matter",
    "day-10-getting-started-ai-agents": "day-9-memory-implementation",
    "day-11-code-generation-autonomy": "day-10-getting-started-ai-agents",
    "day-12-testing-reliability-ai": "day-11-code-generation-autonomy",
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
    "day-6-how-ai-agents-work": "day-7-ai-agentic-examples",
    "day-7-ai-agentic-examples": "day-8-why-ai-agents-matter",
    "day-8-why-ai-agents-matter": "day-9-memory-implementation",
    "day-9-memory-implementation": "day-10-getting-started-ai-agents",
    "day-10-getting-started-ai-agents": "day-11-code-generation-autonomy",
    "day-11-code-generation-autonomy": "day-12-testing-reliability-ai",
    "day-12-testing-reliability-ai": "day-12-testing-reliability-ai",
  };
  return map[slug] || "day-12-testing-reliability-ai";
}
