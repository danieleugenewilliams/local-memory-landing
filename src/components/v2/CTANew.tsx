import { Link } from "react-router-dom";
import { trackCTAClick } from "@/lib/analytics";

const CTANew = () => {
  return (
    <section className="section bg-card/30">
      <div className="container-tight text-center">
        {/* Headline */}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Ready to add a knowledge layer?
        </h2>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Two-minute setup. Your files stay yours. Local Memory adds the layer that turns working knowledge into lasting understanding.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <Link
            to="/payment"
            className="btn-primary text-base"
            onClick={() => trackCTAClick("final-cta", "Get Started", "/payment")}
          >
            Get Started — $49
          </Link>
          <Link
            to="/docs"
            className="btn-secondary text-base"
            onClick={() => trackCTAClick("final-cta", "Read the docs", "/docs")}
          >
            Read the docs
          </Link>
        </div>

        {/* Trust elements */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
          <span>One-time purchase</span>
          <span className="hidden sm:inline">·</span>
          <span>MCP + REST API</span>
          <span className="hidden sm:inline">·</span>
          <span>macOS, Windows, Linux</span>
        </div>
      </div>
    </section>
  );
};

export default CTANew;
