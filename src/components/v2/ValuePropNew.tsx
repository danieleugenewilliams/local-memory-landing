import { Link } from "react-router-dom";
import { trackCTAClick } from "@/lib/analytics";

const features = [
  {
    title: "Cross-agent memory",
    description:
      "Claude learns something? GPT knows it too. Context flows between every agent you use.",
  },
  {
    title: "Survives everything",
    description:
      "Sessions end. You type /clear. Agents restart. Your context persists through all of it.",
  },
  {
    title: "Semantic search",
    description:
      "Ask natural questions. Get relevant memories. 10ms response times with vector search.",
  },
  {
    title: "Zero cloud dependency",
    description:
      "Runs entirely on your machine. Your architectural decisions stay yours, not training data.",
  },
  {
    title: "MCP native",
    description:
      "First-class Anthropic MCP integration. Works with Claude Desktop, Claude Code, and any MCP client.",
  },
  {
    title: "Universal REST API",
    description:
      "Not using MCP? Full REST API for GPT, Gemini, custom agents, or any tool you build.",
  },
];

const ValuePropNew = () => {
  return (
    <section className="section bg-card/30">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Context is your competitive advantage.
            <br />
            <span className="text-muted-foreground">Stop giving it away.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Every explanation you give an AI agent, every architectural decision you document, every debugging pattern you teach — that's institutional knowledge worth protecting.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-border/80 hover:bg-card/80"
            >
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-20">
          <h3 className="mb-8 text-xl font-semibold">Local Memory vs. the alternatives</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 pr-8 text-left font-medium text-muted-foreground">
                    Capability
                  </th>
                  <th className="pb-4 px-4 text-center font-semibold">
                    Local Memory
                  </th>
                  <th className="pb-4 px-4 text-center font-medium text-muted-foreground">
                    Cloud Memory
                  </th>
                  <th className="pb-4 px-4 text-center font-medium text-muted-foreground">
                    Markdown Files
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-4 pr-8">Your data stays local</td>
                  <td className="py-4 px-4 text-center text-[hsl(var(--brand-green))]">Yes</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">No</td>
                  <td className="py-4 px-4 text-center text-[hsl(var(--brand-green))]">Yes</td>
                </tr>
                <tr>
                  <td className="py-4 pr-8">Semantic search</td>
                  <td className="py-4 px-4 text-center text-[hsl(var(--brand-green))]">Yes</td>
                  <td className="py-4 px-4 text-center text-[hsl(var(--brand-green))]">Yes</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">No</td>
                </tr>
                <tr>
                  <td className="py-4 pr-8">Cross-agent memory</td>
                  <td className="py-4 px-4 text-center text-[hsl(var(--brand-green))]">Yes</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Vendor lock-in</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Manual copy</td>
                </tr>
                <tr>
                  <td className="py-4 pr-8">Never trains AI models</td>
                  <td className="py-4 px-4 text-center text-[hsl(var(--brand-green))]">Guaranteed</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Trust required</td>
                  <td className="py-4 px-4 text-center text-[hsl(var(--brand-green))]">Guaranteed</td>
                </tr>
                <tr>
                  <td className="py-4 pr-8">Auto-categorization</td>
                  <td className="py-4 px-4 text-center text-[hsl(var(--brand-green))]">Yes</td>
                  <td className="py-4 px-4 text-center text-[hsl(var(--brand-green))]">Some</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">No</td>
                </tr>
                <tr>
                  <td className="py-4 pr-8">Relationship discovery</td>
                  <td className="py-4 px-4 text-center text-[hsl(var(--brand-green))]">Yes</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Limited</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">No</td>
                </tr>
                <tr>
                  <td className="py-4 pr-8">One-time cost</td>
                  <td className="py-4 px-4 text-center text-[hsl(var(--brand-green))]">$49</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">$20+/mo</td>
                  <td className="py-4 px-4 text-center text-[hsl(var(--brand-green))]">Free</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/features"
            className="btn-secondary"
            onClick={() => trackCTAClick("value-prop", "See all features", "/features")}
          >
            See all features
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ValuePropNew;
