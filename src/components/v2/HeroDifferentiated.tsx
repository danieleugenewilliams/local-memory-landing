import { Link } from "react-router-dom";
import { trackCTAClick } from "@/lib/analytics";
import { useState, useEffect } from "react";
import LogoBar from "./LogoBar";

const HeroDifferentiated = () => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullWord = "thinks";

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
          
          {/* Badge - Positioning statement */}
          <div className="animate-in mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-[hsl(var(--brand-green))]" />
              Not a replacement. A knowledge layer.
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-in animate-in-delay-1 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-balance">
              AI memory that{" "}
              <span className="inline-block rounded bg-foreground px-3 py-1 text-background">
                {typedText}
                {showCursor && (
                  <span className="cursor-blink ml-0.5 inline-block h-[0.75em] w-[4px] translate-y-[0.05em] bg-background" />
                )}
              </span>
            </span>
          </h1>

          {/* Subheadline - Architecture focus */}
          <p className="animate-in animate-in-delay-2 mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Your files are for working. Local Memory is for knowing. Observations evolve
            into learnings, then patterns, then understanding.
          </p>

          {/* Differentiator pills */}
          <div className="animate-in animate-in-delay-2 mt-8 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-sm">
              <span className="text-[hsl(var(--brand-blue))]">↗</span> Knowledge hierarchy
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-sm">
              <span className="text-[hsl(var(--brand-purple))]">⚡</span> Contradiction detection
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-sm">
              <span className="text-[hsl(var(--brand-green))]">?</span> Gap tracking
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-sm">
              <span className="text-[hsl(var(--brand-orange))]">↻</span> Knowledge evolution
            </span>
          </div>

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
              href="#architecture"
              className="btn-secondary text-base"
              onClick={() => trackCTAClick("hero", "See the difference", "#architecture")}
            >
              See the difference
            </a>
          </div>

          {/* Trust line */}
          <p className="animate-in animate-in-delay-4 mt-8 text-sm text-muted-foreground">
            100% local. One-time purchase. Works with Claude, GPT, Gemini, and any MCP client.
          </p>

          {/* Logo bar */}
          <div className="animate-in animate-in-delay-5 mt-10">
            <LogoBar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDifferentiated;
