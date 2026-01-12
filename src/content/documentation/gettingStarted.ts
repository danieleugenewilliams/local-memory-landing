import { DocumentationSection } from '@/types/documentation';

export const gettingStartedContent: DocumentationSection = {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Complete guide to installing and using Local Memory v1.2.1',
  content: `# Getting Started with Local Memory

Local Memory v1.2.1 is a knowledge management system that evolves raw observations into validated patterns and theoretical frameworks. This guide covers installation, basic usage, and key concepts.

## What is Local Memory?

Local Memory provides three complementary interfaces for intelligent knowledge management:

- **CLI (Command-line Interface)**: Direct human interaction and scripting
- **MCP (Model Context Protocol)**: Integration with AI agents and Claude
- **REST API**: Web service integration and automation

All three interfaces provide the same functionality with consistent behavior and responses.

Local Memory implements a four-level knowledge hierarchy:

| Level | Name | Description |
|-------|------|-------------|
| L0 | Observation | Raw intake, ephemeral notes |
| L1 | Learning | Candidate insights, validated observations |
| L2 | Pattern | Validated generalizations across learnings |
| L3 | Schema | Theoretical frameworks explaining patterns |

Knowledge progresses through levels via validation and promotion, creating a self-improving knowledge base.

## Installation

### Quick Setup

\`\`\`bash
# Download and install
npm install -g local-memory-mcp

# Run the setup wizard
local-memory setup

# Or use specific setup modes
local-memory setup --interactive  # Interactive wizard
local-memory setup --silent      # Silent setup with defaults

# Activate your license (required for commercial use)
local-memory license activate LM-XXXX-XXXX-XXXX-XXXX-XXXX

# Start the daemon
local-memory start

# Verify installation
local-memory doctor
\`\`\`

### Manual Installation

1. Download the binary for your platform from the [releases page](https://github.com/danieleugenewilliams/local-memory-releases)
2. Place the binary in your PATH
3. Run the setup wizard: \`local-memory setup\`
4. After purchasing from localmemory.co, activate your license
5. Install MCP integration: \`local-memory install\`

## Basic Workflow

### 1. Start the System

\`\`\`bash
# Start the daemon
local-memory start

# Check if it's running
local-memory status
\`\`\`

### 2. Bootstrap Your Session (Recommended)

Start each session by loading context from your knowledge base:

\`\`\`bash
# Load full context (schemas, patterns, learnings, pending questions)
# Via MCP tool:
bootstrap(mode="full", include_questions=true)

# Or via CLI
local-memory bootstrap --mode full --include_questions
\`\`\`

### 3. Capture Observations

Use \`observe\` to record raw observations. These are L0 entries meant for later processing:

\`\`\`bash
# Record an observation (via MCP)
observe(
  content="Redis SCAN is O(1) per call but O(N) overall",
  tags=["redis", "performance"],
  domain="databases"
)

# Or use CLI observe command (preferred)
local-memory observe "Redis SCAN is O(1) per call but O(N) overall" 
--tags "redis,performance" 
--domain "databases"

# Or use CLI remember command (legacy, still works)
local-memory remember "Redis SCAN is O(1) per call but O(N) overall" 
--tags "redis,performance"
\`\`\`

### 4. Process Observations into Learnings

Use \`reflect\` to synthesize observations into candidate insights:

\`\`\`bash
# Process recent observations (via MCP)
reflect(mode="batch", batch_size=10)
\`\`\`

### 5. Search Your Knowledge

\`\`\`bash
# Simple search
local-memory search "transformer architecture"

# AI-powered semantic search
local-memory search "neural networks" --use_ai

# Search by tags
local-memory search --tags "programming,python"

# Search by date range
local-memory search "patterns" --start_date "2025-01-01" --end_date "2025-12-31"
\`\`\`

### 6. Create Relationships

\`\`\`bash
# Create relationships between memories
local-memory relate 359bf199-0fcf-4403-8dc6-ffd07f6cb900 359bf199-0fcf-4403-8dc6-ffd07f6cb911 --type "causes" --strength 0.8 --confirm
\`\`\`

### 7. Track Unknowns

Record what you don't know or need to investigate:

\`\`\`bash
# Record an epistemic gap (via MCP)
question(
  content="How does Redis handle persistence during high write load?",
  question_type="epistemic_gap",
  priority=7
)
\`\`\`

### 8. Validate and Evolve Knowledge

Strengthen good knowledge and let stale knowledge decay:

\`\`\`bash
# Validate a learning (via MCP)
evolve(
  operation="validate",
  entity_id="uuid-of-learning",
  success=true,
  context="Verified in production"
)

# Run decay on stale knowledge
evolve(operation="decay", threshold_days=30, dry_run=true)
\`\`\`

## Core Concepts

### Knowledge Hierarchy

- **L0 Observations**: Raw notes, fleeting thoughts, initial intake
- **L1 Learnings**: Validated observations, candidate insights
- **L2 Patterns**: Generalizations across multiple learnings
- **L3 Schemas**: Theoretical frameworks with assertions and predictions

Knowledge weight ranges correspond to levels:
- L0: 0.0-1.0 (ephemeral)
- L1: 1.0-5.0 (volatile)
- L2: 5.0-9.0 (durable)
- L3: 9.0-10.0 (permanent)

### Contradiction Detection

Local Memory automatically detects potential contradictions when storing new knowledge. Detected contradictions appear in \`bootstrap\` response and can be resolved via the \`resolve\` tool.

### Search Types

- **Semantic Search**: AI-powered meaning-based search (default)
- **Tag Search**: Filter by specific tags
- **Date Range**: Search by time periods
- **Hybrid Search**: Combine multiple search criteria

### Relationships

- Connect related memories with typed relationships
- Types: references, contradicts, expands, similar, sequential, causes, enables
- Relationships have strength ratings (0.0 to 1.0)

### Questions System

Track epistemic gaps (what you don't know) and contradictions:
- \`epistemic_gap\`: Knowledge gaps to investigate
- \`contradiction\`: Detected conflicts between memories
- \`prediction_failure\`: When predictions were wrong

## Configuration

### Configuration Directory

Local Memory stores configuration and data in:
- **macOS/Linux**: \`~/.local-memory/\`
- **Windows**: \`%USERPROFILE%\\.local-memory\\\`

### Key Files

- \`config.yaml\`: Main configuration
- \`unified-memories.db\`: SQLite database
- \`logs/\`: System logs

### Environment Variables

\`\`\`bash
export LOCAL_MEMORY_CONFIG_DIR="$HOME/.local-memory"
export LOCAL_MEMORY_LOG_LEVEL="info"
export LOCAL_MEMORY_API_PORT="3002"
\`\`\`

## License Management

Local Memory requires a commercial license. Obtain a key at [localmemory.co](https://localmemory.co).

\`\`\`bash
# Activate license
local-memory license activate LM-XXXX-XXXX-XXXX-XXXX-XXXX

# Check status
local-memory license status

# Activate with automatic terms acceptance
local-memory license activate LM-XXXX-XXXX-XXXX-XXXX-XXXX --accept_terms
\`\`\`

### License Troubleshooting

If your license key has copy-paste issues:
- Check for em-dash (--) or en-dash (-) instead of regular hyphens (-)
- Local Memory auto-normalizes these, but manual replacement may help

## Integration Options

### MCP Integration (AI Agents)

\`\`\`bash
# Install MCP integration
local-memory install

# For specific clients
local-memory install mcp claude-desktop
local-memory install mcp cursor

# Complete setup
local-memory install --all
\`\`\`

### REST API

\`\`\`bash
# Health check
curl http://localhost:3002/api/v1/health

# Store observation
curl -X POST http://localhost:3002/api/v1/memories \\
  -H "Content-Type: application/json" \\
  -d '{"content": "Your observation", "level": "observation"}'
\`\`\`

### CLI / Code Execution

\`\`\`bash
# Start CLI
local-memory start

# Run commands directly
local-memory search "neural networks" --use_ai
\`\`\`

## Common Workflows

### Research Session

1. \`bootstrap(mode="full")\` - Load context
2. \`observe(content="...", domain="research")\` - Capture findings
3. \`question(content="What about X?")\` - Track unknowns
4. \`reflect(mode="batch")\` - End of session synthesis
5. \`evolve(operation="validate", ...)\` - Strengthen validated findings

### Knowledge Maintenance

\`\`\`bash
# Check graph integrity
validate()

# Preview decay
evolve(operation="decay", threshold_days=30, dry_run=true)

# Apply decay
evolve(operation="decay", threshold_days=30, dry_run=false)

# Resolve pending contradictions
resolve(question_id="...", resolution_type="a_supersedes", rationale="...")
\`\`\`

### Building a Knowledge Base

1. Start with observations (L0)
2. Let reflection create learnings (L1)
3. Validate learnings when proven correct
4. Promote to patterns (L2) when generalizations emerge
5. Create schemas (L3) for theoretical frameworks

## Getting Help

### Command-Line Help

\`\`\`bash
# General help
local-memory --help

# Command-specific help
local-memory search --help

# Progressive parameter discovery
local-memory search --help_parameters
local-memory search --help_parameters --show_all
\`\`\`

### System Diagnostics

\`\`\`bash
# Run comprehensive diagnostics
local-memory doctor

# Check system status
local-memory status

# Validate installation
local-memory validate
\`\`\`

### Troubleshooting

\`\`\`bash
# Check if daemon is running
local-memory ps

# View logs
tail -f ~/.local-memory/daemon.log

# Kill stuck processes
local-memory kill_all
\`\`\`

## Next Steps

1. **Learn the MCP Tools**: See MCP Tools Reference for all 16 tools
2. **CLI Commands**: Check CLI Reference for complete command documentation
3. **REST API**: See REST API for HTTP endpoint details
4. **Configuration**: Review Configuration for advanced options`,
  codeExamples: [
    {
      id: 'quick-install',
      title: 'Quick Installation',
      code: 'npm install -g local-memory-mcp\nlocal-memory setup\nlocal-memory license activate LM-XXXX-XXXX-XXXX-XXXX-XXXX',
      language: 'bash',
      description: 'Install, set up, and activate Local Memory'
    },
    {
      id: 'knowledge-workflow',
      title: 'Knowledge Workflow',
      code: 'bootstrap(mode="full")\nobserve(content="...", domain="research")\nreflect(mode="batch")\nevolve(operation="validate", entity_id="...", success=true)',
      language: 'bash',
      description: 'Complete workflow: bootstrap, observe, reflect, evolve'
    },
    {
      id: 'semantic-search',
      title: 'AI-Powered Search',
      code: 'local-memory search "neural networks" --use_ai --limit 5',
      language: 'bash',
      description: 'Search using semantic similarity'
    }
  ],
  nextSection: 'configuration'
};
