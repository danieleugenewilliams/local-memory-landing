import { DocumentationSection } from '@/types/documentation';

export const restApiContent: DocumentationSection = {
  id: 'rest-api',
  title: 'REST API Reference',
  description: 'Complete HTTP API for integrating Local Memory v1.3.0 with any application',
  content: `# REST API Reference

Local Memory v1.3.0 provides a comprehensive REST API accessible at \`http://localhost:3002/api/v1\`. Endpoints are organized into categories matching the knowledge lifecycle.

## Overview

### Endpoint Categories

**Core Memory (9 endpoints)**
- \`POST /memories\` - Store a new memory
- \`GET /memories\` - List memories with pagination
- \`GET /memories/search\` - Search memories
- \`POST /memories/search\` - Advanced search with pagination
- \`POST /memories/search/intelligent\` - AI-optimized search
- \`GET /memories/{id}\` - Get memory by ID
- \`PUT /memories/{id}\` - Update a memory
- \`DELETE /memories/{id}\` - Delete a memory
- \`GET /memories/stats\` - Get memory statistics

**World Memory Phase 3-4 (6 endpoints)**
- \`POST /observe\` - Record observations
- \`POST /question\` - Track epistemic gaps
- \`POST /bootstrap\` - Initialize session context
- \`POST /evolve\` - Knowledge evolution operations
- \`POST /reflect\` - Process observations into learnings
- \`GET /evolution/stats\` - Evolution statistics

**World Memory Phase 5-7 (5 endpoints)**
- \`POST /predict\` - Generate predictions
- \`POST /explain\` - Trace causal paths
- \`POST /counterfactual\` - Explore alternatives
- \`POST /resolve\` - Resolve contradictions
- \`POST /validate\` - Graph integrity checks

**AI Analysis (6 endpoints)**
- \`POST /analyze\` - AI-powered analysis
- \`POST /ask\` - Question answering
- \`POST /summarize\` - Generate summaries
- \`POST /temporal/patterns\` - Analyze temporal patterns
- \`POST /temporal/progression\` - Track learning progression
- \`POST /temporal/gaps\` - Detect knowledge gaps

**Graph & Relationships (4 endpoints)**
- \`POST /relationships/discover\` - Discover relationships
- \`POST /relationships\` - Create relationship
- \`POST /relate\` - Simplified relationship creation
- \`GET /memories/{id}/graph\` - Map memory graph

**Domains & Categories (7 endpoints)**
- \`GET /domains\` - List domains
- \`POST /domains\` - Create domain
- \`GET /domains/{domain}/stats\` - Domain statistics
- \`GET /categories\` - List categories
- \`POST /categories\` - Create category
- \`GET /categories/stats\` - Category statistics
- \`POST /memories/{id}/categorize\` - Categorize memory

**System & Status (5 endpoints)**
- \`GET /health\` - Health check
- \`GET /status\` - System status
- \`GET /sessions\` - List sessions
- \`GET /stats\` - System statistics
- \`GET /api/v1/\` - List all endpoints

### Base URL
\`\`\`
http://localhost:3002/api/v1
\`\`\`

### Authentication
Currently, no authentication is required for local development. All endpoints are accessible without credentials.

### Response Format
All responses follow a consistent JSON structure:
\`\`\`json
{
  "success": true|false,
  "message": "Human-readable message",
  "data": { ... }
}
\`\`\`

### Error Responses
\`\`\`json
{
  "error": "error",
  "code": 400,
  "message": "validation failed: content is required"
}
\`\`\`

---

## Knowledge Hierarchy

Local Memory implements a four-level knowledge hierarchy:

| Level | Name | Weight Range | Characteristics |
|-------|------|--------------|-----------------|
| L0 | Observation | 0.0-1.0 | Raw intake, ephemeral |
| L1 | Learning | 1.0-5.0 | Candidate insights, volatile |
| L2 | Pattern | 5.0-9.0 | Validated generalizations, durable |
| L3 | Schema | 9.0-10.0 | Theoretical frameworks, permanent |

---

## Core Memory Endpoints

### Store Memory

**Endpoint**: \`POST /api/v1/memories\`

**Purpose**: Create a new memory/observation with content, tags, and metadata.

**Request Body**:
\`\`\`json
{
  "content": "Memory content to store",
  "importance": 8,
  "tags": ["tag1", "tag2"],
  "domain": "knowledge-domain",
  "source": "source-identifier"
}
\`\`\`

**Parameters**:
- \`content\` (string, required): The memory content
- \`importance\` (integer, optional): Importance 1-10 (default: 5)
- \`tags\` (array, optional): Tags for categorization
- \`domain\` (string, optional): Knowledge domain
- \`source\` (string, optional): Source identifier

**Example**:
\`\`\`bash
curl -X POST http://localhost:3002/api/v1/memories \\
  -H "Content-Type: application/json" \\
  -d '{"content": "REST API example", "importance": 7, "tags": ["api", "docs"]}'
\`\`\`

### List Memories

**Endpoint**: \`GET /api/v1/memories\`

**Purpose**: Retrieve memories with optional filtering and pagination.

**Parameters**:
- \`limit\` (integer, optional): Number of results (default: 20, max: 100)
- \`session_filter_mode\` (string, optional): "all", "session_only", "session_and_shared"
- \`truncate_content\` (boolean, optional): Enable content truncation
- \`max_content_chars\` (integer, optional): Max characters when truncating

**Example**:
\`\`\`bash
curl "http://localhost:3002/api/v1/memories?limit=10&truncate_content=true"
\`\`\`

### Search Memories

**Endpoint**: \`GET /api/v1/memories/search\`

**Purpose**: Search memories using semantic similarity and keywords.

**Parameters**:
- \`query\` (string, required): Search query
- \`use_ai\` (boolean, optional): Enable AI-powered semantic search
- \`limit\` (integer, optional): Number of results (default: 10)
- \`response_format\` (string, optional): "detailed", "concise", "ids_only", "summary"

**Example**:
\`\`\`bash
curl "http://localhost:3002/api/v1/memories/search?query=neural%20networks&use_ai=true&response_format=detailed"
\`\`\`

### Advanced Search

**Endpoint**: \`POST /api/v1/memories/search\`

**Purpose**: Advanced search with cursor-based pagination for large datasets.

**Request Body**:
\`\`\`json
{
  "query": "search query",
  "use_ai": false,
  "limit": 20,
  "cursor": "base64-encoded-cursor",
  "response_format": "concise"
}
\`\`\`

### Get Memory by ID

**Endpoint**: \`GET /api/v1/memories/{id}\`

**Purpose**: Retrieve a specific memory by its UUID.

**Example**:
\`\`\`bash
curl "http://localhost:3002/api/v1/memories/550e8400-e29b-41d4-a716-446655440000"
\`\`\`

### Update Memory

**Endpoint**: \`PUT /api/v1/memories/{id}\`

**Purpose**: Update an existing memory's content or metadata.

**Request Body**:
\`\`\`json
{
  "content": "Updated memory content",
  "importance": 9,
  "tags": ["updated", "tag"]
}
\`\`\`

### Delete Memory

**Endpoint**: \`DELETE /api/v1/memories/{id}\`

**Purpose**: Permanently delete a memory.

**Example**:
\`\`\`bash
curl -X DELETE "http://localhost:3002/api/v1/memories/550e8400-e29b-41d4-a716-446655440000"
\`\`\`

### Get Related Memories

**Endpoint**: \`GET /api/v1/memories/{id}/related\`

**Purpose**: Find memories related through relationships.

**Parameters**:
- \`limit\` (integer, optional): Number of results (default: 10)
- \`max_depth\` (integer, optional): Relationship depth (default: 2)
- \`min_similarity\` (number, optional): Minimum similarity 0.0-1.0

### Memory Statistics

**Endpoint**: \`GET /api/v1/memories/stats\`

**Purpose**: Get detailed statistics about stored memories.

---

## Knowledge Intake Endpoints

### Observe

**Endpoint**: \`POST /api/v1/observe\`

**Purpose**: Record observations for knowledge processing (World Memory Phase 3).

**Request Body**:
\`\`\`json
{
  "content": "Observation content",
  "level": "observation",
  "weight": 0.5,
  "auto_promote": false,
  "tags": ["tag1"],
  "domain": "domain-name",
  "source": "source-identifier",
  "context": "additional context"
}
\`\`\`

**Parameters**:
- \`content\` (string, required): The observation content
- \`level\` (string, optional): "observation", "learning", "pattern", "schema" (default: "observation")
- \`weight\` (number, optional): Initial weight 0.0-10.0
- \`tags\` (array, optional): Tags for categorization
- \`domain\` (string, optional): Knowledge domain
- \`source\` (string, optional): Source of observation
- \`context\` (string, optional): Additional context
- \`auto_promote\` (boolean, optional): Auto-promote when criteria met

**Example**:
\`\`\`bash
# Store as L0 observation
curl -X POST http://localhost:3002/api/v1/observe \\
  -H "Content-Type: application/json" \\
  -d '{"content": "API returns 500 under load", "tags": ["api", "performance"]}'

# Store as L1 learning with weight
curl -X POST http://localhost:3002/api/v1/observe \\
  -H "Content-Type: application/json" \\
  -d '{"content": "Circuit breakers prevent cascading failures", "level": "learning", "weight": 3.5}'
\`\`\`

---

## AI Analysis Endpoints

### Analyze Memories

**Endpoint**: \`POST /api/v1/analyze\`

**Purpose**: AI-powered analysis with question answering, summarization, and pattern analysis.

**Request Body**:
\`\`\`json
{
  "analysis_type": "question",
  "question": "What are the key differences between SQL and NoSQL?",
  "response_format": "concise",
  "limit": 10
}
\`\`\`

**Parameters**:
- \`analysis_type\` (string): "question", "summarize", "analyze", "temporal_patterns"
- \`question\` (string): Natural language question (for question type)
- \`query\` (string, optional): Filter memories before analysis
- \`timeframe\` (string, optional): "today", "week", "month", "all"
- \`response_format\` (string, optional): Response format optimization
- \`limit\` (integer, optional): Maximum memories to analyze

**Example**:
\`\`\`bash
curl -X POST http://localhost:3002/api/v1/analyze \\
  -H "Content-Type: application/json" \\
  -d '{"analysis_type": "question", "question": "What is Redis?", "response_format": "concise"}'
\`\`\`

### Ask Question

**Endpoint**: \`POST /api/v1/ask\`

**Purpose**: AI-powered question answering using stored memories as context.

**Request Body**:
\`\`\`json
{
  "question": "What are the key concepts in machine learning?",
  "limit": 10,
  "use_ai": true
}
\`\`\`

### Summarize Memories

**Endpoint**: \`POST /api/v1/summarize\`

**Purpose**: Generate AI-powered summaries of stored memories.

**Request Body**:
\`\`\`json
{
  "query": "machine learning",
  "limit": 10,
  "timeframe": "month"
}
\`\`\`

### Temporal Patterns

**Endpoint**: \`POST /api/v1/temporal/patterns\`

**Purpose**: Analyze learning patterns and progression over time.

**Request Body**:
\`\`\`json
{
  "analysis_type": "learning_progression",
  "concept": "machine learning",
  "timeframe": "month"
}
\`\`\`

### Learning Progression

**Endpoint**: \`POST /api/v1/temporal/progression\`

**Purpose**: Track learning progression for specific concepts.

**Request Body**:
\`\`\`json
{
  "concept": "neural networks",
  "include_suggestions": true
}
\`\`\`

### Knowledge Gaps

**Endpoint**: \`POST /api/v1/temporal/gaps\`

**Purpose**: Identify knowledge gaps and learning priorities.

**Request Body**:
\`\`\`json
{
  "focus_areas": ["machine learning", "deep learning"]
}
\`\`\`

---

## Graph & Status Endpoints

### Discover Relationships

**Endpoint**: \`POST /api/v1/relationships/discover\`

**Purpose**: AI-powered discovery of relationships between memories.

**Request Body**:
\`\`\`json
{
  "memory_id": "optional-central-memory-id",
  "limit": 10,
  "min_strength": 0.6,
  "relationship_types": ["expands", "references"]
}
\`\`\`

### Create Relationship

**Endpoint**: \`POST /api/v1/relationships\`

**Purpose**: Create an explicit relationship between two memories.

**Request Body**:
\`\`\`json
{
  "source_memory_id": "uuid1",
  "target_memory_id": "uuid2",
  "relationship_type": "expands",
  "strength": 0.8,
  "context": "Optional explanation"
}
\`\`\`

**Relationship Types**:
- \`references\` - Direct reference or citation
- \`contradicts\` - Conflicting information
- \`expands\` - Builds upon or extends
- \`similar\` - Related concepts
- \`sequential\` - Temporal or logical sequence
- \`causes\` - Causal relationship
- \`enables\` - Prerequisite or dependency

### Map Memory Graph

**Endpoint**: \`GET /api/v1/memories/{id}/graph\`

**Purpose**: Generate a graph visualization of memory relationships.

**Parameters**:
- \`depth\` (integer, optional): Maximum relationship depth (default: 2)

**Example**:
\`\`\`bash
curl "http://localhost:3002/api/v1/memories/{id}/graph?depth=3"
\`\`\`

### Health Check

**Endpoint**: \`GET /api/v1/health\`

**Purpose**: Check API health and system status.

**Response**:
\`\`\`json
{
  "success": true,
  "data": {
    "status": "healthy",
    "session": "daemon-session-id",
    "timestamp": "2025-11-12T12:59:36Z"
  },
  "message": "Server is healthy"
}
\`\`\`

### System Status

**Endpoint**: \`GET /api/v1/status\`

**Purpose**: Get comprehensive system status and statistics.

**Response includes**:
- Memory counts by level (L0-L3)
- Domain distribution
- Relationship statistics
- Questions (total, pending, resolved)
- Recent activity

---

## Response Formats

### Response Format Options

- **\`detailed\`**: Full response with all fields
- **\`concise\`**: Essential fields only (~70% token reduction)
- **\`ids_only\`**: Minimal response with IDs (~95% token reduction)
- **\`summary\`**: Truncated content (~50% token reduction)
- **\`custom\`**: Custom field selection

### Response Templates

Predefined templates for common use cases:
- **\`agent_minimal\`**: Ultra-minimal for AI agents
- **\`analysis_ready\`**: Optimized for AI analysis
- **\`relationship_focused\`**: Graph operations focus
- **\`content_preview\`**: Balanced preview

### Example with Format Optimization
\`\`\`bash
# Concise format
curl -X POST http://localhost:3002/api/v1/memories/search \\
  -H "Content-Type: application/json" \\
  -d '{"query": "machine learning", "response_format": "concise", "limit": 10}'

# IDs only
curl -X POST http://localhost:3002/api/v1/memories/search \\
  -H "Content-Type: application/json" \\
  -d '{"query": "machine learning", "response_format": "ids_only"}'
\`\`\`

---

## Pagination

The API supports cursor-based pagination for large datasets:

\`\`\`json
{
  "limit": 20,
  "cursor": "eyJvZmZzZXQiOjEwfQ==",
  "response": {
    "results": [...],
    "cursor": "eyJvZmZzZXQiOjMwfQ==",
    "has_more": true,
    "total_count": 150
  }
}
\`\`\`

To paginate:
1. Make initial request without cursor
2. Use returned cursor for next page
3. Continue until \`has_more\` is false

---

## Best Practices

1. **Use appropriate response formats**: Choose \`concise\` or \`ids_only\` for large datasets
2. **Enable AI search selectively**: Use \`use_ai=true\` only when semantic search is needed
3. **Implement pagination**: Use cursor-based pagination for large result sets
4. **Set reasonable limits**: Keep \`limit\` reasonable (10-50) for optimal performance
5. **Filter by session**: Use \`session_filter_mode\` to scope searches appropriately

---

## World Memory Endpoints

### Knowledge Intake (Phase 3)

#### Observe

**Endpoint**: \`POST /api/v1/observe\`

**Purpose**: Record observations for knowledge processing.

**Request Body**:
\`\`\`json
{
  "content": "Observation content",
  "level": "observation",
  "tags": ["tag1", "tag2"],
  "domain": "domain-name",
  "weight": 0.5,
  "auto_promote": false
}
\`\`\`

#### Question

**Endpoint**: \`POST /api/v1/question\`

**Purpose**: Record epistemic gaps and knowledge questions.

**Request Body**:
\`\`\`json
{
  "content": "How does Redis handle persistence?",
  "question_type": "epistemic_gap",
  "priority": 7,
  "domain": "databases"
}
\`\`\`

#### Bootstrap

**Endpoint**: \`POST /api/v1/bootstrap\`

**Purpose**: Initialize session with knowledge context.

**Request Body**:
\`\`\`json
{
  "mode": "full",
  "domain": "programming",
  "include_questions": true,
  "include_patterns": true,
  "limit": 20
}
\`\`\`

### Knowledge Evolution (Phase 4)

#### Evolve

**Endpoint**: \`POST /api/v1/evolve\`

**Purpose**: Run evolution operations (validate/promote/decay/accommodate).

**Request Body**:
\`\`\`json
{
  "operation": "validate",
  "entity_id": "memory-uuid",
  "success": true,
  "context": "Verified in production"
}
\`\`\`

#### Reflect

**Endpoint**: \`POST /api/v1/reflect\`

**Purpose**: Process observations into learnings (L0->L1).

**Request Body**:
\`\`\`json
{
  "mode": "batch",
  "batch_size": 10
}
\`\`\`

### Reasoning (Phase 5)

#### Predict

**Endpoint**: \`POST /api/v1/predict\`

**Purpose**: Generate predictions from patterns and schemas.

**Request Body**:
\`\`\`json
{
  "given": "user clicks checkout button",
  "action": "complete purchase",
  "use_ai": true,
  "limit": 5
}
\`\`\`

#### Explain

**Endpoint**: \`POST /api/v1/explain\`

**Purpose**: Trace causal paths between states.

**Request Body**:
\`\`\`json
{
  "from_state": "test passed locally",
  "to_state": "deployment failed",
  "max_depth": 4,
  "use_ai": true
}
\`\`\`

#### Counterfactual

**Endpoint**: \`POST /api/v1/counterfactual\`

**Purpose**: Explore "what if" alternative scenarios.

**Request Body**:
\`\`\`json
{
  "observed": "deployment failed",
  "if_condition": "we had run integration tests",
  "use_ai": true
}
\`\`\`

### Resolution (Phase 6)

#### Resolve

**Endpoint**: \`POST /api/v1/resolve\`

**Purpose**: Resolve contradictions and answer epistemic gaps.

**Request Body**:
\`\`\`json
{
  "question_id": "question-uuid",
  "resolution_type": "a_supersedes",
  "rationale": "Memory A is more recent and verified"
}
\`\`\`

**Resolution Types**: \`a_supersedes\`, \`b_supersedes\`, \`conditional\`, \`merged\`, \`context\`, \`invalidated\`, \`answered\`

### Validation (Phase 7)

#### Validate

**Endpoint**: \`POST /api/v1/validate\`

**Purpose**: Check knowledge graph integrity.

**Request Body**:
\`\`\`json
{
  "checks": ["orphaned_reference", "weight_inconsistency"],
  "auto_fix": false,
  "dry_run": true
}
\`\`\`

### Simplified Tools (Phase 8)

#### Relate

**Endpoint**: \`POST /api/v1/relate\`

**Purpose**: Create relationship between memories (simplified API).

**Request Body**:
\`\`\`json
{
  "source_memory_id": "uuid1",
  "target_memory_id": "uuid2",
  "relationship_type": "causes",
  "strength": 0.9
}
\`\`\`

---

## Domain & Category Endpoints

### Domains

**List Domains**: \`GET /api/v1/domains\`

**Create Domain**: \`POST /api/v1/domains\`
\`\`\`json
{"name": "ai-research", "description": "AI and ML topics"}
\`\`\`

**Domain Stats**: \`GET /api/v1/domains/{domain}/stats\`

### Categories

**List Categories**: \`GET /api/v1/categories\`

**Create Category**: \`POST /api/v1/categories\`
\`\`\`json
{"name": "best-practices", "description": "Coding standards"}
\`\`\`

**Category Stats**: \`GET /api/v1/categories/stats\`

**Categorize Memory**: \`POST /api/v1/memories/{id}/categorize\`

---

## Session & System Endpoints

**List Sessions**: \`GET /api/v1/sessions\`

**System Stats**: \`GET /api/v1/stats\`

**Evolution Stats**: \`GET /api/v1/evolution/stats\`

---

## Enhanced Search Endpoints

**Search by Tags**: \`POST /api/v1/search/tags\`
\`\`\`json
{"tags": ["python", "ml"], "match_all": true}
\`\`\`

**Search by Date Range**: \`POST /api/v1/search/date-range\`
\`\`\`json
{"start_date": "2025-01-01", "end_date": "2025-12-31"}
\`\`\`

**Intelligent Search**: \`POST /api/v1/memories/search/intelligent\`
\`\`\`json
{"query": "machine learning", "max_tokens": 500}
\`\`\`

---

## Error Handling

HTTP status codes:
- **200 OK**: Successful operation
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request parameters
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

Always check the \`success\` field in responses and handle errors appropriately.`,
  codeExamples: [
    {
      id: 'basic-crud',
      title: 'Core Memory Operations',
      code: `# Store a memory
curl -X POST http://localhost:3002/api/v1/memories \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Kubernetes orchestrates containerized applications",
    "importance": 8,
    "tags": ["kubernetes", "containers"],
    "domain": "infrastructure"
  }'

# Search with semantic AI
curl -X POST http://localhost:3002/api/v1/memories/search \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "container orchestration",
    "use_ai": true,
    "response_format": "concise",
    "limit": 5
  }'

# Update memory
curl -X PUT http://localhost:3002/api/v1/memories/{memory-id} \\
  -H "Content-Type: application/json" \\
  -d '{"content": "Updated content", "importance": 9}'`,
      language: 'bash',
      description: 'Essential REST API operations for memory management'
    },
    {
      id: 'knowledge-intake',
      title: 'Knowledge Intake',
      code: `# Store as L0 observation
curl -X POST http://localhost:3002/api/v1/memories \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "API returns 500 errors under high load",
    "level": "observation",
    "tags": ["api", "performance"]
  }'

# Store as L1 learning with weight
curl -X POST http://localhost:3002/api/v1/memories \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Circuit breakers prevent cascading failures",
    "level": "learning",
    "weight": 3.5,
    "domain": "architecture"
  }'`,
      language: 'bash',
      description: 'Storing observations and learnings with level control'
    },
    {
      id: 'ai-analysis',
      title: 'AI Analysis',
      code: `# Ask questions about your memories
curl -X POST http://localhost:3002/api/v1/analyze \\
  -H "Content-Type: application/json" \\
  -d '{
    "analysis_type": "question",
    "question": "What are the advantages of microservices?",
    "response_format": "detailed",
    "limit": 10
  }'

# Generate summaries
curl -X POST http://localhost:3002/api/v1/summarize \\
  -H "Content-Type: application/json" \\
  -d '{
    "timeframe": "week",
    "query": "kubernetes docker",
    "response_format": "concise"
  }'

# Track learning progression
curl -X POST http://localhost:3002/api/v1/temporal/patterns \\
  -H "Content-Type: application/json" \\
  -d '{
    "analysis_type": "learning_progression",
    "concept": "kubernetes",
    "timeframe": "quarter"
  }'`,
      language: 'bash',
      description: 'AI-powered analysis and insights'
    },
    {
      id: 'graph-ops',
      title: 'Graph & Status',
      code: `# Discover relationships
curl -X POST http://localhost:3002/api/v1/relationships/discover \\
  -H "Content-Type: application/json" \\
  -d '{
    "limit": 15,
    "min_strength": 0.7,
    "relationship_types": ["expands", "references"]
  }'

# Create relationship
curl -X POST http://localhost:3002/api/v1/relationships \\
  -H "Content-Type: application/json" \\
  -d '{
    "source_memory_id": "uuid-1",
    "target_memory_id": "uuid-2",
    "relationship_type": "expands",
    "strength": 0.9
  }'

# Map knowledge graph
curl "http://localhost:3002/api/v1/memories/{central-id}/graph?depth=3"

# System status
curl "http://localhost:3002/api/v1/status"`,
      language: 'bash',
      description: 'Building and exploring knowledge relationships'
    }
  ],
  prevSection: 'mcp-tools',
  nextSection: 'troubleshooting'
};
