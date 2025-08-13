import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-memory-blue/10 via-background to-memory-purple/10" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      
      <div className="container relative max-w-screen-2xl mx-auto px-4 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-card/50 px-3 py-1 text-sm mb-8 animate-fade-in">
            <span className="text-memory-green">✓</span>
            <span className="ml-2 text-foreground">Enterprise memory for coding agents</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl mb-6 animate-fade-in">
            Stop Explaining Your{" "}
            <span className="bg-gradient-to-r from-memory-blue to-memory-purple bg-clip-text text-transparent">
              Codebase
            </span>{" "}
            to AI Every Time
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            Enterprise memory that makes coding agents actually useful on large, existing codebases
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              Add Memory to Your Agents
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              See Enterprise Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in">
            <div className="text-center">
              <div className="text-2xl font-bold text-memory-green">2.7K+</div>
              <div className="text-sm text-muted-foreground">GitHub Stars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-memory-blue">10K+</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-memory-purple">50+</div>
              <div className="text-sm text-muted-foreground">Enterprise Teams</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;