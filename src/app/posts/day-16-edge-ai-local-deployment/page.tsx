'use client';

import Link from 'next/link';
import PostBody from '@/components/PostBody';
import { getAdjacentPostSlugs } from '@/lib/posts';

type Posts = Partial<Record<PostSlug, PostContent>>;
type PostSlug = 'day-16-edge-ai-local-deployment' | 'day-17-ai-agents-privacy-security';

interface PostContent {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

const posts: Posts = {
  'day-16-edge-ai-local-deployment': {
    title: "Day 16: AI Agents on the Edge - Local Deployment Patterns for Privacy-First AI",
    date: "May 08, 2026",
    readTime: "14 min read",
    content: `# Day 16: AI Agents on the Edge - Local Deployment Patterns for Privacy-First AI

**Today we're exploring the frontier of AI agent deployment**: running agents locally on user devices instead of in the cloud. This is **edge AI** - bringing intelligence closer to where the data lives.

## Why Local Deployment Matters

### Privacy Benefits
**Local agents** mean your data never leaves your device. This is critical for:
- Personal health information (medical records, fitness data)
- Financial records (bank statements, investment data)
- Family communications and photos
- Sensitive business documents

**Contrast with cloud**:
| Cloud Deployment | Local Deployment |
|-----------------|------------------|
| Data travels over network | Data stays on device |
| Single trust boundary for all | Trust boundary at device level |
| Privacy depends on vendor | Privacy depends on you |

### Latency & Offline Capability

**Local agents** provide:
- **Near-instant response** - No network round-trip
- **Always available** - Works without internet
- **Predictable performance** - No network congestion

**Latency comparison**:
\`\`\`
Cloud agent: 200-2000ms (network dependent)
Local agent: 50-200ms (device dependent)
\`\`\`

## Edge AI Architecture

### Component Design

**Model Selection for Edge**

Different models balance:
- **Accuracy**: Higher = larger, more expensive
- **Speed**: Faster = smaller, less capable
- **Memory**: Lower = less accurate, broader compatibility

\`\`\`typescript
interface EdgeModelSpec {
  // Model size in MB
  sizeMB: number;
  
  // Parameters in millions
  parameters: number;
  
  // Expected latency on target device
  latencyMs: number;
  
  // Minimum RAM required
  minRAM: number;
  
  // Accuracy relative to full model
  accuracyScore: 0-1;
}

const models: EdgeModelSpec[] = [
  {
    sizeMB: 248,         // Tiny
    parameters: 54,
    latencyMs: 50,
    minRAM: 4,
    accuracyScore: 0.72
  },
  {
    sizeMB: 612,
    parameters: 135,
    latencyMs: 120,
    minRAM: 8,
    accuracyScore: 0.85
  },
  {
    sizeMB: 2720,
    parameters: 7000,
    latencyMs: 450,
    minRAM: 16,
    accuracyScore: 0.95
  }
];
\`\`\`

### Deployment Strategies

**Strategy 1: Hybrid Processing**

\`\`\`typescript
class HybridEdgeProcessor {
  private readonly cacheSize = 100;
  private readonly localCache: Record<string, string> = {};
  
  async process(request: AgentRequest): Promise<AgentResponse> {
    // Check if result exists in local cache
    const cacheKey = this.calculateCacheKey(request);
    if (this.localCache[cacheKey]) {
      return this.localCache[cacheKey];
    }
    
    // Try local execution first
    try {
      const localResult = await this.executeLocally(request);
      if (this.isConfident(localResult, request)) {
        this.localCache[cacheKey] = localResult;
        return localResult;
      }
    } catch (error) {
      // Fall back to cloud for complex tasks
    }
    
    // Fallback to cloud for complex queries
    return await this.executeInCloud(request);
  }
}
\`\`\`

**Strategy 2: Model Quantization**

Quantization reduces model precision to improve:
- Speed (fewer arithmetic operations)
- Memory footprint (lower precision = smaller size)
- Power consumption

\`\`\`typescript
class QuantizedModelProcessor {
  private model: QuantizedModel;
  
  // Convert float32 model to int8 or int4
  prepareForEdge(originalModel: Float32Model): QuantizedModel {
    const quantized = quantize({
      model: originalModel,
      precision: 'int8',     // or 'int4' for extreme optimization
      calibration: this.getCalibrationData(),
      preserveAccuracy: 0.1  // Allow 10% accuracy loss
    });
    
    return quantized;
  }
  
  // Optimized inference for edge devices
  execute(query: string, context: Context): string {
    // Quantized inference kernel
    return this.model.quantInference({
      query,
      context,
      precision: 'int8'  
    });
  }
}
\`\`\`

**Strategy 3: Speculative Execution**

\`\`\`typescript
class SpeculativeEdgeProcessor {
  private readonly smallModel: SmallModel;
  private readonly largeModel: LargeModel;
  
  // Use smaller model to draft, larger model to verify
  async draftAndVerify(original: string): Promise<string> {
    // Draft with fast small model
    const draft = await this.smallModel.generate(original);
    
    // Verify with slower but more accurate large model
    const verification = await this.largeModel.verify(draft, original);
    
    if (verification.confidence > 0.95) {
      return draft; // Trust the draft
    }
    
    // Regenerate with full model if verification fails
    return await this.largeModel.generate(original);
  }
}
\`\`\`

## Offline-First Patterns

### Data Synchronization

**Conflict Resolution Strategy**:

\`\`\`typescript
class OfflineSyncManager {
  private pendingChanges: PendingOperation[] = [];
  private lastSyncTimestamp: string = '';
  
  async syncWithCloud(): Promise<SyncResult> {
    if (!pendingChanges.length) {
      return { status: 'no_changes', timestamp: this.lastSyncTimestamp };
    }
    
    // Collect all pending changes
    const changes = await this.collectPendingChanges();
    
    // Check for conflicts
    const conflicts = this.detectConflicts(changes);
    
    if (conflicts.length > 0) {
      // Resolve conflicts locally
      const resolved = this.resolveConflicts(changes, conflicts);
      
      // Apply resolution and sync
      await this.applyResolvedChanges(resolved);
    } else {
      // No conflicts - safe to sync
      await this.submitChanges(changes);
    }
    
    this.lastSyncTimestamp = Date.now().toString();
    return { status: 'synced', timestamp: this.lastSyncTimestamp };
  }
  
  private detectConflicts(changes: PendingOperation[]): Conflict[] {
    const conflicts: Conflict[] = [];
    
    for (const change of changes) {
      const serverState = this.getServerState(change.key);
      
      if (serverState.version > change.originalVersion) {
        conflicts.push({
          key: change.key,
          type: 'version_conflict',
          local: change,
          server: serverState,
          severity: this.determineSeverity(change)
        });
      }
    }
    
    return conflicts;
  }
}
\`\`\`

### Local Storage Strategies

**IndexedDB for Browser-Based Agents**:

\`\`\`typescript
class IndexedDBStorage {
  private db: IDBDatabase | null = null;
  
  async init(dbName: string, version: number): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(dbName, version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores for different data types
        if (!db.objectStoreNames.contains('tasks')) {
          db.createObjectStore('tasks', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('messages')) {
          db.createObjectStore('messages', { 
            keyPath: 'id', 
            autoIncrement: true 
          });
        }
        
        if (!db.objectStoreNames.contains('embeddings')) {
          db.createObjectStore('embeddings', { keyPath: 'id' });
        }
      };
    });
  }
  
  async saveTask(task: Task): Promise<void> {
    const transaction = this.db!.transaction('tasks', 'readwrite');
    await transaction.objectStore('tasks').put(task);
    await transaction.complete;
  }
  
  async queryTasks(filters: TaskFilters): Promise<Task[]> {
    const transaction = this.db!.transaction('tasks', 'readonly');
    const store = transaction.objectStore('tasks');
    const cursor = await store.openCursor();
    
    const results: Task[] = [];
    
    while (cursor) {
      const task = cursor.value as Task;
      
      if (this.matchesFilters(task, filters)) {
        results.push(task);
      }
      
      cursor.advance();
    }
    
    return results;
  }
}
\`\`\`

## Hardware Considerations

### Supported Platforms

**Web Workers for Browser Agents**:

\`\`\`typescript
// Main thread
const agentWorker = new Worker('agent-worker.js', { type: 'module' });

agentWorker.postMessage({
  type: 'INIT',
  config: {
    modelPath: '/models/llama-2-7b-wasm',
    workerId: 'user-session-123'
  }
});

agentWorker.onmessage = (event) => {
  switch (event.data.type) {
    case 'PROGRESS':
      this.updateProgress(event.data.progress);
      break;
    case 'RESULT':
      this.handleAgentResponse(event.data.response);
      break;
    case 'ERROR':
      this.handleAgentError(event.data.error);
      break;
  }
};
\`\`\`

**WASM-Based Inference**:

\`\`\`typescript
// Load WASM-optimized model
export class WASMAgentEngine {
  private module: any;
  private model: any;
  
  async loadModel(modelPath: string): Promise<void> {
    // Download WASM binary
    const wasmResponse = await fetch(modelPath);
    const wasmBuffer = await wasmResponse.arrayBuffer();
    
    // Instantiate WASM module
    this.module = await WebAssembly.instantiate(wasmBuffer);
    
    // Load model weights
    await this.loadModelWeights(modelPath);
  }
  
  async generate(prompt: string, maxTokens: number): Promise<string> {
    const result = this.module.runInference({
      prompt: prompt,
      maxTokens: maxTokens,
      temperature: 0.7,
      topP: 0.9
    });
    
    return result.output;
  }
}
\`\`\`

### Performance Optimization

**Memory Management**:

\`\`\`typescript
class EdgeMemoryManager {
  private readonly maxContextTokens = 4096;
  private contextWindow: ContextToken[] = [];
  private summaryCache: Map<string, Summary> = new Map();
  
  async processWithLimitedContext(input: string, maxTokens: number): Promise<Result> {
    // Tokenize and check size
    const tokens = this.tokenize(input);
    
    if (tokens.length <= this.maxContextTokens) {
      return await this.processDirectly(tokens);
    }
    
    // If too large, use summary + focused context
    const focusedTokens = this.extractFocusedContext(tokens);
    const summary = await this.generateSummary(tokens, focusedTokens);
    
    // Reconstruct with summary
    const completeContext = this.reconstructContext(summary, focusedTokens);
    
    return await this.processDirectly(completeContext);
  }
  
  private tokenize(text: string): ContextToken[] {
    // Tokenization logic using WASM tokenizer
    return this.tokenizer.encode(text);
  }
}
\`\`\`

## Security for Edge Deployment

### Model Security

**Model Integrity Verification**:

\`\`\`typescript
class ModelSecurityVerifier {
  private readonly modelHash: string;
  private readonly publicSigningKey: Uint8Array;
  
  async verifyModelIntegrity(modelPath: string): Promise<boolean> {
    const modelBuffer = await this.readModelFile(modelPath);
    const modelHash = await this.computeHash(modelBuffer);
    
    // Verify against signed hash
    const isValid = this.verifySignature(modelHash, this.signingKey);
    
    if (!isValid) {
      throw new IntegrityError('Model integrity verification failed');
    }
    
    // Check model hasn't been tampered with
    return await this.checkForModifications(modelBuffer);
  }
  
  async verifySignature(hash: Uint8Array, key: Uint8Array): Promise<boolean> {
    // Use WebCrypto API for signature verification
    const cryptoKey = await this.importSigningKey(key);
    
    const valid = await crypto.subtle.verify(
      'ECDSA',
      cryptoKey,
      this.signature,
      hash
    );
    
    return valid;
  }
}
\`\`\`

**Inference Security**:

\`\`\`typescript
class SecureInference {
  private readonly executionEnvironment: 'trusted' | 'untrusted';
  
  constructor(secureMode: string) {
    this.executionEnvironment = secureMode as 'trusted' | 'untrusted';
  }
  
  async secureExecute(request: InferenceRequest): Promise<InferenceResult> {
    // Sanitize input
    const sanitized = this.sanitizeInput(request);
    
    // If untrusted environment, use sandboxing
    if (this.executionEnvironment === 'untrusted') {
      return await this.sandboxedExecution(sanitized);
    }
    
    return await this.normalExecution(sanitized);
  }
  
  private sanitizeInput(request: InferenceRequest): InferenceRequest {
    // Remove potentially dangerous operations
    const safeRequest = {
      ...request,
      parameters: this.filterDangerousParameters(request.parameters)
    };
    
    return safeRequest;
  }
}
\`\`\`

## Development Tools

### Local Development Setup

\`\`\`typescript
// Example .env.local configuration
NEXT_PUBLIC_AGENT_HOST='http://localhost:3000'
NEXT_PUBLIC_AGENT_PORT=8080
NEXT_PUBLIC_EDGEMODEL='qwen2.5-0.5b'
NEXT_PUBLIC_MAX_CONTEXT=4096
NEXT_PUBLIC_ENABLE_SECURITY_LOGGING=true
\`\`\`

### Testing Local Agents

\`\`\`typescript
describe('EdgeAgentLocal', () => {
  let agent: EdgeAgentLocal;
  let testStorage: LocalStorageMock;
  
  beforeEach(async () => {
    testStorage = new LocalStorageMock();
    agent = new EdgeAgentLocal({
      model: 'qwen2.5-0.5b',
      storage: testStorage,
      maxTokens: 1000
    });
  });
  
  it('should process simple queries offline', async () => {
    const result = await agent.process('What is 2+2?');
    
    expect(result.content).toContain('4');
    expect(testStorage.queryCount).toBe(0); // No cloud calls
  });
  
  it('should store conversation history locally', async () => {
    await agent.process('Hello');
    await agent.process('How are you?');
    
    const history = await testStorage.getConversationHistory();
    expect(history.length).toBe(2);
  });
  
  it('should sync when connection restored', async () => {
    const syncResult = await agent.syncWithCloud();
    
    expect(syncResult.synced).toBe(true);
    expect(syncResult.conflicts).toBe(0);
  });
});
\`\`\`

## Best Practices Summary

### Before Deployment

1. **Profile your use cases** - What's the baseline token usage?
2. **Benchmark local performance** - Can your device handle the latency requirements?
3. **Set up caching** - What data benefits from local storage?
4. **Test offline behavior** - Does it degrade gracefully?
5. **Configure error handling** - What happens when local model fails?

### During Development

- **Use the smallest capable model** - Start with quantized 0.5B variants
- **Implement fallbacks** - Have cloud fallback for edge failures
- **Monitor metrics** - Track token usage, latency, success rates
- **Test on target hardware** - Verify performance on actual user devices
- **Cache aggressively** - Avoid redundant inferences

### Production Considerations

- **Automatic model updates** - Roll out improvements without user intervention
- **A/B test models** - Compare different quantization levels
- **Battery impact monitoring** - Don't drain device batteries
- **Storage management** - Clean up cached data when needed
- **Privacy controls** - Let users decide what syncs to/from cloud

## Conclusion

Edge deployment represents the future of **privacy-first AI agents**. By bringing intelligence to the device, we gain:

- **Complete data privacy** - Your information stays yours
- **Lower latency** - Instant responses, no network wait
- **Offline operation** - Works anywhere, anytime
- **Cost efficiency** - No cloud API fees for routine tasks

The trade-off is that edge agents have **smaller capabilities** than cloud-powered counterparts. A well-designed hybrid approach lets you balance these factors for your specific use case.

---

**Coming Up**: In Day 17, we'll examine **AI agents and privacy/security** from a consumer perspective - protecting your data while benefiting from AI automation.

*Join us for our final consumer-facing post on privacy and security!**

*Join us for our final consumer-facing post on privacy and security!*

`,
  },
  'day-17-ai-agents-privacy-security': {
    title: "Day 17: AI Agents and Privacy - Protecting Your Data in the Age of Automation",
    date: "May 08, 2026",
    readTime: "9 min read",
    content: `# Day 17: AI Agents and Privacy - Protecting Your Data in the Age of Automation

**This is our final consumer-facing post**, and it tackles one of the most important questions: **How do I use AI agents while keeping my data private and secure**?\n
**The short answer**: You can, and should, be thoughtful about what information agents have access to.

## Your Data Belongs to You

AI agents typically have access to:
- **Calendar info** - When you're available, what meetings you have
- **Messages** - Email, Slack, text communications (if integrated)
- **Files** - Documents, photos, personal files
- **Financial data** - Banking, spending, credit card info
- **Health records** - Fitness data, medical information

**The key principle**: You decide what your agent can access and do.

## Privacy-First Agent Design

### The Privacy Layers Approach

**Layer 1: What the agent CAN see**

\`\`\`
┌─────────────────────────────────┐
│  User decides this               │
├─────────────────────────────────┤
│  Calendar access: YES           │
│  Email scanning: YES            │
│  Financial accounts: NO         │
│  Photos: Read-only, not saved  │
│  Location history: MINIMAL      │
└─────────────────────────────────┘
\`\`\`

**Layer 2: What the agent DOES with it**

\`\`\`
┌─────────────────────────────────┐
│  Agent operations:               │
├─────────────────────────────────┤
│  - Organize meetings: YES      │
│  - Summarize emails: YES       │
│  - Delete files: NO (asks you) │
│  - Share data: NO              │
│  - Train on your data: NO      │
└─────────────────────────────────┘
\`\`\`

**Layer 3: Where data STAYS**

\`\`\`
┌─────────────────────────────────┐
│  Data locations:                 │
├─────────────────────────────────┤
│  - Sensitive docs: Device only  │
│  - Meeting notes: Cloud sync    │
│  - Calendar: Your provider      │
│  - Financial: Local processing  │
│  - Conversation logs: Deleted   │
└─────────────────────────────────┘
\`\`\`

## Setting Up Your Privacy Controls

### Step 1: Audit Your Permissions

**Before giving your agent access, ask**:

- Why does this agent need my calendar?
- What will it do with my emails?
- Can it access my photos and why?
- Does it remember my conversations?
- Can it share my data with others?

### Step 2: Start Minimal

**Begin with the least access needed**:

| Permission | Start With | Upgrade When |
|------------|------------|--------------|
| Calendar | Read access | You need scheduling |
| Email | Subject lines only | Need content understanding |
| Files | Specific folders | Need broader access |
| Messages | Notifications only | Need full context |
| Photos | Album access | Need organization |

### Step 3: Review Regularly

**Monthly privacy check-in**:

\`\`\`
Questions to ask:
1. Has the agent's behavior changed?
2. Do I still need all the access it has?
3. Did it process any unexpected data?
4. Are there new privacy settings to configure?
5. Has the developer changed their privacy policy?
\`\`\`

## Red Flags to Watch For

### 🚩 Privacy Warning Signs

**The agent asks for:**
- Access to all your files (when it doesn't need it)
- Permission to share your data for "improvement"
- Ability to send messages on your behalf (without confirmation)
- Access to your financial accounts

**The agent does:**
- Processes data you didn't ask it to
- Stores conversations indefinitely
- Makes calls to third-party servers you don't recognize
- Updates without telling you about policy changes

**The vendor:**
- Changes privacy policies without notice
- Can't explain where your data is stored
- Uses your data for "model training" by default
- Has no clear deletion process

## Practical Privacy Steps

### 1. Use Local Processing When Possible

**Local = Your control**

\`\`\`
Cloud-based agents:
├── Your data leaves device
├── Vendor processes it
├── Storage in vendor systems
└── Privacy depends on vendor

Local agents:
├── Your data stays on device
├── You process it
├── Storage on your device
└── Privacy depends on you (but it's yours)
\`\`\`

### 2. Understand Data Retention

**Know what gets stored and for how long**:

\`\`\`
Typical data lifecycle:
│
├── Processing (real-time)
│   └── Temp memory: 2-24 hours
│
├── Storage (after processing)
│   ├── Conversation logs: 30 days
│   ├── Session summaries: Permanent
│   └── Analytics: 90 days
│
└── Deletion
    ├── User-requested: 48 hours
    ├── Automatic: 90 days
    └── Archive: 1 year
\`\`\`

**Action items**:
- Check each agent's retention policy
- Set up automatic deletion for sensitive data
- Download and review your data periodically

### 3. Use Data Minimization

**Only share what's necessary**:

\`\`\`
Instead of: "Read all my emails and organize everything"
Try: "Read emails from my boss about next week's meetings and create an agenda"

Instead of: "Access all my files"
Try: "Read from my Documents folder for the project report"

Instead of: "Remember everything about me"
Try: "Remember my meeting preferences and weekly schedule"
\`\`\`

### 4. Enable Audit Logging

**Know what your agent does**:

\`\`\`
Audit log should show:
├── When did it access data? 
│   └── [2026-05-08 10:30] Accessed calendar
├── What did it do with it?
│   └── [2026-05-08 10:31] Created meeting invite
├── What decisions did it make?
│   └── [2026-05-08 10:32] Declined meeting as low priority
└── What actions did it take?
    └── [2026-05-08 10:33] Sent decline email
\`\`\`

**Set up notifications for**:
- First-time data access
- Permission changes
- Large data transfers
- Actions outside normal patterns

### 5. Know Your Deletion Rights

**You should be able to**:
- Delete all your data
- Export your data in machine-readable format
- Stop data processing at any time
- Request who has access to your data

**How to exercise these rights**:
1. Look for "Privacy Settings" or "Data Management" in the app
2. Find "Export My Data" for download
3. Use "Delete My Account" for complete removal
4. Contact support for policy questions

## Specific Use Cases: Privacy in Action

### Personal Assistant

**Scenario**: Agent that helps manage your calendar

\`\`\`
SAFE setup:
├── Access: Calendar read/write ✓
├── Emails: Read meeting requests only ✓
├── Storage: Local for 30 days ✓
└── Sharing: No data sharing ✓

RISKY setup:
├── Access: Full calendar + email history ✗
├── Emails: Read all emails, keep forever ✗
├── Storage: Cloud sync, never deleted ✗
└── Sharing: For "improvement purposes" ✗
\`\`\`

### Financial Assistant

**Scenario**: Agent for budget tracking

\`\`\`
SAFE setup:
├── Bank data: Read-only connection ✓
├── Storage: Local, encrypted ✓
├── Processing: No data leaves device ✓
└── Sharing: Only with your explicit consent ✓

RISKY setup:
├── Bank data: Full account access ✗
├── Storage: Cloud, unencrypted ✗
├── Processing: Sent to third-party servers ✗
└── Sharing: With financial partners ✗
\`\`\`

### Health Agent

**Scenario**: Fitness and health tracking

\`\`\`
SAFE setup:
├── Health data: Device-only sync ✓
├── Storage: End-to-end encrypted ✓
├── Processing: No health data in AI training ✓
└── Sharing: Only with your healthcare provider ✓

RISKY setup:
├── Health data: Syncs to cloud ✗
├── Storage: Vendor's servers ✗
├── Processing: Used for model training ✗
└── Sharing: Third-party health companies ✗
\`\`\`

## Developer Best Practices

If you're building an AI agent, these principles make your product more trustworthy:

### 1. Default to Privacy

\`\`\`
Privacy-first defaults:
├── Local processing when possible
├── Minimal data collection always
├── No training on user data by default
├── Easy deletion for all data
└── Clear, plain-language policies
\`\`\`

### 2. Transparency

\`\`\`
What users want to know:
├── What data the agent needs
├── Why it needs that data
├── Where data is stored
├── How long it's kept
├── Who has access to it
└── How to delete it
\`\`\`

### 3. User Control

\`\`\`
Essential controls:
├── Granular permissions (not all-or-nothing)
├── Easy privacy settings
├── Data export functionality
├── Simple deletion process
└── Clear opt-out mechanisms
\`\`\`

## The Bottom Line

**Using AI agents doesn't mean giving up privacy**. You can:

1. **Use agents** that protect your data
2. **Start minimal** and add access gradually
3. **Monitor what they do** with audit logs
4. **Review permissions** monthly
5. **Choose vendors** that respect privacy

**Remember**: A good privacy-focused agent helps you be productive **without** becoming a data collector. If an agent makes you uncomfortable about your data, there are alternatives that respect your privacy while still delivering value.

---

## Thank You For Following Along!

**We've covered a lot in these 17 days**:
- The fundamentals of AI agents
- Architecture and building blocks
- Security and privacy considerations
- Practical applications for everyday use
- Edge deployment and offline capabilities

**The journey continues**: AI agents are still evolving. New capabilities will emerge, privacy concerns will be addressed, and the technology will become more accessible.

**What's next for you**?
- Start small with one automation
- Explore edge deployment for privacy
- Share feedback on what you've learned
- Consider contributing to the ecosystem

**Thank you for following the Hermes Agent Blog journey**! Whether you're a developer building your own agents or a user exploring AI automation, remember: **AI agents are tools that should empower you, not complicate your life**.

*The technology keeps evolving - stay curious, stay critical, and use agent capabilities that make your life better while keeping your data safe.*

`,
  },
};


export default function PostsPage() {
    const slug: PostSlug = 'day-16-edge-ai-local-deployment';
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
