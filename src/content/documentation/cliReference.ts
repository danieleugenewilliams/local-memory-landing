import { DocumentationSection } from '@/types/documentation';

export const cliReferenceContent: DocumentationSection = {
  id: 'cli-reference',
  title: 'CLI Reference Guide',
  description: 'Complete command-line interface reference for Local Memory v1.2.1',
  content: `# CLI Reference Guide

Local Memory v1.2.1 provides a comprehensive command-line interface for intelligent knowledge management. Commands are organized into categories matching the knowledge lifecycle.

## Overview

### Command Categories

**Core Memory (6 commands)**
- \`remember\` - Store a memory with AI categorization
- \`search\` - Search memories with semantic matching
- \`get\` - Retrieve a specific memory by ID
- \`update\` - Update memory content or metadata
- \`forget\` - Delete a memory
- \`list\` - List all memories with pagination

**Knowledge Intake (3 commands)**
- \`observe\` - Record observations (L0) for later processing
- \`question\` - Track epistemic gaps and contradictions
- \`bootstrap\` - Initialize session with knowledge context

**Knowledge Evolution (3 commands)**
- \`reflect\` - Process observations into learnings (L0->L1)
- \`evolve\` - Validate, promote, or decay knowledge
- \`resolve\` - Handle contradictions and answer questions

**Reasoning (4 commands)**
- \`predict\` - Generate predictions from patterns and schemas
- \`explain\` - Trace causal paths between states
- \`counterfactual\` - Explore "what if" alternative scenarios
- \`analyze\` - AI-powered analysis and question answering

**Graph & Status (7 commands)**
- \`relate\` - Create relationships between memories
- \`find_related\` - Find related memories
- \`discover\` - AI-powered relationship discovery
- \`categorize\` - AI-powered memory categorization
- \`map_graph\` - Generate relationship graph
- \`validate_graph\` - Check knowledge graph integrity
- \`status\` - Show system status and statistics

**Domain & Category Management (6 commands)**
- \`list_domains\` - List all knowledge domains
- \`create_domain\` - Create a new domain
- \`domain_stats\` - Domain usage statistics
- \`list_categories\` - List all categories
- \`create_category\` - Create a new category
- \`category_stats\` - Category usage statistics

**Session Management (2 commands)**
- \`list_sessions\` - List all memory sessions
- \`session_stats\` - Session usage statistics

**System (10 commands)**
- \`start\`, \`stop\` - Daemon management
- \`install\`, \`setup\` - Installation and configuration
- \`doctor\`, \`validate\` - Diagnostics
- \`ps\`, \`kill\`, \`kill_all\` - Process management
- \`license\` - License management

### Global Flags

These flags are available for all commands:

\`\`\`bash
--config string      # Config file path (default: auto-detected)
--log_level string   # Log level: debug, info, warn, error (default: info)
--mcp                # Run as MCP server (JSON-RPC over stdin/stdout)
--quiet              # Suppress output
--help, -h           # Help for any command
--version, -v        # Show version
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

Key workflow: \`bootstrap\` -> \`observe\` -> \`reflect\` -> \`evolve\`

---

## Core Memory Commands

### remember (legacy, use \`observe\` instead)

**Purpose**: Store information with automatic AI categorization.

\`\`\`bash
local-memory remember [content] [flags]
\`\`\`

**Parameters**:
- \`content\` (string, required): The memory content to store
- \`--importance int\`: Importance level 1-10 (default: 5)
- \`--tags strings\`: Tags for categorization
- \`--domain string\`: Knowledge domain
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory remember "Go channels are like pipes between goroutines"
local-memory remember "Redis is excellent for caching" --importance 8 --tags caching,databases
local-memory remember "Neural networks for NLP" --domain ai-research
\`\`\`

> **Note**: For workflows with explicit level control, use the \`observe\` command instead.

### search

**Purpose**: Search using keywords or AI-powered semantic similarity.

\`\`\`bash
local-memory search [query] [flags]
\`\`\`

**Parameters**:
- \`query\` (string, required): Search query
- \`--limit int\`: Maximum results (default: 10)
- \`--use_ai\`: Use AI-powered semantic search
- \`--tags strings\`: Filter by tags
- \`--domain string\`: Filter by knowledge domain
- \`--fields strings\`: Select specific fields
- \`--response_format string\`: Format: detailed, concise, ids_only, summary, intelligent, ultra, micro
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory search "concurrency patterns"
local-memory search "databases" --limit 5 --use_ai
local-memory search "python" --domain programming --tags web,scripting
local-memory search "neural networks" --fields id,content,importance
\`\`\`

### get

**Purpose**: Retrieve a specific memory by its unique identifier.

\`\`\`bash
local-memory get <memory-id> [flags]
\`\`\`

**Parameters**:
- \`memory-id\` (string, required): Memory UUID
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory get 550e8400-e29b-41d4-a716-446655440000
local-memory get <memory-id> --json
\`\`\`

### update

**Purpose**: Update content, importance, tags, or domain of existing memory.

\`\`\`bash
local-memory update <memory-id> [flags]
\`\`\`

**Parameters**:
- \`memory-id\` (string, required): Memory UUID
- \`--content string\`: New content for the memory
- \`--importance int\`: New importance level 1-10 (0 = no change)
- \`--tags strings\`: New tags (replaces existing)
- \`--domain string\`: New knowledge domain
- \`--confirm\`: Skip confirmation prompt
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory update 550e8400-e29b-41d4-a716-446655440000 --content "Updated content"
local-memory update <id> --importance 9 --tags updated,important
\`\`\`

### forget (legacy, use \`evolve decay\` instead)

**Purpose**: Remove a memory from persistent storage.

\`\`\`bash
local-memory forget <memory-id> [flags]
\`\`\`

**Parameters**:
- \`memory-id\` (string, required): Memory UUID
- \`--confirm\`: Skip confirmation prompt
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory forget 550e8400-e29b-41d4-a716-446655440000
local-memory forget --confirm <memory-id>
\`\`\`

### list

**Purpose**: Retrieve a paginated list of all stored memories.

\`\`\`bash
local-memory list [flags]
\`\`\`

**Parameters**:
- \`--limit int\`: Maximum memories to return (default: 20)
- \`--offset int\`: Number to skip for pagination (default: 0)
- \`--response_format string\`: Format: detailed, concise, summary
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory list
local-memory list --limit 10 --offset 20
local-memory list --response_format concise --json
\`\`\`

---

## Knowledge Intake Commands

### observe

**Purpose**: Record observations with explicit knowledge level control. Replaces \`remember\`.

Creates L0 observations by default, or higher-level memories with \`--level\` flag. Observations are raw intake meant for later processing via \`reflect\`.

\`\`\`bash
local-memory observe [content] [flags]
\`\`\`

**Parameters**:
- \`content\` (string, required): The observation content
- \`--level string\`: Memory level (observation, learning, pattern, schema) (default: observation)
- \`--weight float\`: Initial weight 0.0-10.0
- \`--tags strings\`: Tags for categorization
- \`--domain string\`: Knowledge domain
- \`--source string\`: Source of observation
- \`--context string\`: Additional context
- \`--auto_promote\`: Auto-promote when criteria met
- \`--session_id string\`: Session identifier
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
# Record a raw observation
local-memory observe "API returns 500 errors under load" --level observation

# Store a learning directly
local-memory observe "Circuit breaker prevents cascading failures" --level learning --weight 3.5

# Store a pattern with auto-promotion
local-memory observe "Database pools optimize resource usage" --level pattern --auto_promote
\`\`\`

### question

**Purpose**: Track epistemic gaps, contradictions, and knowledge questions.

\`\`\`bash
local-memory question [content] [flags]
\`\`\`

**Parameters**:
- \`content\` (string, required): The question or knowledge gap
- \`--question_type string\`: Type (epistemic_gap, contradiction, prediction_failure) (default: epistemic_gap)
- \`--priority int\`: Priority 1-10 (default: 5)
- \`--domain string\`: Knowledge domain
- \`--origin_context string\`: Context that prompted question
- \`--session_id string\`: Session identifier
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory question "How does Redis handle persistence exactly?"
local-memory question "Contradiction: memory A vs B" --question_type contradiction --priority 8
\`\`\`

### bootstrap

**Purpose**: Initialize session with knowledge context and pending questions.

\`\`\`bash
local-memory bootstrap [flags]
\`\`\`

**Parameters**:
- \`--mode string\`: Bootstrap mode (full, minimal, domain) (default: full)
- \`--domain string\`: Focus domain (required for domain mode)
- \`--include_questions\`: Include pending questions (default: true)
- \`--include_learnings\`: Include recent learnings (default: true)
- \`--include_patterns\`: Include patterns (default: true)
- \`--limit int\`: Max items per category (default: 20)
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory bootstrap
local-memory bootstrap --mode domain --domain programming
local-memory bootstrap --mode minimal
\`\`\`

---

## Knowledge Evolution Commands

### reflect

**Purpose**: Process observations into learnings (L0->L1 transformation).

\`\`\`bash
local-memory reflect [flags]
\`\`\`

**Parameters**:
- \`--mode string\`: Mode (single, batch, auto) (default: single)
- \`--observation_id string\`: UUID for single mode
- \`--batch_size int\`: Batch size (default: 10)
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory reflect --mode single --observation_id <uuid>
local-memory reflect --mode batch --batch_size 10
\`\`\`

### evolve

**Purpose**: Run evolution operations (validate, promote, decay, accommodate).

\`\`\`bash
local-memory evolve [operation] [flags]
\`\`\`

**Parameters**:
- \`operation\` (string, required): validate, promote, decay, accommodate
- \`--entity_id string\`: Memory UUID (required for validate/promote)
- \`--success\`: Validation result (required for validate)
- \`--threshold_days int\`: Days for decay (default: 30)
- \`--dry_run\`: Preview without applying
- \`--context string\`: Rationale for operation
- \`--json\`: Output in JSON format

**Operations**:
- \`validate\` - Record validation result, adjusts weight
- \`promote\` - Manually promote to higher level
- \`decay\` - Reduce weight of stale knowledge
- \`accommodate\` - Integrate conflicting evidence

**Example**:
\`\`\`bash
local-memory evolve validate --entity_id <uuid> --success true
local-memory evolve promote --entity_id <uuid>
local-memory evolve decay --threshold_days 30 --dry_run
\`\`\`

### resolve

**Purpose**: Handle contradictions and answer epistemic gaps.

\`\`\`bash
local-memory resolve <question_id> <resolution_type> <rationale> [flags]
\`\`\`

**Aliases**: \`answer\`

**Parameters**:
- \`question_id\` (positional, required): Question/contradiction UUID
- \`resolution_type\` (positional, required): Resolution type (a_supersedes, b_supersedes, conditional, merged, context, invalidated, answered)
- \`rationale\` (positional, required): Explanation for the resolution
- \`--create_synthesis\`: Create synthesis memory from merged understanding
- \`--synthesis_content string\`: Synthesized understanding content (for 'merged' resolution)
- \`--update_relationship\`: Update contradiction relationship (default: true)
- \`--update_weights\`: Update memory weights based on resolution (default: true)
- \`--session_id string\`: Session identifier
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory resolve <uuid> a_supersedes "Memory A is more recent and accurate"
local-memory resolve <uuid> merged "Both contain partial truths" --create_synthesis --synthesis_content "Combined understanding..."
local-memory answer <uuid> answered "Found the answer in documentation"
\`\`\`

---

## Reasoning Commands

### predict

**Purpose**: Generate predictions from stored patterns and schemas.

\`\`\`bash
local-memory predict <given> [flags]
\`\`\`

**Parameters**:
- \`given\` (positional, required): Context for prediction
- \`--action string\`: Action being taken
- \`--domain string\`: Focus domain
- \`--limit int\`: Maximum predictions to return (default: 5)
- \`--schema_ids strings\`: Specific schema UUIDs to use
- \`--session_id string\`: Session identifier
- \`--use_ai\`: Enable AI-enhanced predictions
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory predict "API receives high traffic" --domain infrastructure
local-memory predict "user clicks checkout" --action "complete purchase" --use_ai
\`\`\`

### explain

**Purpose**: Trace causal paths between states.

\`\`\`bash
local-memory explain <from_state> <to_state> [flags]
\`\`\`

**Parameters**:
- \`from_state\` (positional, required): Starting state
- \`to_state\` (positional, required): Ending state
- \`--max_depth int\`: Maximum relationship hops to traverse (default: 4)
- \`--domain string\`: Focus domain for causal path discovery
- \`--session_id string\`: Session identifier
- \`--use_ai\`: Enable AI-enhanced explanation generation
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory explain "test passed locally" "deployment failed"
local-memory explain "user logged in" "purchase complete" --use_ai
local-memory explain "error occurred" "service recovered" --max_depth 6
\`\`\`

### counterfactual

**Purpose**: Explore "what if" alternative scenarios.

\`\`\`bash
local-memory counterfactual <observed> <if_condition> [flags]
\`\`\`

**Aliases**: \`whatif\`

**Parameters**:
- \`observed\` (positional, required): What actually happened
- \`if_condition\` (positional, required): Alternative condition to explore
- \`--schema_ids strings\`: Specific schema UUIDs to consult for reasoning
- \`--domain string\`: Focus domain for counterfactual reasoning
- \`--session_id string\`: Session identifier
- \`--use_ai\`: Enable AI-enhanced counterfactual reasoning
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory counterfactual "deployment failed" "we had run integration tests"
local-memory counterfactual "user churned" "price was 20% lower" --use_ai
local-memory whatif "feature was delayed" "we had more resources"
\`\`\`

### analyze

**Purpose**: Perform AI-powered analysis on memories including question answering, summarization, and temporal pattern detection.

\`\`\`bash
local-memory analyze [query] [flags]
\`\`\`

**Parameters**:
- \`query\` (optional): Question or analysis query
- \`--type string\`: Analysis type: question, summarize, analyze, temporal_patterns (default: question)
- \`--timeframe string\`: Time period: today, week, month, all (default: all)
- \`--limit int\`: Maximum memories to include (default: 10)
- \`--context_limit int\`: Maximum memories for QA context (default: 10)
- \`--session_id string\`: Session ID for filtering
- \`--session_filter_mode string\`: Filtering: all, session_only, session_and_shared (default: all)
- \`--response_format string\`: Format: detailed, concise, summary, ultra, micro (default: concise)
- \`--concept string\`: Specific concept for temporal analysis
- \`--temporal_timeframe string\`: Temporal analysis period: week, month, quarter, year (default: month)
- \`--temporal_analysis_type string\`: Type: learning_progression, knowledge_gaps, concept_evolution (default: learning_progression)
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory analyze "What are the key patterns in my database knowledge?"
local-memory analyze --type summarize --timeframe week
local-memory analyze --type temporal_patterns --concept "golang" --temporal_timeframe quarter
\`\`\`

---

## Graph & Status Commands

### relate

**Purpose**: Create a relationship between two memories.

\`\`\`bash
local-memory relate <source-id> <target-id> [flags]
\`\`\`

**Parameters**:
- \`source-id\` (string, required): Source memory UUID
- \`target-id\` (string, required): Target memory UUID
- \`--strength float32\`: Relationship strength 0.0-1.0 (default: 0.8)
- \`--type string\`: Type: references, contradicts, expands, similar, sequential, causes, enables (default: references)
- \`--confirm\`: Skip confirmation prompt
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory relate <source-id> <target-id>
local-memory relate <source-id> <target-id> --strength 0.9 --type expands
\`\`\`

### find_related

**Purpose**: Find memories related to a specific memory.

\`\`\`bash
local-memory find_related <memory-id> [flags]
\`\`\`

**Parameters**:
- \`memory-id\` (string, required): Memory UUID
- \`--limit int\`: Maximum results (default: 10)
- \`--min_strength float64\`: Minimum relationship strength (default: 0.0)
- \`--relationship_types strings\`: Filter by types
- \`--response_format string\`: Format: detailed, concise, ids_only
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory find_related <memory-id> --limit 10 --min_strength 0.5
\`\`\`

### discover

**Purpose**: AI-powered discovery of potential relationships.

\`\`\`bash
local-memory discover [flags]
\`\`\`

**Parameters**:
- \`--limit int\`: Maximum relationships to discover (default: 20)
- \`--min_strength float64\`: Minimum strength (default: 0.5)
- \`--memory_id string\`: Discover for specific memory
- \`--relationship_types strings\`: Filter by types
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory discover --limit 20 --min_strength 0.7
local-memory discover --memory_id <id> --relationship_types similar,expands
\`\`\`

### categorize

**Purpose**: Automatically categorize a memory using AI analysis.

\`\`\`bash
local-memory categorize <memory-id> [flags]
\`\`\`

**Parameters**:
- \`memory-id\` (string, required): Memory UUID to categorize
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory categorize 550e8400-e29b-41d4-a716-446655440000
local-memory categorize <memory-id> --json
\`\`\`

### map_graph

**Purpose**: Generate a relationship graph visualization.

\`\`\`bash
local-memory map_graph <memory-id> [flags]
\`\`\`

**Parameters**:
- \`memory-id\` (string, required): Central memory UUID
- \`--depth int\`: Relationship hops 1-5 (default: 2)
- \`--include_strength\`: Include strength values (default: true)
- \`--relationship_types strings\`: Filter by types
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory map_graph <memory-id> --depth 3 --include_strength
\`\`\`

### validate_graph

**Purpose**: Check knowledge graph integrity.

\`\`\`bash
local-memory validate_graph [flags]
\`\`\`

**Parameters**:
- \`--checks strings\`: Specific checks (orphaned_reference, weight_inconsistency, etc.)
- \`--auto_fix\`: Apply fixes
- \`--dry_run\`: Preview fixes (default: true)
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory validate_graph
local-memory validate_graph --checks orphaned_reference,weight_inconsistency --dry_run
\`\`\`

### status

**Purpose**: Show comprehensive system status.

\`\`\`bash
local-memory status [--json]
\`\`\`

**Response includes**:
- Memory counts by level (L0-L3)
- Domain distribution
- Relationship statistics
- Questions (pending/resolved)
- Recent activity

---

## Domain & Category Management

### list_domains

**Purpose**: List all knowledge domains.

\`\`\`bash
local-memory list_domains [flags]
\`\`\`

**Aliases**: \`list-domains\`

**Parameters**:
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory list_domains
local-memory list_domains --json
\`\`\`

### create_domain

**Purpose**: Create a new knowledge domain.

\`\`\`bash
local-memory create_domain <name> [description] [flags]
\`\`\`

**Aliases**: \`create-domain\`

**Parameters**:
- \`name\` (positional, required): Domain name
- \`description\` (positional, optional): Domain description
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory create_domain "ai-research" "Artificial intelligence and machine learning topics"
local-memory create_domain "databases"
\`\`\`

### domain_stats

**Purpose**: Display usage statistics for a specific knowledge domain.

\`\`\`bash
local-memory domain_stats <domain> [flags]
\`\`\`

**Aliases**: \`domain-stats\`

**Parameters**:
- \`domain\` (positional, required): Domain name
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory domain_stats "ai-research"
local-memory domain_stats "programming" --json
\`\`\`

### list_categories

**Purpose**: List all memory categories.

\`\`\`bash
local-memory list_categories [flags]
\`\`\`

**Aliases**: \`list-categories\`

**Parameters**:
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory list_categories
local-memory list_categories --json
\`\`\`

### create_category

**Purpose**: Create a new memory category.

\`\`\`bash
local-memory create_category <name> [description] [flags]
\`\`\`

**Aliases**: \`create-category\`

**Parameters**:
- \`name\` (positional, required): Category name
- \`description\` (positional, optional): Category description
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory create_category "best-practices" "Coding best practices and patterns"
local-memory create_category "troubleshooting"
\`\`\`

### category_stats

**Purpose**: Display usage statistics for categories.

\`\`\`bash
local-memory category_stats [category-id] [flags]
\`\`\`

**Aliases**: \`category-stats\`

**Parameters**:
- \`category-id\` (positional, optional): Specific category ID
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory category_stats
local-memory category_stats <category-id> --json
\`\`\`

---

## Session Management

### list_sessions

**Purpose**: List all memory sessions.

\`\`\`bash
local-memory list_sessions [flags]
\`\`\`

**Aliases**: \`list-sessions\`

**Parameters**:
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory list_sessions
local-memory list_sessions --json
\`\`\`

### session_stats

**Purpose**: Display usage statistics for the current memory session.

\`\`\`bash
local-memory session_stats [flags]
\`\`\`

**Aliases**: \`session-stats\`

**Parameters**:
- \`--json\`: Output in JSON format

**Example**:
\`\`\`bash
local-memory session_stats
local-memory session_stats --json
\`\`\`

---

## System Administration

### Daemon Management

**start** - Start the Local Memory daemon:
\`\`\`bash
local-memory start
\`\`\`

**stop** - Stop the daemon:
\`\`\`bash
local-memory stop
\`\`\`

### Installation & Setup

**install** - Install MCP integration:
\`\`\`bash
local-memory install mcp                    # Auto-detect MCP clients
local-memory install mcp claude-desktop     # Specific client
local-memory install mcp claude-code
local-memory install --all                  # Complete setup + MCP
\`\`\`

**setup** - Run setup wizard:
\`\`\`bash
local-memory setup --interactive            # Interactive wizard
local-memory setup --silent                 # Silent setup with defaults
\`\`\`

### Diagnostics

**doctor** - Comprehensive system check:
\`\`\`bash
local-memory doctor
\`\`\`

**validate** - Validate installation:
\`\`\`bash
local-memory validate mcp       # Validate MCP installation
local-memory validate config    # Validate configuration
local-memory validate all       # Validate everything
\`\`\`

**ps** - List running processes:
\`\`\`bash
local-memory ps
\`\`\`

**kill** - Kill specific process:
\`\`\`bash
local-memory kill <pid> --confirm
\`\`\`

**kill_all** - Kill all processes:
\`\`\`bash
local-memory kill_all --confirm
local-memory kill_all --type mcp --confirm   # Kill only MCP processes
\`\`\`

### License Management

\`\`\`bash
local-memory license activate LM-XXXX-XXXX-XXXX-XXXX-XXXX
local-memory license status
local-memory license validate LM-XXXX-XXXX-XXXX-XXXX-XXXX
\`\`\`

### Shell Completion

\`\`\`bash
# Generate completion scripts
local-memory completion bash > ~/.local-completion.bash
local-memory completion zsh > ~/.local-completion.zsh
local-memory completion fish > ~/.config/fish/completions/local-memory.fish

# Add to shell profile
echo 'source ~/.local-completion.bash' >> ~/.bashrc
\`\`\`

---

## Response Formats & Output

### Response Format Options

All commands support \`--response_format\`:
- **detailed**: Full object with all fields
- **concise**: Essential fields (~70% reduction)
- **ids_only**: Memory IDs only (~95% reduction)
- **summary**: Truncated content (~50% reduction)
- **intelligent**: Auto-optimizes based on context
- **ultra**: Minimal essential information
- **micro**: Absolute minimal output

### Field Selection

Use \`--fields\` for precise output control:
\`\`\`bash
local-memory search "query" --fields id,content,importance,tags
\`\`\`

Available fields: \`id\`, \`content\`, \`importance\`, \`tags\`, \`domain\`, \`created_at\`, \`updated_at\`, \`slug\`, \`memory_level\`, \`weight\`, \`confidence\`

---

## Best Practices

1. **Use \`observe\` for intake**: Don't skip to learnings, let reflection synthesize
2. **Track unknowns with \`question\`**: Epistemic gaps are valuable metadata
3. **Validate frequently**: Use \`evolve validate\` to strengthen good knowledge
4. **Resolve contradictions**: Don't leave them pending indefinitely
5. **Run periodic maintenance**: \`validate_graph\` and \`evolve decay\` keep the graph healthy`,
  codeExamples: [
    {
      id: 'basic-commands',
      title: 'Essential Commands',
      code: `# Store a memory with tags and importance
local-memory remember "Docker containers isolate applications" --tags docker,devops --importance 8

# Search with AI-powered semantic matching
local-memory search "containerization" --use_ai --limit 5

# Create relationships between concepts
local-memory relate <source-id> <target-id> --type "expands" --strength 0.9`,
      language: 'bash',
      description: 'Most commonly used Local Memory commands'
    },
    {
      id: 'knowledge-workflow',
      title: 'Knowledge Workflow',
      code: `# Start session with context
local-memory bootstrap --mode full

# Record observations
local-memory observe "Redis SCAN is O(1) per call" --domain databases

# Process into learnings
local-memory reflect --mode batch --batch_size 10

# Validate good knowledge
local-memory evolve validate --entity_id <uuid> --success true`,
      language: 'bash',
      description: 'Complete knowledge management CLI workflow'
    },
    {
      id: 'reasoning-workflow',
      title: 'Reasoning & Analysis',
      code: `# Generate predictions
local-memory predict "API receives high traffic" --use_ai

# Trace causal paths
local-memory explain "test passed locally" "deployment failed"

# Explore alternatives
local-memory counterfactual "deployment failed" "we had run integration tests"`,
      language: 'bash',
      description: 'Using reasoning commands for predictions and analysis'
    }
  ],
  prevSection: 'configuration',
  nextSection: 'mcp-tools'
};
