import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { trackCTAClick } from "@/lib/analytics";

const Hero = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-memory-blue/10 via-background to-memory-purple/10" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      
      <div className="container relative max-w-screen-2xl mx-auto px-6 lg:px-8 py-8 lg:py-16">
        <div className="mx-auto max-w-6xl text-center">
          {/* Main headline - Blend technical credibility with emotional appeal */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 animate-fade-in leading-tight">
            <span className="block"><em>Local Memory</em>:</span>
            <span className="bg-gradient-to-r from-memory-blue to-memory-purple bg-clip-text text-transparent">
              End AI Context Amnesia <br /> That's Killing Your Productivity
            </span>
          </h1>
          
          {/* Data sovereignty and agent switching focus */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-6xl mx-auto mb-8 animate-fade-in leading-relaxed">
            <span>Persistent Memory for Claude, Codex, Gemini, OpenCode, and Every AI Agent.</span>
            <span className="block">Your Context, Your Control, Your Competitive Advantage.</span>
          </p>

          {/* Core problem positioning */}
          <div className="text-center mb-10 animate-fade-in">
            <p className="text-base sm:text-lg text-muted-foreground font-medium">
              <span>Stop explaining the same architecture decisions to every new AI conversation.</span>
              <span className="block">End the frustration of agents that forget everything when you type '/clear'.</span>
              <span className="block">With <em>Local Memory</em>, your AI agents finally remember and build on what they learned—across every platform.</span>
            </p>
          </div>
          
          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in">
            <Link to="/payment">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => trackCTAClick('hero', 'Build Your AI Intelligence', '/payment')}
              >
                Build Your AI Intelligence
              </Button>
            </Link>
            <a href="#demo">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => trackCTAClick('hero', 'See It In Action', '#demo')}
              >
                See It In Action →
              </Button>
            </a>
          </div>
          
          
          {/* Trust badges */}
          <div className="mt-6 text-center text-sm text-muted-foreground animate-fade-in">
            🔒One-Time Secure Payment  • 🛡️ 100% Local & Private • 🚫 Never Trains AI Models
          </div>

          <div className="text-sm text-muted-foreground animate-fade-in">
            <em>Two-minute setup. Your data never leaves your machine. Your competitive advantage stays yours.</em>
          </div>

        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;