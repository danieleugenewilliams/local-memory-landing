import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { forwardRef } from "react";

const Hero = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-memory-blue/10 via-background to-memory-purple/10" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      
      <div className="container relative max-w-screen-2xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main headline - Blend technical credibility with emotional appeal */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 animate-fade-in leading-tight">
            <p><em>Local Memory</em> :</p>
            <span className="bg-gradient-to-r from-memory-blue to-memory-purple bg-clip-text text-transparent">
              The AI System That Cures 'Context Amnesia'
            </span>
          </h1>
          
          {/* Subheading with performance focus + pain points */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in leading-relaxed">
            Every new session, every `/clear`, every agent switch, knowledge is lost. AI is brilliant but has memory like a sieve.
          </p>
          
          {/* Key Benefits (single line) */}
          <div className="text-center mb-10 animate-fade-in">
            <p className="text-base sm:text-lg text-muted-foreground font-medium space-x-6">
              <p>Give your AI permanent memory across ALL coding agents with <em>Local Memory</em>.</p>
              <p>Your context travels with you.</p>
            </p>
          </div>
          
          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in">
            <Link to="/payment">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Upgrade Your Coding Agent's Memory Now - $29
              </Button>
            </Link>
            <a href="#demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See It In Action →
              </Button>
            </a>
          </div>
          
          
          {/* Trust badges */}
          <div className="mt-6 text-center text-sm text-muted-foreground animate-fade-in">
            🔒 One-Time Secure Stripe Payment • ⚡ Instant Access • 🛡️ 100% Local & Private
          </div>

          <div className="text-sm text-muted-foreground">
            <em>Two-minute setup. Zero dependencies. Yes, actually zero. Not 'zero*' with 47 footnotes.</em>
          </div>

        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;