import { Helmet } from "react-helmet-async";
import { useCheckout } from "@/contexts/CheckoutContext";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollToTop from "@/components/ScrollToTop";

/* ------------------------------------------------------------------ *
 * Redesigned landing page — "Local Memory Landing" from Claude Design.
 * Warm-paper theme (lm-* tokens), Newsreader serif + IBM Plex Mono.
 * ------------------------------------------------------------------ */

const CTA_LABEL = "Get Started — $49";

const PROBLEM_CARDS = [
  {
    title: "Drowns at scale",
    rows: [
      { text: "100 memories", note: "— works great" },
      { text: "1,000 memories", note: "— getting noisy" },
      { text: "10,000 memories", note: "— chaos", danger: true },
    ],
    caption: "When everything has the same weight, signal drowns in noise.",
  },
  {
    title: "Contradictions accumulate",
    rows: [
      { text: 'Jan — "Use React"' },
      { text: 'Mar — "Vue migration complete"' },
      { text: "→ both stored; AI picks randomly", danger: true },
    ],
    caption: "Append-only memory has no mechanism for truth. Old and new coexist forever.",
  },
  {
    title: "Confident hallucination",
    rows: [
      { text: 'Query — "API rate limit?"' },
      { text: "Memory — no results" },
      { text: '→ "Probably 100 req/min" (made up)', danger: true },
    ],
    caption: "No way to track unknowns — when nothing's found, AI guesses.",
  },
  {
    title: "Memory graveyard",
    rows: [
      { text: '"Use Node 16"', note: "(2 years old)" },
      { text: '"John handles deploys"', note: "(John left)" },
      { text: '"API at /v1/users"', note: "(now /v2)" },
    ],
    caption: "Memories never die. Every stale fact pollutes results forever.",
  },
];

const DIFFERENTIATORS = [
  {
    marker: "L0→L3",
    title: "Knowledge hierarchy",
    body: "Knowledge earns its permanence. Truths surface first.",
  },
  {
    marker: "⚡",
    title: "Contradiction detection",
    body: "Conflicts flagged before they mislead. You decide what's true.",
  },
  {
    marker: "?",
    title: "Gap tracking",
    body: '"I don\'t have this" instead of confident hallucination.',
  },
  {
    marker: "↻",
    title: "Knowledge evolution",
    body: "Stale facts decay and archive. Current knowledge stays sharp.",
  },
];

const MATURATION = [
  { level: "L0 · observation", text: '"User mentioned tabs"' },
  { level: "L1 · learning", text: '"User prefers tabs"', suffix: "(validated)" },
  { level: "L2 · pattern", text: '"Follows Google style"' },
  { level: "L3 · schema", text: '"Senior dev, readability focus"' },
];

const INTEGRATION_POINTS = [
  "MCP native — first-class in Claude Desktop & Code",
  "REST API — GPT, Gemini, Codex, custom agents",
  "CLI — scripting, automation, cron",
  "SQLite storage — your data never leaves your machine",
];

const COMPARISON_ROWS = [
  { capability: "Your data stays local", lm: "Always", cloud: "Never", md: "Always" },
  { capability: "Semantic search", lm: "10–57ms", cloud: "Variable", md: "Manual" },
  { capability: "Cross-agent memory", lm: "Universal", cloud: "Vendor lock", md: "Copy/paste" },
  { capability: "Knowledge evolution", lm: "L0→L3 hierarchy", cloud: "Flat", md: "None" },
  { capability: "Contradiction detection", lm: "Built-in", cloud: "None", md: "None" },
  { capability: "Never trains AI models", lm: "Guaranteed", cloud: "Trust required", md: "Guaranteed" },
];

// Genuine, sourced testimonials only. Verbatim from the shipped site
// (PaymentNew.tsx Discord quotes; TrustedByDevelopers.tsx featured quote).
const TESTIMONIALS = [
  {
    quote:
      "It's much simpler to set up than similar memory tools. That's honestly what I'm liking about it.",
    author: "electric_espeon · Discord",
  },
  {
    quote:
      "I actually think it's great value for money and you improve upon suggestions. Well done!",
    author: "Jamie · Discord",
  },
  {
    quote: "I find it amazing for long running Claude Code sessions.",
    author: "EstablishedMando · Discord",
  },
];

const PRICE_FEATURES = [
  "Full cognitive engine — hierarchy, contradictions, gaps, evolution",
  "MCP + REST + CLI on every platform",
  "10–57ms semantic search · runs fully on-device",
  "Lifetime updates — every feature we ship, forever",
  "100% local — your knowledge stays yours, guaranteed",
];

const SECTION_X = "px-6 sm:px-10 lg:px-16";
const CONTAINER = `mx-auto max-w-[1280px] ${SECTION_X} box-border`;

const Landing = () => {
  const { openCheckout } = useCheckout();

  return (
    <div className="lm-theme min-h-screen">
      <Helmet>
        <title>Local Memory — A knowledge layer for every AI agent</title>
        <meta
          name="description"
          content="Local Memory gives every coding agent a knowledge layer that matures — observations become learnings, learnings become patterns. 100% local, MCP native, pay once."
        />
      </Helmet>

      <SiteHeader />

      <main>
        {/* ============ Hero ============ */}
        <section className={`${CONTAINER} grid items-center gap-16 pb-[76px] pt-[92px] lg:grid-cols-[1.1fr_0.9fr]`}>
          <div>
            <div className="mb-[22px] font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
              100% local · MCP native · pay once
            </div>
            <h1 className="mb-6 text-balance font-serif text-[42px] font-normal leading-[1.07] tracking-[-0.02em] text-lm-ink sm:text-[52px] lg:text-[60px]">
              Your files are for working.{" "}
              <em className="not-italic text-lm-amber">
                <span className="italic">Memory is for knowing.</span>
              </em>
            </h1>
            <p className="mb-8 max-w-[48ch] text-[17.5px] leading-[1.65] text-lm-stone">
              Local Memory gives every coding agent a knowledge layer that matures — observations
              become learnings, learnings become patterns, patterns become understanding.
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={openCheckout}
                className="rounded-lg bg-lm-ink px-[26px] py-3.5 text-[15px] font-semibold text-lm-cream transition-colors hover:bg-lm-ink-soft"
              >
                {CTA_LABEL}
              </button>
              <a
                href="#architecture"
                className="rounded-lg border border-lm-line-2 px-[26px] py-3.5 text-[15px] font-medium text-lm-ink transition-colors hover:border-lm-amber hover:text-lm-amber"
              >
                See the architecture
              </a>
            </div>
            <div className="mt-7 font-plex text-[12.5px] text-lm-muted">
              Works with Claude, GPT, Gemini, Cursor + any MCP client
            </div>
          </div>

          {/* Terminal card */}
          <div className="rounded-xl bg-lm-ink px-[26px] py-6 font-plex text-[13.5px] leading-[1.9] shadow-[0_24px_48px_-20px_rgba(31,27,22,0.45)]">
            <div className="mb-[18px] flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#5c5347]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#5c5347]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#5c5347]" />
            </div>
            <div className="text-[#b8ad99]">
              <span className="text-lm-gold">$</span> local-memory search "auth patterns"
            </div>
            <div className="text-[#78716c]">→ 3 memories · 23ms</div>
            <div className="text-lm-cream">L2 · "JWT refresh in middleware, not routes"</div>
            <div className="text-[#b8ad99]">L1 · "Session store moved to Redis, May 12"</div>
            <div className="text-[#78716c]">
              L0 · "Prefers httpOnly cookies"{" "}
              <span className="ml-0.5 inline-block h-[15px] w-[7px] animate-lm-blink bg-lm-gold align-text-bottom" />
            </div>
          </div>
        </section>

        {/* ============ Problem ============ */}
        <section className="border-t border-lm-line bg-lm-sand">
          <div className={`${CONTAINER} pb-20 pt-[76px]`}>
            <div className="mb-[52px] max-w-[62ch]">
              <div className="mb-[18px] font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
                Why other memory tools fail
              </div>
              <h2 className="mb-4 font-serif text-[40px] font-normal leading-[1.15] tracking-[-0.02em] text-lm-ink">
                Flat memory is broken by design
              </h2>
              <p className="text-base leading-relaxed text-lm-stone">
                You tried the free tools. They worked at first — then they stopped. Here's why.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {PROBLEM_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-lm-line bg-lm-cream px-[30px] py-7"
                >
                  <div className="mb-3.5 font-serif text-lg font-medium text-lm-ink">{card.title}</div>
                  <div className="font-plex text-[13px] leading-[2] text-lm-stone">
                    {card.rows.map((row, i) => (
                      <div key={i} className={row.danger ? "text-lm-rust" : undefined}>
                        {row.text}
                        {row.note && <span className="text-lm-muted"> {row.note}</span>}
                      </div>
                    ))}
                  </div>
                  <p className="mt-3.5 text-sm leading-relaxed text-lm-stone-2">{card.caption}</p>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-11 max-w-[60ch] text-center">
              <p className="font-serif text-2xl italic leading-[1.4] text-lm-ink">
                You don't need better storage. You need a{" "}
                <span className="lm-highlight not-italic">knowledge layer</span> — complementary, not
                competing. A layer above your files.
              </p>
            </div>
          </div>
        </section>

        {/* ============ Differentiators ============ */}
        <section id="architecture" className="border-t border-lm-line scroll-mt-20">
          <div className={`${CONTAINER} pb-20 pt-[76px]`}>
            <div className="mb-12 max-w-[62ch]">
              <div className="mb-[18px] font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
                Cognitive architecture, not storage
              </div>
              <h2 className="font-serif text-[40px] font-normal leading-[1.15] tracking-[-0.02em] text-lm-ink">
                Local Memory models how knowledge actually works
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {DIFFERENTIATORS.map((d, i) => (
                <div
                  key={d.title}
                  className={`lg:px-7 ${i === 0 ? "lg:pl-0" : ""} ${
                    i === DIFFERENTIATORS.length - 1 ? "lg:pr-0" : "lg:border-r lg:border-lm-line"
                  }`}
                >
                  <div className="mb-3 font-plex text-[13px] font-medium text-lm-amber">{d.marker}</div>
                  <div className="mb-2.5 font-serif text-lg font-medium text-lm-ink">{d.title}</div>
                  <p className="text-[13.5px] leading-relaxed text-lm-stone-2">{d.body}</p>
                </div>
              ))}
            </div>

            {/* Maturation diagram */}
            <div className="mt-14 rounded-xl bg-lm-ink px-10 py-9 font-plex text-[13px] leading-[1.7] text-[#b8ad99]">
              <div className="mb-[22px] font-plex text-[11px] font-medium uppercase tracking-[0.08em] text-[#78716c]">
                How a memory matures
              </div>
              <div className="grid items-center gap-2 lg:grid-cols-[1fr_24px_1fr_24px_1fr_24px_1fr]">
                {MATURATION.map((m, i) => (
                  <div key={m.level} className="contents">
                    <div>
                      <div className="mb-1.5 text-[#78716c]">{m.level}</div>
                      <div className="text-lm-cream">
                        {m.text}
                        {m.suffix && <span className="text-[#78716c]"> {m.suffix}</span>}
                      </div>
                    </div>
                    {i < MATURATION.length - 1 && (
                      <div className="text-center text-lm-gold">→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ How it works ============ */}
        <section id="how" className="border-t border-lm-line bg-lm-sand">
          <div className={`${CONTAINER} grid items-start gap-16 pb-20 pt-[76px] lg:grid-cols-[0.9fr_1.1fr]`}>
            <div>
              <div className="mb-[18px] font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
                Two minutes to memory
              </div>
              <h2 className="mb-5 font-serif text-[40px] font-normal leading-[1.15] tracking-[-0.02em] text-lm-ink">
                One binary. Every agent.
              </h2>
              <p className="mb-7 text-base leading-[1.65] text-lm-stone">
                No Node, no Python, no Docker. A single binary with native MCP for Claude, a REST API
                for everything else, and a CLI for your scripts. What one agent learns, they all know.
              </p>
              <div className="flex flex-col gap-3.5 font-plex text-[13px] leading-relaxed text-lm-stone">
                {INTEGRATION_POINTS.map((point) => (
                  <div key={point} className="flex gap-3">
                    <span className="text-lm-amber">→</span> {point}
                  </div>
                ))}
              </div>
            </div>

            {/* Install terminal */}
            <div className="rounded-xl bg-lm-ink px-7 py-6 font-plex text-[13.5px] leading-[2] shadow-[0_24px_48px_-20px_rgba(31,27,22,0.35)]">
              <div className="text-[#78716c]"># install &amp; start</div>
              <div className="text-[#b8ad99]">
                <span className="text-lm-gold">$</span> npm install -g local-memory-mcp
              </div>
              <div className="text-[#b8ad99]">
                <span className="text-lm-gold">$</span> local-memory start
              </div>
              <div className="text-lm-green">✓ database created · vector search ready</div>
              <div className="mt-[18px] text-[#78716c]"># teach it something</div>
              <div className="text-[#b8ad99]">
                <span className="text-lm-gold">$</span> local-memory observe "Redis for caching"
                --weight 8
              </div>
              <div className="text-lm-green">✓ stored as L0 · related to 4 memories</div>
              <div className="mt-[18px] text-[#78716c]"># see what needs your judgment</div>
              <div className="text-[#b8ad99]">
                <span className="text-lm-gold">$</span> local-memory questions --status pending
              </div>
              <div className="text-lm-cream">
                ⚠ contradiction: "SMS 2FA required" vs "passkeys only"
              </div>
            </div>
          </div>
        </section>

        {/* ============ Comparison ============ */}
        <section className="border-t border-lm-line">
          <div className={`mx-auto max-w-[1080px] ${SECTION_X} box-border py-[76px]`}>
            <h2 className="mb-10 text-center font-serif text-[34px] font-normal leading-tight tracking-[-0.02em] text-lm-ink">
              Local Memory vs. the alternatives
            </h2>
            <div className="overflow-x-auto">
              <div className="grid min-w-[640px] grid-cols-[1.4fr_1fr_1fr_1fr] text-[13.5px]">
                <div className="border-b-2 border-lm-ink px-4 py-3" />
                <div className="border-b-2 border-lm-ink px-4 py-3 font-plex text-[13px] font-semibold text-lm-ink">
                  Local Memory
                </div>
                <div className="border-b-2 border-lm-ink px-4 py-3 font-plex text-[13px] font-medium text-lm-muted">
                  Cloud memory
                </div>
                <div className="border-b-2 border-lm-ink px-4 py-3 font-plex text-[13px] font-medium text-lm-muted">
                  Markdown files
                </div>
                {COMPARISON_ROWS.map((row) => (
                  <div key={row.capability} className="contents">
                    <div className="border-b border-lm-line px-4 py-3.5 text-lm-stone">
                      {row.capability}
                    </div>
                    <div className="border-b border-lm-line px-4 py-3.5 font-semibold text-lm-amber">
                      {row.lm}
                    </div>
                    <div className="border-b border-lm-line px-4 py-3.5 text-lm-muted">{row.cloud}</div>
                    <div className="border-b border-lm-line px-4 py-3.5 text-lm-muted">{row.md}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ Testimonials ============ */}
        <section className="border-t border-lm-line bg-lm-sand">
          <div className={`${CONTAINER} pb-20 pt-[76px]`}>
            <div className="mb-10 text-center font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
              From the community
            </div>
            <div className="mx-auto mb-14 max-w-[64ch] text-center">
              <p className="mb-[22px] font-serif text-[30px] italic leading-[1.35] tracking-[-0.01em] text-lm-ink">
                "I just wanted to share that the local memory MCP has really helped{" "}
                <span className="lm-highlight not-italic">boost my productivity</span>. Thanks so much
                again for sharing!"
              </p>
              <div className="font-plex text-[12.5px] text-lm-muted">Early Access Developer</div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.author}
                  className="flex flex-col gap-4 rounded-xl border border-lm-line bg-lm-cream px-7 py-6"
                >
                  <p className="flex-1 text-[14.5px] leading-relaxed text-lm-stone">{t.quote}</p>
                  <div className="font-plex text-xs text-lm-muted">{t.author}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Pricing / CTA ============ */}
        <section id="pricing" className="border-t border-lm-line bg-lm-ink text-[#f3ead9]">
          <div className={`${CONTAINER} grid items-center gap-[72px] pb-[92px] pt-[88px] lg:grid-cols-[1.1fr_0.9fr]`}>
            <div>
              <h2 className="mb-5 font-serif text-[44px] font-normal leading-[1.12] tracking-[-0.02em] text-[#f3ead9]">
                Pay once. <em className="italic text-lm-gold">Know forever.</em>
              </h2>
              <p className="mb-8 max-w-[46ch] text-[16.5px] leading-[1.65] text-[#b8ad99]">
                No subscription, no cloud lock-in, no AI training on your data. One purchase, lifetime
                updates, and a memory that compounds with every session.
              </p>
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  onClick={openCheckout}
                  className="rounded-lg bg-lm-gold px-7 py-3.5 text-[15px] font-semibold text-lm-ink-deep transition-colors hover:bg-lm-gold-2"
                >
                  {CTA_LABEL}
                </button>
                <span className="font-plex text-[12.5px] text-[#78716c]">
                  30-day refund, no questions asked
                </span>
              </div>
            </div>

            {/* Price card */}
            <div className="rounded-xl border border-lm-ink-soft px-[34px] py-8">
              <div className="mb-6 flex items-baseline gap-2.5">
                <span className="font-serif text-[46px] text-[#f3ead9]">$49</span>
                <span className="font-plex text-[13px] text-[#78716c]">one-time · per developer</span>
              </div>
              <div className="flex flex-col gap-3 text-[13.5px] leading-snug text-[#b8ad99]">
                {PRICE_FEATURES.map((f) => (
                  <div key={f} className="flex gap-2.5">
                    <span className="text-lm-gold">✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ScrollToTop />
    </div>
  );
};

export default Landing;
