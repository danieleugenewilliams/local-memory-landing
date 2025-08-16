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
          {/* Problem Statement */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 animate-fade-in leading-tight">
            AI Agents Are Smart... But They Forget Everything
          </h2>
          
          {/* Main headline */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 animate-fade-in leading-tight">
            Give Any AI Agent{" "}
            <span className="bg-gradient-to-r from-memory-blue to-memory-purple bg-clip-text text-transparent">
              Persistent Memory
            </span>{" "}
            and Learning
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in leading-relaxed">
            The only memory system with native MCP integration + universal REST API. 26 AI memory tools for any platform.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
            <Link to="/payment">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Get Started with Local Memory
              </Button>
            </Link>
            <a href="#demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto animate-fade-in">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-memory-green">26</div>
              <div className="text-xs sm:text-sm text-muted-foreground">MCP Tools</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-memory-blue">10K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-memory-purple">v2.7.3</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Latest Version</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;