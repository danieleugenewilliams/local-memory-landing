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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-wide relative">
          <div className="flex flex-col items-center justify-center py-20 text-center md:py-28">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Local-first architecture
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Enterprise-grade security. Zero cloud dependency. Your data never leaves.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="border-t border-b border-border bg-card/30">
        <div className="container-wide py-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#diagram" className="text-muted-foreground hover:text-foreground">System Diagram</a>
            <span className="text-border">·</span>
            <a href="#layers" className="text-muted-foreground hover:text-foreground">Architecture Layers</a>
            <span className="text-border">·</span>
            <a href="#security" className="text-muted-foreground hover:text-foreground">Security</a>
            <span className="text-border">·</span>
            <a href="#privacy" className="text-muted-foreground hover:text-foreground">Privacy</a>
            <span className="text-border">·</span>
            <a href="#compliance" className="text-muted-foreground hover:text-foreground">Enterprise</a>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section id="diagram" className="scroll-target section-sm border-t border-border">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              System Architecture
            </h2>
          </div>

          {/* Stats Row */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="font-mono text-3xl font-bold text-[hsl(var(--brand-blue))]">5</div>
              <div className="mt-1 text-sm text-muted-foreground">Architecture Layers</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="font-mono text-3xl font-bold text-[hsl(var(--brand-green))]">11</div>
              <div className="mt-1 text-sm text-muted-foreground">MCP Tools</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="font-mono text-3xl font-bold text-[hsl(var(--brand-purple))]">27</div>
              <div className="mt-1 text-sm text-muted-foreground">REST Endpoints</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="font-mono text-3xl font-bold text-[hsl(var(--brand-orange))]">0</div>
              <div className="mt-1 text-sm text-muted-foreground">External Data Transfers</div>
            </div>
          </div>

          {/* Diagram */}
          <div className="rounded-xl border border-border bg-card p-4 md:p-6">
            <img
              src="/images/system-architecture.png"
              alt="Local Memory System Architecture - 5 layers from External Clients through Entry Points, MCP Tools, Services, to Storage"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Architecture Layers */}
      <section id="layers" className="scroll-target section-sm border-t border-border">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Architecture Layers
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* External Clients */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--brand-blue))]/10 font-mono text-sm text-[hsl(var(--brand-blue))]">1</span>
                <h3 className="font-semibold">External Clients</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                MCP clients (Claude Code, Cursor, VSCode, Cline), REST API clients, CLI users, future web interface.
              </p>
            </div>

            {/* Entry Points */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))]/10 font-mono text-sm text-[hsl(var(--brand-orange))]">2</span>
                <h3 className="font-semibold">Entry Points</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Single binary with multi-mode detection. MCP server (JSON-RPC/stdio), REST API (HTTP:3002), CLI handler (Cobra).
              </p>
            </div>

            {/* MCP Tools */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--brand-purple))]/10 font-mono text-sm text-[hsl(var(--brand-purple))]">3</span>
                <h3 className="font-semibold">MCP Tools (11 Total)</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                4 core operations + 7 unified tools. Session filtering, token optimization (up to 95% reduction), cross-session access.
              </p>
            </div>

            {/* Services */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--brand-green))]/10 font-mono text-sm text-[hsl(var(--brand-green))]">4</span>
                <h3 className="font-semibold">Services Layer</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                8 services with dependency injection: Manager, Memory, Vector, Analysis, Ollama, Qdrant, License, Setup.
              </p>
            </div>

            {/* Storage */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--brand-pink))]/10 font-mono text-sm text-[hsl(var(--brand-pink))]">5</span>
                <h3 className="font-semibold">Storage Layer</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                SQLite primary database, optional Qdrant vector DB, SQLite vector fallback with cosine similarity.
              </p>
            </div>

            {/* Optional Services */}
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted font-mono text-sm text-muted-foreground">+</span>
                <h3 className="font-semibold text-muted-foreground">Optional Services</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ollama AI (embeddings + chat), Qdrant Vector DB. Both run locally on your machine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="scroll-target section-sm border-t border-border">
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

          {/* Process Isolation */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Process & Boundary Isolation</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-sm">
                <span className="font-medium">Single User-Space Process</span>
                <p className="text-muted-foreground">No system-level privileges</p>
              </div>
              <div className="text-sm">
                <span className="font-medium">Designated Directory</span>
                <p className="text-muted-foreground">All ops confined to ~/.local-memory/</p>
              </div>
              <div className="text-sm">
                <span className="font-medium">No System Modifications</span>
                <p className="text-muted-foreground">No kernel modules or drivers</p>
              </div>
              <div className="text-sm">
                <span className="font-medium">Network Isolation</span>
                <p className="text-muted-foreground">localhost interfaces only</p>
              </div>
              <div className="text-sm">
                <span className="font-medium">Clean Lifecycle</span>
                <p className="text-muted-foreground">Graceful shutdown, proper cleanup</p>
              </div>
              <div className="text-sm">
                <span className="font-medium">Container Ready</span>
                <p className="text-muted-foreground">Full Docker isolation support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="scroll-target section-sm border-t border-border">
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
                  <span><strong>No Cloud Dependencies</strong> — All processing local</span>
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
                  <span className="text-right text-muted-foreground">JSON files, user-only</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-medium">Session Data</span>
                  <span className="text-right text-muted-foreground">SQLite, user-only access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">No Built-in Secrets Required</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
              <div>
                <span className="font-medium">Ollama</span>
                <p className="text-muted-foreground">No auth required</p>
              </div>
              <div>
                <span className="font-medium">Qdrant</span>
                <p className="text-muted-foreground">No auth required</p>
              </div>
              <div>
                <span className="font-medium">License Key</span>
                <p className="text-muted-foreground">Stored locally only</p>
              </div>
              <div>
                <span className="font-medium">Cloud API Keys</span>
                <p className="text-muted-foreground">Not needed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Characteristics */}
      <section id="compliance" className="scroll-target section-sm border-t border-border">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Enterprise Characteristics
            </h2>
            <p className="mt-4 text-muted-foreground">
              Architectural properties that support enterprise security requirements.
            </p>
          </div>

          {/* Characteristics Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">Data Residency</h3>
              <p className="text-sm text-muted-foreground">All data stored locally on user's machine. No cloud transmission.</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">Network Isolation</h3>
              <p className="text-sm text-muted-foreground">Core functionality works offline. Optional services bind to localhost only.</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">Audit Logging</h3>
              <p className="text-sm text-muted-foreground">Structured JSON logging for all operations. Configurable verbosity.</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">User-Space Execution</h3>
              <p className="text-sm text-muted-foreground">No system privileges required. Runs under standard user permissions.</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">Minimal Attack Surface</h3>
              <p className="text-sm text-muted-foreground">47 Go dependencies. No external API keys. No cloud integrations.</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 font-semibold">Offline Capable</h3>
              <p className="text-sm text-muted-foreground">Full functionality without internet after initial Ollama model download.</p>
            </div>
          </div>

          {/* Risk Profile */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Architectural Risk Factors</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              <div>
                <span className="font-medium">Network Exposure</span>
                <p className="text-muted-foreground">Localhost only (optional REST API)</p>
              </div>
              <div>
                <span className="font-medium">Privilege Level</span>
                <p className="text-muted-foreground">Standard user permissions</p>
              </div>
              <div>
                <span className="font-medium">External Dependencies</span>
                <p className="text-muted-foreground">47 pinned Go modules</p>
              </div>
              <div>
                <span className="font-medium">Data Transmission</span>
                <p className="text-muted-foreground">None (local processing only)</p>
              </div>
              <div>
                <span className="font-medium">Secrets Required</span>
                <p className="text-muted-foreground">License key only (stored locally)</p>
              </div>
              <div>
                <span className="font-medium">Code Visibility</span>
                <p className="text-muted-foreground">Architecture documented</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supply Chain & Vulnerability */}
      <section className="section-sm border-t border-border">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Supply Chain */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold">Supply Chain Security</h3>
              <div className="mb-4 rounded-lg border border-border bg-background p-4 text-center">
                <div className="font-mono text-3xl font-bold text-[hsl(var(--brand-purple))]">47</div>
                <div className="text-sm text-muted-foreground">Go modules total</div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span>Version pinning on all dependencies</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span>Cryptographic checksum verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span>Regular CVE monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[hsl(var(--brand-green))]">✓</span>
                  <span>Reproducible builds</span>
                </li>
              </ul>
            </div>

            {/* Update Cycle */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold">Update & Patching</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                  <span className="font-medium">Critical Security</span>
                  <span className="text-right text-muted-foreground">24-48 hours</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                  <span className="font-medium">Security Patches</span>
                  <span className="text-right text-muted-foreground">1 week</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                  <span className="font-medium">Feature Updates</span>
                  <span className="text-right text-muted-foreground">Monthly</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-medium">Dependency Updates</span>
                  <span className="text-right text-muted-foreground">Bi-weekly scan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Practices */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Security Practices</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              <div>
                <span className="font-medium">Input Validation</span>
                <p className="text-muted-foreground">Comprehensive sanitization</p>
              </div>
              <div>
                <span className="font-medium">SQL Injection Protection</span>
                <p className="text-muted-foreground">Prepared statements throughout</p>
              </div>
              <div>
                <span className="font-medium">Memory Protection</span>
                <p className="text-muted-foreground">Content size limits</p>
              </div>
              <div>
                <span className="font-medium">Error Handling</span>
                <p className="text-muted-foreground">No sensitive info leakage</p>
              </div>
              <div>
                <span className="font-medium">Session Isolation</span>
                <p className="text-muted-foreground">Proper data separation</p>
              </div>
              <div>
                <span className="font-medium">Rate Limiting</span>
                <p className="text-muted-foreground">API endpoint protection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm border-t border-border">
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
        </div>
      </section>

      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default ArchitectureNew;
