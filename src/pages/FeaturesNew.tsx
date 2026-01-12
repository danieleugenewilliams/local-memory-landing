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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl animate-in">
            Complete memory for every AI workflow
          </h1>
          <p className="mt-4 text-lg text-muted-foreground animate-in animate-in-delay-1">
            <span>Observe. Learn. Evolve. Reason.<br /></span>
            <span>Access from any agent, any integration, any script.</span>
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="section-sm border-b border-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-4 text-center animate-in">
              <div className="font-mono text-3xl font-bold text-[hsl(var(--brand-blue))]">16</div>
              <div className="mt-1 text-sm text-muted-foreground">MCP Tools</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center animate-in animate-in-delay-1">
              <div className="font-mono text-3xl font-bold text-[hsl(var(--brand-green))]">4</div>
              <div className="mt-1 text-sm text-muted-foreground">Knowledge Levels</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center animate-in animate-in-delay-2">
              <div className="font-mono text-3xl font-bold text-[hsl(var(--brand-purple))]">27</div>
              <div className="mt-1 text-sm text-muted-foreground">REST Endpoints</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center animate-in animate-in-delay-3">
              <div className="font-mono text-3xl font-bold text-[hsl(var(--brand-blue))]">&lt;10ms</div>
              <div className="mt-1 text-sm text-muted-foreground">Search Latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Architecture - L0 to L3 */}
      <section className="section-sm border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Knowledge Architecture
            </h2>
            <p className="mt-4 text-muted-foreground">
              Raw observations evolve into validated patterns and permanent frameworks.
            </p>
          </div>

          {/* L0-L3 Horizontal Flow */}
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 sm:grid-cols-4">
              {/* L0 */}
              <div className="rounded-xl border-2 border-border bg-muted/30 p-4 text-center">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted font-mono text-sm font-bold text-muted-foreground">L0</div>
                <h3 className="font-semibold">Observe</h3>
                <p className="mt-1 text-xs text-muted-foreground">Raw intake</p>
                <p className="mt-2 font-mono text-[10px] text-muted-foreground">0.0 - 1.0</p>
              </div>

              {/* L1 */}
              <div className="rounded-xl border-2 border-[hsl(var(--brand-green))]/50 bg-[hsl(var(--brand-green))]/5 p-4 text-center">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-green))] font-mono text-sm font-bold text-white">L1</div>
                <h3 className="font-semibold text-[hsl(var(--brand-green))]">Learn</h3>
                <p className="mt-1 text-xs text-muted-foreground">Validated insights</p>
                <p className="mt-2 font-mono text-[10px] text-[hsl(var(--brand-green))]">1.0 - 5.0</p>
              </div>

              {/* L2 */}
              <div className="rounded-xl border-2 border-[hsl(var(--brand-blue))]/50 bg-[hsl(var(--brand-blue))]/5 p-4 text-center">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-blue))] font-mono text-sm font-bold text-white">L2</div>
                <h3 className="font-semibold text-[hsl(var(--brand-blue))]">Pattern</h3>
                <p className="mt-1 text-xs text-muted-foreground">Generalized insights</p>
                <p className="mt-2 font-mono text-[10px] text-[hsl(var(--brand-blue))]">5.0 - 9.0</p>
              </div>

              {/* L3 */}
              <div className="rounded-xl border-2 border-[hsl(var(--brand-purple))]/50 bg-[hsl(var(--brand-purple))]/5 p-4 text-center">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-purple))] font-mono text-sm font-bold text-white">L3</div>
                <h3 className="font-semibold text-[hsl(var(--brand-purple))]">Schema</h3>
                <p className="mt-1 text-xs text-muted-foreground">Permanent frameworks</p>
                <p className="mt-2 font-mono text-[10px] text-[hsl(var(--brand-purple))]">9.0 - 10.0</p>
              </div>
            </div>

            {/* Flow arrows on desktop */}
            <div className="mt-4 hidden justify-center gap-[calc(25%-2rem)] sm:flex">
              <span className="text-muted-foreground">→</span>
              <span className="text-muted-foreground">→</span>
              <span className="text-muted-foreground">→</span>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Knowledge automatically validates, promotes, and matures through use.
            </p>
          </div>
        </div>
      </section>

      {/* Core Capabilities - Updated for new features */}
      <section className="section-sm border-b border-border">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Six capabilities. One system.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Observe */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-green))]/10">
                <span className="font-mono text-lg text-[hsl(var(--brand-green))]">+</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Observe</h3>
              <p className="text-sm text-muted-foreground">
                Record observations that evolve into knowledge. Track questions and contradictions.
                Every insight starts as raw intake.
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
                Connect memories with 7 typed relationships: references, expands, contradicts, enables, and more.
                Validate graph integrity automatically.
              </p>
            </div>

            {/* Reason */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))]/10">
                <span className="font-mono text-lg text-[hsl(var(--brand-orange))]">∿</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Reason</h3>
              <p className="text-sm text-muted-foreground">
                Predict outcomes from patterns. Explain causal paths between states.
                Explore "what if" counterfactual scenarios.
              </p>
            </div>

            {/* Evolve */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-purple))]/10">
                <span className="font-mono text-lg text-[hsl(var(--brand-purple))]">↑</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Evolve</h3>
              <p className="text-sm text-muted-foreground">
                Knowledge automatically validates, promotes, and matures.
                Detect contradictions. Resolve conflicts. Build expertise that compounds.
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

      {/* MCP Tools - 16 Tools in 5 Categories */}
      <section className="section-sm border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              16 MCP Tools
            </h2>
            <p className="mt-4 text-muted-foreground">
              Organized into 5 categories for complete knowledge management.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Core Memory */}
            <div className="rounded-xl border border-[hsl(var(--brand-blue))]/30 bg-[hsl(var(--brand-blue))]/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-[hsl(var(--brand-blue))]/20 font-mono text-xs font-bold text-[hsl(var(--brand-blue))]">4</span>
                <h3 className="text-sm font-semibold">Core Memory</h3>
              </div>
              <div className="space-y-1 font-mono text-xs text-muted-foreground">
                <div>search</div>
                <div>update_memory</div>
                <div>delete_memory</div>
                <div>get_memory_by_id</div>
              </div>
            </div>

            {/* Knowledge Intake */}
            <div className="rounded-xl border border-[hsl(var(--brand-green))]/30 bg-[hsl(var(--brand-green))]/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-[hsl(var(--brand-green))]/20 font-mono text-xs font-bold text-[hsl(var(--brand-green))]">3</span>
                <h3 className="text-sm font-semibold">Knowledge Intake</h3>
              </div>
              <div className="space-y-1 font-mono text-xs text-muted-foreground">
                <div>observe</div>
                <div>question</div>
                <div>bootstrap</div>
              </div>
            </div>

            {/* Knowledge Evolution */}
            <div className="rounded-xl border border-[hsl(var(--brand-purple))]/30 bg-[hsl(var(--brand-purple))]/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-[hsl(var(--brand-purple))]/20 font-mono text-xs font-bold text-[hsl(var(--brand-purple))]">3</span>
                <h3 className="text-sm font-semibold">Evolution</h3>
              </div>
              <div className="space-y-1 font-mono text-xs text-muted-foreground">
                <div>reflect</div>
                <div>evolve</div>
                <div>resolve</div>
              </div>
            </div>

            {/* Reasoning */}
            <div className="rounded-xl border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-[hsl(var(--brand-orange))]/20 font-mono text-xs font-bold text-[hsl(var(--brand-orange))]">3</span>
                <h3 className="text-sm font-semibold">Reasoning</h3>
              </div>
              <div className="space-y-1 font-mono text-xs text-muted-foreground">
                <div>predict</div>
                <div>explain</div>
                <div>counterfactual</div>
              </div>
            </div>

            {/* Graph & Status */}
            <div className="rounded-xl border border-[hsl(var(--brand-pink))]/30 bg-[hsl(var(--brand-pink))]/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-[hsl(var(--brand-pink))]/20 font-mono text-xs font-bold text-[hsl(var(--brand-pink))]">3</span>
                <h3 className="text-sm font-semibold">Graph & Status</h3>
              </div>
              <div className="space-y-1 font-mono text-xs text-muted-foreground">
                <div>relate</div>
                <div>validate</div>
                <div>status</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Interfaces */}
      <section className="section-sm border-b border-border">
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
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded bg-[hsl(var(--brand-blue))]/10 px-2 py-1 font-mono text-xs text-[hsl(var(--brand-blue))]">
                  MCP
                </span>
                <h3 className="text-lg font-semibold">Model Context Protocol</h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Native integration with Claude Desktop, Cursor, and any MCP-enabled agent.
                16 tools appear automatically — no configuration needed.
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
                  <pre className="text-sm text-[hsl(var(--terminal-green))]">{`observe({
  content: "Auth uses JWT with 24h expiry. Refresh tokens in httpOnly cookies.",
  level: "learning",
  tags: ["auth", "security", "api"]
})`}</pre>
                  <pre className="mt-4 text-sm text-foreground/70">{`// Returns: { id: "mem_7f3a9b", level: "L1", weight: 1.0 }`}</pre>
                </div>
              </div>
            </div>

            {/* REST API */}
            <div className="rounded-xl border border-border bg-card p-6">
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
            <div className="rounded-xl border border-border bg-card p-6">
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
                  <pre className="text-sm text-[hsl(var(--terminal-green))]">{`# Observe with knowledge level
local-memory observe "Redis cache TTL is 3600s" --level learning --tags cache,redis

# Search with AI
local-memory search "caching strategies" --use_ai --limit 10

# Evolve knowledge
local-memory evolve validate --dry-run`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What This Enables */}
      <section className="section-sm border-b border-border bg-card/30">
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
                Every agent has access to the same evolved knowledge.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Knowledge that compounds</h3>
              <p className="text-muted-foreground">
                Observations become learnings, learnings become patterns.
                Expertise builds automatically through validation and promotion.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Contradiction resolution</h3>
              <p className="text-muted-foreground">
                Conflicting knowledge is automatically detected and flagged.
                Seven resolution strategies maintain integrity.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Reasoning capabilities</h3>
              <p className="text-muted-foreground">
                Predict outcomes from patterns. Trace causal chains.
                Explore alternative scenarios with counterfactual analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility */}
      <section className="section-sm border-b border-border">
        <div className="container-wide">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-center">Compatibility</h3>
            <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-2 font-medium">MCP Clients</div>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Claude Desktop</li>
                  <li>Cursor</li>
                  <li>Any MCP client</li>
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
      <section className="section-sm">
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

          {/* Trust elements */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span>One-time purchase</span>
            <span className="hidden sm:inline">·</span>
            <span>No subscription</span>
            <span className="hidden sm:inline">·</span>
            <span>No cloud dependency</span>
          </div>
        </div>
      </section>

      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default FeaturesNew;
