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
  'day-28-agent-llm-rag-patterns': {
    title: "Day 28: RAG Patterns for AI Agents - Retrieval-Augmented Generation for Agent Context",
    date: "May 13, 2026",
    readTime: "16 min read",
    content: String.raw`# Day 28: RAG Patterns for AI Agents - Retrieval-Augmented Generation for Agent Context

**After yesterday's security deep-dive**, let's explore a **critical pattern for scaling agent knowledge**: Retrieval-Augmented Generation (RAG).

Today: **Technical deep-dive** into RAG architectures that enable agents to access, retrieve, and reason over both internal and external knowledge sources dynamically.

## Why Agents Need RAG

AI agents operating autonomously face a fundamental challenge: **limited context windows** combined with **dynamic knowledge requirements**.

### The Problem Space

| Without RAG | With RAG |
|-------------|----------|
| Static context (prompt + history only) | Dynamic knowledge retrieval |
| Fixed knowledge in system prompt | Query-based knowledge access |
| Manual context updates needed | Automatic retrieval on-demand |
| Limited by token budget | Near-limitless knowledge access |
| Cannot access external sources | Real-time data source integration |

**Impact**: RAG enables agents to maintain efficiency while accessing current, accurate, and comprehensive knowledge.

---

## Core RAG Architecture for Agents

### Pattern 1: Hybrid Query Engine

Combines **vector search** (semantic similarity) with **keyword search** (precision matching):

\`\`\`typescript
class HybridAgentRetriever {
  private vectorIndex: VectorIndex;
  private keywordIndex: KeywordIndex;
  
  async retrieve(query: string, agentContext: Context): Promise<RetrievedChunks> {
    // Separate query into semantic and keyword components
    const semanticQuery = this.extractSemanticIntent(query);
    const keywordTerms = this.extractKeywords(query);
    
    // Parallel retrieval from both indexes
    const [vectorResults, keywordResults] = await Promise.all([
      this.vectorIndex.search(semanticQuery, {
        topK: 10,
        filter: { agentId: agentContext.agentId }
      }),
      this.keywordIndex.search(keywordTerms, {
        topK: 5,
        boost: keywordTerms.map(k => ({ term: k, weight: 1.5 }))
      })
    ]);
    
    // Recombine and deduplicate with cross-encoder reranking
    const combined = this.mergeResults([vectorResults, keywordResults]);
    const reranked = await this.rerankWithCrossEncoder(combined, query);
    
    // Apply retrieval confidence threshold
    return {
      chunks: reranked.filter(r => r.score > 0.65),
      metadata: {
        totalCandidates: vectorResults.length + keywordResults.length,
        finalCount: reranked.filter(r => r.score > 0.65).length,
        retrievalTimeMs: Date.now() - agentContext.startTime
      }
    };
  }
  
  async rerankWithCrossEncoder(
    candidates: RankedChunk[],
    query: string
  ): Promise<RankedChunk[]> {
    // Use a small cross-encoder for precise re-ranking
    const crossEncoderResults = await this.crossEncoder.rank(query, candidates);
    
    // Blend with original scores (weighted average)
    return candidates.map(chunk => {
      const encoderScore = crossEncoderResults[chunk.id] || 0.5;
      const blended = (chunk.score * 0.7) + (encoderScore * 0.3);
      
      return {
        ...chunk,
        score: blended,
        reranked: true
      };
    }).sort((a, b) => b.score - a.score);
  }
}

interface HybridQuery {
  semanticIntent: string;
  keywordTerms: string[];
  requiredFields?: string[];
  excludedFields?: string[];
}
\`\`\`

**Key benefits**: Better recall for semantic queries, better precision for specific terms.

---

## Knowledge Source Integration

### Pattern 2: Multi-Source Knowledge Retrieval

Agents should query **multiple knowledge sources** seamlessly:

\`\`\`typescript
interface KnowledgeSource {
  id: string;
  type: 'internal-docs' | 'knowledge-base' | 'external-api' | 'vector-db' | 'file-system';
  accessibility: 'public' | 'authenticated' | 'restricted';
  updateFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  
  query: (
    queryText: string,
    filters?: QueryFilters
  ) => Promise<KnowledgeResult[]>;
  
  validateAuth: (credentials: Credentials) => Promise<boolean>;
}

class AgentKnowledgeOrchestrator {
  private sources: Map<string, KnowledgeSource> = new Map();
  
  async initializeSources(): Promise<void> {
    // Initialize each knowledge source with proper configuration
    this.sources.set('internal-docs', new DocumentationSource({
      basePath: '/docs',
      format: 'markdown',
      updateInterval: 'daily'
    }));
    
    this.sources.set('knowledge-base', new VectorKnowledgeSource({
      indexId: 'agent-knowledge',
      embeddingModel: 'text-embedding-3-small',
      updateInterval: 'hourly'
    }));
    
    this.sources.set('external-api', new ExternalAPIConnector({
      apiEndpoint: 'https://api.example.com/v1',
      authMethod: 'bearer',
      rateLimit: 100
    }));
  }
  
  async retrieveAcrossSources(
    query: string,
    requiredSources?: string[],
    excludedSources?: string[]
  ): Promise<UnifiedKnowledgeResult> {
    const results: SourceResult[] = [];
    
    // Filter sources by accessibility and query constraints
    const availableSources = Array.from(this.sources.values())
      .filter(source => 
        !excludedSources?.includes(source.id) &&
        (source.accessibility !== 'restricted' || this.hasAccess(source.id))
      )
      .filter(source => !requiredSources || requiredSources.includes(source.id));
    
    // Execute in parallel with timeout
    const resultPromises = availableSources.map(async source => {
      try {
        const start = Date.now();
        const results = await Promise.race([
          source.query(query, this.buildPerSourceFilters(source)),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 10000)
          )
        ]);
        
        return {
          sourceId: source.id,
          sources: results,
          retrievalTime: Date.now() - start,
          status: 'success'
        };
      } catch (error: any) {
        console.warn(\`Retrieval from \${source.id} failed: \${error.message}\`);
        return {
          sourceId: source.id,
          sources: [],
          retrievalTime: 0,
          status: 'failed',
          error: error.message
        };
      }
    });
    
    const sourceResults = await Promise.all(resultPromises);
    const successfulResults = sourceResults.filter(r => r.status === 'success');
    
    return {
      timestamp: new Date().toISOString(),
      totalSources: availableSources.length,
      successfulRetrievals: successfulResults.length,
      failedRetrievals: sourceResults.length - successfulResults.length,
      results: sourceResults,
      averageRetrievalTime: successfulResults.reduce((sum, r) => sum + r.retrievalTime, 0) / successfulResults.length,
      recommendations: this.buildQueryRecommendations(successfulResults)
    };
  }
  
  private buildPerSourceFilters(source: KnowledgeSource): QueryFilters {
    // Apply source-specific query filters
    switch (source.type) {
      case 'vector-db':
        return {
          minSimilarity: 0.7,
          maxResults: 10,
          hybridBoost: true
        };
      case 'knowledge-base':
        return {
          categories: ['technical', 'api-reference'],
          includeVersion: true
        };
      default:
        return {};
    }
  }
  
  private buildQueryRecommendations(results: SourceResult[]): QueryRecommendation[] {
    return results.flatMap(result => {
      if (result.sources.length < 3) {
        return [{
          type: 'increase_coverage',
          sourceId: result.sourceId,
          message: 'Low result count from this source. Consider query refinement or source expansion.',
          confidence: 'medium'
        }];
      }
      return [];
    });
  }
}
\`\`\`

**Key insight**: Different sources serve different retrieval needs. Agents benefit from understanding source strength and context-appropriateness.

---

## Context Window Optimization

### Pattern 3: Hierarchical Context Management

Optimize context usage with **tiered information** based on relevance:

\`\`\`typescript
class HierarchicalContextManager {
  private contextLayers: Map<string, ContextLayer> = new Map();
  
  buildOptimizedContext(
    userQuery: string,
    existingContext: ConversationContext,
    retrievedKnowledge: RetrievedChunk[]
  ): OptimizedContext {
    // Assess knowledge relevance and criticality
    const knowledgeScores = retrievedKnowledge.map(chunk => ({
      ...chunk,
      relevance: this.calculateRelevance(chunk.content, userQuery),
      criticality: this.assessCriticality(chunk)
    }));
    
    // Sort by combined score (relevance × criticality)
    const sortedKnowledge = knowledgeScores.sort((a, b) => {
      const scoreA = a.relevance * a.criticality;
      const scoreB = b.relevance * b.criticality;
      return scoreB - scoreA;
    });
    
    // Partition into context layers
    const contextLayers = {
      immediate: sortedKnowledge.slice(0, 3), // Most critical, immediate relevance
      supporting: sortedKnowledge.slice(3, 8), // Contextual support
      background: sortedKnowledge.slice(8, 15), // Additional context, less urgent
      optional: sortedKnowledge.slice(15) // Extra information if space permits
    };
    
    // Build compact context with compression where possible
    const context: OptimizedContext = {
      messages: existingContext.messages.slice(-5), // Keep recent conversation
      retrieved: {
        immediate: this.compressChunks(contextLayers.immediate),
        supporting: this.compressChunks(contextLayers.supporting),
        detailedReferences: contextLayers.background.map(k => ({
          id: k.id,
          excerpt: k.excerpt,
          fullReference: true
        }))
      },
      usage: {
        maxTokens: existingContext.maxTokens,
        estimatedTokens: this.estimateTokenCount(context),
        compressionRatio: this.calculateCompressionRatio(compressed)
      },
      lastOptimization: new Date().toISOString()
    };
    
    return context;
  }
  
  private calculateRelevance(chunk: RetrievedChunk, query: string): number {
    // Vector cosine similarity for semantic matching
    const queryEmbedding = this.embed(query);
    const chunkEmbedding = this.chunkEmbeddings.get(chunk.id);
    
    if (!chunkEmbedding) return 0.3;
    
    return this.cosineSimilarity(queryEmbedding, chunkEmbedding);
  }
  
  private assessCriticality(chunk: RetrievedChunk): number {
    // Score based on chunk metadata and content characteristics
    const criticalityFactors = {
      hasCodeSnippets: chunk.content.includes('\`\`\`') ? 1.5 : 1.0,
      hasKeywords: this.countCriticalKeywords(chunk.content) * 0.1,
      isTechnical: this.isTechnicalContent(chunk.content) ? 1.3 : 1.0,
      freshness: chunk.lastUpdated > new Date(Date.now() - 86400000) ? 1.2 : 1.0
    };
    
    const score = Object.values(criticalityFactors).reduce((a, b) => a * b, 1);
    return Math.min(score, 2.0); // Cap at 2.0
  }
  
  private compressChunks(chunks: Partial<RetrievedChunk>[]): CompressedChunk[] {
    return chunks.map(chunk => {
      const summary = this.generateConciseSummary(chunk.content, 150);
      
      return {
        id: chunk.id,
        type: chunk.type,
        summary,
        hasFullContent: false,
        tokenSavings: this.countTokens(chunk.content) - this.countTokens(summary)
      };
    });
  }
}\`\`\`

**Why this matters**: Maximizes context window utility while maintaining comprehensive knowledge access.

---

## Query Optimization Strategies

### Pattern 4: Query Decomposition and Routing

Complex queries can be broken into **component parts**, each routed to optimal sources:

\`\`\`typescript
class QueryRouter {
  async decomposeAndRoute(query: string): Promise<RoutingPlan> {
    const queryComponents = await this.analyzeQuerySemantics(query);
    
    const routingPlan: RoutingPlan = {
      originalQuery: query,
      components: [],
      expectedSources: new Set<string>(),
      estimatedTokens: 0
    };
    
    for (const component of queryComponents) {
      const optimalSource = this.findOptimalSource(component);
      
      routingPlan.components.push({
        subQuery: component.text,
        optimalSource: optimalSource.id,
        required: component.isRequired,
        confidence: optimalSource.confidence,
        fallbackSources: optimalSource.fallbackSources
      });
      
      routingPlan.expectedSources.add(optimalSource.id);
      routingPlan.estimatedTokens += component.estimatedTokens;
    }
    
    // Check if we can optimize further by combining related components
    const optimized = this.mergeRelatedComponents(routingPlan.components);
    routingPlan.components = optimized;
    
    return routingPlan;
  }
  
  private findOptimalSource(component: QueryComponent): SourceMatch {
    const candidates = Array.from(this.knowledgeSources.values()).filter(source =>
      source.canHandle(component.type)
    );
    
    if (candidates.length === 0) {
      return {
        id: 'fallback',
        confidence: 0.3,
        fallbackSources: []
      };
    }
    
    // Score candidates by capability match
    const scored = candidates.map(source => ({
      source,
      capabilityMatch: this.matchCapabilities(source, component),
      freshness: this.assessSourceFreshness(source),
      accessCost: this.assessAccessCost(source)
    }));
    
    const best = scored
      .sort((a, b) => b.capabilityMatch + b.freshness - a.capabilityMatch - a.freshness)
      .shift();
    
    return {
      id: best?.source.id || 'fallback',
      confidence: best?.capabilityMatch || 0.3,
      fallbackSources: candidates.filter(c => c.id !== best?.source.id).map(s => s.id)
    };
  }
  
  async executeRoutingPlan(plan: RoutingPlan): Promise<RoutedQueryResult> {
    // Execute component queries either sequentially or in parallel
    const executionStrategy = this.determineExecutionStrategy(plan);
    const results: SubQueryResult[] = [];
    
    if (executionStrategy === 'parallel') {
      const parallelResults = await Promise.allSettled(
        plan.components.map(component =>
          this.executeComponent(component, component.optimalSource)
        )
      );
      
      return parallelResults.map((result, idx) => ({
        component: plan.components[idx],
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason : undefined
      }));
    } else {
      // Sequential execution for dependent queries
      for (const component of plan.components) {
        const result = await this.executeComponent(component, component.optimalSource);
        results.push(result);
        
        // Check if previous result affects current query
        if (result.requiresAdjustment) {
          this.adjustCurrentQuery(result, component);
        }
      }
      
      return results;
    }
  }
}

interface QueryComponent {
  id: string;
  text: string;
  type: 'factual' | 'procedural' | 'comparative' | 'creative';
  isRequired: boolean;
  estimatedTokens: number;
  sourceDependencies?: string[];
}

interface RoutingPlan {
  originalQuery: string;
  components: Array<{
    subQuery: string;
    optimalSource: string;
    required: boolean;
    confidence: number;
    fallbackSources: string[];
  }>;
  expectedSources: Set<string>;
  estimatedTokens: number;
}\`\`\`

**Benefit**: Complex multi-faceted queries handled efficiently with proper source routing.

---

## Evaluation and Monitoring

### Pattern 5: RAG System Evaluation Framework

Continuously monitor RAG performance:

\`\`\`typescript
class RAGEvaluationSystem {
  private metrics: Map<string, MetricCollection> = new Map();
  
  evaluateRetrievalResult(
    query: string,
    retrieved: RetrievedChunk[],
    expectedContext?: string[],
    retrievalTime: number
  ): EvaluationResult {
    return {
      timestamp: new Date().toISOString(),
      query,
      metrics: {
        precision: this.calculatePrecision(retrieved, expectedContext),
        recall: this.calculateRecall(retrieved, expectedContext),
        mrr: this.calculateMeanReciprocalRank(retrieved, expectedContext),
        nDCG: this.calculateNDCG(retrieved, expectedContext),
        retrievalTime: retrievalTime,
        contextQuality: this.assessContextQuality(retrieved)
      },
      chunks: retrieved.map(chunk => ({
        id: chunk.id,
        relevanceScore: chunk.relevance,
        tokenCount: this.countTokens(chunk.content),
        isNew: this.isNewSource(chunk)
      })),
      recommendations: this.generateImprovementRecommenations(retrieved, expectedContext)
    };
  }
  
  private calculatePrecision(
    retrieved: RetrievedChunk[],
    expectedContext?: string[]
  ): number {
    if (!expectedContext || retrieved.length === 0) return 0;
    
    const retrievedIds = new Set(retrieved.map(c => c.id));
    const expectedIds = new Set(expectedContext);
    const intersection = new Set(
      Array.from(retrievedIds).filter(id => expectedIds.has(id))
    );
    
    return intersection.size / retrieved.size;
  }
  
  private calculateRecall(
    retrieved: RetrievedChunk[],
    expectedContext?: string[]
  ): number {
    if (!expectedContext || retrieved.length === 0) return 0;
    
    const retrievedIds = new Set(retrieved.map(c => c.id));
    const expectedIds = new Set(expectedContext);
    const intersection = new Set(
      Array.from(retrievedIds).filter(id => expectedIds.has(id))
    );
    
    return intersection.size / expectedIds.size;
  }
  
  async runEvaluationBatch(
    testQueries: Array<{
      query: string;
      expectedContext: string[];
      goldStandard: string;
    }>,
    numQueries: number = 100
  ): Promise<EvaluationReport> {
    const results: IndividualEvaluation[] = [];
    
    for (let i = 0; i < Math.min(numQueries, testQueries.length); i++) {
      const { query, expectedContext, goldStandard } = testQueries[i];
      const startTime = Date.now();
      
      const retrieved = await this.retriever.retrieve(query);
      const retrievalTime = Date.now() - startTime;
      
      const evaluation = this.evaluateRetrievalResult(
        query,
        retrieved,
        expectedContext,
        retrievalTime
      );
      
      results.push(evaluation);
    }
    
    return {
      timestamp: new Date().toISOString(),
      queryCount: results.length,
      aggregateMetrics: this.aggregateMetrics(results),
      individualResults: results,
      recommendations: this.generateSystemImprovements(results),
      performanceBaseline: {
        averageRetrievalTime: results.reduce((sum, r) => sum + r.metrics.retrievalTime, 0) / length,
        averagePrecision: results.reduce((sum, r) => sum + r.metrics.precision, 0) / results.length,
        averageRecall: results.reduce((sum, r) => sum + r.metrics.recall, 0) / results.length
      }
    };
  }
}\`\`\`

**Continuous improvement**: Regular evaluation cycles enable systematic RAG optimization.

---

## Production Best Practices

### Key Implementation Principles

1. **Latency Awareness**: Cache common queries, implement result compression
2. **Fault Tolerance**: Graceful degradation when sources unavailable
3. **Access Control**: Ensure agents only retrieve authorized information
4. **Freshness Validation**: Monitor and prefer up-to-date knowledge sources
5. **Cost Optimization**: Balance query frequency with result quality

### Configuration Guidelines

\`\`\`typescript
interface RAGConfig {
  // Retrieval configuration
  retrieval: {
    topK: number;              // How many chunks to retrieve
    minSimilarity: number;     // Minimum relevance threshold
    hybridEnable: boolean;     // Enable hybrid search
    rerankEnable: boolean;     // Enable cross-encoder reranking
    maxTokenBudget: number;    // Max tokens for retrieved context
  };
  
  // Source configuration
  sources: {
    maxConcurrent: number;     // Max parallel source queries
    timeoutMs: number;         // Query timeout per source
    cacheTtlMinutes: number;   // Result cache duration
    freshnessThreshold: number; // Max age for preferred sources
  };
  
  // Context management
  context: {
    compressionEnabled: boolean;
    criticalityThreshold: number;
    maxImmediateSources: number;
    maxSupportingSources: number;
  };
}

const DEFAULT_CONFIG: RAGConfig = {
  retrieval: {
    topK: 15,
    minSimilarity: 0.65,
    hybridEnable: true,
    rerankEnable: true,
    maxTokenBudget: 4000
  },
  sources: {
    maxConcurrent: 5,
    timeoutMs: 10000,
    cacheTtlMinutes: 15,
    freshnessThreshold: 86400000 // 24 hours
  },
  context: {
    compressionEnabled: true,
    criticalityThreshold: 0.5,
    maxImmediateSources: 3,
    maxSupportingSources: 5
  }
};
\`\`\`

---

## Summary

RAG patterns enable AI agents to maintain **efficient context management** while accessing **dynamic, comprehensive knowledge**. Key takeaways:

- **Hybrid search** combines semantic and keyword matching for optimal retrieval
- **Multi-source orchestration** provides comprehensive knowledge access
- **Hierarchical context** maximizes limited context window utility
- **Query routing** optimizes component queries across appropriate sources
- **Continuous evaluation** drives systematic improvement

**Next steps**: Implement RAG evaluation metrics in production, optimize based on actual agent query patterns, continuously refine retrieval parameters.

---

**That wraps up our technical deep-dive for Day 28**! The consumer-facing post will follow later today with practical applications for anyone looking to use AI agents without diving into the technical details.

**Key insight**: RAG isn't just about retrieval—it's about **context optimization** for agents operating under resource constraints while maintaining comprehensive knowledge access.
`,
  },
};

export default function PostsPage() {
  const slug: PostSlug = 'day-28-agent-llm-rag-patterns';
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
