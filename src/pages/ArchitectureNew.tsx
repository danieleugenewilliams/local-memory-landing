import { Link } from "react-router-dom";
import { trackCTAClick } from "@/lib/analytics";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";

const ArchitectureNew = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-wide relative py-16 text-center md:py-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl animate-in">
            Architecture
          </h1>
          <p className="mt-4 text-lg text-muted-foreground animate-in animate-in-delay-1">
            World Memory architecture for AI intelligence. Your data stays local.
          </p>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="border-b border-border bg-card/30">
        <div className="container-wide py-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#diagram" className="text-muted-foreground hover:text-foreground transition-colors">System Diagram</a>
            <span className="text-border">·</span>
            <a href="#knowledge" className="text-muted-foreground hover:text-foreground transition-colors">Knowledge Levels</a>
            <span className="text-border">·</span>
            <a href="#tools" className="text-muted-foreground hover:text-foreground transition-colors">MCP Tools</a>
            <span className="text-border">·</span>
            <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">Security</a>
            <span className="text-border">·</span>
            <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
          </div>
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
              <div className="font-mono text-3xl font-bold text-[hsl(var(--brand-green))]">0</div>
              <div className="mt-1 text-sm text-muted-foreground">External Transfers</div>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture Diagram */}
      <section id="diagram" className="scroll-target section-sm border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              System Architecture
            </h2>
            <p className="mt-4 text-muted-foreground">
              Local Memory v1.2.1 — Layered architecture with complete data isolation.
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className="mx-auto max-w-5xl space-y-3">

            {/* Layer 1: External Clients */}
            <div className="rounded-xl border-2 border-red-500/30 bg-red-500/5 p-4">
              <div className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-red-400">
                External Clients
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs">
                  <div className="font-semibold text-red-300">MCP Clients</div>
                  <div className="text-[10px] text-muted-foreground">Claude Desktop, Cursor</div>
                </div>
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs">
                  <div className="font-semibold text-red-300">REST API Clients</div>
                  <div className="text-[10px] text-muted-foreground">Any HTTP client</div>
                </div>
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs">
                  <div className="font-semibold text-red-300">CLI Users</div>
                  <div className="text-[10px] text-muted-foreground">Terminal</div>
                </div>
                <div className="rounded-lg border border-dashed border-red-500/20 bg-transparent px-3 py-2 text-xs">
                  <div className="font-semibold text-red-300/50">Web Interface</div>
                  <div className="text-[10px] text-muted-foreground/50">Future</div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-muted-foreground">↓</div>
            </div>

            {/* Layer 2: Entry Points */}
            <div className="rounded-xl border-2 border-orange-500/30 bg-orange-500/5 p-4">
              <div className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-orange-400">
                Entry Points
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-xs">
                  <div className="font-semibold text-orange-300">MCP Server</div>
                  <div className="text-[10px] text-muted-foreground">JSON-RPC over stdio</div>
                </div>
                <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-xs">
                  <div className="font-semibold text-orange-300">REST API Server</div>
                  <div className="text-[10px] text-muted-foreground">HTTP localhost:3002</div>
                </div>
                <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-xs">
                  <div className="font-semibold text-orange-300">CLI Handler</div>
                  <div className="text-[10px] text-muted-foreground">Cobra commands</div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-muted-foreground">↓</div>
            </div>

            {/* Layer 3: MCP Tools (16 Total) */}
            <div className="rounded-xl border-2 border-yellow-500/30 bg-yellow-500/5 p-4">
              <div className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-yellow-400">
                MCP Tools (16 Total)
              </div>
              <div className="grid gap-2 sm:grid-cols-5">
                {/* Core Memory */}
                <div className="rounded-lg border border-[hsl(var(--brand-blue))]/30 bg-[hsl(var(--brand-blue))]/10 p-2">
                  <div className="mb-1 text-[10px] font-semibold text-[hsl(var(--brand-blue))]">Core Memory (4)</div>
                  <div className="space-y-0.5 font-mono text-[9px] text-muted-foreground">
                    <div>search</div>
                    <div>update_memory</div>
                    <div>delete_memory</div>
                    <div>get_memory_by_id</div>
                  </div>
                </div>
                {/* Knowledge Intake */}
                <div className="rounded-lg border border-[hsl(var(--brand-green))]/30 bg-[hsl(var(--brand-green))]/10 p-2">
                  <div className="mb-1 text-[10px] font-semibold text-[hsl(var(--brand-green))]">Intake (3)</div>
                  <div className="space-y-0.5 font-mono text-[9px] text-muted-foreground">
                    <div>observe</div>
                    <div>question</div>
                    <div>bootstrap</div>
                  </div>
                </div>
                {/* Knowledge Evolution */}
                <div className="rounded-lg border border-[hsl(var(--brand-purple))]/30 bg-[hsl(var(--brand-purple))]/10 p-2">
                  <div className="mb-1 text-[10px] font-semibold text-[hsl(var(--brand-purple))]">Evolution (3)</div>
                  <div className="space-y-0.5 font-mono text-[9px] text-muted-foreground">
                    <div>reflect</div>
                    <div>evolve</div>
                    <div>resolve</div>
                  </div>
                </div>
                {/* Reasoning */}
                <div className="rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/10 p-2">
                  <div className="mb-1 text-[10px] font-semibold text-[hsl(var(--brand-orange))]">Reasoning (3)</div>
                  <div className="space-y-0.5 font-mono text-[9px] text-muted-foreground">
                    <div>predict</div>
                    <div>explain</div>
                    <div>counterfactual</div>
                  </div>
                </div>
                {/* Graph & Status */}
                <div className="rounded-lg border border-[hsl(var(--brand-pink))]/30 bg-[hsl(var(--brand-pink))]/10 p-2">
                  <div className="mb-1 text-[10px] font-semibold text-[hsl(var(--brand-pink))]">Graph (3)</div>
                  <div className="space-y-0.5 font-mono text-[9px] text-muted-foreground">
                    <div>relate</div>
                    <div>validate</div>
                    <div>status</div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center text-[10px] text-muted-foreground">
                Token optimization (up to 95% reduction) • Cursor pagination • Session filtering • Cross-session access
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-muted-foreground">↓</div>
            </div>

            {/* Layer 4: Services Layer */}
            <div className="rounded-xl border-2 border-green-500/30 bg-green-500/5 p-4">
              <div className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-green-400">
                Services Layer
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <div className="rounded border border-green-500/30 bg-green-500/10 px-2 py-1 text-[10px]">
                  <span className="font-semibold text-green-300">Manager</span>
                </div>
                <div className="rounded border border-green-500/30 bg-green-500/10 px-2 py-1 text-[10px]">
                  <span className="font-semibold text-green-300">Memory</span>
                </div>
                <div className="rounded border border-green-500/30 bg-green-500/10 px-2 py-1 text-[10px]">
                  <span className="font-semibold text-green-300">Vector</span>
                </div>
                <div className="rounded border border-green-500/30 bg-green-500/10 px-2 py-1 text-[10px]">
                  <span className="font-semibold text-green-300">Analysis</span>
                </div>
                <div className="rounded border border-green-500/30 bg-green-500/10 px-2 py-1 text-[10px]">
                  <span className="font-semibold text-green-300">Evolution</span>
                </div>
                <div className="rounded border border-green-500/30 bg-green-500/10 px-2 py-1 text-[10px]">
                  <span className="font-semibold text-green-300">Contradiction</span>
                </div>
                <div className="rounded border border-green-500/30 bg-green-500/10 px-2 py-1 text-[10px]">
                  <span className="font-semibold text-green-300">Ollama</span>
                </div>
                <div className="rounded border border-green-500/30 bg-green-500/10 px-2 py-1 text-[10px]">
                  <span className="font-semibold text-green-300">Qdrant</span>
                </div>
                <div className="rounded border border-green-500/30 bg-green-500/10 px-2 py-1 text-[10px]">
                  <span className="font-semibold text-green-300">License</span>
                </div>
                <div className="rounded border border-green-500/30 bg-green-500/10 px-2 py-1 text-[10px]">
                  <span className="font-semibold text-green-300">Setup</span>
                </div>
              </div>
              <div className="mt-2 text-center text-[10px] text-muted-foreground">
                Dependency injection • Clean architecture • Graceful degradation
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-muted-foreground">↓</div>
            </div>

            {/* Layer 5: Storage Layer */}
            <div className="rounded-xl border-2 border-blue-500/30 bg-blue-500/5 p-4">
              <div className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-blue-400">
                Storage Layer
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-xs">
                  <div className="font-semibold text-blue-300">SQLite Primary</div>
                  <div className="text-[10px] text-muted-foreground">unified-memories.db</div>
                </div>
                <div className="rounded-lg border border-dashed border-blue-500/20 bg-blue-500/5 px-3 py-2 text-xs">
                  <div className="font-semibold text-blue-300/70">Qdrant Vector DB</div>
                  <div className="text-[10px] text-muted-foreground/70">Optional</div>
                </div>
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-xs">
                  <div className="font-semibold text-blue-300">SQLite Vector Fallback</div>
                  <div className="text-[10px] text-muted-foreground">Cosine similarity</div>
                </div>
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-xs">
                  <div className="font-semibold text-blue-300">Config</div>
                  <div className="text-[10px] text-muted-foreground">config.yaml</div>
                </div>
              </div>
            </div>

            {/* Optional Services (External) */}
            <div className="mt-4 flex justify-center gap-4">
              <div className="rounded-xl border border-dashed border-purple-500/30 bg-purple-500/5 px-4 py-3">
                <div className="text-center text-[10px] font-semibold uppercase tracking-wider text-purple-400/70">Optional</div>
                <div className="mt-1 flex gap-2">
                  <div className="rounded border border-purple-500/20 bg-purple-500/10 px-2 py-1 text-[10px]">
                    <span className="text-purple-300/70">Ollama</span>
                    <span className="ml-1 text-muted-foreground/50">:11434</span>
                  </div>
                  <div className="rounded border border-purple-500/20 bg-purple-500/10 px-2 py-1 text-[10px]">
                    <span className="text-purple-300/70">Qdrant</span>
                    <span className="ml-1 text-muted-foreground/50">:6333</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-[10px]">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded border-2 border-red-500/30 bg-red-500/10"></div>
                <span className="text-muted-foreground">External</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded border-2 border-orange-500/30 bg-orange-500/10"></div>
                <span className="text-muted-foreground">Entry</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded border-2 border-yellow-500/30 bg-yellow-500/10"></div>
                <span className="text-muted-foreground">Tools</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded border-2 border-green-500/30 bg-green-500/10"></div>
                <span className="text-muted-foreground">Services</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded border-2 border-blue-500/30 bg-blue-500/10"></div>
                <span className="text-muted-foreground">Storage</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded border-2 border-dashed border-purple-500/30 bg-purple-500/5"></div>
                <span className="text-muted-foreground">Optional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Architecture - L0 to L3 */}
      <section id="knowledge" className="scroll-target section-sm border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Knowledge Architecture
            </h2>
            <p className="mt-4 text-muted-foreground">
              Four-level knowledge hierarchy from raw observations to theoretical frameworks.
            </p>
          </div>

          {/* L0-L3 Visual Diagram */}
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              {/* L3 - Schema */}
              <div className="relative rounded-t-xl border-2 border-[hsl(var(--brand-purple))] bg-[hsl(var(--brand-purple))]/10 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-purple))] font-mono text-sm font-bold text-white">L3</span>
                    <div>
                      <h3 className="font-semibold text-[hsl(var(--brand-purple))]">Schema</h3>
                      <p className="text-sm text-muted-foreground">Theoretical frameworks, assertions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm text-[hsl(var(--brand-purple))]">9.0 - 10.0</span>
                    <p className="text-xs text-muted-foreground">Permanent</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-1">
                <div className="text-muted-foreground text-lg">↑</div>
              </div>

              {/* L2 - Pattern */}
              <div className="relative border-2 border-[hsl(var(--brand-blue))] bg-[hsl(var(--brand-blue))]/10 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-blue))] font-mono text-sm font-bold text-white">L2</span>
                    <div>
                      <h3 className="font-semibold text-[hsl(var(--brand-blue))]">Pattern</h3>
                      <p className="text-sm text-muted-foreground">Validated generalizations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm text-[hsl(var(--brand-blue))]">5.0 - 9.0</span>
                    <p className="text-xs text-muted-foreground">Durable</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-1">
                <div className="text-muted-foreground text-lg">↑</div>
              </div>

              {/* L1 - Learning */}
              <div className="relative border-2 border-[hsl(var(--brand-green))] bg-[hsl(var(--brand-green))]/10 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-green))] font-mono text-sm font-bold text-white">L1</span>
                    <div>
                      <h3 className="font-semibold text-[hsl(var(--brand-green))]">Learning</h3>
                      <p className="text-sm text-muted-foreground">Candidate insights, validated observations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm text-[hsl(var(--brand-green))]">1.0 - 5.0</span>
                    <p className="text-xs text-muted-foreground">Volatile</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-1">
                <div className="text-muted-foreground text-lg">↑</div>
              </div>

              {/* L0 - Observation */}
              <div className="relative rounded-b-xl border-2 border-border bg-muted/30 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted font-mono text-sm font-bold text-muted-foreground">L0</span>
                    <div>
                      <h3 className="font-semibold">Observation</h3>
                      <p className="text-sm text-muted-foreground">Raw intake, ephemeral</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm text-muted-foreground">0.0 - 1.0</span>
                    <p className="text-xs text-muted-foreground">Ephemeral</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Promotion Requirements */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="font-medium text-sm mb-2">L1 → L2 Promotion</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 3 validations required</li>
                  <li>• Minimum weight: 5.0</li>
                  <li>• Confidence ≥ 0.7</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="font-medium text-sm mb-2">L2 → L3 Promotion</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 5 validations required</li>
                  <li>• Minimum weight: 8.0</li>
                  <li>• Confidence ≥ 0.85</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MCP Tools - 16 Tools in 5 Categories */}
      <section id="tools" className="scroll-target section-sm border-b border-border">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              MCP Tools
            </h2>
            <p className="mt-4 text-muted-foreground">
              16 tools organized into 5 categories for complete memory management.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Core Memory */}
            <div className="rounded-xl border border-[hsl(var(--brand-blue))]/30 bg-[hsl(var(--brand-blue))]/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--brand-blue))]/20 font-mono text-sm font-bold text-[hsl(var(--brand-blue))]">4</span>
                <h3 className="font-semibold">Core Memory</h3>
              </div>
              <div className="space-y-2 font-mono text-sm text-muted-foreground">
                <div>update_memory</div>
                <div>delete_memory</div>
                <div>get_memory_by_id</div>
                <div>search</div>
              </div>
            </div>

            {/* Knowledge Intake */}
            <div className="rounded-xl border border-[hsl(var(--brand-green))]/30 bg-[hsl(var(--brand-green))]/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--brand-green))]/20 font-mono text-sm font-bold text-[hsl(var(--brand-green))]">3</span>
                <h3 className="font-semibold">Knowledge Intake</h3>
              </div>
              <div className="space-y-2 font-mono text-sm text-muted-foreground">
                <div>observe</div>
                <div>question</div>
                <div>bootstrap</div>
              </div>
            </div>

            {/* Knowledge Evolution */}
            <div className="rounded-xl border border-[hsl(var(--brand-purple))]/30 bg-[hsl(var(--brand-purple))]/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--brand-purple))]/20 font-mono text-sm font-bold text-[hsl(var(--brand-purple))]">3</span>
                <h3 className="font-semibold">Knowledge Evolution</h3>
              </div>
              <div className="space-y-2 font-mono text-sm text-muted-foreground">
                <div>reflect</div>
                <div>evolve</div>
                <div>resolve</div>
              </div>
            </div>

            {/* Reasoning */}
            <div className="rounded-xl border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))]/20 font-mono text-sm font-bold text-[hsl(var(--brand-orange))]">3</span>
                <h3 className="font-semibold">Reasoning</h3>
              </div>
              <div className="space-y-2 font-mono text-sm text-muted-foreground">
                <div>predict</div>
                <div>explain</div>
                <div>counterfactual</div>
              </div>
            </div>

            {/* Graph & Status */}
            <div className="rounded-xl border border-[hsl(var(--brand-pink))]/30 bg-[hsl(var(--brand-pink))]/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--brand-pink))]/20 font-mono text-sm font-bold text-[hsl(var(--brand-pink))]">3</span>
                <h3 className="font-semibold">Graph & Status</h3>
              </div>
              <div className="space-y-2 font-mono text-sm text-muted-foreground">
                <div>relate</div>
                <div>validate</div>
                <div>status</div>
              </div>
            </div>

            {/* Summary card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold">Tool Categories</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="text-[hsl(var(--brand-blue))]">•</span> Core Memory — CRUD + search</li>
                <li><span className="text-[hsl(var(--brand-green))]">•</span> Knowledge Intake — capture data</li>
                <li><span className="text-[hsl(var(--brand-purple))]">•</span> Knowledge Evolution — process & grow</li>
                <li><span className="text-[hsl(var(--brand-orange))]">•</span> Reasoning — predict & explain</li>
                <li><span className="text-[hsl(var(--brand-pink))]">•</span> Graph & Status — relationships</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="scroll-target section-sm border-b border-border">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Security Architecture
            </h2>
            <p className="mt-4 text-muted-foreground">
              Zero-privilege design. No elevated permissions required.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Permissions Table */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold">Required Permissions</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                  <span className="font-medium">File System</span>
                  <span className="text-right text-muted-foreground">~/.local-memory/ only</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                  <span className="font-medium">Network</span>
                  <span className="text-right text-muted-foreground">localhost:3002 (optional)</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                  <span className="font-medium">Process</span>
                  <span className="text-right text-muted-foreground">Standard user process</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-medium">Resources</span>
                  <span className="text-right text-muted-foreground">Standard allocation</span>
                </div>
              </div>
            </div>

            {/* No Elevation */}
            <div className="rounded-xl border border-[hsl(var(--brand-green))]/30 bg-[hsl(var(--brand-green))]/5 p-6">
              <h3 className="mb-4 font-semibold">No Elevation Required</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span>No sudo/administrator rights</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span>No system service installation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span>No background daemon registration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span>Runs entirely in user space</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span>No system-wide config changes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span>Docker/container compatible</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="scroll-target section-sm border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Data Flow & Privacy
            </h2>
            <p className="mt-4 text-muted-foreground">
              Complete data sovereignty. All processing happens on your machine.
            </p>
          </div>

          {/* Data Flow Diagram */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Local-First Data Flow</h3>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="rounded-lg border border-border bg-background px-3 py-2">User Input</span>
              <span className="text-muted-foreground">→</span>
              <span className="rounded-lg border border-border bg-background px-3 py-2">Local Validation</span>
              <span className="text-muted-foreground">→</span>
              <span className="rounded-lg border border-border bg-background px-3 py-2">Local Processing</span>
              <span className="text-muted-foreground">→</span>
              <span className="rounded-lg border border-border bg-background px-3 py-2">Local Storage</span>
              <span className="text-muted-foreground">→</span>
              <span className="rounded-lg border border-border bg-background px-3 py-2">User Output</span>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              No cloud. No external APIs. No data transmission.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Privacy Guarantees */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold">Privacy Guarantees</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span><strong>No Telemetry</strong> — Zero usage tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span><strong>No External Calls</strong> — Core functionality fully offline</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span><strong>Local AI</strong> — Ollama runs on your machine</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span><strong>Full Data Control</strong> — Complete ownership + portability</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span><strong>Air-Gap Compatible</strong> — Works without internet</span>
                </li>
              </ul>
            </div>

            {/* Data Categories */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold">Data Storage & Protection</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                  <span className="font-medium">User Memories</span>
                  <span className="text-right text-muted-foreground">SQLite, user-only access</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                  <span className="font-medium">Vector Embeddings</span>
                  <span className="text-right text-muted-foreground">Local DB/Qdrant</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                  <span className="font-medium">Configuration</span>
                  <span className="text-right text-muted-foreground">YAML files, user-only</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-medium">Session Data</span>
                  <span className="text-right text-muted-foreground">SQLite, user-only access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Characteristics */}
      <section className="section-sm border-b border-border">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Enterprise Characteristics
            </h2>
            <p className="mt-4 text-muted-foreground">
              Architectural properties that support enterprise security requirements.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">Data Residency</h3>
              <p className="text-sm text-muted-foreground">All data stored locally. No cloud transmission.</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">Network Isolation</h3>
              <p className="text-sm text-muted-foreground">Core works offline. Optional services bind to localhost.</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">Audit Logging</h3>
              <p className="text-sm text-muted-foreground">Structured JSON logging. Configurable verbosity.</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">User-Space Execution</h3>
              <p className="text-sm text-muted-foreground">No system privileges. Standard user permissions.</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">Minimal Attack Surface</h3>
              <p className="text-sm text-muted-foreground">Written in Go. No external API keys. No cloud integrations.</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">Offline Capable</h3>
              <p className="text-sm text-muted-foreground">Full functionality without internet after initial setup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container-tight text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Review the documentation or purchase a license.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/payment"
              className="btn-primary text-base"
              onClick={() => trackCTAClick("architecture", "Get Started", "/payment")}
            >
              Get Started — $49
            </Link>
            <Link
              to="/docs"
              className="btn-secondary text-base"
              onClick={() => trackCTAClick("architecture", "View Documentation", "/docs")}
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

export default ArchitectureNew;
