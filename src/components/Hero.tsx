import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-memory-blue/10 via-background to-memory-purple/10" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      
      <div className="container relative max-w-screen-2xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main headline - Blend technical credibility with emotional appeal */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 animate-fade-in leading-tight">
            The AI Memory System That{" "}
            <span className="bg-gradient-to-r from-memory-blue to-memory-purple bg-clip-text text-transparent">
              Cures 'Context Amnesia'
            </span>
          </h1>
          
          {/* Problem Statement with emotional hook */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 animate-fade-in leading-tight">
            AI Agents Are Smart... But They Have a Lousy Memory
          </h2>
          
          {/* Subheading with performance focus + pain points */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in leading-relaxed">
            Every new session. Every /clear. Every agent switch. Knowledge lost. Your AI is brilliant but has the memory of a goldfish.
          </p>
          
          {/* Key Benefits (single line) */}
          <div className="text-center mb-10 animate-fade-in">
            <p className="text-base sm:text-lg text-muted-foreground font-medium space-x-6">
              <p>Give your AI permanent memory across ALL coding agents.</p>
              <p>Claude → Codex → Gemini → OpenCode - Your context travels with you.</p>
            </p>
          </div>
          
          {/* Urgency Banner */}
          <div className="mb-6 p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg animate-fade-in">
            <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
              🔥 Early access: spots limited to the first 1,000 customers
            </p>
          </div>
          
          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in">
            <Link to="/payment">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                🚀 Get Early Access - $29
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
            🔒 One-time payment • 🛡️ 30-day guarantee • ⚡ Instant access
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;