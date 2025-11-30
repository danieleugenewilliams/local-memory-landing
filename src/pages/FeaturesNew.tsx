import { Link } from "react-router-dom";
import { trackCTAClick } from "@/lib/analytics";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";

const FeaturesNew = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-wide relative py-16 text-center md:py-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Complete memory for every AI workflow</h1>
          <p className="mt-4 text-lg text-muted-foreground">
              <span>Store context. Search semantically. Build relationships. Analyze patterns.<br/></span>
              <span>Access from any agent, any integration, any script.</span>
          </p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="section-sm border-t border-border">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Six capabilities. One system.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Store */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-blue))]/10">
                <span className="font-mono text-lg text-[hsl(var(--brand-blue))]">+</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Store</h3>
              <p className="text-sm text-muted-foreground">
                Persist any context with importance levels, tags, and domains. 
                Memories survive sessions, switches, and /clear.
              </p>
            </div>

            {/* Search */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-blue))]/10">
                <span className="font-mono text-lg text-[hsl(var(--brand-blue))]">?</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Search</h3>
              <p className="text-sm text-muted-foreground">
                Semantic search finds relevant context by meaning, not keywords. 
                Filter by tags, dates, domains, or combine them all.
              </p>
            </div>

            {/* Relate */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-blue))]/10">
                <span className="font-mono text-lg text-[hsl(var(--brand-blue))]">⟷</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Relate</h3>
              <p className="text-sm text-muted-foreground">
                Connect memories with typed relationships: references, expands, contradicts, enables. 
                Discover hidden patterns automatically.
              </p>
            </div>

            {/* Analyze */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-blue))]/10">
                <span className="font-mono text-lg text-[hsl(var(--brand-blue))]">∿</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Analyze</h3>
              <p className="text-sm text-muted-foreground">
                Ask questions against stored knowledge. Summarize timeframes. 
                Track learning progression over weeks and months.
              </p>
            </div>

            {/* Organize */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-blue))]/10">
                <span className="font-mono text-lg text-[hsl(var(--brand-blue))]">◱</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Organize</h3>
              <p className="text-sm text-muted-foreground">
                Structure knowledge with domains and categories. 
                AI-powered auto-categorization keeps things clean without manual effort.
              </p>
            </div>

            {/* Access Anywhere */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-green))]/10">
                <span className="font-mono text-lg text-[hsl(var(--brand-green))]">⋈</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Access Anywhere</h3>
              <p className="text-sm text-muted-foreground">
                Three interfaces: MCP for AI agents, REST for integrations, CLI for scripts. 
                Same memories, any access pattern.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Interfaces */}
      <section className="section-sm border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Three ways to connect
            </h2>
            <p className="mt-4 text-muted-foreground">
              Native AI agent integration. HTTP for everything else. Command line for automation.
            </p>
          </div>

          <div className="space-y-8">
            {/* MCP */}
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded bg-[hsl(var(--brand-blue))]/10 px-2 py-1 font-mono text-xs text-[hsl(var(--brand-blue))]">
                  MCP
                </span>
                <h3 className="text-lg font-semibold">Model Context Protocol</h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Native integration with Claude Code, Claude Desktop, Cursor, Cline, and any MCP-enabled agent. 
                Tools appear automatically — no configuration in your prompts.
              </p>
              <div className="terminal">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                  </div>
                  <span className="ml-4 font-mono text-xs text-muted-foreground">
                    MCP tool call
                  </span>
                </div>
                <div className="terminal-body">
                  <pre className="text-sm text-[hsl(var(--terminal-green))]">{`store_memory({
  content: "Auth uses JWT with 24h expiry. Refresh tokens in httpOnly cookies.",
  importance: 9,
  tags: ["auth", "security", "api"],
  domain: "backend"
})`}</pre>
                  <pre className="mt-4 text-sm text-foreground/70">{`// Returns: { id: "mem_7f3a9b", stored: true }`}</pre>
                </div>
              </div>
            </div>

            {/* REST API */}
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded bg-[hsl(var(--brand-green))]/10 px-2 py-1 font-mono text-xs text-[hsl(var(--brand-green))]">
                  REST
                </span>
                <h3 className="text-lg font-semibold">HTTP API</h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                27 endpoints on localhost:3002. Connect GPT, custom agents, CI/CD pipelines, 
                or any system that speaks HTTP.
              </p>
              <div className="terminal">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                  </div>
                  <span className="ml-4 font-mono text-xs text-muted-foreground">
                    curl
                  </span>
                </div>
                <div className="terminal-body">
                  <pre className="text-sm text-[hsl(var(--terminal-green))]">{`curl -X POST http://localhost:3002/api/v1/memories/search \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "authentication security patterns",
    "use_ai": true,
    "limit": 5
  }'`}</pre>
                </div>
              </div>
            </div>

            {/* CLI */}
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded bg-[hsl(var(--terminal-amber))]/10 px-2 py-1 font-mono text-xs text-[hsl(var(--terminal-amber))]">
                  CLI
                </span>
                <h3 className="text-lg font-semibold">Command Line</h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Direct terminal access for humans and shell scripts. 
                Pipe outputs, automate workflows, integrate with existing toolchains.
              </p>
              <div className="terminal">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                  </div>
                  <span className="ml-4 font-mono text-xs text-muted-foreground">
                    bash
                  </span>
                </div>
                <div className="terminal-body">
                  <pre className="text-sm text-[hsl(var(--terminal-green))]">{`# Store from your terminal
local-memory remember "Redis cache TTL is 3600s" --tags cache,redis --importance 7

# Search with AI
local-memory search "caching strategies" --use_ai --limit 10

# Pipe to other tools
local-memory search "api endpoints" --json | jq '.data[].content'`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What This Enables */}
      <section className="section-sm border-t border-border">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              What this enables
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Cross-agent continuity</h3>
              <p className="text-muted-foreground">
                Start debugging in Claude Code, continue in Cursor, finish in GPT. 
                Every agent has access to the same context without re-explanation.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Persistent project knowledge</h3>
              <p className="text-muted-foreground">
                Architectural decisions, API patterns, domain rules — stored once, 
                available forever. New sessions start with full context.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Automated memory workflows</h3>
              <p className="text-muted-foreground">
                CI/CD pipelines that store deployment context. Scripts that log decisions. 
                Webhooks that capture external events. All searchable by your agents.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Learning that compounds</h3>
              <p className="text-muted-foreground">
                Track how understanding evolves over months. Surface knowledge gaps. 
                Build expertise that outlasts any single conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="section-sm border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Built for production
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-[hsl(var(--brand-blue))]">11</div>
              <div className="mt-1 text-sm text-muted-foreground">MCP tools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[hsl(var(--brand-blue))]">27</div>
              <div className="mt-1 text-sm text-muted-foreground">REST endpoints</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[hsl(var(--brand-blue))]">&lt;10ms</div>
              <div className="mt-1 text-sm text-muted-foreground">search latency</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[hsl(var(--brand-blue))]">97%</div>
              <div className="mt-1 text-sm text-muted-foreground">token reduction</div>
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-border bg-background p-6">
            <h3 className="mb-4 text-lg font-semibold">Compatibility</h3>
            <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-2 font-medium">MCP Clients</div>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Claude Code</li>
                  <li>Claude Desktop</li>
                  <li>Cursor</li>
                  <li>Cline</li>
                </ul>
              </div>
              <div>
                <div className="mb-2 font-medium">REST Integrations</div>
                <ul className="space-y-1 text-muted-foreground">
                  <li>GPT / OpenAI</li>
                  <li>Gemini</li>
                  <li>Custom agents</li>
                  <li>Any HTTP client</li>
                </ul>
              </div>
              <div>
                <div className="mb-2 font-medium">Platforms</div>
                <ul className="space-y-1 text-muted-foreground">
                  <li>macOS (Intel & ARM)</li>
                  <li>Windows</li>
                  <li>Linux</li>
                  <li>Single binary</li>
                </ul>
              </div>
              <div>
                <div className="mb-2 font-medium">AI Backend</div>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Ollama (local)</li>
                  <li>Qdrant vectors</li>
                  <li>SQLite fallback</li>
                  <li>No cloud required</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm border-t border-border">
        <div className="container-tight text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to give your AI memory?
          </h2>
          <p className="mt-4 text-muted-foreground">
            One-time purchase. All interfaces included. Updates forever.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/payment"
              className="btn-primary text-base"
              onClick={() => trackCTAClick("features", "Get Started", "/payment")}
            >
              Get Started — $49
            </Link>
            <Link
              to="/docs"
              className="btn-secondary text-base"
              onClick={() => trackCTAClick("features", "View Docs", "/docs")}
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

export default FeaturesNew;
