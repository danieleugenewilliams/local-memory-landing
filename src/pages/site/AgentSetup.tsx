import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useCheckout } from "@/contexts/CheckoutContext";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollToTop from "@/components/ScrollToTop";
import { getInstallPrompt, SETUP_OS_TABS, type SetupOS } from "@/content/setupPrompts";

/* Agent Setup — redesigned from Agent Setup.dc.html.
   Skill front-matter (allowed-tools) matches the shipped skill:
   local-memory-golang/integrations/local-memory-skill/skills/local-memory/SKILL.md
   — 23 tools (only the destructive delete_memory excluded), mcp__local-memory__ prefix.

   The "Install prompt" artifact (first, recommended) shares its text with the
   post-purchase success page via getInstallPrompt(os) — single source of truth. */

type Protocol = "mcp" | "rest" | "cli";
type ArtifactKey = "install" | "skill" | "claudemd" | "prompt" | "automation";

// Filename label shown in the code panel header, per OS, for the install prompt.
const INSTALL_FILENAME: Record<SetupOS, string> = {
  macos: "install-macos.txt",
  windows: "install-windows.txt",
  linux: "install-linux.txt",
  api: "install-rest-api.txt",
};

const skillMd = `---
name: local-memory
description: >-
  Persistent knowledge system for AI agents. Use proactively to build
  expertise across sessions: capture insights, decisions, bug fixes, and
  patterns; recall what was learned before answering ("what do we already
  know about X", "have we seen this before", "remember this"); detect
  contradictions and track open questions. Works through Local Memory's
  MCP tools, CLI (\`local-memory\`), or REST API (localhost:3002). Trigger
  whenever durable knowledge should be stored or retrieved rather than
  re-derived.
allowed-tools: >-
  mcp__local-memory__bootstrap mcp__local-memory__search
  mcp__local-memory__ask mcp__local-memory__summarize
  mcp__local-memory__observe mcp__local-memory__reflect
  mcp__local-memory__evolve mcp__local-memory__question
  mcp__local-memory__questions mcp__local-memory__resolve
  mcp__local-memory__relate mcp__local-memory__find_related
  mcp__local-memory__discover mcp__local-memory__map_graph
  mcp__local-memory__status mcp__local-memory__predict
  mcp__local-memory__explain mcp__local-memory__counterfactual
  mcp__local-memory__temporal mcp__local-memory__get_memory_by_id
  mcp__local-memory__update_memory mcp__local-memory__validate
  mcp__local-memory__migrate_domain
  Bash(local-memory:*)
---

# Local Memory

Local Memory is a persistent, local-first knowledge layer. It is not a
file store — it turns raw **observations** into **learnings**, then
**patterns**, then **schemas**, so an agent accumulates durable expertise
instead of re-deriving it every session.

Use it proactively. Storing and recalling knowledge is cheap;
re-discovering it is not.

## Pick the interface (do this first)

1. **MCP tools** — if tools named \`local-memory:*\` are available, use
   them. Lowest overhead, structured results.
2. **CLI** — if you can run shell commands, use the \`local-memory\` binary.
3. **REST API** — if you can only make HTTP calls, use
   \`http://localhost:3002/api/v1\`.

Confirm the service is reachable first: \`local-memory:status\` (MCP),
\`local-memory status\` (CLI), or
\`curl http://localhost:3002/api/v1/health\` (REST).

## The core loop

bootstrap → search/ask (before answering) → observe (as you learn)
          → reflect (synthesize) → evolve (validate & promote)

1. **Orient at session start.** Call \`bootstrap\` once to load relevant
   patterns, recent learnings, and pending questions.
2. **Recall before answering.** \`search\` for prior knowledge (or \`ask\`
   for a synthesized answer). Don't re-derive what's already stored.
3. **Capture as you learn.** \`observe\` it. Capture *why*, not just
   *what*. Tag consistently and set a \`domain\`.
4. **Synthesize.** Periodically \`reflect\` to turn observations (L0)
   into learnings (L1).
5. **Mature knowledge.** When a learning proves correct,
   \`evolve(operation="validate", success=true)\` to strengthen it.

## What is worth storing

- Architecture decisions and the rationale behind them
- Bug fixes and their root causes (not just the symptom)
- Approaches that worked — and ones that didn't, with why
- User/project preferences, constraints, and conventions
- Non-obvious facts that took effort to establish

## Habits that make it work

- **Specific beats vague.** Store the root cause and fix, not "fixed a bug."
- **Tag and domain consistently** so retrieval works later.
- **Search cross-session** (\`session_filter_mode: "all"\`) by default.
- **Track unknowns** with \`question(...)\`; \`resolve(...)\` them later.
- **Surface contradictions** instead of silently overwriting.

## Knowledge levels

L0 Observation (0.0–1.0) · L1 Learning (1.0–5.0) ·
L2 Pattern (5.0–9.0) · L3 Schema (9.0–10.0)

## Token discipline

Read operations accept \`response_format\` (detailed / concise / summary /
ids_only); \`search\` also has an \`intelligent\` format with a
\`max_tokens\` budget. Default to \`concise\`.

(Ships with reference/ files: concepts.md, mcp.md, cli.md, rest.md, setup.md)`;

const claudeMd = `## Local Memory

This project uses Local Memory (MCP server \`local-memory\`) as its
persistent knowledge layer.

- At session start, call \`bootstrap()\` to load context and
  pending questions.
- Before answering questions about prior decisions, search:
  \`search({ query: "...", use_ai: true, session_filter_mode: "all" })\`
- Store every significant decision, bug fix, and learned pattern:
  \`observe({ content: "...", level: "learning", tags: [...] })\`
- When memory returns nothing, say "I don't have this" — do not guess.
- Periodically run \`reflect({ mode: "batch" })\` to promote
  observations into learnings.

Memory levels: L0 observation → L1 learning → L2 pattern → L3 schema.
Knowledge earns its permanence; store at L0/L1 and let it mature.`;

const promptMcp = `## Local Memory

Persistent knowledge system. Use proactively to build expertise across sessions.

### Getting started
Call \`bootstrap()\` at session start to load context and pending questions.

### Core workflow
1. **Observe** — record insights as they emerge
   observe({ content: "...", level: "learning", tags: [...] })
2. **Search** — check existing knowledge before answering
   search({ query: "...", use_ai: true, session_filter_mode: "all" })
3. **Reflect** — process observations into learnings
   reflect({ mode: "batch" })
4. **Evolve** — validate and promote knowledge
   evolve({ operation: "validate", entity_id: "...", success: true })

### Memory levels
- L0 Observation (0–1): raw intake, ephemeral
- L1 Learning (1–5): candidate insights, volatile
- L2 Pattern (5–9): validated generalizations, durable
- L3 Schema (9–10): frameworks, permanent

### When to store
- Architecture decisions and rationale
- Bug fixes and root causes
- Patterns that worked (or didn't)
- User preferences and context

### Best practices
- Be specific: store context, not just outcomes
- Tag consistently for retrieval
- Use session_filter_mode: "all" for cross-session search
- Check for contradictions with question()`;

const promptRest = `## Local Memory (REST API)

Persistent knowledge system via HTTP. Base URL: http://localhost:3002/api/v1

### Service management
local-memory start
curl http://localhost:3002/api/v1/health

### Core operations
Store: POST /memories
  {"content": "Your insight", "importance": 8, "tags": ["tag1"]}
Search: GET /memories/search?query=...&use_ai=true
Observe: POST /observe
  {"content": "...", "level": "learning", "tags": ["..."]}
Reflect: POST /reflect · Evolve: POST /evolve · Bootstrap: POST /bootstrap

### Token optimization
response_format = detailed (~100%) | summary (~50%) | concise (~30%) | ids_only (~5%)

### Workflow
1. POST /bootstrap at session start
2. GET /memories/search before answering
3. POST /memories or /observe to store insights
4. POST /reflect periodically`;

const promptCli = `## Local Memory (CLI)

Persistent knowledge system via command line. For automation, scripts,
and terminal workflows.

### Service management
local-memory start | stop | status

### Core operations
local-memory observe "PostgreSQL uses MVCC" --level learning --tags database
local-memory search "database patterns" --use_ai --limit 5
local-memory reflect batch
local-memory evolve validate --entity_id UUID --success

### Output formatting
--response_format detailed | concise | ids_only | summary   ·   --json for JSON output
local-memory search "api" --json | jq '.results[].content'

### Workflow
1. local-memory start at system startup
2. search before making decisions
3. observe to store insights
4. reflect periodically to process knowledge`;

const automation = `# Capture git context
git log --oneline -5 | xargs -I {} \\
  local-memory observe "{}" --level observation --tags git,history

# Git hook (post-commit)
#!/bin/bash
local-memory observe "Committed: $(git log -1 --oneline)" \\
  --level observation --tags git

# Daily reflection cron
0 18 * * * local-memory reflect batch

# Weekly triage: what needs your judgment?
0 9 * * 1 local-memory questions --status pending --format summary`;

interface ArtifactDef {
  title: string;
  tag: string;
  blurb: string;
  recommended: boolean;
  description: string;
  points: string[];
  protocolPicker: boolean;
  osPicker?: boolean;
  // content/filename are omitted for the install artifact, whose text is
  // OS-dependent and resolved via getInstallPrompt(os) at render time.
  filename?: string | Record<Protocol, string>;
  content?: string | Record<Protocol, string>;
}

const ARTIFACTS: Record<ArtifactKey, ArtifactDef> = {
  install: {
    title: "Install prompt",
    tag: "INSTALL",
    blurb: "One paste installs, activates, and connects Local Memory end to end.",
    recommended: true,
    description:
      "Paste this into Claude Code, Cursor, or any coding agent. It checks existing installs, installs the binary, activates your license, and wires up MCP. Replace <YOUR-LICENSE-KEY> with the key from your purchase email — or don't: the prompt tells the agent to ask you for it before doing anything.",
    points: [
      "Agent asks for your license key if missing",
      "Detects existing installs before changing anything",
      "Ends with a verified, connected memory daemon",
    ],
    protocolPicker: false,
    osPicker: true,
  },
  skill: {
    title: "Skill",
    tag: "SKILL.md",
    blurb: "Installable, auto-invoked. The agent discovers it when memory work is relevant.",
    recommended: false,
    filename: "skills/local-memory/SKILL.md · ships with Local Memory",
    description:
      "The official Local Memory skill — an open-standard SKILL.md read natively by Claude Code/Desktop, Codex, Gemini CLI, Cursor, Copilot, and Windsurf. Discovered and loaded only when memory work is relevant; zero context cost otherwise. Install as a Claude Code plugin (bundles the MCP server) or copy the skill folder into any agent's skills directory.",
    points: [
      "Auto-invoked — no manual pasting",
      "Open standard — author once, run everywhere",
      "claude --plugin-dir ./local-memory-skill",
      "Includes reference/ docs the agent loads as needed",
    ],
    content: skillMd,
    protocolPicker: false,
  },
  claudemd: {
    title: "CLAUDE.md / AGENTS.md",
    tag: "CLAUDE.md",
    blurb: "Persistent project guidance, loaded every session in this repo.",
    recommended: false,
    filename: "CLAUDE.md (or AGENTS.md)",
    description:
      "Drop this section into your project's CLAUDE.md or AGENTS.md. Every session in the repo starts knowing how to use memory — best for team conventions where memory use should be non-negotiable.",
    points: [
      "Always loaded — deterministic behavior",
      "Shared with the whole team via git",
      "Same block works in AGENTS.md",
    ],
    content: claudeMd,
    protocolPicker: false,
  },
  prompt: {
    title: "System prompt",
    tag: "PROMPT",
    blurb: "For agents without file conventions. Paste into any system prompt field.",
    recommended: false,
    filename: { mcp: "system-prompt-mcp.md", rest: "system-prompt-rest.md", cli: "system-prompt-cli.md" },
    description:
      "The portable fallback. Paste into the system prompt of any agent — GPT, Gemini, Codex, or custom. Pick the protocol your agent can reach: MCP tools, plain HTTP, or shell commands.",
    points: ["Works with literally any agent", "Choose MCP, REST, or CLI flavor", "Copy once, paste anywhere"],
    content: { mcp: promptMcp, rest: promptRest, cli: promptCli },
    protocolPicker: true,
  },
  automation: {
    title: "Automation recipes",
    tag: "CLI",
    blurb: "Hooks, cron jobs, and scripts that feed memory without an agent in the loop.",
    recommended: false,
    filename: "recipes.sh",
    description:
      "Memory doesn't need an agent to grow. Git hooks capture decisions at commit time; cron jobs run nightly reflection; the questions command surfaces contradictions for your Monday triage.",
    points: [
      "Git hooks — capture at commit time",
      "Cron — nightly reflect, weekly triage",
      "Composable with jq and shell pipes",
    ],
    content: automation,
    protocolPicker: false,
  },
};

const ARTIFACT_ORDER: ArtifactKey[] = ["install", "skill", "claudemd", "prompt", "automation"];

const AgentSetup = () => {
  const { openCheckout } = useCheckout();
  const [artifact, setArtifact] = useState<ArtifactKey>("install");
  const [protocol, setProtocol] = useState<Protocol>("mcp");
  const [os, setOs] = useState<SetupOS>("macos");
  const [copied, setCopied] = useState(false);

  const active = ARTIFACTS[artifact];

  // The install artifact's text is OS-dependent (shared with the success page);
  // every other artifact stores its content statically (string or per-protocol).
  let activeContent: string;
  let activeFilename: string;
  if (artifact === "install") {
    activeContent = getInstallPrompt(os);
    activeFilename = `${INSTALL_FILENAME[os]} · paste into your agent`;
  } else if (typeof active.content === "string") {
    activeContent = active.content;
    activeFilename = active.filename as string;
  } else {
    activeContent = active.content![protocol];
    activeFilename = (active.filename as Record<Protocol, string>)[protocol];
  }

  const copyContent = async () => {
    await navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectArtifact = (key: ArtifactKey) => {
    setArtifact(key);
    setCopied(false);
  };

  return (
    <div className="lm-theme min-h-screen">
      <Helmet>
        <title>Agent Setup — Local Memory</title>
        <meta
          name="description"
          content="Four ways to wire Local Memory into an agent, from most durable to most portable — Skill, CLAUDE.md, system prompt, and automation recipes."
        />
      </Helmet>

      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1280px] px-6 pb-14 pt-[72px] sm:px-10 lg:px-16">
          <div className="mb-5 font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
            Agent setup
          </div>
          <h1 className="mb-5 max-w-[22ch] text-balance font-serif text-[42px] font-normal leading-[1.1] tracking-[-0.02em] text-lm-ink sm:text-[52px]">
            Teach your agents to <em className="italic text-lm-amber">remember.</em>
          </h1>
          <p className="max-w-[58ch] text-[17px] leading-[1.65] text-lm-stone">
            Five ways to wire Local Memory into an agent, from first install to most portable. Pick the
            artifact that fits how your agent consumes context — copy it, and you're done.
          </p>
        </section>

        {/* Artifact picker */}
        <section className="mx-auto max-w-[1280px] px-6 pb-[88px] sm:px-10 lg:px-16">
          <div className="mb-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ARTIFACT_ORDER.map((key) => {
              const a = ARTIFACTS[key];
              const isActive = key === artifact;
              return (
                <button
                  key={key}
                  onClick={() => selectArtifact(key)}
                  className={`rounded-xl border px-6 py-[22px] text-left transition-colors ${
                    isActive ? "border-lm-amber bg-lm-sand-2" : "border-lm-line bg-lm-cream hover:border-lm-amber"
                  }`}
                >
                  <div className="mb-2.5 flex items-center justify-between gap-2.5">
                    <span className="font-plex text-xs font-medium text-lm-amber">{a.tag}</span>
                    {a.recommended && (
                      <span className="rounded-full bg-lm-amber px-2 py-[3px] font-plex text-[10px] font-medium tracking-[0.05em] text-lm-cream">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <div className="mb-2 font-serif text-lg font-medium text-lm-ink">{a.title}</div>
                  <p className="text-[13px] leading-snug text-lm-stone-2">{a.blurb}</p>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="grid items-start gap-14 border-t border-lm-line pt-11 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="mb-[18px] font-serif text-[32px] font-normal leading-tight tracking-[-0.02em] text-lm-ink">
                {active.title}
              </h2>
              <p className="mb-6 text-[15.5px] leading-[1.65] text-lm-stone">{active.description}</p>
              <div className="flex flex-col gap-3 font-plex text-[13px] leading-relaxed text-lm-stone">
                {active.points.map((pt) => (
                  <div key={pt} className="flex gap-3">
                    <span className="text-lm-amber">→</span> {pt}
                  </div>
                ))}
              </div>

              {active.osPicker && (
                <div className="mt-7">
                  <div className="mb-3 font-plex text-[11px] font-medium uppercase tracking-[0.08em] text-lm-muted">
                    Platform
                  </div>
                  <div className="inline-flex overflow-hidden rounded-lg border border-lm-line-2">
                    {SETUP_OS_TABS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setOs(t.id);
                          setCopied(false);
                        }}
                        className={`border-r border-lm-line-2 px-5 py-2.5 font-plex text-[12.5px] font-medium last:border-r-0 ${
                          t.id === os ? "bg-lm-ink text-lm-cream" : "text-lm-stone-2 hover:text-lm-ink"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {active.protocolPicker && (
                <div className="mt-7">
                  <div className="mb-3 font-plex text-[11px] font-medium uppercase tracking-[0.08em] text-lm-muted">
                    Integration protocol
                  </div>
                  <div className="inline-flex overflow-hidden rounded-lg border border-lm-line-2">
                    {(["mcp", "rest", "cli"] as Protocol[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setProtocol(p);
                          setCopied(false);
                        }}
                        className={`border-r border-lm-line-2 px-5 py-2.5 font-plex text-[12.5px] font-medium last:border-r-0 ${
                          p === protocol ? "bg-lm-ink text-lm-cream" : "text-lm-stone-2 hover:text-lm-ink"
                        }`}
                      >
                        {p.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Code panel */}
            <div className="overflow-hidden rounded-xl bg-lm-ink shadow-[0_24px_48px_-20px_rgba(31,27,22,0.35)]">
              <div className="flex items-center justify-between border-b border-lm-ink-soft px-5 py-3.5">
                <span className="truncate font-plex text-xs text-[#78716c]">{activeFilename}</span>
                <button
                  onClick={copyContent}
                  className={`shrink-0 rounded-md border border-lm-ink-soft px-3.5 py-1.5 font-plex text-xs transition-colors hover:border-lm-gold ${
                    copied ? "text-lm-green" : "text-[#b8ad99]"
                  }`}
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <pre className="max-h-[560px] overflow-auto whitespace-pre-wrap px-6 py-5 font-plex text-[12.5px] leading-[1.75] text-[#b8ad99]">
                {activeContent}
              </pre>
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="border-t border-lm-line bg-lm-ink text-[#f3ead9]">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-6 py-14 sm:flex-row sm:items-center sm:px-10 lg:px-16">
            <div>
              <div className="mb-1.5 font-serif text-[26px] text-[#f3ead9]">
                These artifacts work best with Local Memory installed.
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

export default AgentSetup;
