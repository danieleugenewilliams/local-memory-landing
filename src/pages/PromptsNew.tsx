import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, ArrowRight, Plug, Globe, Terminal } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";
import AgentSetupPrompts from "@/components/v2/AgentSetupPrompts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PromptsNew = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowStickyBar(scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // System prompts for each integration method
  const prompts = {
    mcp: `## Local Memory

Persistent knowledge system. Use proactively to build expertise across sessions.

### Getting Started
Call \`bootstrap()\` at session start to load context and pending questions.

### Core Workflow
1. **Observe** - Record insights as they emerge
   \`observe({ content: "...", level: "learning", tags: [...] })\`

2. **Search** - Check existing knowledge before answering
   \`search({ query: "...", use_ai: true, session_filter_mode: "all" })\`

3. **Reflect** - Process observations into learnings
   \`reflect({ mode: "batch" })\`

4. **Evolve** - Validate and promote knowledge
   \`evolve({ operation: "validate", entity_id: "...", success: true })\`

### Memory Levels (World Memory)
- **L0 Observation** (weight 0-1): Raw intake, ephemeral
- **L1 Learning** (weight 1-5): Candidate insights, volatile
- **L2 Pattern** (weight 5-9): Validated generalizations, durable
- **L3 Schema** (weight 9-10): Theoretical frameworks, permanent

### When to Store
- Architecture decisions and rationale
- Bug fixes and root causes
- Patterns that worked (or didn't)
- User preferences and context

### Best Practices
- Be specific: store context, not just outcomes
- Tag consistently for retrieval
- Use \`session_filter_mode: "all"\` for cross-session search
- Check for contradictions with \`question()\`

### Fallback
If MCP unavailable, use JSON-RPC directly:
\`echo '{"jsonrpc":"2.0","method":"observe","params":{...},"id":1}' | local-memory --mcp\`

Or REST API at http://localhost:3002/api/v1`,

    rest: `## Local Memory (REST API)

Persistent knowledge system via HTTP. Base URL: http://localhost:3002/api/v1

### Service Management
Ensure the daemon is running:
\`\`\`bash
local-memory start
curl http://localhost:3002/api/v1/health
\`\`\`

### Core Operations

**Store a memory:**
\`\`\`bash
curl -X POST http://localhost:3002/api/v1/memories \\
  -H "Content-Type: application/json" \\
  -d '{"content": "Your insight here", "importance": 8, "tags": ["tag1", "tag2"]}'
\`\`\`

**Search with AI:**
\`\`\`bash
curl "http://localhost:3002/api/v1/memories/search?query=your+query&use_ai=true"
\`\`\`

**Record observation (World Memory):**
\`\`\`bash
curl -X POST http://localhost:3002/api/v1/observe \\
  -H "Content-Type: application/json" \\
  -d '{"content": "...", "level": "learning", "tags": ["..."]}'
\`\`\`

### Token Optimization
Use \`response_format\` parameter to reduce token usage:
- \`detailed\` - Full response (~100%)
- \`concise\` - Essential fields (~30%)
- \`summary\` - Truncated content (~50%)
- \`ids_only\` - Minimal (~5%)

Example: \`?response_format=concise\`

### Key Endpoints
- POST /memories - Store memory
- GET /memories/search - Search with semantic + keyword
- POST /observe - Record observation (L0-L3)
- POST /reflect - Process observations into learnings
- POST /evolve - Validate/promote/decay knowledge
- POST /bootstrap - Initialize session context
- GET /status - System health and stats

### Workflow
1. Call /bootstrap at session start
2. Search before answering: GET /memories/search
3. Store insights: POST /memories or POST /observe
4. Periodically: POST /reflect to process observations`,

    cli: `## Local Memory (CLI)

Persistent knowledge system via command line. Use for automation, scripts, and terminal workflows.

### Service Management
\`\`\`bash
local-memory start   # Start daemon + REST API on port 3002
local-memory stop    # Stop daemon
local-memory status  # Check health
\`\`\`

### Core Operations

**Store a memory:**
\`\`\`bash
local-memory observe "PostgreSQL uses MVCC for concurrency" --level learning --tags database,postgres
\`\`\`

**Search:**
\`\`\`bash
local-memory search "database patterns" --use_ai --limit 5
\`\`\`

**Record observation (World Memory):**
\`\`\`bash
local-memory observe "API rate limits are 100/min" --level learning --tags api,limits
\`\`\`

**Process observations into learnings:**
\`\`\`bash
local-memory reflect --mode batch
\`\`\`

**Validate/promote knowledge:**
\`\`\`bash
local-memory evolve --operation validate --entity_id UUID --success
\`\`\`

### Output Formatting
Use \`--response_format\` to control output:
- \`detailed\` - Full output
- \`concise\` - Essential fields only
- \`ids_only\` - Just IDs
- \`json\` - Machine-readable JSON

Example: \`local-memory search "api" --response_format json | jq '.results[].content'\`

### Automation Examples

**Capture git context:**
\`\`\`bash
git log --oneline -5 | xargs -I {} local-memory observe "{}" --level observation --tags git,history
\`\`\`

**Git hook (post-commit):**
\`\`\`bash
#!/bin/bash
local-memory observe "Committed: $(git log -1 --oneline)" --level observation --tags git
\`\`\`

**Daily reflection cron:**
\`\`\`bash
0 18 * * * local-memory reflect --mode batch
\`\`\`

### Workflow
1. \`local-memory start\` at system startup
2. \`local-memory search\` before making decisions
3. \`local-memory observe\` to store insights
4. \`local-memory reflect\` periodically to process knowledge`
  };

  // Tool/endpoint references for each method
  const mcpTools = [
    { category: "Core Memory", color: "brand-blue", count: 4, tools: ["search", "update_memory", "delete_memory", "get_memory_by_id"] },
    { category: "Knowledge Intake", color: "brand-green", count: 3, tools: ["observe", "question", "bootstrap"] },
    { category: "Evolution", color: "brand-purple", count: 3, tools: ["reflect", "evolve", "resolve"] },
    { category: "Reasoning", color: "brand-orange", count: 3, tools: ["predict", "explain", "counterfactual"] },
    { category: "Graph & Status", color: "brand-pink", count: 3, tools: ["relate", "validate", "status"] },
  ];

  const restEndpoints = [
    { category: "Memory", color: "brand-green", endpoints: ["POST /memories", "GET /memories/search", "GET /memories/{id}", "PUT /memories/{id}", "DELETE /memories/{id}"] },
    { category: "Knowledge", color: "brand-purple", endpoints: ["POST /observe", "POST /reflect", "POST /evolve", "POST /bootstrap"] },
    { category: "Reasoning", color: "brand-orange", endpoints: ["POST /predict", "POST /explain", "POST /counterfactual"] },
    { category: "System", color: "brand-blue", endpoints: ["GET /health", "GET /status", "POST /validate"] },
  ];

  const cliCommands = [
    { category: "Service", color: "terminal-amber", commands: ["start", "stop", "status"] },
    { category: "Memory", color: "brand-green", commands: ["search", "get", "update", "forget", "list"] },
    { category: "Knowledge", color: "brand-purple", commands: ["observe", "bootstrap", "reflect", "evolve", "question"] },
    { category: "Graph", color: "brand-pink", commands: ["relate"] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Sticky CTA Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-sm transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container-wide flex items-center justify-between py-3">
          <p className="hidden text-sm text-muted-foreground sm:block">
            These prompts work best with Local Memory
          </p>
          <div className="flex w-full items-center justify-center gap-3 sm:w-auto sm:justify-end">
            <span className="text-sm font-medium">$49 one-time</span>
            <Link
              to="/payment"
              className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
              onClick={() => trackCTAClick("prompts", "Sticky Get Started", "/payment")}
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-wide relative">
          <div className="flex flex-col items-center justify-center py-16 text-center md:py-24">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Integration prompts
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Copy the system prompt for your integration method. Works with any AI agent that supports MCP, HTTP, or shell commands.
            </p>
          </div>
        </div>
      </section>

      {/* Main Tabbed Content */}
      <section className="section-sm border-t border-border">
        <div className="container-wide">
          <Tabs defaultValue="mcp" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
              <TabsTrigger value="mcp" className="flex items-center gap-2">
                <Plug size={16} />
                <span>MCP</span>
              </TabsTrigger>
              <TabsTrigger value="rest" className="flex items-center gap-2">
                <Globe size={16} />
                <span>REST</span>
              </TabsTrigger>
              <TabsTrigger value="cli" className="flex items-center gap-2">
                <Terminal size={16} />
                <span>CLI</span>
              </TabsTrigger>
            </TabsList>

            {/* MCP Tab */}
            <TabsContent value="mcp" className="space-y-8">
              {/* When to use */}
              <div className="rounded-xl border border-[hsl(var(--brand-blue))]/30 bg-[hsl(var(--brand-blue))]/5 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded bg-[hsl(var(--brand-blue))]/20 px-2 py-1 font-mono text-xs font-medium text-[hsl(var(--brand-blue))]">
                    MCP
                  </span>
                  <h3 className="font-semibold">Model Context Protocol</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Use when:</strong> Claude Desktop, Claude Code, Cursor, Windsurf, or any MCP-enabled client.
                  Tools appear automatically — no HTTP overhead, native integration.
                </p>
              </div>

              {/* System Prompt */}
              <div className="rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <div>
                    <h3 className="font-semibold">System Prompt</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Add to CLAUDE.md, .cursorrules, or your agent's system prompt
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(prompts.mcp, "mcp-prompt")}
                    className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm transition-colors hover:bg-secondary"
                  >
                    {copied === "mcp-prompt" ? (
                      <>
                        <Check size={14} className="text-[hsl(var(--brand-green))]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-6">
                  <div className="terminal">
                    <div className="terminal-header">
                      <div className="flex gap-2">
                        <div className="terminal-dot terminal-dot-red" />
                        <div className="terminal-dot terminal-dot-yellow" />
                        <div className="terminal-dot terminal-dot-green" />
                      </div>
                      <span className="ml-4 font-mono text-xs text-muted-foreground">CLAUDE.md</span>
                    </div>
                    <div className="terminal-body max-h-[500px] overflow-auto">
                      <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                        {prompts.mcp}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* MCP Tools Grid */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">16 MCP Tools</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {mcpTools.map((group) => (
                    <div
                      key={group.category}
                      className={`rounded-xl border border-[hsl(var(--${group.color}))]/30 bg-[hsl(var(--${group.color}))]/5 p-4`}
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <span className={`flex h-6 w-6 items-center justify-center rounded bg-[hsl(var(--${group.color}))]/20 font-mono text-xs font-bold text-[hsl(var(--${group.color}))]`}>
                          {group.count}
                        </span>
                        <h4 className="text-sm font-semibold">{group.category}</h4>
                      </div>
                      <div className="space-y-1 font-mono text-xs text-muted-foreground">
                        {group.tools.map((tool) => (
                          <div key={tool}>{tool}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* JSON-RPC Fallback */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 font-semibold">JSON-RPC Fallback</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  If MCP connection fails, call the binary directly via stdin:
                </p>
                <div className="terminal">
                  <div className="terminal-header">
                    <div className="flex gap-2">
                      <div className="terminal-dot terminal-dot-red" />
                      <div className="terminal-dot terminal-dot-yellow" />
                      <div className="terminal-dot terminal-dot-green" />
                    </div>
                    <span className="ml-4 font-mono text-xs text-muted-foreground">bash</span>
                  </div>
                  <div className="terminal-body">
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed text-[hsl(var(--terminal-green))]">
{`echo '{"jsonrpc":"2.0","method":"observe","params":{"content":"My insight","level":"learning"},"id":1}' | local-memory --mcp`}
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* REST Tab */}
            <TabsContent value="rest" className="space-y-8">
              {/* When to use */}
              <div className="rounded-xl border border-[hsl(var(--brand-green))]/30 bg-[hsl(var(--brand-green))]/5 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded bg-[hsl(var(--brand-green))]/20 px-2 py-1 font-mono text-xs font-medium text-[hsl(var(--brand-green))]">
                    REST
                  </span>
                  <h3 className="font-semibold">HTTP API</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Use when:</strong> GPT, Gemini, or agents without MCP support. Custom applications, CI/CD pipelines,
                  web services, or any HTTP-capable client.
                </p>
              </div>

              {/* System Prompt */}
              <div className="rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <div>
                    <h3 className="font-semibold">System Prompt</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      For agents that can make HTTP requests (GPT with actions, custom agents)
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(prompts.rest, "rest-prompt")}
                    className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm transition-colors hover:bg-secondary"
                  >
                    {copied === "rest-prompt" ? (
                      <>
                        <Check size={14} className="text-[hsl(var(--brand-green))]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-6">
                  <div className="terminal">
                    <div className="terminal-header">
                      <div className="flex gap-2">
                        <div className="terminal-dot terminal-dot-red" />
                        <div className="terminal-dot terminal-dot-yellow" />
                        <div className="terminal-dot terminal-dot-green" />
                      </div>
                      <span className="ml-4 font-mono text-xs text-muted-foreground">system-prompt.md</span>
                    </div>
                    <div className="terminal-body max-h-[500px] overflow-auto">
                      <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                        {prompts.rest}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* REST Endpoints Grid */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Key Endpoints</h3>
                <p className="mb-4 text-sm text-muted-foreground">Base URL: <code className="rounded bg-secondary px-1.5 py-0.5">http://localhost:3002/api/v1</code></p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {restEndpoints.map((group) => (
                    <div
                      key={group.category}
                      className={`rounded-xl border border-[hsl(var(--${group.color}))]/30 bg-[hsl(var(--${group.color}))]/5 p-4`}
                    >
                      <h4 className="mb-3 text-sm font-semibold">{group.category}</h4>
                      <div className="space-y-1 font-mono text-xs text-muted-foreground">
                        {group.endpoints.map((endpoint) => (
                          <div key={endpoint}>{endpoint}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Examples */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold">Quick Examples</h3>
                <div className="space-y-4">
                  <div className="terminal">
                    <div className="terminal-header">
                      <div className="flex gap-2">
                        <div className="terminal-dot terminal-dot-red" />
                        <div className="terminal-dot terminal-dot-yellow" />
                        <div className="terminal-dot terminal-dot-green" />
                      </div>
                      <span className="ml-4 font-mono text-xs text-muted-foreground">Python</span>
                    </div>
                    <div className="terminal-body">
                      <pre className="whitespace-pre-wrap text-xs leading-relaxed text-[hsl(var(--terminal-green))]">
{`import requests

# Store a memory
requests.post("http://localhost:3002/api/v1/memories", json={
    "content": "PostgreSQL MVCC provides snapshot isolation",
    "importance": 8,
    "tags": ["database", "postgres"]
})

# Search with AI
results = requests.get("http://localhost:3002/api/v1/memories/search", params={
    "query": "database concurrency",
    "use_ai": True,
    "response_format": "concise"
}).json()`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* CLI Tab */}
            <TabsContent value="cli" className="space-y-8">
              {/* When to use */}
              <div className="rounded-xl border border-[hsl(var(--terminal-amber))]/30 bg-[hsl(var(--terminal-amber))]/5 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded bg-[hsl(var(--terminal-amber))]/20 px-2 py-1 font-mono text-xs font-medium text-[hsl(var(--terminal-amber))]">
                    CLI
                  </span>
                  <h3 className="font-semibold">Command Line</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Use when:</strong> Shell scripts, automation, git hooks, CI/CD pipelines, or agentic coding tools
                  that can execute bash commands (Claude Code, Aider, etc).
                </p>
              </div>

              {/* System Prompt */}
              <div className="rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <div>
                    <h3 className="font-semibold">System Prompt</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      For agents that can execute shell commands
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(prompts.cli, "cli-prompt")}
                    className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm transition-colors hover:bg-secondary"
                  >
                    {copied === "cli-prompt" ? (
                      <>
                        <Check size={14} className="text-[hsl(var(--brand-green))]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-6">
                  <div className="terminal">
                    <div className="terminal-header">
                      <div className="flex gap-2">
                        <div className="terminal-dot terminal-dot-red" />
                        <div className="terminal-dot terminal-dot-yellow" />
                        <div className="terminal-dot terminal-dot-green" />
                      </div>
                      <span className="ml-4 font-mono text-xs text-muted-foreground">CLAUDE.md</span>
                    </div>
                    <div className="terminal-body max-h-[500px] overflow-auto">
                      <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                        {prompts.cli}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* CLI Commands Grid */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Command Reference</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {cliCommands.map((group) => (
                    <div
                      key={group.category}
                      className={`rounded-xl border border-[hsl(var(--${group.color}))]/30 bg-[hsl(var(--${group.color}))]/5 p-4`}
                    >
                      <h4 className="mb-3 text-sm font-semibold">{group.category}</h4>
                      <div className="space-y-1 font-mono text-xs text-muted-foreground">
                        {group.commands.map((cmd) => (
                          <div key={cmd}>{cmd}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Automation Example */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold">Automation Example</h3>
                <div className="terminal">
                  <div className="terminal-header">
                    <div className="flex gap-2">
                      <div className="terminal-dot terminal-dot-red" />
                      <div className="terminal-dot terminal-dot-yellow" />
                      <div className="terminal-dot terminal-dot-green" />
                    </div>
                    <span className="ml-4 font-mono text-xs text-muted-foreground">.git/hooks/post-commit</span>
                  </div>
                  <div className="terminal-body">
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed text-[hsl(var(--terminal-green))]">
{`#!/bin/bash
# Capture commit context to Local Memory

COMMIT_MSG=$(git log -1 --pretty=format:"%s")
COMMIT_HASH=$(git log -1 --pretty=format:"%h")
CHANGED_FILES=$(git diff-tree --no-commit-id --name-only -r HEAD | head -5 | tr '\\n' ', ')

local-memory observe "Commit $COMMIT_HASH: $COMMIT_MSG. Files: $CHANGED_FILES" \\
  --level observation \\
  --tags git,commits,$(basename $(pwd))`}
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Inline CTA */}
      <section className="border-t border-border bg-card/30 py-8">
        <div className="container-wide">
          <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-background p-6 sm:flex-row">
            <div>
              <p className="font-medium">
                Ready to give your AI agents persistent memory?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                One-time purchase, unlimited usage. 30-day money-back guarantee.
              </p>
            </div>
            <Link
              to="/payment"
              className="btn-primary flex shrink-0 items-center gap-2 whitespace-nowrap"
              onClick={() => trackCTAClick("prompts", "Inline Get Started", "/payment")}
            >
              Get Started — $49
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="section-sm border-t border-border bg-card/30">
        <div className="container-wide text-left">
          <h2 className="mb-2 text-lg font-semibold">Installation Guide</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Copy a prompt for your OS and paste it into your AI agent for guided installation.
          </p>
          <AgentSetupPrompts productKey="LM-XXXX-XXXX-XXXX-XXXX-XXXX" />
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm border-t border-border">
        <div className="container-tight text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to add memory to your agents?
          </h2>
          <p className="mt-4 text-muted-foreground">
            One-time purchase. All integrations included.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/payment"
              className="btn-primary text-base"
              onClick={() => trackCTAClick("prompts", "Get Started", "/payment")}
            >
              Get Started — $49
            </Link>
            <Link
              to="/docs"
              className="btn-secondary text-base"
              onClick={() => trackCTAClick("prompts", "View Docs", "/docs")}
            >
              View documentation
            </Link>
          </div>
        </div>
      </section>

      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default PromptsNew;
