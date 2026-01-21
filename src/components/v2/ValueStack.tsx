import { Link } from "react-router-dom";
import { trackCTAClick } from "@/lib/analytics";

const tiers = [
  {
    title: "Core Memory Engine",
    valueAnchor: "$200+",
    valueNote: "comparable to annual RAG/vector DB subscriptions",
    features: [
      "Persistent local storage — SQLite-powered, zero cloud dependency",
      "Semantic vector search — 10ms responses with AI-powered retrieval",
      "Knowledge hierarchy — Observations → Learnings → Patterns → Schemas",
      "Contradiction detection — Automatically flags conflicting information",
      "Relationship mapping — See how your knowledge connects",
    ],
  },
  {
    title: "Universal Agent Integration",
    valueAnchor: "$150+",
    valueNote: "API access alone costs this at competitors",
    features: [
      "MCP native — First-class Anthropic Model Context Protocol support",
      "Full REST API — Works with GPT, Gemini, Codex, any custom agent",
      "Cross-agent sync — Claude learns something? GPT knows it too.",
      "CLI tools — Full command-line interface for scripting and automation",
    ],
  },
  {
    title: "Enterprise-Grade Architecture",
    valueAnchor: "$100+",
    valueNote: "infrastructure you'd otherwise build yourself",
    features: [
      "34,466 memories/second — Benchmarked performance on standard hardware",
      "97.5% token optimization — Intelligent context compression",
      "Domain separation — Keep project knowledge isolated or shared",
      "Session management — Pick up exactly where you left off",
    ],
  },
  {
    title: "Ownership Guarantee",
    valueAnchor: "$99/year",
    valueNote: "what subscriptions cost",
    features: [
      "Lifetime updates — Every feature we ship, forever",
      "No subscription — Pay once, own forever",
      "No cloud lock-in — Your data never leaves your machine",
      "No AI training — Your knowledge stays yours, guaranteed",
    ],
  },
];

const comparisonRows = [
  {
    capability: "Your data stays local",
    localMemory: { value: "Always", positive: true },
    cloudMemory: { value: "Never", positive: false },
    markdown: { value: "Always", positive: true },
  },
  {
    capability: "Semantic search",
    localMemory: { value: "10ms", positive: true },
    cloudMemory: { value: "Variable", positive: true },
    markdown: { value: "Manual", positive: false },
  },
  {
    capability: "Cross-agent memory",
    localMemory: { value: "Universal", positive: true },
    cloudMemory: { value: "Vendor lock", positive: false },
    markdown: { value: "Copy/paste", positive: false },
  },
  {
    capability: "Never trains AI models",
    localMemory: { value: "Guaranteed", positive: true },
    cloudMemory: { value: "Trust required", positive: false },
    markdown: { value: "Guaranteed", positive: true },
  },
  {
    capability: "Auto-categorization",
    localMemory: { value: "AI-powered", positive: true },
    cloudMemory: { value: "Some", positive: null },
    markdown: { value: "Manual", positive: false },
  },
  {
    capability: "Relationship discovery",
    localMemory: { value: "Automatic", positive: true },
    cloudMemory: { value: "Limited", positive: null },
    markdown: { value: "None", positive: false },
  },
  {
    capability: "Knowledge evolution",
    localMemory: { value: "L0→L3 hierarchy", positive: true },
    cloudMemory: { value: "Flat", positive: false },
    markdown: { value: "None", positive: false },
  },
  {
    capability: "Contradiction detection",
    localMemory: { value: "Built-in", positive: true },
    cloudMemory: { value: "None", positive: false },
    markdown: { value: "None", positive: false },
  },
];

const ValueStack = () => {
  return (
    <section className="section bg-card/30">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Built for developers who refuse to repeat themselves
          </h2>
        </div>

        {/* Tier cards */}
        <div className="mx-auto max-w-4xl space-y-6">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6 md:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="text-xl font-semibold">{tier.title}</h3>
                <div className="text-right">
                  <span className="text-xl font-bold text-[hsl(var(--brand-green))]">
                    {tier.valueAnchor}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {tier.valueNote}
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[hsl(var(--brand-green))]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Value Stack Summary */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="rounded-xl border-2 border-[hsl(var(--brand-green))] bg-[hsl(var(--brand-green))/5] p-6 md:p-8">
            <h3 className="mb-6 text-center text-xl font-bold">
              The Value Stack
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Core Memory Engine</span>
                <span>$200+</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Universal Agent Integration</span>
                <span>$150+</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Enterprise-Grade Architecture</span>
                <span>$100+</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Lifetime Updates (no subscription)</span>
                <span>$99/year</span>
              </div>

              <div className="my-4 border-t border-[hsl(var(--brand-green))/30]" />

              <div className="flex justify-between font-semibold">
                <span>Total value</span>
                <span>$549+</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Your price</span>
                <span className="text-[hsl(var(--brand-green))]">$49</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why $49? */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <h3 className="text-xl font-semibold">Why $49?</h3>
          <p className="mt-4 text-muted-foreground">
            We're developers too. We built this because we needed it.
          </p>
          <p className="mt-4 text-muted-foreground">
            The VC-funded competition charges $20-50/month and sends your data
            to the cloud. We think that's backwards.
          </p>
          <p className="mt-4 font-medium">
            $49 once. Your machine. Your data. Forever.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mx-auto mt-20 max-w-4xl">
          <h3 className="mb-8 text-center text-xl font-semibold">
            Local Memory vs. The Alternatives
          </h3>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border bg-card/50">
                  <th className="p-4 text-left font-medium text-muted-foreground">
                    Capability
                  </th>
                  <th className="p-4 text-center font-semibold">
                    Local Memory
                  </th>
                  <th className="p-4 text-center font-medium text-muted-foreground">
                    Cloud Memory
                  </th>
                  <th className="p-4 text-center font-medium text-muted-foreground">
                    Markdown Files
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonRows.map((row, index) => (
                  <tr key={index}>
                    <td className="p-4">{row.capability}</td>
                    <td
                      className={`p-4 text-center ${
                        row.localMemory.positive
                          ? "text-[hsl(var(--brand-green))]"
                          : "text-muted-foreground"
                      }`}
                    >
                      {row.localMemory.positive && (
                        <span className="mr-1">✓</span>
                      )}
                      {row.localMemory.value}
                    </td>
                    <td
                      className={`p-4 text-center ${
                        row.cloudMemory.positive === true
                          ? "text-[hsl(var(--brand-green))]"
                          : row.cloudMemory.positive === false
                          ? "text-muted-foreground"
                          : "text-[hsl(var(--brand-amber))]"
                      }`}
                    >
                      {row.cloudMemory.positive === false && (
                        <span className="mr-1">✗</span>
                      )}
                      {row.cloudMemory.positive === null && (
                        <span className="mr-1">~</span>
                      )}
                      {row.cloudMemory.value}
                    </td>
                    <td
                      className={`p-4 text-center ${
                        row.markdown.positive
                          ? "text-[hsl(var(--brand-green))]"
                          : "text-muted-foreground"
                      }`}
                    >
                      {row.markdown.positive === false && (
                        <span className="mr-1">✗</span>
                      )}
                      {row.markdown.value}
                    </td>
                  </tr>
                ))}
                {/* Price row */}
                <tr className="bg-card/50 font-medium">
                  <td className="p-4">Price</td>
                  <td className="p-4 text-center text-[hsl(var(--brand-green))]">
                    $49 once
                  </td>
                  <td className="p-4 text-center text-muted-foreground">
                    $20-50/mo
                  </td>
                  <td className="p-4 text-center text-[hsl(var(--brand-green))]">
                    Free
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Note below table */}
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Cloud memory costs $240-600/year and sends your competitive advantage
            to someone else's servers. Markdown files are free but cost you 6+
            hours per week in manual management. Local Memory gives you both:
            privacy AND intelligence.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/payment"
            className="btn-primary text-base"
            onClick={() => trackCTAClick("value-stack", "Get Started", "/payment")}
          >
            Get Started — $49
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ValueStack;
