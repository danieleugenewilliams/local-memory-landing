import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollToTop from "@/components/ScrollToTop";

/* Docs — redesigned from Docs.dc.html.
   Content validated against local-memory-golang:
   - storage default filename unified-memories.db
   - anthropic default model claude-sonnet-4-20250514 (current, not stale)
   - REST base http://localhost:3002/api/v1 */

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
    subs: ["What is Local Memory?", "Installation", "Basic workflow", "Knowledge levels", "License", "Getting help"],
    blocks: [
      { type: "h", text: "What is Local Memory?" },
      {
        type: "p",
        text: "Local Memory is a knowledge management system that evolves raw observations into validated patterns and theoretical frameworks. Three complementary interfaces expose the same functionality with consistent behavior: the CLI for humans and scripts, MCP for AI agents, and a REST API for web services and automation.",
      },
      { type: "h", text: "Installation" },
      {
        type: "code",
        text: `# Download and install
npm install -g local-memory-mcp

# Run the setup wizard
local-memory setup

# Activate your license
local-memory license activate LM-XXXX-XXXX-XXXX-XXXX-XXXX

# Start the daemon
local-memory start

# Verify installation
local-memory doctor`,
      },
      {
        type: "p",
        text: "Prefer a manual install? Download the binary for your platform from the releases page, place it on your PATH, then run the setup wizard.",
      },
      { type: "h", text: "Basic workflow" },
      {
        type: "code",
        text: `# 1. Bootstrap your session — load schemas, patterns, pending questions
local-memory bootstrap --mode full --include_questions

# 2. Capture observations as you work
local-memory observe "Redis SCAN is O(1) per call but O(N) overall" \\
  --tags redis,performance --domain databases

# 3. Search before deciding
local-memory search "redis performance" --use_ai

# 4. Reflect — process observations into learnings
local-memory reflect --mode batch`,
      },
      { type: "h", text: "Knowledge levels" },
      {
        type: "rows",
        rows: [
          { k: "L0 · Observation", v: "Raw intake, ephemeral notes (weight 0.0–1.0)" },
          { k: "L1 · Learning", v: "Candidate insights, validated observations (1.0–5.0)" },
          { k: "L2 · Pattern", v: "Validated generalizations across learnings (5.0–9.0)" },
          { k: "L3 · Schema", v: "Theoretical frameworks explaining patterns (9.0–10.0)" },
        ],
      },
      {
        type: "p",
        text: "Knowledge progresses through levels via validation and promotion, creating a self-improving knowledge base. You store at L0/L1; reflection and evolution do the rest.",
      },
      { type: "h", text: "Getting help" },
      {
        type: "code",
        text: `local-memory doctor    # system diagnostics
local-memory status    # daemon health
local-memory --help    # every command and flag`,
      },
    ],
  },
  {
    id: "configuration",
    title: "Configuration",
    description:
      "Directory layout, the configuration file hierarchy, AI provider setup, and environment variables.",
    subs: ["Directory structure", "AI providers", "Session defaults", "Environment variables"],
    blocks: [
      { type: "h", text: "Directory structure" },
      {
        type: "code",
        text: `~/.local-memory/
├── config.yaml            # main configuration
├── unified-memories.db    # SQLite database
└── logs/                  # daemon logs`,
      },
      { type: "h", text: "AI providers" },
      {
        type: "p",
        text: "Local Memory's split provider architecture lets you mix AI backends independently for embeddings and chat, with fallback chains and circuit breakers for resilience. Ollama (local) is the default; OpenAI-compatible servers, OpenAI, Anthropic, and the claude CLI are all supported.",
      },
      {
        type: "code",
        text: `# Recommended: local embeddings + Claude reasoning
ai_provider:
  embedding_provider: "ollama"
  chat_provider: "anthropic"
  chat_fallback: "ollama"

  anthropic:
    enabled: true
    api_key: "sk-ant-xxxxx"
    model: "claude-sonnet-4-20250514"`,
      },
      { type: "h", text: "Session defaults" },
      {
        type: "p",
        text: "Set session.default_domain to route memories to a domain automatically. The domain cascade also reads from CLAUDE.md, AGENTS.md, and GEMINI.md in your project, so per-repo domains work without per-repo config.",
      },
      { type: "h", text: "Environment variables" },
      {
        type: "rows",
        rows: [
          { k: "LM_PORT", v: "REST API port (default 3002)" },
          { k: "LM_CONFIG", v: "Alternate config file path" },
          { k: "LM_DB_PATH", v: "Alternate database location" },
        ],
      },
    ],
  },
  {
    id: "cli-reference",
    title: "CLI Reference",
    description:
      "Every command the local-memory binary ships: service management, memory operations, knowledge evolution, and reasoning.",
    subs: ["Service management", "Memory commands", "Knowledge commands", "Reasoning", "Response formats"],
    blocks: [
      { type: "h", text: "Service management" },
      {
        type: "code",
        text: `local-memory start      # start daemon + REST API
local-memory stop       # stop daemon
local-memory status     # health check
local-memory ps         # running processes
local-memory doctor     # diagnostics`,
      },
      { type: "h", text: "Memory commands" },
      {
        type: "code",
        text: `local-memory search "query" --use_ai --limit 5
local-memory search --tags python,programming
local-memory search "recent work" --session_filter_mode all
local-memory get <memory-id>
local-memory update <memory-id> --content "..."
local-memory forget <memory-id>`,
      },
      { type: "h", text: "Knowledge commands" },
      {
        type: "code",
        text: `local-memory observe "content" --level learning --tags a,b
local-memory bootstrap --mode full --include_questions
local-memory reflect --mode batch
local-memory evolve --operation validate --entity_id UUID --success
local-memory question "How does X handle Y?" --type epistemic_gap
local-memory questions --status pending --format summary
local-memory relate "channels" to "goroutines" --type enables`,
      },
      { type: "h", text: "Response formats" },
      {
        type: "rows",
        rows: [
          { k: "detailed", v: "Full output (default)" },
          { k: "concise", v: "Essential fields, ~30% of tokens" },
          { k: "summary", v: "Truncated content, ~50%" },
          { k: "ids_only", v: "Just IDs, ~5%" },
          { k: "json", v: "Machine-readable — pipe to jq" },
        ],
      },
      {
        type: "code",
        text: `local-memory search "api" --response_format json | jq '.results[].content'`,
      },
    ],
  },
  {
    id: "mcp-tools",
    title: "MCP Tools",
    description:
      "The 24 tools your agent sees when Local Memory is registered as an MCP server, grouped by what they do.",
    subs: ["Core memory", "Search & retrieval", "Knowledge evolution", "Reasoning", "Session & graph"],
    blocks: [
      { type: "h", text: "Core memory" },
      {
        type: "rows",
        rows: [
          { k: "observe", v: "Record observations with knowledge level support (L0–L3)" },
          { k: "update_memory", v: "Edit content, tags, importance of an existing memory" },
          { k: "delete_memory", v: "Remove a memory (prefer evolve/update — deletion loses the trail)" },
          { k: "get_memory_by_id", v: "Fetch one memory in full" },
        ],
      },
      { type: "h", text: "Search & retrieval" },
      {
        type: "rows",
        rows: [
          { k: "search", v: "Semantic + keyword search; response_format incl. intelligent with max_tokens" },
          { k: "ask", v: "Synthesized answer from stored knowledge" },
          { k: "summarize", v: "Summaries across memories, domains, or sessions" },
        ],
      },
      { type: "h", text: "Knowledge evolution" },
      {
        type: "rows",
        rows: [
          { k: "reflect", v: "Process observations into learnings (L0→L1)" },
          { k: "evolve", v: "Validate, promote, decay, or accommodate knowledge" },
          { k: "question", v: "Record epistemic gaps and contradictions" },
          { k: "questions", v: "List pending questions and contradictions with filters" },
          { k: "resolve", v: "Resolve contradictions and answer open questions" },
        ],
      },
      { type: "h", text: "Reasoning" },
      {
        type: "rows",
        rows: [
          { k: "predict", v: "Generate predictions from stored patterns and schemas" },
          { k: "explain", v: "Trace causal paths between states" },
          { k: "counterfactual", v: "Explore what-if scenarios" },
          { k: "validate", v: "Check knowledge graph integrity" },
        ],
      },
      { type: "h", text: "Session & graph" },
      {
        type: "rows",
        rows: [
          { k: "bootstrap", v: "Initialize session with context and pending questions" },
          { k: "status", v: "System health and memory stats" },
          { k: "relate / find_related / discover / map_graph", v: "Create and traverse relationships" },
          { k: "temporal", v: "Analyze how knowledge changed over time" },
        ],
      },
      { type: "h", text: "Registering the server" },
      {
        type: "code",
        text: `// Claude Desktop config
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
    subs: ["Base URL & health", "Memory endpoints", "Knowledge endpoints", "Token optimization"],
    blocks: [
      { type: "h", text: "Base URL & health" },
      {
        type: "code",
        text: `# All endpoints live under
http://localhost:3002/api/v1

# Health check
curl http://localhost:3002/api/v1/health`,
      },
      { type: "h", text: "Memory endpoints" },
      {
        type: "code",
        text: `# Store a memory
curl -X POST http://localhost:3002/api/v1/memories \\
  -H "Content-Type: application/json" \\
  -d '{"content": "Your insight", "importance": 8, "tags": ["tag1"]}'

# Search with AI
curl "http://localhost:3002/api/v1/memories/search?query=auth&use_ai=true"`,
      },
      { type: "h", text: "Knowledge endpoints" },
      {
        type: "rows",
        rows: [
          { k: "POST /observe", v: "Record observation (L0–L3)" },
          { k: "POST /reflect", v: "Process observations into learnings" },
          { k: "POST /evolve", v: "Validate / promote / decay knowledge" },
          { k: "POST /bootstrap", v: "Initialize session context" },
          { k: "GET /questions", v: "List pending questions and contradictions" },
          { k: "POST /predict · /explain · /counterfactual", v: "Reasoning operations" },
        ],
      },
      { type: "h", text: "Token optimization" },
      {
        type: "p",
        text: "Every read endpoint accepts a response_format parameter: detailed (~100%), summary (~50%), concise (~30%), or ids_only (~5%). Default to concise in agent loops and widen only when you need full content.",
      },
      {
        type: "code",
        text: `curl "http://localhost:3002/api/v1/memories/search?query=auth&response_format=concise"`,
      },
    ],
  },
];

const blockText = (b: Block) => (b.type === "rows" ? "" : b.text);

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
        <meta name="description" content="Everything the Local Memory binary can do — CLI, MCP tools, and REST API." />
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
