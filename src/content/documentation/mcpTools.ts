import { DocumentationSection } from '@/types/documentation';

export const mcpToolsContent: DocumentationSection = {
  id: 'mcp-tools',
  title: 'MCP Tools Reference',
  description: 'Complete Model Context Protocol tools for AI agent integration',
  content: `# MCP Tools Reference

Local Memory v1.2.1 provides 16 MCP (Model Context Protocol) tools for intelligent knowledge management. Tools are organized into categories for knowledge intake, evolution, reasoning, and management.

## Overview

### Tool Categories

**Core Memory (4 tools)**
- \`update_memory\` - Update existing memories
- \`delete_memory\` - Delete memories
- \`get_memory_by_id\` - Retrieve specific memories
- \`search\` - Advanced multi-mode search with cursor pagination

**Knowledge Intake (3 tools)**
- \`observe\` - Record observations (L0) for later processing
- \`question\` - Track epistemic gaps and contradictions
- \`bootstrap\` - Initialize session with knowledge context

**Knowledge Evolution (3 tools)**
- \`reflect\` - Process observations into learnings (L0->L1)
- \`evolve\` - Validate, promote, or decay knowledge
- \`resolve\` - Handle contradictions and answer questions

**Reasoning (3 tools)**
- \`predict\` - Generate predictions from patterns and schemas
- \`explain\` - Trace causal paths between states
- \`counterfactual\` - Explore "what if" alternative scenarios

**Graph & Status (3 tools)**
- \`relate\` - Create relationships between memories
- \`validate\` - Check knowledge graph integrity
- \`status\` - Unified system status and statistics

### Legacy Tools (Deprecated & Hidden)

The following tools are deprecated, hidden from tool listings, but still functional for backward compatibility. They will be removed in v2.0.0.

| Legacy Tool | Use Instead | Notes |
|-------------|-------------|-------|
| \`store_memory\` | \`observe\` | L0 observation intake |
| \`analysis\` | \`predict\`, \`explain\`, \`counterfactual\` | Split for clearer semantics |
| \`stats\` | \`status\` | Unified system info |
| \`relationships\` | \`relate\` | Cleaner API |
| \`sessions\` | \`bootstrap\` | Session initialization |
| \`domains\` | \`domain\` parameter on \`observe\` | Pass domain directly |
| \`categories\` | \`tags\` parameter on \`observe\` | Pass tags directly |

*Deprecation timeline: v1.3.0 warnings -> v1.4.0 hidden (current) -> v1.5.0 logged -> v2.0.0 removed*

---

## Knowledge Hierarchy

Local Memory implements a four-level knowledge hierarchy:

| Level | Name | Weight Range | Characteristics |
|-------|------|--------------|-----------------|
| L0 | Observation | 0.0-1.0 | Raw intake, ephemeral |
| L1 | Learning | 1.0-5.0 | Candidate insights, volatile |
| L2 | Pattern | 5.0-9.0 | Validated generalizations, durable |
| L3 | Schema | 9.0-10.0 | Theoretical frameworks, permanent |

Knowledge progresses through levels via validation and promotion. See the \`evolve\` tool for promotion operations.

---

## Core Memory Tools

### update_memory

**Purpose**: Update an existing memory's content or metadata

**Parameters**:
- \`id\` (string, required): Memory UUID to update
- \`content\` (string, optional): Updated content
- \`importance\` (integer, optional): Updated importance (1-10)
- \`tags\` (array of strings, optional): Updated tags

**Example**:
\`\`\`javascript
update_memory(
  id="550e8400-e29b-41d4-a716-446655440000",
  content="Updated understanding of transformer architecture",
  importance=8
)
\`\`\`

### delete_memory

**Purpose**: Permanently remove a memory by ID

**Parameters**:
- \`id\` (string, required): Memory UUID to delete

**Example**:
\`\`\`javascript
delete_memory(id="550e8400-e29b-41d4-a716-446655440000")
\`\`\`

### get_memory_by_id

**Purpose**: Retrieve a specific memory with full metadata

**Parameters**:
- \`id\` (string, required): Memory UUID to retrieve

**Response includes**: content, memory_level, weight, confidence, tags, domain, timestamps, validation counts

**Example**:
\`\`\`javascript
get_memory_by_id(id="550e8400-e29b-41d4-a716-446655440000")
\`\`\`

### search

**Purpose**: Advanced multi-mode search with intelligent token optimization

**Parameters**:
- \`search_type\` (string): "semantic", "tags", "date_range", "hybrid" (default: "semantic")
- \`query\` (string): Search text (required for semantic/hybrid)
- \`tags\` (array): Tags to filter (required for tags/hybrid)
- \`start_date\`/\`end_date\` (string): Date range in YYYY-MM-DD format
- \`format\` (string): "intelligent", "detailed", "summary", "ids_only" (default: "intelligent")
- \`max_tokens\` (integer): Token budget for intelligent format (default: 1000)
- \`limit\` (integer): Results per page (default: 10, max: 100)
- \`cursor\` (string): Pagination cursor for continuing search
- \`domain\` (string): Filter by knowledge domain
- \`session_filter_mode\` (string): "all", "session_only", "session_and_shared"
- \`use_ai\` (boolean): Enable vector embeddings for semantic search

**Response Formats**:
- \`intelligent\` - Auto-optimizes based on token budget
- \`detailed\` - Full content and metadata
- \`summary\` - Balanced (~50% reduction)
- \`ids_only\` - Minimal response (~95% reduction)

**Example**:
\`\`\`javascript
search(
  query="machine learning deployment",
  format="intelligent",
  max_tokens=500,
  domain="ai"
)
\`\`\`

---

## Knowledge Intake Tools

### observe

**Purpose**: Record observations for knowledge processing. Replaces \`store_memory\`.

Creates L0 observations by default, or higher-level memories with \`level\` parameter. Observations are raw intake meant for later processing via \`reflect\`.

**Parameters**:
- \`content\` (string, required): The observation content
- \`level\` (string, optional): "observation", "learning", "pattern", "schema" (default: "observation")
- \`tags\` (array of strings, optional): Tags for categorization
- \`domain\` (string, optional): Knowledge domain
- \`source\` (string, optional): Source of observation
- \`context\` (string, optional): Additional context
- \`weight\` (number, optional): Initial weight 0.0-10.0
- \`auto_promote\` (boolean, optional): Auto-promote when criteria met (default: false)
- \`session_id\` (string, optional): Session identifier

**Example**:
\`\`\`javascript
// Record a raw observation
observe(
  content="Redis SCAN command is O(1) per call but O(N) overall",
  tags=["redis", "performance"],
  domain="databases"
)

// Store a learning directly
observe(
  content="Circuit breaker pattern prevents cascading failures in microservices",
  level="learning",
  tags=["architecture", "resilience"],
  weight=3.5
)
\`\`\`

### question

**Purpose**: Record epistemic gaps, contradictions, and knowledge questions

Tracks what you don't know or need to investigate. Questions can be answered later via \`resolve\`.

**Parameters**:
- \`content\` (string, required): The question or knowledge gap
- \`question_type\` (string): "epistemic_gap", "contradiction", "prediction_failure" (default: "epistemic_gap")
- \`priority\` (integer): Priority 1-10 (default: 5)
- \`domain\` (string, optional): Knowledge domain
- \`origin_context\` (string, optional): Context that prompted this question
- \`session_id\` (string, optional): Session identifier

**Example**:
\`\`\`javascript
question(
  content="How does Redis handle persistence during high write load?",
  question_type="epistemic_gap",
  priority=7,
  domain="databases"
)
\`\`\`

### bootstrap

**Purpose**: Initialize session with knowledge context and pending questions

Call at session start to load relevant schemas, patterns, learnings, and any pending questions. Returns memory statistics and highlights.

**Parameters**:
- \`mode\` (string): "full", "minimal", "domain" (default: "full")
- \`domain\` (string): Focus domain (required for domain mode)
- \`include_questions\` (boolean): Include pending questions (default: true)
- \`include_learnings\` (boolean): Include recent learnings (default: true)
- \`include_patterns\` (boolean): Include high-weight patterns (default: true)
- \`limit\` (integer): Max items per category (default: 20, max: 100)
- \`session_id\` (string, optional): Session identifier

**Response includes**:
- \`memory_stats\`: Counts by level, domain, relationships, questions
- \`highlights\`: Top schemas, patterns, recent learnings
- \`pending_questions\`: Unresolved epistemic gaps and contradictions

**Example**:
\`\`\`javascript
// Full bootstrap
bootstrap(mode="full", include_questions=true)

// Domain-focused
bootstrap(mode="domain", domain="programming")

// Minimal startup
bootstrap(mode="minimal")
\`\`\`

---

## Knowledge Evolution Tools

### reflect

**Purpose**: Process observations into learnings (L0->L1 transformation)

Analyzes raw observations and synthesizes them into candidate insights. Can process single observations or batches.

**Parameters**:
- \`mode\` (string): "single", "batch", "auto" (default: "single")
- \`observation_id\` (string): UUID of observation (required for single mode)
- \`batch_size\` (integer): Observations to process in batch (default: 10, max: 50)
- \`auto_criteria\` (string): Criteria for auto selection
- \`session_id\` (string, optional): Session identifier

**Example**:
\`\`\`javascript
// Process single observation
reflect(mode="single", observation_id="uuid-of-observation")

// Batch processing
reflect(mode="batch", batch_size=10)

// Automatic selection
reflect(mode="auto", auto_criteria="time_based")
\`\`\`

### evolve

**Purpose**: Run evolution operations on knowledge (validate/promote/decay/accommodate)

Manages the lifecycle of knowledge through validation, promotion to higher levels, decay of stale knowledge, and accommodation of new evidence.

**Parameters**:
- \`operation\` (string, required): "validate", "promote", "decay", "accommodate"
- \`entity_id\` (string): Memory UUID (required for validate/promote)
- \`success\` (boolean): Validation success (required for validate)
- \`context\` (string, optional): Rationale for operation
- \`threshold_days\` (integer): Days threshold for decay (default: 30, max: 365)
- \`dry_run\` (boolean): Preview changes without applying (default: false)
- \`session_id\` (string, optional): Session identifier

**Operations**:
- \`validate\` - Record validation result, adjusts weight
- \`promote\` - Manually promote to higher level
- \`decay\` - Reduce weight of stale knowledge
- \`accommodate\` - Integrate conflicting evidence

**Example**:
\`\`\`javascript
// Validate a learning (increases weight on success)
evolve(
  operation="validate",
  entity_id="uuid",
  success=true,
  context="Verified in production deployment"
)

// Preview decay without applying
evolve(operation="decay", threshold_days=30, dry_run=true)

// Promote pattern to schema
evolve(operation="promote", entity_id="uuid", context="Pattern validated multiple times")
\`\`\`

### resolve

**Purpose**: Resolve contradictions and answer epistemic gaps

Handles detected contradictions between memories and marks questions as answered.

**Parameters**:
- \`question_id\` (string, required): UUID of question/contradiction to resolve
- \`resolution_type\` (string, required): One of:
  - \`a_supersedes\` - Memory A is correct, B is outdated
  - \`b_supersedes\` - Memory B is correct, A is outdated
  - \`conditional\` - Both correct under different conditions
  - \`merged\` - Synthesize new understanding from both
  - \`context\` - Different contexts, no actual conflict
  - \`invalidated\` - Both memories were wrong
  - \`answered\` - Epistemic gap has been answered
- \`rationale\` (string, required): Explanation for resolution
- \`synthesis_content\` (string, optional): New synthesized content (for merged)
- \`create_synthesis\` (boolean): Create new memory from synthesis (default: false)
- \`update_weights\` (boolean): Adjust weights of affected memories (default: true)
- \`update_relationship\` (boolean): Update/remove contradicts relationship (default: true)
- \`session_id\` (string, optional): Session identifier

**Example**:
\`\`\`javascript
// Resolve contradiction - newer supersedes older
resolve(
  question_id="uuid-of-contradiction",
  resolution_type="a_supersedes",
  rationale="Memory A reflects updated API documentation from 2025"
)

// Answer epistemic gap
resolve(
  question_id="uuid-of-question",
  resolution_type="answered",
  rationale="Redis uses AOF and RDB persistence mechanisms"
)

// Merge conflicting insights
resolve(
  question_id="uuid",
  resolution_type="merged",
  rationale="Both perspectives valid in different contexts",
  synthesis_content="Combined understanding: X in context A, Y in context B",
  create_synthesis=true
)
\`\`\`

---

## Reasoning Tools

### predict

**Purpose**: Generate predictions from stored patterns and schemas

Uses L2 patterns and L3 schemas to predict outcomes given a context.

**Parameters**:
- \`given\` (string, required): Context or precondition for prediction
- \`action\` (string, optional): Action being taken in context
- \`domain\` (string, optional): Focus domain for filtering
- \`schema_ids\` (array of strings, optional): Specific schemas to use
- \`use_ai\` (boolean): Enable AI-enhanced predictions (default: false)
- \`limit\` (integer): Max predictions (default: 5, max: 20)
- \`session_id\` (string, optional): Session identifier

**Example**:
\`\`\`javascript
predict(
  given="user clicks checkout button",
  action="complete purchase",
  domain="e-commerce"
)

predict(
  given="API receives high traffic",
  use_ai=true
)
\`\`\`

### explain

**Purpose**: Trace causal paths between states

Finds the chain of causes/enables relationships connecting two states.

**Parameters**:
- \`from_state\` (string, required): Starting state or observation
- \`to_state\` (string, required): Ending state or observation
- \`domain\` (string, optional): Focus domain
- \`max_depth\` (integer): Max relationship hops (default: 4, max: 10)
- \`use_ai\` (boolean): Enable AI-enhanced explanations (default: false)
- \`session_id\` (string, optional): Session identifier

**Example**:
\`\`\`javascript
explain(
  from_state="user logged in",
  to_state="user completed purchase",
  domain="e-commerce"
)

explain(
  from_state="test passed locally",
  to_state="deployment failed",
  use_ai=true
)
\`\`\`

### counterfactual

**Purpose**: Explore "what if" alternative scenarios

Reasons about what might have happened under different conditions.

**Parameters**:
- \`observed\` (string, required): What actually happened
- \`if_condition\` (string, required): Alternative condition to explore
- \`domain\` (string, optional): Focus domain
- \`schema_ids\` (array of strings, optional): Specific schemas to consult
- \`use_ai\` (boolean): Enable AI-enhanced reasoning (default: false)
- \`session_id\` (string, optional): Session identifier

**Example**:
\`\`\`javascript
counterfactual(
  observed="deployment failed",
  if_condition="we had run integration tests",
  domain="devops"
)

counterfactual(
  observed="user churned",
  if_condition="price was 20% lower",
  use_ai=true
)
\`\`\`

---

## Graph Status Tools

### relate

**Purpose**: Create relationships between memories

Creates typed, weighted relationships between memory entities.

**Parameters**:
- \`source_memory_id\` (string, required): Source memory UUID
- \`target_memory_id\` (string, required): Target memory UUID
- \`relationship_type\` (string): One of:
  - \`references\` (default) - General reference
  - \`contradicts\` - Conflicting information
  - \`expands\` - Elaborates on
  - \`similar\` - Related content
  - \`sequential\` - Temporal sequence
  - \`causes\` - Causal relationship
  - \`enables\` - Prerequisite
- \`strength\` (number): Relationship strength 0.0-1.0 (default: 0.5)
- \`context\` (string, optional): Why this relationship exists

**Example**:
\`\`\`javascript
relate(
  source_memory_id="uuid-1",
  target_memory_id="uuid-2",
  relationship_type="causes",
  strength=0.9,
  context="Cache invalidation leads to database load spike"
)
\`\`\`

### validate

**Purpose**: Check knowledge graph integrity and optionally repair issues

Runs integrity checks on the knowledge graph and can auto-fix certain issues.

**Parameters**:
- \`checks\` (array of strings, optional): Specific checks to run:
  - \`orphaned_reference\` - References to deleted memories
  - \`relationship_cycle\` - Circular relationships
  - \`weight_inconsistency\` - Weight/level mismatches
  - \`stale_question\` - Old unresolved questions
  - \`promotion_chain_broken\` - Invalid promotion paths
  - \`duplicate_relationship\` - Duplicate edges
- \`auto_fix\` (boolean): Apply automatic fixes (default: false)
- \`dry_run\` (boolean): Preview fixes without applying (default: true)
- \`domain\` (string, optional): Filter to specific domain
- \`batch_size\` (integer): Processing batch size (default: 1000)
- \`response_format\` (string): "detailed", "concise", "ids_only", "summary"
- \`session_id\` (string, optional): Session identifier

**Example**:
\`\`\`javascript
// Full integrity check
validate()

// Specific checks with auto-fix preview
validate(
  checks=["orphaned_reference", "weight_inconsistency"],
  auto_fix=true,
  dry_run=true
)

// Apply fixes
validate(auto_fix=true, dry_run=false)
\`\`\`

### status

**Purpose**: Get unified system status and statistics

Returns comprehensive system health including memory counts by level, domain distribution, relationship statistics, and question states.

**Parameters**:
- \`response_format\` (string): "detailed", "concise", "summary" (default: "detailed")

**Response includes**:
- Total memories and counts by level (L0-L3)
- Domain distribution
- Relationship count
- Questions (total, pending, resolved)
- Recent activity (created/updated in 24h)

**Example**:
\`\`\`javascript
status()
status(response_format="summary")
\`\`\`

---

## Integration Patterns

### Recommended Workflow

1. **Session Start**: Call \`bootstrap\` to load context
2. **During Work**: Use \`observe\` to capture insights
3. **End of Session**: Use \`reflect\` to process observations
4. **Periodically**: Run \`evolve(operation="decay")\` for maintenance

### Token Optimization

Choose response formats based on use case:
- \`ids_only\` (~95% reduction): When you only need memory IDs
- \`summary\` (~50% reduction): Balanced for most operations
- \`concise\` (~70% reduction): Good default for analysis
- \`detailed\`: When you need full content
- \`intelligent\`: Auto-optimizes to token budget

### Best Practices

1. **Use \`observe\` for intake**: Don't skip to learnings, let reflection synthesize
2. **Track unknowns with \`question\`**: Epistemic gaps are valuable metadata
3. **Validate frequently**: Use \`evolve(operation="validate")\` to strengthen good knowledge
4. **Resolve contradictions**: Don't leave them pending indefinitely
5. **Run periodic maintenance**: \`validate()\` and \`evolve(operation="decay")\` keep the graph healthy`,
  codeExamples: [
    {
      id: 'world-memory-workflow',
      title: 'World Memory Workflow',
      code: `// 1. Bootstrap session with context
bootstrap(mode="full", include_questions=true)

// 2. Record observations during work
observe(
  content="Redis SCAN is O(1) per call but O(N) overall",
  tags=["redis", "performance"],
  domain="databases"
)

// 3. Track knowledge gaps
question(
  content="How does Redis handle persistence during high write load?",
  question_type="epistemic_gap",
  priority=7
)

// 4. End of session: process observations
reflect(mode="batch", batch_size=10)

// 5. Validate proven knowledge
evolve(
  operation="validate",
  entity_id="uuid",
  success=true,
  context="Verified in production"
)`,
      language: 'javascript',
      description: 'Complete World Memory workflow: bootstrap, observe, question, reflect, evolve'
    },
    {
      id: 'knowledge-evolution',
      title: 'Knowledge Evolution Operations',
      code: `// Validate a learning (increases weight on success)
evolve(
  operation="validate",
  entity_id="uuid",
  success=true,
  context="Verified in production deployment"
)

// Preview decay without applying
evolve(operation="decay", threshold_days=30, dry_run=true)

// Apply decay to stale knowledge
evolve(operation="decay", threshold_days=30, dry_run=false)

// Promote pattern to schema
evolve(
  operation="promote",
  entity_id="uuid",
  context="Pattern validated multiple times"
)`,
      language: 'javascript',
      description: 'Managing knowledge lifecycle through validation, decay, and promotion'
    },
    {
      id: 'reasoning-tools',
      title: 'Reasoning and Analysis',
      code: `// Generate predictions from patterns
predict(
  given="API receives high traffic",
  domain="infrastructure",
  use_ai=true
)

// Trace causal paths
explain(
  from_state="test passed locally",
  to_state="deployment failed",
  use_ai=true
)

// Explore alternative scenarios
counterfactual(
  observed="deployment failed",
  if_condition="we had run integration tests",
  domain="devops"
)`,
      language: 'javascript',
      description: 'Using reasoning tools for predictions, explanations, and what-if analysis'
    }
  ],
  prevSection: 'cli-reference',
  nextSection: 'rest-api'
};
