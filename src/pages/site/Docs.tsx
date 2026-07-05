import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollToTop from "@/components/ScrollToTop";

/* Docs — content validated against the local-memory-golang source (v1.5.x).
   Ground-truth notes for maintainers:
   - storage default filename: ~/.local-memory/unified-memories.db  (internal/config/config.go:406)
   - REST base: http://localhost:3002/api/v1  (config.go:516-517); auto-port scans +100 if busy
   - anthropic default chat model: claude-sonnet-4-20250514  (config.go:501, anthropic/provider.go:70)
   - default embeddings: Ollama nomic-embed-text, 768 dims  (config.go:415,459)
   - env vars use the MEMORY_ prefix + service-native names (REST_API_PORT, MEMORY_DB_PATH, …);
     there is NO LM_* prefix, and the config path is the --config flag, not an env var.
   - promotion thresholds L1→L2 (3 validations, weight ≥5.0, conf ≥0.8) and
     L2→L3 (5, ≥9.0, ≥0.9) are exact  (config.go:567-572, evolution/service.go:285-316)
   - search latency: 10–57ms on the default SQLite backend; <15ms only with optional Qdrant
     (README.md:11, CHANGELOG_v1.3.2.md:23). The site's "11–15ms" is not grounded in code. */

type Block =
  | { type: "h"; text: string }
  | { type: "p"; text: string }
  | { type: "code"; text: string }
  | { type: "rows"; rows: { k: string; v: string }[] };

interface Section {
  id: string;
  title: string;
  description: string;
  subs: string[];
  blocks: Block[];
}

const SECTIONS: Section[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description:
      "Install Local Memory, activate your license, and capture your first observation in under five minutes.",
    subs: ["What is Local Memory?", "Installation", "First workflow", "Three interfaces", "License activation", "Getting help"],
    blocks: [
      { type: "h", text: "What is Local Memory?" },
      {
        type: "p",
        text: "Local Memory is a local-first knowledge engine for AI agents and the humans who work alongside them. It is not a note store: it turns raw observations (L0) into validated learnings (L1), then patterns (L2), then schemas (L3), so knowledge earns its permanence instead of piling up flat. Everything runs on your machine — a single Go binary, a SQLite database, and local embeddings by default. Nothing is sent anywhere you don't configure.",
      },
      {
        type: "p",
        text: "The same functionality is exposed through three interfaces with identical behavior: a CLI for humans and scripts, an MCP server for AI agents, and a REST API for web services and automation. Pick whichever your caller can reach — the knowledge is shared across all three.",
      },
      { type: "h", text: "Installation" },
      {
        type: "code",
        text: `# Install the binary (npm wrapper, all platforms)
npm install -g local-memory-mcp

# Run the setup wizard — detects Ollama, configures storage + REST API
local-memory setup

# Activate your license (exact format below)
local-memory license activate LM-XXXX-XXXX-XXXX-XXXX-XXXX

# Start the daemon (MCP + REST API)
local-memory start

# Confirm everything is healthy
local-memory doctor`,
      },
      {
        type: "p",
        text: "Prefer a manual install? Download the binary for macOS, Windows, or Linux from the releases page, put it on your PATH, and run local-memory setup. The binary is self-contained — no Node, Python, or Docker required at runtime. Minimum ~512MB RAM; the daemon idles small.",
      },
      { type: "h", text: "First workflow" },
      {
        type: "code",
        text: `# 1. Bootstrap the session — loads patterns, recent learnings, open questions
local-memory bootstrap --mode full --include_questions

# 2. Capture observations as you work (stored at L0)
local-memory observe "Redis SCAN is O(1) per call but O(N) overall" \\
  --tags redis,performance --domain databases

# 3. Recall before deciding — semantic search across sessions
local-memory search "redis performance" --use_ai

# 4. Reflect — promote observations into learnings (L0 to L1)
local-memory reflect batch`,
      },
      { type: "h", text: "Three interfaces" },
      {
        type: "rows",
        rows: [
          { k: "CLI", v: "local-memory <command> — humans, scripts, cron. Snake_case commands (kebab aliases accepted)." },
          { k: "MCP", v: "24 tools over stdio JSON-RPC. Native in Claude Desktop/Code; works in Cursor, Codex, Gemini, Copilot, Windsurf." },
          { k: "REST", v: "http://localhost:3002/api/v1 — any HTTP client, GPT/Gemini agents, custom tooling." },
        ],
      },
      { type: "h", text: "License activation" },
      {
        type: "p",
        text: "Local Memory is a commercial product with a one-time license. Keys have the exact shape LM-XXXX-XXXX-XXXX-XXXX-XXXX (five 4-character groups). Activation records acceptance of the terms; pass --accept_terms to skip the interactive prompt in automated installs. The full key is required — a truncated key will not validate.",
      },
      {
        type: "code",
        text: `local-memory license activate LM-XXXX-XXXX-XXXX-XXXX-XXXX --accept_terms
local-memory license status      # show current license + terms state
local-memory license validate    # check key format (not authenticity)`,
      },
      { type: "h", text: "Getting help" },
      {
        type: "code",
        text: `local-memory doctor    # full system diagnostics
local-memory status    # daemon health + knowledge-base stats
local-memory --help    # every command and flag
local-memory <command> --help_parameters   # progressive, per-command help`,
      },
    ],
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    description:
      "The knowledge model an engineer or agent must understand: how memories are weighted, validated, promoted, decayed, and reconciled. This is what makes Local Memory a cognitive layer rather than a database.",
    subs: ["Knowledge levels", "Weight & confidence", "Promotion", "Reflection", "Decay & archival", "Contradictions & questions", "Relationships", "Retrieval & sessions"],
    blocks: [
      { type: "h", text: "Knowledge levels (L0–L3)" },
      {
        type: "p",
        text: "Every memory has a level. Levels are not folders — they encode how much the system trusts a memory. New intake enters low and climbs by proving itself. Each level carries a default weight when created; weight then moves as the memory is validated or decays.",
      },
      {
        type: "rows",
        rows: [
          { k: "L0 · observation", v: "Raw intake. Default weight 1.0. Ephemeral — the substrate reflection draws from." },
          { k: "L1 · learning", v: "Candidate insight. Default weight 3.0. Volatile — subject to validation and decay." },
          { k: "L2 · pattern", v: "Validated generalization across learnings. Default weight 6.0. Durable." },
          { k: "L3 · schema", v: "Framework that explains patterns. Default weight 9.0. Permanent, highest authority; never decays." },
        ],
      },
      {
        type: "p",
        text: "A note on ranges: weight is a positive number floored at 0, not a hard band per level. The commonly cited ranges (0–1, 1–5, 5–9, 9–10) describe where each level tends to live because of the default weights and the promotion thresholds below — the promotion floors (5.0 for L2, 9.0 for L3) are what actually gate movement between levels.",
      },
      { type: "h", text: "Weight & confidence" },
      {
        type: "p",
        text: "Two numbers drive a memory's standing. Weight is its importance/durability. Confidence is how reliable it has proven to be. You strengthen or weaken a memory with the evolve validate operation, reporting whether it held up in practice.",
      },
      {
        type: "rows",
        rows: [
          { k: "validate success", v: "validation_count += 1; weight += 0.2" },
          { k: "validate failure", v: "failure_count += 1; weight -= 0.1 (floored at 0)" },
          { k: "confidence", v: "recomputed as validation_count / (validation_count + failure_count)" },
          { k: "action returned", v: "one of promoted · reinforced · weakened · weight_adjusted" },
        ],
      },
      {
        type: "code",
        text: `# A learning proved correct in practice — reinforce it
local-memory evolve validate --entity_id <memory-id> --success

# It turned out wrong — weaken it (no --success flag)
local-memory evolve validate --entity_id <memory-id>`,
      },
      { type: "h", text: "Promotion" },
      {
        type: "p",
        text: "When a validated memory clears all three thresholds for the next level, it is promoted automatically (or you can force it with evolve promote). All three conditions must hold together. L0 observations promote to L1 through reflection; L3 is terminal.",
      },
      {
        type: "rows",
        rows: [
          { k: "L1 → L2 (learning → pattern)", v: "≥ 3 successful validations · weight ≥ 5.0 · confidence ≥ 0.8" },
          { k: "L2 → L3 (pattern → schema)", v: "≥ 5 successful validations · weight ≥ 9.0 · confidence ≥ 0.9" },
        ],
      },
      {
        type: "p",
        text: "Promotion to L3 is special: the system generates a schema name and an initial assertion from the memory's content, marking it as a framework other knowledge can be checked against. Thresholds are configurable under the evolution.* keys in config.yaml.",
      },
      { type: "h", text: "Reflection (L0 → L1)" },
      {
        type: "p",
        text: "Reflection is how raw observations become learnings. reflect scans unpromoted L0 observations, extracts an insight, computes a confidence and a starting weight (clamped 1.0–5.0 for a new learning), creates the L1 memory, and links it back to its source observation so nothing is reprocessed. It runs in three modes.",
      },
      {
        type: "rows",
        rows: [
          { k: "single", v: "Reflect one observation by id (--observation_id). The default mode." },
          { k: "batch", v: "Reflect a batch of unpromoted observations, newest first (--batch_size, default 10)." },
          { k: "auto", v: "Reflect observations older than 1 hour with weight > 0.3." },
        ],
      },
      {
        type: "p",
        text: "Every mode accepts --dry_run to preview what would be created without writing. Reflection is a cheap, safe operation to run periodically — it is where compounding knowledge actually happens.",
      },
      { type: "h", text: "Decay & archival" },
      {
        type: "p",
        text: "Knowledge that is never re-validated should lose influence over time. The decay operation targets L1 learnings that have gone unused past a threshold (default 30 days since last validation, or creation if never validated), multiplies their weight by a decay factor (0.9), and archives anything that falls below the archival threshold (0.5) by pinning it to a floor and timestamping it. L2 patterns and L3 schemas are never decayed. Scheduled decay is opt-in — it is disabled by default, so knowledge does not silently erode unless you turn it on.",
      },
      {
        type: "code",
        text: `# Preview what would decay, without changing anything
local-memory evolve decay --threshold_days 30 --dry_run`,
      },
      { type: "h", text: "Contradictions & questions" },
      {
        type: "p",
        text: "Local Memory tracks what it doesn't know and what conflicts, instead of silently overwriting. Questions come in three types: epistemic_gap (a known unknown), contradiction (conflicting memories), and prediction_failure (a schema's prediction didn't hold). Contradictions are detected by a multi-layer heuristic — semantic similarity above 0.85 combined with opposing-valence checks (shared-vocabulary overlap, domain coherence, negation asymmetry, opposing word pairs) — so near-duplicates that merely restate each other are not flagged as conflicts.",
      },
      {
        type: "p",
        text: "You resolve a question with resolve (or the evolve accommodate operation for contradictions). Resolution types include a_supersedes / b_supersedes (one memory wins, the loser's weight is cut), merged (synthesize a new memory from both), conditional / context (both hold under different conditions), invalidated (both were wrong), and answered (for epistemic gaps). Resolving updates weights and rewrites or removes the contradicts relationship.",
      },
      { type: "h", text: "Relationships" },
      {
        type: "p",
        text: "Memories form a graph. Edges are typed — references, contradicts, expands, similar, sequential, causes, enables — each with a strength from 0 to 1. Create edges explicitly with relate, let the system infer them with discover, find neighbors of a memory with find_related (hybrid graph + vector similarity), and traverse the explicit graph with map_graph (breadth-first, default depth 2).",
      },
      { type: "h", text: "Retrieval & sessions" },
      {
        type: "p",
        text: "search is hybrid. It runs a vector (semantic) search first; if that returns enough strong matches it returns them, otherwise it supplements with keyword/full-text search and merges the two, ranking by a quality score that blends similarity, importance, recency, and tag richness. Semantic search needs use_ai (embeddings); without it you get keyword and tag matching. On the default SQLite backend this typically runs in ~10–57ms; the optional Qdrant backend serves vector requests in under 15ms.",
      },
      {
        type: "p",
        text: "session_filter_mode controls cross-session visibility and defaults to all. It is a per-request parameter, not a config setting.",
      },
      {
        type: "rows",
        rows: [
          { k: "all (default)", v: "No session filter — every memory is visible across all sessions." },
          { k: "session_only", v: "Only memories from the given session_id." },
          { k: "session_and_shared", v: "The given session plus unattributed/shared memories (session_id is null)." },
        ],
      },
    ],
  },
  {
    id: "configuration",
    title: "Configuration",
    description:
      "Directory layout, the config.yaml schema, AI provider setup, and every environment variable — the real key names, not guesses.",
    subs: ["Directory layout", "config.yaml", "AI providers", "Sessions & domains", "Environment variables"],
    blocks: [
      { type: "h", text: "Directory layout" },
      {
        type: "code",
        text: `~/.local-memory/                 # created with 0700 permissions
├── config.yaml                  # main configuration (0600 — protects API keys)
├── unified-memories.db          # single SQLite DB shared by all agents/sessions
├── unified-memories.db-wal      # SQLite write-ahead log sidecar
├── unified-memories.db-shm      # SQLite shared-memory sidecar
├── license.json                 # license storage
└── logs/                        # daemon logs (when file logging is enabled)`,
      },
      {
        type: "p",
        text: "One database backs every session — that is what lets what one agent learns be recalled by another. Config is discovered by searching ./, ./.local-memory/, then ~/.local-memory/; a default config.yaml is written on first run.",
      },
      { type: "h", text: "config.yaml" },
      {
        type: "p",
        text: "The file is YAML (JSON accepted), loaded via Viper. Top-level blocks include database, ollama, ai_provider, qdrant, rest_api, session, logging, performance, security, ai, evolution, contradiction, license, and mcp. The most-touched blocks:",
      },
      {
        type: "code",
        text: `database:
  path: ~/.local-memory/unified-memories.db
  auto_migrate: true
  max_backups: 7

rest_api:
  enabled: true
  host: localhost        # loopback only by default
  port: 3002
  auto_port: true        # if 3002 is busy, scan upward (+100)
  cors: true
  cors_allowed_origins: []   # empty = no browser origin allowed until set
  rate_limit: true       # 1000 requests/min per client IP

session:
  auto_generate: true
  strategy: git-directory   # git | directory | git-directory | uuid | custom
  default_domain: ""        # route memories to a domain automatically

evolution:
  l1_to_l2_validations: 3
  l1_to_l2_min_weight: 5.0
  l1_to_l2_min_confidence: 0.8
  l2_to_l3_validations: 5
  l2_to_l3_min_weight: 9.0
  l2_to_l3_min_confidence: 0.9
  decay_enabled: false      # scheduled decay is opt-in`,
      },
      { type: "h", text: "AI providers" },
      {
        type: "p",
        text: "Local Memory uses a split-provider architecture: embeddings and chat are configured independently, each with an optional fallback. Ollama (fully local) is the default for both. The default embedding model is nomic-embed-text at 768 dimensions. Fallback chains and per-provider circuit breakers (open after 5 consecutive failures, retry after 60s) keep the system responsive when a provider degrades.",
      },
      {
        type: "code",
        text: `ai_provider:
  embedding_provider: "ollama"       # ollama | openai-compatible | openai
  chat_provider: "ollama"            # + anthropic | claude-cli
  chat_fallback: "ollama"

  anthropic:                         # chat only (no embeddings)
    enabled: true
    api_key: "sk-ant-xxxxx"
    model: "claude-sonnet-4-20250514"

  openai:
    enabled: false
    embedding_model: "text-embedding-3-small"   # 1536 dims
    chat_model: "gpt-4-turbo"`,
      },
      {
        type: "rows",
        rows: [
          { k: "ollama", v: "Local embeddings + chat. Default. nomic-embed-text (768d) / qwen2.5:3b." },
          { k: "openai-compatible", v: "LM Studio, vLLM, LocalAI, Groq, Together — points at an OpenAI-style base_url." },
          { k: "openai", v: "Hosted embeddings + chat. text-embedding-3-small / gpt-4-turbo." },
          { k: "anthropic", v: "Chat only. Default model claude-sonnet-4-20250514." },
          { k: "claude-cli", v: "Chat only via the claude subprocess; prompt passed on stdin." },
        ],
      },
      { type: "h", text: "Sessions & domains" },
      {
        type: "p",
        text: "Sessions scope memories. The default strategy git-directory derives a stable session id from your git repo + directory, so per-project memory works without configuration. Domains are a softer grouping: set session.default_domain, or let the domain cascade read CLAUDE.md, AGENTS.md, and GEMINI.md in your project so each repo gets its own domain automatically.",
      },
      { type: "h", text: "Environment variables" },
      {
        type: "p",
        text: "Any config key can be overridden with the MEMORY_ prefix (e.g. MEMORY_REST_API_PORT). A set of explicit overrides also read service-native names. The most useful:",
      },
      {
        type: "rows",
        rows: [
          { k: "REST_API_PORT", v: "REST API port (default 3002; must be 1024–65535)" },
          { k: "REST_API_HOST", v: "REST API bind host (default localhost)" },
          { k: "MEMORY_DB_PATH", v: "Alternate database file location" },
          { k: "MEMORY_SESSION_ID", v: "Fixed session id (disables auto-generation)" },
          { k: "OLLAMA_BASE_URL", v: "Ollama endpoint (default http://localhost:11434)" },
          { k: "OPENAI_API_KEY", v: "Sets the key and auto-enables the OpenAI provider" },
          { k: "ANTHROPIC_API_KEY", v: "Sets the key and auto-enables the Anthropic provider" },
          { k: "LOG_LEVEL", v: "debug | info | warn | error (default info)" },
        ],
      },
      {
        type: "p",
        text: "There is no LM_* environment prefix. The config-file path is set with the --config flag (or the search paths above), not an environment variable.",
      },
    ],
  },
  {
    id: "cli-reference",
    title: "CLI Reference",
    description:
      "Every command the local-memory binary ships, grouped by job. Commands are snake_case; kebab-case aliases are accepted. Most commands also take --json and --help_parameters.",
    subs: ["Service management", "Memory commands", "Knowledge graph", "World memory", "Reasoning", "Response formats"],
    blocks: [
      { type: "h", text: "Service management" },
      {
        type: "code",
        text: `local-memory start      # start daemon (MCP + REST API) in background
local-memory stop       # stop the daemon
local-memory status     # daemon health + KB stats   [--json]
local-memory ps         # list running local-memory processes
local-memory doctor     # comprehensive diagnostics   [--json]
local-memory setup      # setup wizard   [--interactive | --silent]
local-memory install <mcp|claude-desktop|claude-code>   # wire up an integration
local-memory license <activate|status|validate>`,
      },
      { type: "h", text: "Memory commands" },
      {
        type: "code",
        text: `# Search (defaults: --limit 10, --response_format detailed)
local-memory search "auth patterns" --use_ai --limit 5
local-memory search --tags python,performance --domain backend
local-memory search "recent work" --session_filter_mode all

# CRUD
local-memory get <memory-id>
local-memory list --limit 20 --offset 0
local-memory update <memory-id> --content "..." --importance 8 --tags a,b
local-memory forget <memory-id>            # delete (asks to confirm; --confirm to skip)

# AI analysis (question | summarize | analyze | temporal_patterns)
local-memory analyze "what do we know about caching?" --type question`,
      },
      {
        type: "p",
        text: "Note: the delete command is forget, not delete. search defaults to the detailed response format; analyze defaults to concise.",
      },
      { type: "h", text: "Knowledge graph" },
      {
        type: "code",
        text: `local-memory relate <source-id> <target-id> --type enables --strength 0.8
local-memory find_related <memory-id> --limit 10 --min_strength 0.0
local-memory discover --min_strength 0.5           # infer new relationships
local-memory map_graph <memory-id> --depth 2
local-memory validate_graph --dry_run              # graph integrity checks

# Relationship types: references, contradicts, expands, similar,
#                     sequential, causes, enables`,
      },
      { type: "h", text: "World memory" },
      {
        type: "code",
        text: `# Capture (levels: observation | learning | pattern | schema)
local-memory observe "content" --level learning --tags a,b --domain backend

# Session context
local-memory bootstrap --mode full --include_questions

# Track and list open questions / contradictions
local-memory question "How does X handle Y?" --question_type epistemic_gap --priority 7
local-memory questions --status pending --type contradiction

# Promote and evolve
local-memory reflect batch --batch_size 10 --dry_run
local-memory evolve validate --entity_id <id> --success
local-memory evolve promote --entity_id <id>
local-memory evolve decay --threshold_days 30 --dry_run

# Resolve (alias: answer)
local-memory resolve <question-id> a_supersedes "newer info wins"`,
      },
      { type: "h", text: "Reasoning" },
      {
        type: "code",
        text: `local-memory predict "given: high traffic" --use_ai --limit 5
local-memory explain "cold cache" "p99 spike" --max_depth 4
local-memory counterfactual "deploy failed" "if we had canaried"   # alias: whatif`,
      },
      { type: "h", text: "Response formats" },
      {
        type: "p",
        text: "Read commands accept --response_format to control token usage. Reach for concise or ids_only in tight agent loops and widen only when you need full content.",
      },
      {
        type: "rows",
        rows: [
          { k: "detailed", v: "Full output" },
          { k: "concise", v: "Essential fields, ~30% of tokens" },
          { k: "summary", v: "Truncated content, ~50%" },
          { k: "ids_only", v: "Just IDs, ~5%" },
          { k: "json", v: "Machine-readable (pass --json) — pipe to jq" },
        ],
      },
      {
        type: "code",
        text: `local-memory search "api" --response_format ids_only
local-memory search "api" --json | jq '.results[].content'`,
      },
    ],
  },
  {
    id: "mcp-tools",
    title: "MCP Tools",
    description:
      "The 24 tools your agent sees when Local Memory is registered as an MCP server, with the parameters that matter. Every schema rejects unknown properties.",
    subs: ["Core memory", "Search & retrieval", "Relationships", "Knowledge evolution", "Reasoning", "Session & management", "Registering the server"],
    blocks: [
      { type: "h", text: "Core memory" },
      {
        type: "rows",
        rows: [
          { k: "observe", v: "Create a memory. content (required); level=observation|learning|pattern|schema; weight; tags[]; domain; source; context; auto_promote. This is the write/intake tool — there is no separate 'store'." },
          { k: "update_memory", v: "Edit an existing memory. id (required); content; importance (1–10); tags[]; domain." },
          { k: "delete_memory", v: "Permanently remove a memory. id (required). Prefer evolve/update — deletion loses the trail." },
          { k: "get_memory_by_id", v: "Fetch one memory in full. id (required)." },
        ],
      },
      { type: "h", text: "Search & retrieval" },
      {
        type: "rows",
        rows: [
          { k: "search", v: "Semantic/tag/date/hybrid search. query; search_type=semantic|tags|date_range|hybrid; use_ai; limit (1–100); tags[]; domain; session_filter_mode; response_format. Use format=intelligent + max_tokens (50–8000) to auto-fit a token budget." },
          { k: "ask", v: "Answer a question from stored memories. question (required); context_limit (1–50); response_format. Requires an AI provider." },
          { k: "summarize", v: "Summarize memories over a timeframe=day|week|month|all; limit; response_format. Requires an AI provider." },
        ],
      },
      { type: "h", text: "Relationships" },
      {
        type: "rows",
        rows: [
          { k: "relate", v: "Create a typed edge. source_memory_id + target_memory_id (required); relationship_type (default references); strength 0–1 (default 0.5); context." },
          { k: "find_related", v: "Neighbors of a memory via graph + vector similarity. memory_id (required); limit; min_similarity 0–1." },
          { k: "discover", v: "Infer latent relationships. limit; min_strength (default 0.5); optional memory_id; relationship_type_filter[]." },
          { k: "map_graph", v: "Traverse the explicit graph. memory_id (required); depth 1–5 (default 2)." },
        ],
      },
      { type: "h", text: "Knowledge evolution" },
      {
        type: "rows",
        rows: [
          { k: "reflect", v: "Promote observations to learnings. mode=single|batch|auto; observation_id (single); batch_size 1–50; dry_run." },
          { k: "evolve", v: "operation=validate|promote|decay|accommodate. validate needs entity_id + success; decay takes threshold_days + dry_run; accommodate resolves a contradiction question." },
          { k: "question", v: "Record a gap/conflict. content (required); question_type=epistemic_gap|contradiction|prediction_failure; priority 1–10; domain." },
          { k: "questions", v: "List questions. status=pending|investigating|resolved|archived; question_type; priority_min; domain; limit (1–200)." },
          { k: "resolve", v: "Resolve a question. question_id + resolution_type + rationale (required). Types: a_supersedes, b_supersedes, conditional, merged, context, invalidated, answered." },
        ],
      },
      { type: "h", text: "Reasoning" },
      {
        type: "rows",
        rows: [
          { k: "predict", v: "Predictions from patterns/schemas. given (required); action; domain; limit (1–20); use_ai." },
          { k: "explain", v: "Trace causal paths. from_state + to_state (required); max_depth 1–10 (default 4); use_ai." },
          { k: "counterfactual", v: "What-if reasoning. observed + if_condition (required); schema_ids[]; use_ai." },
          { k: "validate", v: "Knowledge-graph integrity. checks[]; dry_run (default true); auto_fix (requires confirm_auto_fix when applying)." },
        ],
      },
      { type: "h", text: "Session & management" },
      {
        type: "rows",
        rows: [
          { k: "bootstrap", v: "Initialize a session. mode=full|minimal|domain; include_questions/patterns/learnings (default true); limit (1–100)." },
          { k: "status", v: "KB health and composition. response_format=detailed|concise|summary." },
          { k: "temporal", v: "How knowledge changed over time. operation=patterns|progression|gaps|timeline; timeframe; concept." },
          { k: "migrate_domain", v: "Batch-rename a domain. from_domain + to_domain (required); dry_run (default true)." },
        ],
      },
      {
        type: "p",
        text: "Counts: Core memory 4, Search & retrieval 3, Relationships 4, Knowledge evolution 5, Reasoning 4, Session 2, Temporal 1, Management 1 — 24 tools total. Several conditionally-required params (evolve.entity_id, reflect.observation_id, bootstrap.domain) are enforced by the handler, not the JSON schema, so read the tool description before calling.",
      },
      { type: "h", text: "Registering the server" },
      {
        type: "code",
        text: `// Claude Desktop — claude_desktop_config.json
{
  "mcpServers": {
    "local-memory": {
      "command": "/path/to/local-memory",
      "args": ["--mcp"],
      "transport": "stdio"
    }
  }
}

# Claude Code
claude mcp add local-memory local-memory --mcp`,
      },
    ],
  },
  {
    id: "rest-api",
    title: "REST API",
    description:
      "Every capability over plain HTTP at localhost:3002/api/v1 — for GPT, Gemini, custom agents, and your own tooling.",
    subs: ["Base URL & auth", "Memory endpoints", "Intake & evolution", "Reasoning & questions", "Status", "Token optimization"],
    blocks: [
      { type: "h", text: "Base URL & auth" },
      {
        type: "code",
        text: `# Base — auto-port may shift to 3003+ if 3002 is busy
http://localhost:3002/api/v1

# Health (never requires auth)
curl http://localhost:3002/api/v1/health`,
      },
      {
        type: "p",
        text: "The server binds to localhost (loopback) by default — it is not reachable from other machines unless you change rest_api.host. No API key is required for local use; license enforcement is optional (license.required). Browser CORS is closed until you add an origin to rest_api.cors_allowed_origins. A rate limit of 1000 requests/min per client IP is on by default, and security headers (CSP, X-Frame-Options: DENY, no-store) are set on every response.",
      },
      { type: "h", text: "Memory endpoints" },
      {
        type: "code",
        text: `# Record an observation (preferred write path) → 201 Created
curl -X POST http://localhost:3002/api/v1/observe \\
  -H "Content-Type: application/json" \\
  -d '{"content": "Your insight", "level": "learning", "tags": ["auth"]}'

# Search (GET, query params) — default response_format is intelligent
curl "http://localhost:3002/api/v1/memories/search?query=auth&use_ai=true"

# Get / update / delete by id
curl http://localhost:3002/api/v1/memories/<id>
curl -X PUT http://localhost:3002/api/v1/memories/<id> \\
  -H "Content-Type: application/json" -d '{"importance": 9}'
curl -X DELETE http://localhost:3002/api/v1/memories/<id>`,
      },
      {
        type: "p",
        text: "POST /memories still works but is deprecated in favor of POST /observe. Path ids are validated as UUIDs; GET by id supports ETag / If-None-Match (304). observe accepts content (required), level, weight, importance, source, domain, tags[], session_id, auto_promote.",
      },
      { type: "h", text: "Intake & evolution" },
      {
        type: "rows",
        rows: [
          { k: "POST /observe", v: "Record an observation (L0–L3). → 201" },
          { k: "POST /question", v: "Record an epistemic gap / contradiction / prediction failure. → 201" },
          { k: "POST /bootstrap", v: "Session digest: patterns, learnings, pending questions. Empty body allowed." },
          { k: "POST /reflect", v: "mode=single|batch|auto; observation_id; batch_size; dry_run." },
          { k: "POST /evolve", v: "operation=validate|promote|decay|accommodate; entity_id; success; threshold_days; dry_run." },
          { k: "POST /relate", v: "source_memory_id + target_memory_id; relationship_type; strength." },
        ],
      },
      { type: "h", text: "Reasoning & questions" },
      {
        type: "rows",
        rows: [
          { k: "POST /predict", v: "given (required); action; domain; limit; use_ai." },
          { k: "POST /explain", v: "from_state + to_state (required); max_depth; use_ai." },
          { k: "POST /counterfactual", v: "observed + if_condition (required); use_ai." },
          { k: "POST /resolve", v: "question_id + resolution_type + rationale (required)." },
          { k: "GET /questions", v: "status; question_type; priority_min; domain; limit; offset." },
          { k: "POST /validate", v: "Graph integrity. dry_run default true; destructive auto_fix needs header X-Confirm-Auto-Fix: true." },
        ],
      },
      { type: "h", text: "Status" },
      {
        type: "code",
        text: `# Unified status — counts, level distribution, open questions
curl "http://localhost:3002/api/v1/status?response_format=concise"`,
      },
      {
        type: "p",
        text: "Deprecated (still functional, emit deprecation headers): POST /memories → /observe; POST /analyze → predict/explain/counterfactual; /relationships* → /relate; all /categories* and most /domains*; GET /sessions → /bootstrap; GET /stats → /status.",
      },
      { type: "h", text: "Token optimization" },
      {
        type: "p",
        text: "Search and read endpoints accept response_format. For search the values are detailed, concise, ids_only, summary, custom, intelligent, ultra, and micro (default intelligent, which auto-optimizes to a token budget via max_tokens). On write/KE endpoints the set is smaller — typically detailed | concise | ids_only. Default to concise in agent loops and widen only when you need full content.",
      },
      {
        type: "code",
        text: `curl "http://localhost:3002/api/v1/memories/search?query=auth&response_format=concise"`,
      },
    ],
  },
  {
    id: "security",
    title: "Security & Operations",
    description:
      "What runs, what it touches, and what it deliberately refuses to do — for the engineer signing off on installing it.",
    subs: ["Trust boundary", "Hardening", "Rate limiting & headers", "Operations"],
    blocks: [
      { type: "h", text: "Trust boundary" },
      {
        type: "p",
        text: "Local Memory runs entirely in user space — no root, no system service, no daemon registration. Storage lives under ~/.local-memory/ (directory 0700, config file 0600 to protect API keys). The REST API binds to localhost only by default and is optional. There is no telemetry and no analytics path: the only outbound calls are to the AI providers you configure and an optional license/terms check. With Ollama as the provider, even inference stays on-device.",
      },
      { type: "h", text: "Hardening" },
      {
        type: "rows",
        rows: [
          { k: "Secret redaction", v: "Config read endpoints replace API keys and license keys with ***REDACTED***." },
          { k: "SSRF protection", v: "Provider base_urls are restricted to http/https and block cloud-metadata and link-local hosts (169.254.169.254, metadata.google.internal, …)." },
          { k: "Input sanitization", v: "Content is HTML-escaped; template-injection and XSS patterns are rejected; length caps enforced." },
          { k: "Command-injection safety", v: "The claude-cli provider passes prompts on stdin with a minimal env allowlist — never as shell arguments." },
          { k: "No SQL execution", v: "Content is stored as data via parameterized queries; it is never executed as SQL." },
        ],
      },
      { type: "h", text: "Rate limiting & headers" },
      {
        type: "p",
        text: "The REST API rate-limits to 1000 requests/min per client IP (429 over the limit) and sets CSP, X-Content-Type-Options, X-Frame-Options: DENY, Referrer-Policy, Permissions-Policy, and Cache-Control: no-store on every /api/ response. Requests are capped at 10mb. CORS is disabled until you explicitly allow an origin.",
      },
      { type: "h", text: "Operations" },
      {
        type: "code",
        text: `local-memory ps        # what's running (MCP / REST / background)
local-memory doctor    # environment + dependency diagnostics
local-memory status    # knowledge-base composition and health`,
      },
      {
        type: "p",
        text: "The database uses SQLite in WAL mode with automatic backups (max_backups, default 7). Because it is a single file, backing up Local Memory is copying unified-memories.db (stop the daemon first for a clean snapshot, or back up the WAL sidecars alongside it).",
      },
    ],
  },
];

const blockText = (b: Block) =>
  b.type === "rows" ? b.rows.map((r) => `${r.k} ${r.v}`).join(" ") : b.text;

const Docs = () => {
  const [sectionId, setSectionId] = useState("getting-started");
  const [query, setQuery] = useState("");

  const idx = SECTIONS.findIndex((s) => s.id === sectionId);
  const active = SECTIONS[idx];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return SECTIONS.map((s) => {
      const hitBlock = s.blocks.find((b) => blockText(b).toLowerCase().includes(q));
      const titleHit = s.title.toLowerCase().includes(q);
      if (!hitBlock && !titleHit) return null;
      const crumb =
        hitBlock && hitBlock.type === "h" ? `Docs / ${s.title} / ${hitBlock.text}` : `Docs / ${s.title}`;
      return { id: s.id, title: s.title, crumb };
    })
      .filter((r): r is { id: string; title: string; crumb: string } => Boolean(r))
      .slice(0, 5);
  }, [query]);

  const selectSection = (id: string) => {
    setSectionId(id);
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="lm-theme min-h-screen">
      <Helmet>
        <title>Documentation — Local Memory</title>
        <meta name="description" content="Everything the Local Memory binary can do — the knowledge model, CLI, MCP tools, and REST API." />
      </Helmet>

      <SiteHeader />

      {/* Docs header */}
      <div className="border-b border-lm-line bg-lm-sand">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-end justify-between gap-8 px-6 pb-10 pt-12 sm:px-10 lg:px-16">
          <div>
            <div className="mb-3.5 font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
              Documentation · v1.5.1
            </div>
            <h1 className="font-serif text-[40px] font-normal leading-[1.1] tracking-[-0.02em] text-lm-ink">
              Everything the binary can do.
            </h1>
          </div>
          <div className="relative w-full sm:w-[340px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the docs…"
              className="w-full rounded-lg border border-lm-line-2 bg-lm-cream px-4 py-3 font-plex text-[13.5px] text-lm-ink outline-none focus:border-lm-amber"
            />
            {results.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-20 mt-1.5 overflow-hidden rounded-lg border border-lm-line-2 bg-lm-cream shadow-[0_12px_28px_-12px_rgba(31,27,22,0.3)]">
                {results.map((res) => (
                  <button
                    key={res.id + res.crumb}
                    onClick={() => selectSection(res.id)}
                    className="block w-full border-b border-lm-line/60 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-lm-sand-2"
                  >
                    <div className="font-serif text-[13.5px] font-medium text-lm-ink">{res.title}</div>
                    <div className="font-plex text-[11.5px] text-lm-muted">{res.crumb}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto grid max-w-[1280px] items-start gap-14 px-6 pb-[88px] sm:px-10 lg:grid-cols-[240px_1fr] lg:px-16">
        {/* Sidebar */}
        <aside className="flex flex-col gap-0.5 pt-10 lg:sticky lg:top-[108px]">
          {SECTIONS.map((s) => {
            const isActive = s.id === sectionId;
            return (
              <div key={s.id}>
                <button
                  onClick={() => setSectionId(s.id)}
                  className={`w-full rounded-md px-3.5 py-2.5 text-left font-plex text-[13px] font-medium transition-colors ${
                    isActive ? "bg-lm-sand-2 text-lm-ink" : "text-lm-stone-2 hover:text-lm-ink"
                  }`}
                >
                  {s.title}
                </button>
                {isActive && (
                  <div className="ml-3.5 mb-2.5 mt-1 flex flex-col gap-px border-l border-lm-line pl-3.5">
                    {s.subs.map((sub) => (
                      <div key={sub} className="py-1.5 text-[12.5px] text-lm-muted">
                        {sub}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="mt-7 border-t border-lm-line pt-5">
            <Link
              to="/agent-setup"
              className="block rounded-[10px] border border-lm-line p-4 transition-colors hover:border-lm-amber"
            >
              <div className="mb-1 font-plex text-xs font-medium text-lm-amber">SETUP →</div>
              <div className="text-[13px] leading-snug text-lm-stone">
                Wiring an agent? Skills, CLAUDE.md &amp; prompts live on Agent Setup.
              </div>
            </Link>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 pt-10">
          <div className="mb-[18px] font-plex text-[11.5px] font-medium text-lm-muted">Docs / {active.title}</div>
          <h2 className="mb-3.5 font-serif text-[34px] font-normal leading-[1.15] tracking-[-0.02em] text-lm-ink">
            {active.title}
          </h2>
          <p className="mb-9 max-w-[62ch] text-base leading-[1.65] text-lm-stone">{active.description}</p>

          {active.blocks.map((b, i) => {
            if (b.type === "h")
              return (
                <h3
                  key={i}
                  className="mb-3.5 mt-10 font-serif text-[22px] font-medium leading-tight tracking-[-0.01em] text-lm-ink"
                >
                  {b.text}
                </h3>
              );
            if (b.type === "p")
              return (
                <p key={i} className="mb-4 max-w-[68ch] text-[15px] leading-[1.7] text-lm-stone">
                  {b.text}
                </p>
              );
            if (b.type === "code")
              return (
                <pre
                  key={i}
                  className="mb-5 overflow-auto rounded-[10px] bg-lm-ink px-6 py-5 font-plex text-[13px] leading-[1.75] text-[#b8ad99]"
                >
                  {b.text}
                </pre>
              );
            return (
              <div key={i} className="mb-5 overflow-hidden rounded-[10px] border border-lm-line">
                {b.rows.map((row, ri) => (
                  <div
                    key={ri}
                    className={`grid grid-cols-[150px_1fr] ${
                      ri < b.rows.length - 1 ? "border-b border-lm-line/60" : ""
                    }`}
                  >
                    <div className="bg-lm-sand px-[18px] py-3 font-plex text-[12.5px] font-medium text-lm-amber">
                      {row.k}
                    </div>
                    <div className="px-[18px] py-3 text-[13.5px] leading-snug text-lm-stone">{row.v}</div>
                  </div>
                ))}
              </div>
            );
          })}

          {/* Prev / next */}
          <div className="mt-14 flex justify-between gap-4 border-t border-lm-line pt-6">
            {idx > 0 ? (
              <button
                onClick={() => selectSection(SECTIONS[idx - 1].id)}
                className="font-plex text-[13px] font-medium text-lm-stone-2 transition-colors hover:text-lm-amber"
              >
                ← {SECTIONS[idx - 1].title}
              </button>
            ) : (
              <span />
            )}
            {idx < SECTIONS.length - 1 && (
              <button
                onClick={() => selectSection(SECTIONS[idx + 1].id)}
                className="ml-auto font-plex text-[13px] font-medium text-lm-stone-2 transition-colors hover:text-lm-amber"
              >
                {SECTIONS[idx + 1].title} →
              </button>
            )}
          </div>
        </div>
      </div>

      <SiteFooter minimal note={
        <>
          Questions?{" "}
          <a href="https://discord.gg/rMmn8xP3fZ" className="text-lm-amber hover:underline">
            Discord
          </a>
        </>
      } />
      <ScrollToTop />
    </div>
  );
};

export default Docs;
