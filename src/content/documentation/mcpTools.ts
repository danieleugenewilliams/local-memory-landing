import { DocumentationSection } from '@/types/documentation';

export const mcpToolsContent: DocumentationSection = {
  id: 'mcp-tools',
  title: 'MCP Tools Reference',
  description: 'Complete Model Context Protocol tools for AI agent integration',
  content: `# MCP Tools Reference

Local Memory provides 11 comprehensive MCP (Model Context Protocol) tools for complete memory management functionality. These tools are designed for both human users and AI agents, with intelligent token optimization, pagination support, and flexible response formats.

## Overview

All MCP tools are fully implemented and functional, providing:
- Core CRUD operations (store, update, delete, retrieve)
- Advanced search and analysis capabilities
- Relationship management
- Administrative tools (domains, categories, sessions, stats)
- Clean architecture with zero regressions

## Tool Categories

### Memory Management
- \`store_memory\` - Create new memories
- \`update_memory\` - Modify existing memories
- \`delete_memory\` - Remove memories
- \`get_memory_by_id\` - Retrieve specific memories

### Search & Analysis
- \`search\` - Advanced multi-mode search
- \`analysis\` - AI-powered analysis and Q&A

### Organization
- \`relationships\` - Memory relationship management
- \`categories\` - Category management
- \`domains\` - Knowledge domain management

### Administration
- \`stats\` - Statistics and analytics
- \`sessions\` - Session management

---

## Memory Management Tools

### 1. store_memory

**Purpose**: Store a new memory with contextual information
**AI Required**: No
**Category**: Memory Management

Creates new memories with content, tags, and metadata. Supports automatic categorization, importance scoring, and contextual tagging for knowledge organization.

**Parameters**:
- \`content\` (string, required): The memory content to store
- \`importance\` (integer, optional): Importance level (1-10, default: 5)
- \`tags\` (array of strings, optional): Tags for categorization
- \`source\` (string, optional): Source of the memory
- \`domain\` (string, optional): Knowledge domain for organization

**Response Format**:
\`\`\`json
{
  "success": true,
  "message": "Memory stored successfully",
  "data": {
    "id": "uuid",
    "content": "memory content",
    "importance": 8,
    "tags": ["tag1", "tag2"],
    "domain": "knowledge-domain",
    "source": null,
    "session_id": "session-id",
    "created_at": "2025-11-11T10:00:00Z",
    "updated_at": "2025-11-11T10:00:00Z"
  }
}
\`\`\`

**Usage Examples**:
\`\`\`javascript
store_memory(content="Learned about transformer architecture", importance=9, tags=["ai", "deep-learning"])
store_memory(content="Go channels enable concurrent communication", importance=8, tags=["golang", "concurrency"], domain="programming")
\`\`\`

**Best Practices**: Use descriptive content, appropriate importance levels (1-3: minor, 4-6: moderate, 7-10: critical), relevant tags, and domains for organization.

### 2. update_memory

**Purpose**: Update an existing memory's content or metadata
**AI Required**: No
**Category**: Memory Management

Modifies existing memories by updating their content, importance level, or tags. Requires the memory ID to identify which memory to update.

**Parameters**:
- \`id\` (string, required): Memory ID to update
- \`content\` (string, optional): Updated content
- \`importance\` (integer, optional): Updated importance (1-10)
- \`tags\` (array of strings, optional): Updated tags

**Usage Examples**:
\`\`\`javascript
update_memory(id="550e8400-e29b-41d4-a716-446655440000", content="Updated transformer knowledge")
update_memory(id="550e8400-e29b-41d4-a716-446655440000", importance=10)
\`\`\`

### 3. delete_memory

**Purpose**: Delete a memory by ID
**AI Required**: No
**Category**: Memory Management

Permanently removes a memory from storage using its unique identifier.

**Parameters**:
- \`id\` (string, required): Memory ID to delete

**Usage Example**:
\`\`\`javascript
delete_memory(id="550e8400-e29b-41d4-a716-446655440000")
\`\`\`

### 4. get_memory_by_id

**Purpose**: Get a specific memory by its ID
**AI Required**: No
**Category**: Memory Management

Retrieves a specific memory using its unique identifier, returning complete memory data including content, metadata, and timestamps.

**Parameters**:
- \`id\` (string, required): Memory ID to retrieve

**Usage Example**:
\`\`\`javascript
get_memory_by_id(id="550e8400-e29b-41d4-a716-446655440000")
\`\`\`

---

## Search & Analysis Tools

### 5. search

**Purpose**: Advanced search across all memories with multiple search types and intelligent optimization
**AI Required**: Optional (for semantic search)
**Category**: Search & Retrieval

Provides comprehensive search capabilities across all stored memories. Supports semantic search using AI embeddings, tag-based filtering, date range queries, and hybrid search combining multiple criteria.

**Parameters**:
- \`search_type\` (string, optional): Search method - "semantic", "tags", "date_range", "hybrid" (default: "semantic")
- \`query\` (string, required for semantic/hybrid): Search query text
- \`tags\` (array of strings, required for tags/hybrid): Tags to search for
- \`start_date\`/\`end_date\` (string, optional): Date range in YYYY-MM-DD format
- \`format\` (string, optional): Response format - "intelligent", "detailed", "summary", "ids_only" (default: "intelligent")
- \`max_tokens\` (integer, optional): Token budget for intelligent format (default: 1000)
- \`limit\` (integer, optional): Results per page (default: 10)
- \`cursor\` (string, optional): Pagination cursor for continuing search
- \`domain\` (string, optional): Filter by knowledge domain
- \`session_filter_mode\` (string, optional): Session scope - "all", "session_only", "session_and_shared"

**Usage Examples**:
\`\`\`javascript
search(query="machine learning algorithms", format="intelligent", max_tokens=500)
search(search_type="tags", tags=["python", "ai"], limit=20)
search(search_type="hybrid", query="neural networks", tags=["deep-learning"], domain="ai")
\`\`\`

**Best Practices**: Use semantic search for natural language, combine search types for precision, leverage intelligent format for token efficiency, use cursors for large datasets.

### 6. analysis

**Purpose**: Intelligent analysis of memories through question answering, summarization, and pattern recognition
**AI Required**: Yes
**Category**: AI Analysis

Provides AI-powered analysis capabilities including question answering, content summarization, pattern analysis, and temporal learning progression tracking.

**Parameters**:
- \`analysis_type\` (string, optional): Analysis method - "question", "summarize", "analyze", "temporal_patterns" (default: "question")
- \`question\` (string, required for question type): Natural language question
- \`query\` (string, optional): Filter memories before analysis
- \`timeframe\` (string, optional): Time period - "today", "week", "month", "all" (default: "all")
- \`concept\` (string, optional): Specific concept for temporal analysis
- \`temporal_timeframe\` (string, optional): Timeframe for temporal analysis - "week", "month", "quarter", "year" (default: "month")
- \`limit\` (integer, optional): Maximum memories to analyze (default: 10)
- \`context_limit\` (integer, optional): Context memories for Q&A (default: 10)
- \`response_format\` (string, optional): Response format - "detailed", "concise", "ids_only", "summary", "custom" (default: "concise")

**Usage Examples**:
\`\`\`javascript
// Question answering
analysis(analysis_type="question", question="What are the main challenges in machine learning deployment?")

// Summarization with timeframe
analysis(analysis_type="summarize", timeframe="week", response_format="concise")

// Pattern analysis
analysis(analysis_type="analyze", query="performance optimization")

// Temporal learning progression
analysis(analysis_type="temporal_patterns", concept="deep learning", temporal_timeframe="quarter")
\`\`\`

**Best Practices**: Ask specific questions, use appropriate timeframes, choose optimal response formats, provide context through filtering, validate with source memories.

---

## Organization Tools

### 7. relationships

**Purpose**: Discover, create, and analyze relationships between memories
**AI Required**: Yes (for discovery)
**Category**: Relationship Management

Manages memory relationships including finding related content, AI-powered relationship discovery, creating explicit connections, and mapping relationship graphs.

**Parameters**:
- \`relationship_type\` (string, optional): Operation - "find_related", "discover", "create", "map_graph" (default: "find_related")
- \`memory_id\` (string, required for find_related/map_graph): Central memory UUID
- \`source_memory_id\`/\`target_memory_id\` (string, required for create): Memory IDs for new relationship
- \`relationship_type_enum\` (string, optional): Relationship type - "references", "contradicts", "expands", "similar", "sequential", "causes", "enables"
- \`strength\` (number, optional): Relationship strength 0.0-1.0 (default: 0.5)
- \`limit\` (integer, optional): Maximum relationships to return (default: 10)
- \`min_strength\` (number, optional): Minimum strength threshold (default: 0.0)
- \`depth\` (integer, optional): Graph mapping depth (default: 2)

**Usage Examples**:
\`\`\`javascript
relationships(relationship_type="create", source_memory_id="id1", target_memory_id="id2", relationship_type_enum="expands", strength=0.9)
relationships(relationship_type="find_related", memory_id="uuid", limit=5)
\`\`\`

**Best Practices**: Use create for explicit relationships, discover for patterns, find_related for connections, map_graph for visualization, strength values for prioritization.

### 8. categories

**Purpose**: Manage memory categories and AI-powered categorization
**AI Required**: Optional (for auto-categorization)
**Category**: Organization & Categorization

Handles category management including listing existing categories, creating new ones, and using AI to automatically categorize memories.

**Parameters**:
- \`categories_type\` (string, optional): Operation - "list", "create", "categorize" (default: "list")
- \`name\` (string, required for create): Category name
- \`description\` (string, optional for create): Category description
- \`parent_id\` (string, optional): Parent category UUID for hierarchy
- \`memory_id\` (string, required for categorize): Memory to categorize
- \`auto_create\` (boolean, optional): Auto-create suggested categories (default: true)
- \`confidence_threshold\` (number, optional): Minimum confidence for categorization (default: 0.7)

**Usage Examples**:
\`\`\`javascript
categories(categories_type="list")
categories(categories_type="create", name="Machine Learning", description="AI and machine learning concepts")
\`\`\`

**Best Practices**: Create hierarchical structures with parent_id, set appropriate confidence thresholds, use descriptive names, regularly refine taxonomy.

### 9. domains

**Purpose**: Manage knowledge domains for memory organization
**AI Required**: No
**Category**: Knowledge Organization

Manages knowledge domains, which are high-level organizational units for grouping related memories. Domains help structure knowledge areas and provide context for memory storage and retrieval.

**Parameters**:
- \`domains_type\` (string, optional): Operation - "list", "create", "stats" (default: "list")
- \`name\` (string, required for create): Domain name
- \`description\` (string, optional for create): Domain description
- \`domain\` (string, required for stats): Domain name for statistics

**Usage Examples**:
\`\`\`javascript
domains(domains_type="list")
domains(domains_type="create", name="artificial-intelligence", description="AI research and applications")
\`\`\`

**Best Practices**: Use descriptive domain names for knowledge areas, create domains for major subjects/projects, apply consistently, monitor usage patterns.

---

## Administration Tools

### 10. stats

**Purpose**: Comprehensive statistics across sessions, domains, and categories
**AI Required**: No
**Category**: Statistics & Analytics

Provides comprehensive statistics and analytics for different aspects of the memory system. Offers insights into memory usage patterns, domain distributions, category effectiveness, and session activity.

**Parameters**:
- \`stats_type\` (string, optional): Statistics type - "session", "domain", "category" (default: "session")
- \`domain\` (string, required for domain stats): Specific domain name
- \`category_id\` (string, required for category stats): Category UUID
- \`response_format\` (string, optional): Format - "detailed", "concise", "ids_only"

**Usage Examples**:
\`\`\`javascript
stats(stats_type="session")
stats(stats_type="domain", domain="machine-learning")
\`\`\`

**Best Practices**: Use session stats for context, monitor domain growth, track category usage.

### 11. sessions

**Purpose**: Manage and analyze memory sessions
**AI Required**: No
**Category**: Session Management

Provides session management capabilities including listing all available sessions and retrieving detailed statistics for the current or specific sessions. Sessions help track memory creation patterns and provide context isolation.

**Parameters**:
- \`sessions_type\` (string, optional): Operation - "list", "stats" (default: "list")
- \`response_format\` (string, optional): Format - "detailed", "concise", "ids_only"

**Usage Examples**:
\`\`\`javascript
sessions(sessions_type="list")
sessions(sessions_type="stats")
\`\`\`

**Best Practices**: Organize related work with sessions, monitor activity for insights, clean up periodically, use filtering for focused analysis.

---

## Integration Patterns

### Best Practices Summary

1. **Memory Storage**: Use appropriate importance levels and descriptive tags
2. **Search**: Combine search types for precise results
3. **Analysis**: Ask specific questions and use appropriate response formats
4. **Organization**: Create logical hierarchies with domains and categories
5. **Performance**: Use cursor pagination for large datasets
6. **Token Management**: Choose response formats based on use case requirements`,
  codeExamples: [
    {
      id: 'basic-memory-ops',
      title: 'Basic Memory Operations',
      code: `// Store a new memory with metadata
store_memory(
  content="Docker provides containerization for applications",
  importance=8,
  tags=["docker", "containers", "devops"],
  domain="infrastructure"
)

// Search with semantic similarity
search(
  query="containerization technologies",
  search_type="semantic",
  limit=5,
  format="concise"
)

// Update memory content
update_memory(
  id="550e8400-e29b-41d4-a716-446655440000",
  content="Docker provides lightweight containerization for applications",
  importance=9
)`,
      language: 'javascript',
      description: 'Essential MCP tool operations for memory management'
    },
    {
      id: 'advanced-analysis',
      title: 'Advanced Analysis Workflows',
      code: `// Question answering with context
analysis(
  analysis_type="question",
  question="What are the best practices for Docker in production?",
  query="docker production",
  context_limit=10,
  response_format="detailed"
)

// Temporal pattern analysis
analysis(
  analysis_type="temporal_patterns",
  concept="kubernetes",
  temporal_timeframe="quarter",
  temporal_analysis_type="learning_progression"
)

// Summarize recent learning
analysis(
  analysis_type="summarize",
  timeframe="week",
  limit=20,
  response_format="concise"
)`,
      language: 'javascript',
      description: 'AI-powered analysis and learning insights'
    },
    {
      id: 'relationship-management',
      title: 'Relationship Discovery and Management',
      code: `// Discover relationships automatically
relationships(
  relationship_type="discover",
  limit=15,
  min_strength=0.7,
  relationship_types=["expands", "references", "similar"]
)

// Create explicit relationships
relationships(
  relationship_type="create",
  source_memory_id="uuid-1",
  target_memory_id="uuid-2",
  relationship_type_enum="expands",
  strength=0.9,
  context="Docker builds upon containerization concepts"
)

// Map knowledge graph
relationships(
  relationship_type="map_graph",
  memory_id="central-uuid",
  depth=3,
  include_strength=true
)`,
      language: 'javascript',
      description: 'Building and exploring knowledge relationships'
    }
  ],
  prevSection: 'cli-reference',
  nextSection: 'rest-api'
};