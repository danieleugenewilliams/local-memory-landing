const SolutionSection = () => {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Local Memory: The Missing Layer for Enterprise AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A persistent memory system that learns your codebase, patterns, and decisions
          </p>
        </div>
        
        {/* Architecture Diagram */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* AI Agent */}
              <div className="text-center">
                <div className="w-20 h-20 bg-memory-blue/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="font-bold text-foreground">AI Agent</h3>
                <p className="text-sm text-muted-foreground">Claude, ChatGPT, etc.</p>
              </div>
              
              {/* Arrow */}
              <div className="text-memory-blue text-2xl lg:rotate-0 rotate-90">↔</div>
              
              {/* Local Memory */}
              <div className="text-center">
                <div className="w-20 h-20 bg-hero-gradient rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-glow">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="font-bold text-foreground">Local Memory</h3>
                <p className="text-sm text-muted-foreground">Persistent Learning Layer</p>
              </div>
              
              {/* Arrow */}
              <div className="text-memory-blue text-2xl lg:rotate-0 rotate-90">↔</div>
              
              {/* Your Codebase */}
              <div className="text-center">
                <div className="w-20 h-20 bg-memory-purple/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="font-bold text-foreground">Your Codebase</h3>
                <p className="text-sm text-muted-foreground">500K+ lines, real patterns</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl p-8 border border-border animate-slide-in-left">
            <div className="text-memory-green text-2xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Remembers architectural decisions across sessions
            </h3>
            <p className="text-muted-foreground">
              Never explain your system design twice
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 border border-border animate-slide-in-right">
            <div className="text-memory-green text-2xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Learns your coding patterns and conventions
            </h3>
            <p className="text-muted-foreground">
              AI adapts to your team's style automatically
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 border border-border animate-slide-in-left">
            <div className="text-memory-green text-2xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Builds expertise about your domain and business logic
            </h3>
            <p className="text-muted-foreground">
              Deep understanding of your specific requirements
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 border border-border animate-slide-in-right">
            <div className="text-memory-green text-2xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Works with ANY AI platform
            </h3>
            <p className="text-muted-foreground">
              Claude, ChatGPT, OpenCode, and more
            </p>
          </div>
        </div>
        
        {/* Security callout */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-6 py-3 border border-memory-green/20">
            <span className="text-memory-green">🔒</span>
            <span className="font-medium text-foreground">100% Local - Your code never leaves your infrastructure</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;