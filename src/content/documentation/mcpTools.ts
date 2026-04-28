import { DocumentationSection } from '@/types/documentation';

export const mcpToolsContent: DocumentationSection = {
  id: 'mcp-tools',
  title: 'MCP Tools Reference',
  description: 'Complete Model Context Protocol tools for AI agent integration',
  content: `# MCP Tools Reference

Local Memory v1.5.0 provides 23 MCP tools for knowledge engineering. Tools are organized into 8 categories covering intake, retrieval, evolution, reasoning, relationships, temporal analysis, and management.

> **v1.5.0**: All tool responses include a \`level_label\` field using canonical vocabulary — \`"observation (L0)"\`, \`"learning (L1)"\`, \`"pattern (L2)"\`, \`"schema (L3)"\` — so agents can always see the knowledge level of what they're working with. Tools that return lists also include level distribution summaries and \`suggested_actions\` tailored to result composition.

## Overview

### Tool Categories

**Core Memory (4 tools)**
- \`observe\` - Record observations for knowledge processing; returns structured JSON
- \`update_memory\` - Update existing memories
- \`delete_memory\` - Delete memories
- \`get_memory_by_id\` - Retrieve specific memories

**Search & Retrieval (3 tools)**
- \`search\` - Advanced multi-mode search with level distribution summaries
- \`ask\` - Answer a question using stored memories as context
- \`summarize\` - Summarize stored memories for a given timeframe

**Relationships (4 tools)**
- \`relate\` - Create typed relationships between memories
- \`find_related\` - Find memories connected via graph traversal and vector similarity
- \`discover\` - Find latent relationships across stored memories without needing IDs
- \`map_graph\` - Traverse the explicit relationship graph around a memory

**Knowledge Evolution (4 tools)**
- \`reflect\` - Process observations into learnings (L0→L1); idempotent, supports dry_run
- \`evolve\` - Validate, promote, or decay knowledge
- \`question\` - Track epistemic gaps, contradictions, and prediction failures
- \`resolve\` - Handle contradictions and answer questions

**Reasoning (4 tools)**
- \`predict\` - Generate predictions from patterns and schemas (session-scoped)
- \`explain\` - Trace causal paths between states (session-scoped)
- \`counterfactual\` - Explore "what if" alternative scenarios (session-scoped)
- \`validate\` - Check knowledge graph integrity

**Session & Orientation (2 tools)**
- \`bootstrap\` - Initialize session with knowledge context
- \`status\` - Unified system status with level_distribution

**Temporal Analysis (1 tool)**
- \`temporal\` - Analyze how knowledge evolves over time

**Management (1 tool)**
- \`migrate_domain\` - Batch-rename all memories from one domain to another

### Removed in v1.5.0

- \`store_memory\` — **removed**; returns \`-32601 Method Not Found\`. Use \`observe\` instead.
- \`analysis\` — hidden; use \`predict\`, \`explain\`, \`counterfactual\`, or \`temporal\`.
- \`stats\`, \`relationships\`, \`sessions\`, \`domains\`, \`categories\` — hidden legacy tools still accessible via \`enable_legacy_tools\` config flag.

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

**Purpose**: Record observations for knowledge processing. Returns structured JSON — not a plain string.

Creates L0 observations by default, or higher-level memories with the \`level\` parameter. Observations are raw intake meant for later processing via \`reflect\`.

**Parameters**:
- \`content\` (string, required): The observation content
- \`level\` (string, optional): "observation", "learning", "pattern", "schema" (default: "observation")
- \`tags\` (array of strings, optional): Tags for categorization
- \`domain\` (string, optional): Knowledge domain
- \`source\` (string, optional): Source of observation
- \`context\` (string, optional): Additional context
- \`importance\` (number, optional): Importance 0.0-1.0
- \`weight\` (number, optional): Initial weight 0.0-10.0
- \`auto_promote\` (boolean, optional): Auto-promote when criteria met (default: false)
- \`session_id\` (string, optional): Session identifier

**Response**:
\`\`\`json
{
  "memory_id": "uuid",
  "level_label": "observation (L0)",
  "knowledge_type": "observation",
  "importance": 0.4,
  "tags": ["redis", "performance"],
  "domain": "databases",
  "summary": "Stored as an L0 observation for later reflection.",
  "suggested_actions": ["Call reflect(mode=batch) to promote observations into learnings"]
}
\`\`\`

When \`auto_promote=true\` fires, the response also includes \`auto_promoted: true\`, \`promoted_from_level\`, and \`promoted_to_level\`.

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

**Purpose**: Record epistemic gaps, contradictions, and knowledge questions. Returns structured JSON.

Tracks what you don't know or need to investigate. Questions can be answered later via \`resolve\`.

**Parameters**:
- \`content\` (string, required): The question or knowledge gap
- \`question_type\` (string): "epistemic_gap", "contradiction", "prediction_failure" (default: "epistemic_gap")
- \`priority\` (integer): Priority 1-10 (default: 5)
- \`domain\` (string, optional): Knowledge domain
- \`origin_context\` (string, optional): Context that prompted this question
- \`contradiction_memory_ids\` (array of strings, optional): UUIDs of conflicting memories (must be valid UUIDs)
- \`session_id\` (string, optional): Session identifier

**Response**:
\`\`\`json
{
  "question_id": "uuid",
  "question_type": "epistemic_gap",
  "priority": 7,
  "summary": "Recorded as an epistemic gap...",
  "suggested_actions": ["Use search to find related knowledge", "Use resolve when you have an answer"]
}
\`\`\`

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

**Purpose**: Process observations into learnings (L0→L1 transformation). Idempotent — safe to call twice.

Analyzes raw observations and synthesizes them into candidate insights. Observations are marked as promoted after processing, so calling \`reflect\` again on the same session does not create duplicate learnings.

**Parameters**:
- \`mode\` (string): "single", "batch", "auto" (default: "single")
- \`observation_id\` (string): UUID of observation (required for single mode)
- \`batch_size\` (integer): Observations to process in batch (default: 10, max: 50)
- \`auto_criteria\` (string): Criteria for auto selection
- \`dry_run\` (boolean): Preview which observations would be promoted without creating learnings, calling Ollama, or syncing Qdrant (default: false)
- \`session_id\` (string, optional): Session identifier — scopes observation retrieval to that session only
- \`response_format\` (string): "detailed", "concise", "summary", "ids_only"

**Response** (wrapped envelope):
\`\`\`json
{
  "operation": "reflect",
  "result": {
    "observations_processed": 5,
    "learnings_created": 3,
    "unpromoted_count": 2,
    "dry_run": false
  },
  "summary": "Processed 5 observations, created 3 learnings.",
  "suggested_actions": [...]
}
\`\`\`

When \`dry_run=true\`, the result includes \`"dry_run": true\` and placeholder IDs (\`"hypothetical-0"\`, etc.) — no data is written.

**Example**:
\`\`\`javascript
// Process single observation
reflect(mode="single", observation_id="uuid-of-observation")

// Batch processing
reflect(mode="batch", batch_size=10)

// Preview without committing
reflect(mode="batch", dry_run=true)

// Session-scoped batch
reflect(mode="batch", session_id="session-uuid")
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

**Safety gate**: Calling \`validate(auto_fix=true, dry_run=false)\` requires \`confirm_auto_fix=true\`. Without it the call returns an error. This prevents accidental graph mutations.

**Example**:
\`\`\`javascript
// Full integrity check (read-only)
validate()

// Preview auto-fixes without applying
validate(
  checks=["orphaned_reference", "weight_inconsistency"],
  auto_fix=true,
  dry_run=true
)

// Apply fixes — confirm_auto_fix required
validate(auto_fix=true, dry_run=false, confirm_auto_fix=true)
\`\`\`

### status

**Purpose**: Get unified system status and statistics

Returns comprehensive system health including memory counts by level, domain distribution, relationship statistics, and question states.

**Parameters**:
- \`response_format\` (string): "detailed", "concise", "summary" (default: "detailed")

**Response includes**:
- \`level_distribution\`: observation/learning/pattern/schema counts
- Domain distribution
- Relationship count
- \`epistemic_gaps\`: count of open gap-type questions
- \`contradictions\`: count of open contradiction-type questions
- Recent activity (created/updated in 24h)
- \`suggested_actions\` branched on knowledge base state

> **v1.5.0**: \`pending_questions\` was replaced by \`epistemic_gaps\` + \`contradictions\`.

**Example**:
\`\`\`javascript
status()
status(response_format="summary")
\`\`\`

---

## Search & Retrieval Tools

### ask

**Purpose**: Answer a question using stored memories as context.

**Parameters**:
- \`question\` (string, required): The question to answer
- \`limit\` (integer): Max memories to use as context (default: 10)
- \`use_ai\` (boolean): Enable AI-enhanced answering (default: false)
- \`domain\` (string, optional): Filter by domain
- \`session_id\` (string, optional): Session identifier
- \`response_format\` (string): "detailed", "concise", "summary", "ids_only"

**Example**:
\`\`\`javascript
ask(
  question="What are the key patterns in my Redis usage?",
  domain="databases",
  use_ai=true
)
\`\`\`

### summarize

**Purpose**: Summarize stored memories for a given timeframe.

**Parameters**:
- \`query\` (string, optional): Filter memories before summarizing
- \`timeframe\` (string): "today", "week", "month", "all" (default: "all")
- \`limit\` (integer): Max memories to summarize (default: 10)
- \`domain\` (string, optional): Filter by domain
- \`session_id\` (string, optional): Session identifier
- \`response_format\` (string): "detailed", "concise", "summary"

**Example**:
\`\`\`javascript
summarize(timeframe="week", domain="programming")
\`\`\`

---

## Relationship Tools

### find_related

**Purpose**: Find memories connected to a seed memory via graph traversal and vector similarity.

**Parameters**:
- \`memory_id\` (string, required): Seed memory UUID
- \`limit\` (integer): Max results (default: 10)
- \`min_strength\` (number): Minimum relationship strength 0.0-1.0
- \`relationship_types\` (array): Filter by relationship types
- \`session_id\` (string, optional): Session identifier
- \`response_format\` (string): "detailed", "concise", "ids_only", "summary"

**Example**:
\`\`\`javascript
find_related(memory_id="uuid", limit=10, min_strength=0.5)
\`\`\`

### discover

**Purpose**: Find latent relationships across stored memories without needing specific IDs.

**Parameters**:
- \`memory_id\` (string, optional): Center discovery around a specific memory
- \`limit\` (integer): Max relationships to discover (default: 20)
- \`min_strength\` (number): Minimum strength threshold (default: 0.5)
- \`relationship_types\` (array): Filter by types
- \`session_id\` (string, optional): Session identifier
- \`response_format\` (string): "detailed", "concise", "ids_only", "summary"

**Example**:
\`\`\`javascript
discover(limit=20, min_strength=0.7)
discover(memory_id="uuid", relationship_types=["similar", "expands"])
\`\`\`

### map_graph

**Purpose**: Traverse the explicit relationship graph around a memory (edges created via \`relate\`).

**Parameters**:
- \`memory_id\` (string, required): Central memory UUID
- \`depth\` (integer): Relationship hops 1-5 (default: 2)
- \`include_strength\` (boolean): Include edge strength values (default: true)
- \`relationship_types\` (array): Filter by types
- \`session_id\` (string, optional): Session identifier
- \`response_format\` (string): "detailed", "concise", "ids_only", "summary"

**Example**:
\`\`\`javascript
map_graph(memory_id="uuid", depth=3)
\`\`\`

---

## Temporal Analysis Tools

### temporal

**Purpose**: Analyze how knowledge evolves over time. Provides full MCP parity with the four REST temporal endpoints.

**Parameters**:
- \`operation\` (string, required): "patterns", "progression", "gaps", "timeline"
- \`analysis_type\` (string, optional): Operation-specific type
- \`timeframe\` (string, optional): "today", "week", "month", "quarter", "year", "all"
- \`concept\` (string, optional): Specific concept to analyze
- \`focus_areas\` (array of strings, optional): Focus domains or topics (max 10)
- \`memory_ids\` (array of strings, optional): Specific memories to include (max 50)
- \`session_id\` (string, optional): Session identifier
- \`response_format\` (string): "detailed", "concise", "summary", "ids_only"

**Operations**:
- \`patterns\` — Identify recurring patterns in knowledge acquisition over time
- \`progression\` — Track mastery progression for a specific concept (\`concept\` required)
- \`gaps\` — Surface knowledge gaps and areas needing more depth
- \`timeline\` — Chronological view of how knowledge about a concept developed

**Example**:
\`\`\`javascript
// Learning trends over the last month
temporal(operation="patterns", timeframe="month")

// Track mastery of a specific concept
temporal(operation="progression", concept="Go concurrency")

// Find knowledge gaps
temporal(operation="gaps", focus_areas=["databases", "distributed systems"])

// Chronological knowledge timeline
temporal(operation="timeline", concept="microservices")
\`\`\`

---

## Management Tools

### migrate_domain

**Purpose**: Batch-rename all memories from one domain to another.

**Parameters**:
- \`from_domain\` (string, required): Source domain name
- \`to_domain\` (string, required): Target domain name
- \`dry_run\` (boolean): Preview affected count without modifying any memories (default: false)
- \`session_id\` (string, optional): Session identifier

**Example**:
\`\`\`javascript
// Preview the migration
migrate_domain(from_domain="ai-research", to_domain="machine-learning", dry_run=true)

// Apply the migration
migrate_domain(from_domain="ai-research", to_domain="machine-learning")
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
