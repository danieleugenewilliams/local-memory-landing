import { Helmet } from "react-helmet-async";
import { useCheckout } from "@/contexts/CheckoutContext";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollToTop from "@/components/ScrollToTop";

/* Architecture — redesigned from Architecture.dc.html.
   Content validated against local-memory-golang:
   - storage default is unified-memories.db (not memories.db)
   - promotion thresholds: L1→L2 conf ≥ 0.8; L2→L3 weight ≥ 9.0, conf ≥ 0.9 */

const CONTAINER = "mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16 box-border";

const STATS = [
  { value: "24", label: "MCP tools" },
  { value: "4", label: "knowledge levels" },
  { value: "1", label: "binary, zero deps" },
  { value: "0", label: "external transfers" },
];

const ENTRY_POINTS = [
  { name: "MCP server", detail: "stdio · local-memory --mcp" },
  { name: "REST API", detail: "localhost:3002/api/v1" },
  { name: "CLI", detail: "local-memory <command>" },
];

const ENGINE = [
  { name: "Intake", detail: "observe · question" },
  { name: "Evolution", detail: "reflect · evolve · resolve" },
  { name: "Reasoning", detail: "predict · explain · counterfactual" },
  { name: "Graph", detail: "relate · discover · map_graph" },
];

const CLIENTS = [
  "Claude Desktop / Code",
  "Cursor · Gemini · Codex",
  "Any HTTP client",
  "Your terminal",
];

const MATURATION_STACK = [
  { level: "L3", name: "Schema", range: "9.0–10 · permanent", width: "46%", bg: "bg-lm-ink", tag: "text-lm-gold", range_c: "text-[#b8ad99]", promote: "↑ promote" },
  { level: "L2", name: "Pattern", range: "5.0–9.0 · durable", width: "62%", bg: "bg-lm-ink-soft", tag: "text-lm-gold", range_c: "text-[#b8ad99]", promote: "↑ promote" },
  { level: "L1", name: "Learning", range: "1.0–5.0 · volatile", width: "78%", bg: "bg-lm-stone-2", tag: "text-lm-honey", range_c: "text-lm-line", promote: "↑ reflect" },
  { level: "L0", name: "Observation", range: "0.0–1.0 · ephemeral", width: "94%", bg: "bg-lm-sand border border-lm-line-2", tag: "text-lm-amber", range_c: "text-lm-muted", promote: null, dark: false },
];

const TOOL_CATEGORIES = [
  { name: "Core memory", count: 4, tools: ["observe", "update_memory", "delete_memory", "get_memory_by_id"] },
  { name: "Search & retrieval", count: 3, tools: ["search", "ask", "summarize"] },
  { name: "Relationships", count: 4, tools: ["relate", "find_related", "discover", "map_graph"] },
  { name: "Knowledge evolution", count: 5, tools: ["reflect", "evolve", "question", "questions", "resolve"] },
  { name: "Reasoning", count: 4, tools: ["predict", "explain", "counterfactual", "validate"] },
  { name: "Session", count: 2, tools: ["bootstrap", "status"] },
  { name: "Temporal", count: 1, tools: ["temporal"] },
  { name: "Management", count: 1, tools: ["migrate_domain"] },
];

const SECURITY_ROWS = [
  { k: "File system", v: "~/.local-memory/ only" },
  { k: "Network", v: "localhost:3002 — optional, loopback only" },
  { k: "Process", v: "Standard user process — no sudo, ever" },
  { k: "Telemetry", v: "None. Nothing phones home." },
];

const SECURITY_CHECKS = [
  "No system service installation or daemon registration",
  "Runs entirely in user space; Docker/container compatible",
  "Security hardening: API key redaction, SSRF protection, command-injection prevention, secure file permissions",
  "With Ollama as provider, even AI inference stays on-device",
];

const cardBox = "border border-lm-line-2 rounded-xl bg-lm-cream px-[26px] py-5";
const engineTile = "border border-lm-line rounded-lg bg-lm-sand px-4 py-3";

const Architecture = () => {
  const { openCheckout } = useCheckout();

  return (
    <div className="lm-theme min-h-screen">
      <Helmet>
        <title>Architecture — Local Memory</title>
        <meta
          name="description"
          content="A layered cognitive system in a single binary — every layer, from protocol handlers to vector storage, runs on your machine and nowhere else."
        />
      </Helmet>

      <SiteHeader />

      <main>
        {/* Hero */}
        <section className={`${CONTAINER} pb-[52px] pt-[72px]`}>
          <div className="mb-5 font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
            Architecture · World Memory
          </div>
          <h1 className="mb-5 max-w-[22ch] text-balance font-serif text-[42px] font-normal leading-[1.1] tracking-[-0.02em] text-lm-ink sm:text-[52px]">
            How Local Memory <em className="italic text-lm-amber">thinks.</em>
          </h1>
          <p className="mb-9 max-w-[58ch] text-[17px] leading-[1.65] text-lm-stone">
            A layered cognitive system in a single binary — every layer, from protocol handlers to
            vector storage, runs on your machine and nowhere else.
          </p>
          <div className="grid max-w-[760px] grid-cols-2 overflow-hidden rounded-xl border border-lm-line sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`px-6 py-5 ${i < STATS.length - 1 ? "sm:border-r border-lm-line" : ""} ${
                  i < 2 ? "border-b sm:border-b-0 border-lm-line" : ""
                } ${i % 2 === 0 ? "border-r sm:border-r" : ""}`}
              >
                <div className="font-serif text-[30px] text-lm-amber">{s.value}</div>
                <div className="font-plex text-xs text-lm-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* System diagram */}
        <section className="border-t border-lm-line bg-lm-sand">
          <div className={`${CONTAINER} pb-[76px] pt-[68px]`}>
            <div className="mb-11 max-w-[62ch]">
              <div className="mb-4 font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
                System diagram
              </div>
              <h2 className="font-serif text-[36px] font-normal leading-[1.15] tracking-[-0.02em] text-lm-ink">
                Five layers, one boundary
              </h2>
            </div>

            <div className="mx-auto flex max-w-[880px] flex-col">
              {/* Clients */}
              <div className={cardBox}>
                <div className="mb-3.5 font-plex text-[11px] font-medium uppercase tracking-[0.08em] text-lm-muted">
                  Clients — anything that talks
                </div>
                <div className="flex flex-wrap gap-3">
                  {CLIENTS.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg border border-lm-line bg-lm-sand px-4 py-2.5 font-plex text-[13px] text-lm-stone"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="py-2 text-center font-plex text-base text-lm-amber">↓</div>

              {/* Boundary */}
              <div className="relative rounded-2xl border-2 border-dashed border-[#c4a24a] p-[22px]">
                <span className="absolute -top-[11px] left-7 bg-lm-sand px-3 font-plex text-[11px] font-semibold tracking-[0.08em] text-lm-amber">
                  YOUR MACHINE — NOTHING CROSSES THIS LINE
                </span>

                {/* Entry points */}
                <div className={cardBox}>
                  <div className="mb-3.5 font-plex text-[11px] font-medium uppercase tracking-[0.08em] text-lm-muted">
                    Entry points — one binary, three protocols
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {ENTRY_POINTS.map((e) => (
                      <div key={e.name} className={engineTile}>
                        <div className="font-plex text-[13px] font-medium text-lm-ink">{e.name}</div>
                        <div className="text-[11.5px] text-lm-muted">{e.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="py-2 text-center font-plex text-base text-lm-amber">↓</div>

                {/* Knowledge engine */}
                <div className={cardBox}>
                  <div className="mb-3.5 font-plex text-[11px] font-medium uppercase tracking-[0.08em] text-lm-muted">
                    Knowledge engine — the cognitive core
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {ENGINE.map((e) => (
                      <div key={e.name} className={engineTile}>
                        <div className="font-plex text-[13px] font-medium text-lm-ink">{e.name}</div>
                        <div className="text-[11.5px] text-lm-muted">{e.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="py-2 text-center font-plex text-base text-lm-amber">↓</div>

                {/* Providers + storage */}
                <div className="grid gap-3 md:grid-cols-2">
                  <div className={cardBox}>
                    <div className="mb-3.5 font-plex text-[11px] font-medium uppercase tracking-[0.08em] text-lm-muted">
                      AI providers — pluggable
                    </div>
                    <div className="font-plex text-[13px] leading-[1.9] text-lm-stone">
                      <div>
                        Ollama <span className="text-lm-muted">(local, default)</span>
                      </div>
                      <div>OpenAI-compatible · OpenAI · Anthropic · claude CLI</div>
                      <div className="text-lm-muted">
                        split embeddings/chat · fallback chains · circuit breakers
                      </div>
                    </div>
                  </div>
                  <div className={cardBox}>
                    <div className="mb-3.5 font-plex text-[11px] font-medium uppercase tracking-[0.08em] text-lm-muted">
                      Storage — yours
                    </div>
                    <div className="font-plex text-[13px] leading-[1.9] text-lm-stone">
                      <div>
                        SQLite <span className="text-lm-muted">~/.local-memory/unified-memories.db</span>
                      </div>
                      <div>
                        Embedded vector index <span className="text-lm-muted">10–57ms semantic search</span>
                      </div>
                      <div className="text-lm-muted">automatic creation · single-file, WAL journaling</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Knowledge levels */}
        <section className="border-t border-lm-line">
          <div className={`${CONTAINER} grid items-start gap-16 pb-[76px] pt-[68px] lg:grid-cols-[0.9fr_1.1fr]`}>
            <div>
              <div className="mb-4 font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
                Knowledge architecture
              </div>
              <h2 className="mb-[18px] font-serif text-[36px] font-normal leading-[1.15] tracking-[-0.02em] text-lm-ink">
                Knowledge earns its permanence
              </h2>
              <p className="mb-7 text-[15.5px] leading-[1.65] text-lm-stone">
                Every memory enters at the bottom and climbs by proving itself. Weight rises with
                validation; unvalidated knowledge decays and archives. The top of the stack is what
                your agent trusts most.
              </p>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="rounded-[10px] border border-lm-line px-5 py-[18px]">
                  <div className="mb-2.5 font-plex text-[12.5px] font-medium text-lm-amber">L1 → L2</div>
                  <div className="font-plex text-[12.5px] leading-[1.9] text-lm-stone">
                    3 validations
                    <br />
                    weight ≥ 5.0
                    <br />
                    confidence ≥ 0.8
                  </div>
                </div>
                <div className="rounded-[10px] border border-lm-line px-5 py-[18px]">
                  <div className="mb-2.5 font-plex text-[12.5px] font-medium text-lm-amber">L2 → L3</div>
                  <div className="font-plex text-[12.5px] leading-[1.9] text-lm-stone">
                    5 validations
                    <br />
                    weight ≥ 9.0
                    <br />
                    confidence ≥ 0.9
                  </div>
                </div>
              </div>
            </div>

            {/* Maturation stack */}
            <div className="flex flex-col items-center gap-1.5">
              {MATURATION_STACK.map((m) => (
                <div key={m.level} className="contents">
                  <div
                    className={`flex items-baseline justify-between gap-4 rounded-[10px] px-[22px] py-4 ${m.bg} ${
                      m.level === "L0" ? "text-lm-ink" : "text-lm-cream"
                    }`}
                    style={{ width: m.width }}
                  >
                    <div>
                      <span className={`font-plex text-xs font-medium ${m.tag}`}>{m.level}</span>
                      <span className="ml-2 font-serif text-[15px] font-medium">{m.name}</span>
                    </div>
                    <span className={`font-plex text-[11px] ${m.range_c}`}>{m.range}</span>
                  </div>
                  {m.promote && (
                    <div className="font-plex text-[14px] text-lm-amber">{m.promote}</div>
                  )}
                </div>
              ))}
              <div className="mt-2.5 font-plex text-xs text-lm-muted">
                ↓ unvalidated knowledge decays &amp; archives ↓
              </div>
            </div>
          </div>
        </section>

        {/* Tool catalog */}
        <section className="border-t border-lm-line bg-lm-sand">
          <div className={`${CONTAINER} pb-[76px] pt-[68px]`}>
            <div className="mb-10 max-w-[62ch]">
              <div className="mb-4 font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
                Tool catalog
              </div>
              <h2 className="mb-3.5 font-serif text-[36px] font-normal leading-[1.15] tracking-[-0.02em] text-lm-ink">
                24 tools, 8 categories
              </h2>
              <p className="text-[15px] leading-relaxed text-lm-stone">
                Every tool is available over MCP, REST, and CLI with identical behavior. Full
                parameters in the{" "}
                <a href="/docs" className="text-lm-amber hover:underline">
                  docs
                </a>
                .
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TOOL_CATEGORIES.map((cat) => (
                <div key={cat.name} className="rounded-xl border border-lm-line bg-lm-cream px-6 py-[22px]">
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="font-serif text-[15px] font-medium text-lm-ink">{cat.name}</span>
                    <span className="font-plex text-[11px] font-medium text-lm-amber">{cat.count}</span>
                  </div>
                  <div className="font-plex text-[12.5px] leading-[2] text-lm-stone-2">
                    {cat.tools.map((t) => (
                      <div key={t}>{t}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security & privacy */}
        <section className="border-t border-lm-line">
          <div className={`${CONTAINER} pb-[76px] pt-[68px]`}>
            <div className="mb-10 max-w-[62ch]">
              <div className="mb-4 font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
                Security &amp; privacy
              </div>
              <h2 className="font-serif text-[36px] font-normal leading-[1.15] tracking-[-0.02em] text-lm-ink">
                Zero-privilege by design
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-lm-line">
                <div className="border-b border-lm-line bg-lm-sand px-6 py-4 font-serif text-sm font-medium text-lm-ink">
                  Required permissions — all of them
                </div>
                <div>
                  {SECURITY_ROWS.map((row, i) => (
                    <div
                      key={row.k}
                      className={`grid grid-cols-[130px_1fr] ${
                        i < SECURITY_ROWS.length - 1 ? "border-b border-lm-line/60" : ""
                      }`}
                    >
                      <div className="px-6 py-3.5 font-plex text-xs font-medium text-lm-amber">{row.k}</div>
                      <div className="px-6 py-3.5 text-[13px] text-lm-stone">{row.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center rounded-xl border border-lm-line px-8 py-7">
                <div className="flex flex-col gap-3.5 text-sm leading-snug text-lm-stone">
                  {SECURITY_CHECKS.map((c) => (
                    <div key={c} className="flex gap-3">
                      <span className="text-lm-amber">✓</span> {c}
                    </div>
                  ))}
                </div>
                <p className="mt-6 font-serif text-xl italic leading-snug text-lm-ink">
                  Your knowledge is an asset. It never leaves the building.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="border-t border-lm-line bg-lm-ink text-[#f3ead9]">
          <div className={`${CONTAINER} flex flex-col items-start justify-between gap-6 py-14 sm:flex-row sm:items-center`}>
            <div>
              <div className="mb-1.5 font-serif text-[26px] text-[#f3ead9]">
                Architecture you can audit, on hardware you own.
              </div>
              <div className="font-plex text-[13px] text-[#78716c]">
                $49 one-time · 5-day refund · 100% local
              </div>
            </div>
            <button
              onClick={openCheckout}
              className="shrink-0 rounded-lg bg-lm-gold px-7 py-3.5 text-[15px] font-semibold text-lm-ink-deep transition-colors hover:bg-lm-gold-2"
            >
              Get Started — $49
            </button>
          </div>
        </section>
      </main>

      <SiteFooter minimal />
      <ScrollToTop />
    </div>
  );
};

export default Architecture;
