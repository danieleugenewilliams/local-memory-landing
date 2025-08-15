const SolutionSection = () => {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            Local Memory: Universal AI Memory System
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            A persistent memory system that works with all AI platforms and learns from every interaction
          </p>
        </div>
        
        {/* Architecture Diagram */}
        <div className="max-w-4xl mx-auto mb-12 lg:mb-16">
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
              {/* AI Platforms */}
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-memory-blue/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl sm:text-2xl">🤖</span>
                </div>
                <h3 className="font-bold text-foreground text-sm sm:text-base">Any AI Platform</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Claude, ChatGPT, Cursor, etc.</p>
              </div>
              
              {/* Arrow */}
              <div className="text-memory-blue text-2xl lg:rotate-0 rotate-90">↔</div>
              
              {/* Local Memory */}
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-hero-gradient rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-glow">
                  <span className="text-xl sm:text-2xl">🧠</span>
                </div>
                <h3 className="font-bold text-foreground text-sm sm:text-base">Local Memory</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">MCP + REST API</p>
              </div>
              
              {/* Arrow */}
              <div className="text-memory-blue text-2xl lg:rotate-0 rotate-90">↔</div>
              
              {/* Your Data */}
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-memory-purple/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl sm:text-2xl">💾</span>
                </div>
                <h3 className="font-bold text-foreground text-sm sm:text-base">Your Knowledge</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Private, local, secure</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border animate-slide-in-left">
            <div className="text-memory-green text-xl sm:text-2xl mb-4">✓</div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
              Lightning-fast FAISS vector search
            </h3>
            <p className="text-muted-foreground">
              Sub-millisecond semantic search across millions of memories
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border animate-slide-in-right">
            <div className="text-memory-green text-xl sm:text-2xl mb-4">✓</div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
              Works with ALL AI platforms
            </h3>
            <p className="text-muted-foreground">
              MCP for Claude/OpenCode, REST API for everything else
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border animate-slide-in-left">
            <div className="text-memory-green text-xl sm:text-2xl mb-4">✓</div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
              AI-powered relationship discovery
            </h3>
            <p className="text-muted-foreground">
              Automatically finds connections between memories and concepts
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border animate-slide-in-right">
            <div className="text-memory-green text-xl sm:text-2xl mb-4">✓</div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
              Complete privacy and control
            </h3>
            <p className="text-muted-foreground">
              All data stays on your machine - no cloud dependencies
            </p>
          </div>
        </div>
        
        {/* Security callout */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-6 py-3 border border-memory-green/20">
            <span className="text-memory-green">🔒</span>
            <span className="font-medium text-foreground">100% Local - Your data never leaves your machine</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;