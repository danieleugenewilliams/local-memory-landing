import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, ChevronDown } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";
import AgentSetupPrompts from "@/components/v2/AgentSetupPrompts";

const PromptsNew = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [openInstall, setOpenInstall] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const prompts = {
    minimal: `## Local Memory

Use local-memory to store and retrieve context across sessions. Store architectural decisions, solutions, and learnings. Search semantically before answering to ensure consistency with past work.

Fallback: REST API at http://localhost:3002/api/v1 if MCP unavailable.`,

    standard: `## Local Memory

Persistent knowledge system for maintaining context across sessions.

### Operations
- \`store_memory\`: Save decisions, solutions, learnings (importance 1-10, tags, domain)
- \`search\`: Find relevant context semantically before answering
- \`analysis\`: Ask questions against stored knowledge
- \`relationships\`: Map connections between memories

### When to Store
- Architecture decisions and rationale
- Bug fixes and root causes
- Configuration and setup details
- Patterns that worked (or didn't)

### Workflow
1. Search for relevant memories before providing solutions
2. Reference past decisions for consistency
3. Store new insights worth preserving`,

    comprehensive: `## Local Memory

Persistent knowledge system. Use proactively to build expertise across sessions.

To start local-memory, use local-memory start
This will start the daemon and REST API on port 3002.

Proactively use local-memory to store, retrieve, update, and analyze memories to maintain context and build expertise over time. Store key insights including lessons learned, architectural decisions, development strategies, and project outcomes. Use semantic search and relationship mapping to find relevant memories across all projects and sessions.

If you are unable to connect directly to the local-memory MCP server, try using jsonrpc directly to the binary (local-memory --mcp).

If you cannot connect to neither the MCP server nor via jsonrpc, try the REST API at http://localhost:3002/api/v1.

### Storage Strategy
Store when encountering:
- **Decisions**: Architecture, design patterns, technology choices
- **Solutions**: Bug fixes, workarounds, implementations
- **Learnings**: What worked, what didn't, reasoning
- **Context**: Requirements, constraints, preferences

\`\`\`javascript
store_memory({
  content: "Chose PostgreSQL over MongoDB — need ACID compliance and complex joins",
  importance: 9,
  tags: ["architecture", "database", "decision"],
  domain: "project-x"
})
\`\`\`

### Retrieval Pattern
Before answering:

\`\`\`javascript
// 1. Search for context
search({
  query: "database architecture",
  search_type: "semantic",
  use_ai: true,
  session_filter_mode: "all"
})

// 2. Check relationships
relationships({
  relationship_type: "find_related",
  memory_id: "relevant-id"
})

// 3. Analyze patterns
analysis({
  analysis_type: "question",
  question: "What database patterns have worked?",
  session_filter_mode: "all"
})
\`\`\`

### Best Practices
- Be specific: store context, not just outcomes
- Tag consistently for retrieval
- Rate importance: 7+ for significant items
- Search first: check existing knowledge before answering
- Cross-session: use \`session_filter_mode: "all"\``,

    reference: `## Local Memory Quick Reference

Store: \`store_memory(content, importance, tags[], domain)\`
Search: \`search(query, use_ai: true, session_filter_mode: "all")\`
Ask: \`analysis(analysis_type: "question", question)\`
Related: \`relationships(relationship_type: "find_related", memory_id)\`

Always search before answering. Store decisions and learnings.`
  };

  const commands = {
    gather: `## /gather

Generate 5-7 numbered questions:
- Core requirements
- Constraints/limitations
- Success criteria
- Context/background
- Edge cases

Track responses → refine → transition when complete

**Output:**
\`\`\`
I'll gather the necessary information.

**Information Gathering**
1. [Q1 - core]
2. [Q2 - constraints/context]
3. [Q3 - success]
4. [Q4 - details]
5. [Q5 - edge cases]

Answer all at once or individually.
\`\`\``,

    reframe: `## /reframe

1. Synthesize understanding
2. Structure: situation → objective → requirements → constraints → success → assumptions
3. Request confirmation
4. Wait—don't proceed until confirmed

**Output:**
\`\`\`
## My Understanding

[2-3 sentences: situation/context]

**Core Objective:** [what needs achieving]

**Key Requirements:**
- [R1]
- [R2]
- [R3]

**Constraints/Limitations:**
- [C1]
- [C2]

**Success:** [desired end state]

**Assumptions:**
- [A1]
- [A2]

Correct? Proceed with [next action]?
\`\`\``,

    truth: `## /truth

**Activate Truth-First + No-Fluff**

**Principles:**
1. Truth > all
2. Evidence-based
3. Zero padding
4. Quantified precision
5. Transparent uncertainty

**Rules:**
- Truth > brevity
- <80% confidence → "Unknown" + data needs
- Cite non-obvious/post-2010; mark opinions
- Direct answer ≤150 words or ≤5 bullets
- No preambles/flattery/restating
- Quantify everything
- Separate Fact/Inference/Speculation

**Schema:**
\`\`\`
[DIRECT ANSWER - ≤150 words or ≤5 bullets]

**Facts:** [verifiable, cited]
**Inferences:** [logical conclusions]
**Speculation:** [marked clearly]
**Confidence:** X% [reasoning]

**Trade-offs:**
- Pro: [advantage]
- Con: [disadvantage]

**Failure Modes:**
- [what could fail]
- [edge cases]

**Data Gaps:** [if <80%]
- Missing: [needed info]
- Source: [where to find]
\`\`\``,

    memorize: `## /memorize

1. Analyze conversation: core understanding, key decisions, points, evolution, specs/artifacts, user context, related systems, constraints
2. Search local-memory: semantic search, similarity >0.7 = related
3. Determine: UPDATE if related + same topic | CREATE NEW otherwise
4. Tag: \`topic_context_year\` format, lowercase + underscores
5. Structure: Core Understanding, Conversation Evolution, Key Decisions, Specifications/Artifacts, Important Points, User Context, Related Systems, Context & Constraints
6. Save: \`store_memory\` (new) or \`update_memory\` (existing), importance 7-9, tags array, domain
7. Return: UUID, tag, action

**Output:**
\`\`\`
## Memory Saved

**Retrieval:**
- **Memory ID:** [UUID]
- **Tag:** [tag]
- **Action:** [Created new | Updated [uuid]]

Use \`/recall [id]\` or \`/recall [tag]\` to restore.
\`\`\``,

    recall: `## /recall

1. Accept: UUID, tag, or query
2. Search: UUID → \`get_memory_by_id\` | tag/text → \`search\` (use_ai=true, limit=5)
3. Retrieve content + metadata
4. Reconstruct: parse all sections
5. Present with metadata
6. Load into active conversation
7. Ready to continue

**Output:**
\`\`\`
## Memory Recalled

**Context Restored From:** [identifier]
**Memory ID:** [UUID]
**Original Date:** [date]

**Core Understanding:** [main context]
**Conversation Evolution:** [changes]
**Key Decisions:** [decision + rationale]
**Specifications/Artifacts:** [detailed outputs, specs]
**Important Points:** [critical elements]
**User Context:** [why matters, broader work, use case]
**Related Systems:** [integrations, dependencies]
**Context & Constraints:** [boundaries]

---
**Status:** Complete context loaded. Operating with full understanding.
Ready to continue. What would you like to work on?
\`\`\`

**If not found:**
\`\`\`
## Memory Not Found

No memory matching: [identifier]
Try different keywords or check ID/tag.
\`\`\``
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-wide relative">
          <div className="flex flex-col items-center justify-center py-16 text-center md:py-24">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Agent integration prompts
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Copy these instructions into your agent's configuration to enable persistent memory.
              Works with CLAUDE.md, .cursorrules, AGENTS.md, or any system prompt.
            </p>
          </div>
        </div>
      </section>

      {/* Prompts Grid */}
      <section className="section-sm border-t border-border">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* Minimal */}
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h3 className="font-semibold">Minimal</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    3 lines. Get started fast.
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(prompts.minimal, "minimal")}
                  className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm transition-colors hover:bg-secondary"
                >
                  {copied === "minimal" ? (
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
                  </div>
                  <div className="terminal-body max-h-64 overflow-auto">
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                      {prompts.minimal}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Standard */}
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h3 className="font-semibold">Standard</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Core operations and workflow guidance.
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(prompts.standard, "standard")}
                  className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm transition-colors hover:bg-secondary"
                >
                  {copied === "standard" ? (
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
                  </div>
                  <div className="terminal-body max-h-64 overflow-auto">
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                      {prompts.standard}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive - Full Width */}
            <div className="rounded-xl border border-border bg-card lg:col-span-2">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h3 className="font-semibold">Comprehensive</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Full implementation with code examples and advanced patterns.
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(prompts.comprehensive, "comprehensive")}
                  className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm transition-colors hover:bg-secondary"
                >
                  {copied === "comprehensive" ? (
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
                  </div>
                  <div className="terminal-body max-h-96 overflow-auto">
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                      {prompts.comprehensive}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="rounded-xl border border-border bg-card lg:col-span-2">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h3 className="font-semibold">Quick Reference</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Cheat sheet for experienced users.
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(prompts.reference, "reference")}
                  className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm transition-colors hover:bg-secondary"
                >
                  {copied === "reference" ? (
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
                  </div>
                  <div className="terminal-body">
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                      {prompts.reference}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Commands */}
      <section className="section-sm border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Workflow commands
            </h2>
            <p className="mt-4 text-muted-foreground">
              Structured commands for gathering requirements, confirming understanding, and managing memory.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* /gather */}
            <div className="rounded-xl border border-border bg-background">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <code className="text-sm font-medium text-[hsl(var(--brand-blue))]">/gather</code>
                <button
                  onClick={() => copyToClipboard(commands.gather, "gather")}
                  className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs transition-colors hover:bg-secondary"
                >
                  {copied === "gather" ? (
                    <><Check size={12} className="text-[hsl(var(--brand-green))]" /><span>Copied</span></>
                  ) : (
                    <><Copy size={12} /><span>Copy</span></>
                  )}
                </button>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground">
                  Generate structured questions to gather requirements, constraints, and success criteria.
                </p>
              </div>
              <div className="p-5">
                <div className="terminal">
                  <div className="terminal-header">
                    <div className="flex gap-2">
                      <div className="terminal-dot terminal-dot-red" />
                      <div className="terminal-dot terminal-dot-yellow" />
                      <div className="terminal-dot terminal-dot-green" />
                    </div>
                  </div>
                  <div className="terminal-body max-h-64 overflow-auto">
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                      {commands.gather}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* /reframe */}
            <div className="rounded-xl border border-border bg-background">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <code className="text-sm font-medium text-[hsl(var(--brand-green))]">/reframe</code>
                <button
                  onClick={() => copyToClipboard(commands.reframe, "reframe")}
                  className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs transition-colors hover:bg-secondary"
                >
                  {copied === "reframe" ? (
                    <><Check size={12} className="text-[hsl(var(--brand-green))]" /><span>Copied</span></>
                  ) : (
                    <><Copy size={12} /><span>Copy</span></>
                  )}
                </button>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground">
                  Synthesize and confirm understanding before proceeding with execution.
                </p>
              </div>
              <div className="p-5">
                <div className="terminal">
                  <div className="terminal-header">
                    <div className="flex gap-2">
                      <div className="terminal-dot terminal-dot-red" />
                      <div className="terminal-dot terminal-dot-yellow" />
                      <div className="terminal-dot terminal-dot-green" />
                    </div>
                  </div>
                  <div className="terminal-body max-h-64 overflow-auto">
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                      {commands.reframe}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* /truth */}
            <div className="rounded-xl border border-border bg-background">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <code className="text-sm font-medium text-[hsl(var(--terminal-amber))]">/truth</code>
                <button
                  onClick={() => copyToClipboard(commands.truth, "truth")}
                  className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs transition-colors hover:bg-secondary"
                >
                  {copied === "truth" ? (
                    <><Check size={12} className="text-[hsl(var(--brand-green))]" /><span>Copied</span></>
                  ) : (
                    <><Copy size={12} /><span>Copy</span></>
                  )}
                </button>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground">
                  Activate truth-first mode with evidence requirements and confidence scoring.
                </p>
              </div>
              <div className="p-5">
                <div className="terminal">
                  <div className="terminal-header">
                    <div className="flex gap-2">
                      <div className="terminal-dot terminal-dot-red" />
                      <div className="terminal-dot terminal-dot-yellow" />
                      <div className="terminal-dot terminal-dot-green" />
                    </div>
                  </div>
                  <div className="terminal-body max-h-64 overflow-auto">
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                      {commands.truth}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* /memorize */}
            <div className="rounded-xl border border-border bg-background">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <code className="text-sm font-medium text-[hsl(var(--brand-purple))]">/memorize</code>
                <button
                  onClick={() => copyToClipboard(commands.memorize, "memorize")}
                  className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs transition-colors hover:bg-secondary"
                >
                  {copied === "memorize" ? (
                    <><Check size={12} className="text-[hsl(var(--brand-green))]" /><span>Copied</span></>
                  ) : (
                    <><Copy size={12} /><span>Copy</span></>
                  )}
                </button>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground">
                  Save conversation context to Local Memory with structured tagging and metadata.
                </p>
              </div>
              <div className="p-5">
                <div className="terminal">
                  <div className="terminal-header">
                    <div className="flex gap-2">
                      <div className="terminal-dot terminal-dot-red" />
                      <div className="terminal-dot terminal-dot-yellow" />
                      <div className="terminal-dot terminal-dot-green" />
                    </div>
                  </div>
                  <div className="terminal-body max-h-64 overflow-auto">
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                      {commands.memorize}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* /recall */}
            <div className="rounded-xl border border-border bg-background">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <code className="text-sm font-medium text-[hsl(var(--brand-pink))]">/recall</code>
                <button
                  onClick={() => copyToClipboard(commands.recall, "recall")}
                  className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs transition-colors hover:bg-secondary"
                >
                  {copied === "recall" ? (
                    <><Check size={12} className="text-[hsl(var(--brand-green))]" /><span>Copied</span></>
                  ) : (
                    <><Copy size={12} /><span>Copy</span></>
                  )}
                </button>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground">
                  Restore context from Local Memory by ID, tag, or semantic search.
                </p>
              </div>
              <div className="p-5">
                <div className="terminal">
                  <div className="terminal-header">
                    <div className="flex gap-2">
                      <div className="terminal-dot terminal-dot-red" />
                      <div className="terminal-dot terminal-dot-yellow" />
                      <div className="terminal-dot terminal-dot-green" />
                    </div>
                  </div>
                  <div className="terminal-body max-h-64 overflow-auto">
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground/80">
                      {commands.recall}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Copy All */}
            <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-background p-5">
              <button
                onClick={() => copyToClipboard(
                  Object.values(commands).join("\n\n---\n\n"),
                  "all-commands"
                )}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {copied === "all-commands" ? (
                  <><Check size={16} className="text-[hsl(var(--brand-green))]" /><span>All commands copied</span></>
                ) : (
                  <><Copy size={16} /><span>Copy all commands</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Guide */}
      <section className="section-sm border-t border-border">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Where to add these prompts
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-background p-5">
              <code className="text-sm font-medium text-[hsl(var(--brand-blue))]">CLAUDE.md</code>
              <p className="mt-2 text-sm text-muted-foreground">
                Claude Code project instructions
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <code className="text-sm font-medium text-[hsl(var(--brand-green))]">.cursorrules</code>
              <p className="mt-2 text-sm text-muted-foreground">
                Cursor AI configuration
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <code className="text-sm font-medium text-[hsl(var(--terminal-amber))]">AGENTS.md</code>
              <p className="mt-2 text-sm text-muted-foreground">
                Multi-agent orchestration
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <code className="text-sm font-medium text-[hsl(var(--brand-purple))]">System Prompt</code>
              <p className="mt-2 text-sm text-muted-foreground">
                Any agent configuration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Setup Prompts */}
      <section className="section-sm border-t border-border bg-card/30">
        <div className="container-wide text-left">
          <h2 className="mb-2 text-lg font-semibold">Agent-Assisted Installation</h2>
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
