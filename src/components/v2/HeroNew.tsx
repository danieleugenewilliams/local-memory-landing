import { Link } from "react-router-dom";
import { trackCTAClick } from "@/lib/analytics";
import { useState, useEffect } from "react";

const HeroNew = () => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullWord = "remember";

  // Typewriter effect
  useEffect(() => {
    setTypedText("");
    let index = 0;
    
    const typeTimer = setInterval(() => {
      if (index <= fullWord.length) {
        setTypedText(fullWord.slice(0, index));
        index++;
      } else {
        clearInterval(typeTimer);
        // Hide cursor after typing completes
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, 120);

    return () => clearInterval(typeTimer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern grid-fade" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="container-wide relative">
        <div className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center md:py-28 lg:py-32">
          
          {/* Badge */}
          <div className="animate-in mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-[hsl(var(--brand-green))]" />
              100% Local. Your data never leaves.
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-in animate-in-delay-1 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-balance">
              AI agents that{" "}
              <span className="inline-block rounded bg-foreground px-3 py-1 text-background">
                {typedText}
                {showCursor && (
                  <span className="cursor-blink ml-0.5 inline-block h-[0.75em] w-[4px] translate-y-[0.05em] bg-background" />
                )}
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-in animate-in-delay-2 mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Stop re-explaining your codebase. Local Memory gives Claude, GPT, and every AI agent persistent memory that survives sessions, switches, and /clear.
          </p>

          {/* CTA */}
          <div className="animate-in animate-in-delay-3 mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Link
              to="/payment"
              className="btn-primary text-base"
              onClick={() => trackCTAClick("hero", "Get Started", "/payment")}
            >
              Get Started — $49
            </Link>
            <a
              href="#demo"
              className="btn-secondary text-base"
              onClick={() => trackCTAClick("hero", "See Demo", "#demo")}
            >
              See it in action
            </a>
          </div>

          {/* Trust line */}
          <p className="animate-in animate-in-delay-4 mt-8 text-sm text-muted-foreground">
            One-time purchase. Works with Claude, GPT, Gemini, Codex, and any MCP client.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;
