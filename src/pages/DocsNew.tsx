import { Link } from "react-router-dom";
import { useState } from "react";
import { Copy, ChevronDown } from "lucide-react";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";
import { trackCTAClick } from "@/lib/analytics";

const DocsNew = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const troubleshootingItems = [
    { challenge: "Command not found", resolution: "Ensure binary is in PATH or use full path", command: "local-memory --version" },
    { challenge: "Ollama not detected", resolution: "Install Ollama from ollama.ai", command: "curl -fsSL https://ollama.ai/install.sh | sh" },
    { challenge: "macOS security warning", resolution: "Remove quarantine attribute", command: "xattr -rd com.apple.quarantine /path/to/local-memory" },
    { challenge: "MCP tools not appearing", resolution: "Restart your AI editor after configuration", command: "claude mcp list" },
    { challenge: "Memory not persisting", resolution: "Check database path and permissions", command: "local-memory status" },
    { challenge: "License activation failed", resolution: "Include --accept-terms flag", command: "local-memory license activate LM-XXXX --accept-terms" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-wide relative py-16 text-center md:py-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Documentation</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Installation, configuration, and API reference.
          </p>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="border-b border-border bg-card/30">
        <div className="container-wide py-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#quick-start" className="text-muted-foreground hover:text-foreground">Quick Start</a>
            <span className="text-border">·</span>
            <a href="#mcp-tools" className="text-muted-foreground hover:text-foreground">MCP Tools</a>
            <span className="text-border">·</span>
            <a href="#rest-api" className="text-muted-foreground hover:text-foreground">REST API</a>
            <span className="text-border">·</span>
            <a href="#cli" className="text-muted-foreground hover:text-foreground">CLI</a>
            <span className="text-border">·</span>
            <a href="#troubleshooting" className="text-muted-foreground hover:text-foreground">Troubleshooting</a>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quick-start" className="scroll-target section-sm border-b border-border">
        <div className="container-tight">
          <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">Quick Start</h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--brand-blue))]/10 font-mono text-sm text-[hsl(var(--brand-blue))]">1</span>
                <h3 className="text-lg font-semibold">Install</h3>
              </div>
              <div className="terminal">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                  </div>
                </div>
                <div className="terminal-body">
                  <pre className="text-sm text-[hsl(var(--terminal-green))]">npm install -g local-memory-mcp</pre>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--brand-blue))]/10 font-mono text-sm text-[hsl(var(--brand-blue))]">2</span>
                <h3 className="text-lg font-semibold">Activate License</h3>
              </div>
              <div className="terminal">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                  </div>
                </div>
                <div className="terminal-body">
                  <pre className="text-sm text-[hsl(var(--terminal-green))]">local-memory license activate LM-XXXX-XXXX-XXXX --accept-terms</pre>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Replace with your license key from the purchase confirmation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--brand-blue))]/10 font-mono text-sm text-[hsl(var(--brand-blue))]">3</span>
                <h3 className="text-lg font-semibold">Start the Daemon</h3>
              </div>
              <div className="terminal">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                  </div>
                </div>
                <div className="terminal-body">
                  <pre className="text-sm text-[hsl(var(--terminal-green))]">local-memory start</pre>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Auto-detects Ollama and Qdrant. Starts REST API on port 3002.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--brand-blue))]/10 font-mono text-sm text-[hsl(var(--brand-blue))]">4</span>
                <h3 className="text-lg font-semibold">Connect Your Agent</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium">Claude Code:</p>
                  <div className="terminal">
                    <div className="terminal-body py-3">
                      <pre className="text-sm text-[hsl(var(--terminal-green))]">claude mcp add local-memory -- local-memory --mcp</pre>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Codex:</p>
                  <div className="terminal">
                    <div className="terminal-body py-3">
                      <pre className="text-sm text-[hsl(var(--terminal-green))]">codex mcp add local-memory -- local-memory --mcp</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Configs */}
          <div className="mt-8">
            <button
              onClick={() => toggleSection("editor-configs")}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-4 text-left"
            >
              <span className="font-medium">Other Editor Configurations</span>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openSections["editor-configs"] ? "rotate-180" : ""}`} />
            </button>
            {openSections["editor-configs"] && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="mb-2 text-sm font-medium">Claude Desktop</p>
                  <p className="mb-2 text-xs text-muted-foreground">~/.claude_desktop_config.json</p>
                  <pre className="overflow-x-auto rounded bg-background p-3 font-mono text-xs">{`{
  "mcpServers": {
    "local-memory": {
      "command": "/path/to/local-memory",
      "args": [
        "--mcp"
      ],
      "transport": "stdio"
    }
  }
}`}</pre>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="mb-2 text-sm font-medium">Cursor</p>
                  <p className="mb-2 text-xs text-muted-foreground">.cursor/mcp.json</p>
                  <pre className="overflow-x-auto rounded bg-background p-3 font-mono text-xs">{`{
  "servers": {
    "local-memory": {
      "command": "local-memory",
      "args": ["--mcp"]
    }
  }
}`}</pre>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="mb-2 text-sm font-medium">VS Code (Copilot)</p>
                  <p className="mb-2 text-xs text-muted-foreground">.vscode/mcp.json</p>
                  <pre className="overflow-x-auto rounded bg-background p-3 font-mono text-xs">{`{
  "servers": {
    "local-memory": {
      "command": "local-memory"
    }
  }
}`}</pre>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="mb-2 text-sm font-medium">Windsurf</p>
                  <p className="mb-2 text-xs text-muted-foreground">Settings → MCP Configuration</p>
                  <pre className="overflow-x-auto rounded bg-background p-3 font-mono text-xs">{`{
  "mcpServers": {
    "local-memory": {
      "command": "local-memory",
      "args": ["--mcp"]
    }
  }
}`}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MCP Tools */}
      <section id="mcp-tools" className="scroll-target section-sm border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">MCP Tools</h2>
            <p className="mt-2 text-muted-foreground">11 tools for AI agent integration via Model Context Protocol.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Core Memory */}
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="mb-3 font-semibold text-[hsl(var(--brand-blue))]">store_memory</h3>
              <p className="text-sm text-muted-foreground">Save new memories with content, importance, tags, and domain.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="mb-3 font-semibold text-[hsl(var(--brand-blue))]">update_memory</h3>
              <p className="text-sm text-muted-foreground">Modify existing memory content or metadata by ID.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="mb-3 font-semibold text-[hsl(var(--brand-blue))]">delete_memory</h3>
              <p className="text-sm text-muted-foreground">Remove a memory permanently by ID.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="mb-3 font-semibold text-[hsl(var(--brand-blue))]">get_memory_by_id</h3>
              <p className="text-sm text-muted-foreground">Retrieve a specific memory with full metadata.</p>
            </div>

            {/* Unified Tools */}
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="mb-3 font-semibold text-[hsl(var(--brand-green))]">search</h3>
              <p className="text-sm text-muted-foreground">Semantic, tag-based, date-range, or hybrid search across memories.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="mb-3 font-semibold text-[hsl(var(--brand-green))]">analysis</h3>
              <p className="text-sm text-muted-foreground">AI-powered Q&A, summarization, pattern analysis, temporal tracking.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="mb-3 font-semibold text-[hsl(var(--brand-green))]">relationships</h3>
              <p className="text-sm text-muted-foreground">Find related memories, discover connections, map knowledge graphs.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="mb-3 font-semibold text-[hsl(var(--brand-green))]">stats</h3>
              <p className="text-sm text-muted-foreground">Session, domain, and category statistics and analytics.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="mb-3 font-semibold text-[hsl(var(--brand-green))]">categories</h3>
              <p className="text-sm text-muted-foreground">Create, list, and auto-categorize memories with AI.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="mb-3 font-semibold text-[hsl(var(--brand-green))]">domains</h3>
              <p className="text-sm text-muted-foreground">Manage knowledge domains for organizing memories.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="mb-3 font-semibold text-[hsl(var(--brand-green))]">sessions</h3>
              <p className="text-sm text-muted-foreground">List sessions and retrieve session statistics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REST API */}
      <section id="rest-api" className="scroll-target section-sm border-b border-border">
        <div className="container-wide">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">REST API</h2>
            <p className="mt-2 text-muted-foreground">27 endpoints at localhost:3002/api/v1 for any HTTP client.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 font-semibold">Memory Operations</h3>
              <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                <li>POST /memories</li>
                <li>GET /memories</li>
                <li>GET /memories/search</li>
                <li>POST /memories/search</li>
                <li>GET /memories/:id</li>
                <li>PUT /memories/:id</li>
                <li>DELETE /memories/:id</li>
                <li>GET /memories/:id/related</li>
                <li>GET /memories/stats</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Analysis & Relationships</h3>
              <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                <li>POST /analyze</li>
                <li>POST /ask</li>
                <li>POST /summarize</li>
                <li>POST /relationships</li>
                <li>POST /relationships/discover</li>
                <li>GET /memories/:id/graph</li>
                <li>POST /temporal/patterns</li>
                <li>POST /temporal/progression</li>
                <li>POST /temporal/gaps</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Organization & System</h3>
              <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                <li>POST /categories</li>
                <li>GET /categories</li>
                <li>POST /memories/:id/categorize</li>
                <li>GET /categories/stats</li>
                <li>POST /domains</li>
                <li>GET /domains/:domain/stats</li>
                <li>GET /sessions</li>
                <li>GET /stats</li>
                <li>GET /health</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 font-semibold">Example Request</h3>
            <div className="terminal">
              <div className="terminal-header">
                <div className="flex gap-2">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                </div>
                <span className="ml-4 font-mono text-xs text-muted-foreground">curl</span>
              </div>
              <div className="terminal-body">
                <pre className="text-sm text-[hsl(var(--terminal-green))]">{`curl -X POST http://localhost:3002/api/v1/memories \\
  -H "Content-Type: application/json" \\
  -d '{"content": "JWT tokens expire after 24h", "importance": 8, "tags": ["auth"]}'`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLI */}
      <section id="cli" className="scroll-target section-sm border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">CLI Commands</h2>
            <p className="mt-2 text-muted-foreground">Direct terminal access for humans and shell scripts.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 font-semibold">Memory Commands</h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-border bg-background p-4">
                  <code className="text-sm text-[hsl(var(--brand-blue))]">local-memory remember "content" --tags x,y</code>
                  <p className="mt-2 text-xs text-muted-foreground">Store a new memory with tags</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <code className="text-sm text-[hsl(var(--brand-blue))]">local-memory search "query" --use_ai</code>
                  <p className="mt-2 text-xs text-muted-foreground">Search with semantic AI matching</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <code className="text-sm text-[hsl(var(--brand-blue))]">local-memory relate "A" to "B" --type expands</code>
                  <p className="mt-2 text-xs text-muted-foreground">Create relationship between concepts</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <code className="text-sm text-[hsl(var(--brand-blue))]">local-memory forget [id] --confirm</code>
                  <p className="mt-2 text-xs text-muted-foreground">Delete a memory by ID</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">System Commands</h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-border bg-background p-4">
                  <code className="text-sm text-[hsl(var(--brand-blue))]">local-memory start</code>
                  <p className="mt-2 text-xs text-muted-foreground">Start the daemon and REST API</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <code className="text-sm text-[hsl(var(--brand-blue))]">local-memory stop</code>
                  <p className="mt-2 text-xs text-muted-foreground">Stop the running daemon</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <code className="text-sm text-[hsl(var(--brand-blue))]">local-memory status --json</code>
                  <p className="mt-2 text-xs text-muted-foreground">Check daemon status</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <code className="text-sm text-[hsl(var(--brand-blue))]">local-memory doctor</code>
                  <p className="mt-2 text-xs text-muted-foreground">Run system diagnostics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="scroll-target section-sm border-b border-border">
        <div className="container-wide">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Troubleshooting</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 pr-4 text-left font-medium">Issue</th>
                  <th className="pb-3 pr-4 text-left font-medium">Resolution</th>
                  <th className="pb-3 text-left font-medium">Command</th>
                </tr>
              </thead>
              <tbody>
                {troubleshootingItems.map((item, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="py-3 pr-4 text-muted-foreground">{item.challenge}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{item.resolution}</td>
                    <td className="py-3">
                      <code className="rounded bg-card px-2 py-1 font-mono text-xs">{item.command}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="section-sm">
        <div className="container-tight text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Need Help?</h2>
          <p className="mt-4 text-muted-foreground">
            Join the Discord community for support, feature requests, and discussion.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://discord.gg/rMmn8xP3fZ"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              onClick={() => trackCTAClick("docs", "Join Discord", "https://discord.gg/rMmn8xP3fZ")}
            >
              Join Discord
            </a>
            <Link
              to="/architecture"
              className="btn-secondary"
              onClick={() => trackCTAClick("docs", "View Architecture", "/architecture")}
            >
              View architecture
            </Link>
          </div>
        </div>
      </section>

      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default DocsNew;
