import { Link } from "react-router-dom";
import { trackCTAClick } from "@/lib/analytics";

const checklist = [
  {
    title: "Full MCP integration",
    description: "Native support for Claude Desktop, Claude Code, and any MCP client",
  },
  {
    title: "Universal REST API",
    description: "Works with GPT, Gemini, Codex, and custom agents",
  },
  {
    title: "Semantic search",
    description: "Vector-powered search with 10ms response times",
  },
  {
    title: "Cross-agent memory",
    description: "Context flows between every tool you use",
  },
  {
    title: "Lifetime updates",
    description: "Every future feature, included forever",
  },
  {
    title: "macOS, Windows, Linux",
    description: "Runs anywhere you code",
  },
];

const SuccessSection = () => {
  return (
    <section className="section-sm bg-background">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Everything you need. Nothing you don't.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            One purchase. No subscriptions. No cloud dependencies. No limits.
          </p>
        </div>

        {/* Checklist grid */}
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {checklist.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-border bg-card/50 p-4"
              >
                {/* Checkmark */}
                <div className="mt-0.5 flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-[hsl(var(--brand-green))]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                {/* Content */}
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Micro-CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/features"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => trackCTAClick("success-section", "View full feature list", "/features")}
          >
            View full feature list
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessSection;
