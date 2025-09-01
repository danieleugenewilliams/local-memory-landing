const ContextEngineering = () => {
  return (
    <section className="py-8 lg:py-16 bg-background">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight" data-tooltip-target="tooltip-context-engineering" data-tooltip-style="light">
            What Is Context Engineering?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Context Engineering is the practice of conveying your human expertise, experience, and insights into AI systems to create value. It is the bridge between human expertise and AI knowledge.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto lg:items-stretch">
          {/* Traditional Approach */}
          <div className="space-y-6 flex flex-col">
            <div className="text-center -mb-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-full text-xl font-medium mb-4">
                Traditional Approach
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border min-h-20 sm:h-20">
                <span className="text-muted-foreground text-xl flex-shrink-0">📝</span>
                <div>
                  <div className="font-medium text-foreground">Paste context → AI forgets → Repeat tomorrow</div>
                  <div className="text-sm text-muted-foreground">Every session starts from zero</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border min-h-20 sm:h-20">
                <span className="text-muted-foreground text-xl flex-shrink-0">🔄</span>
                <div>
                  <div className="font-medium text-foreground">Re-explaining the same patterns over and over</div>
                  <div className="text-sm text-muted-foreground">Your expertise is temporary input, not permanent asset</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border min-h-20 sm:h-20">
                <span className="text-muted-foreground text-xl flex-shrink-0">⌛</span>
                <div>
                  <div className="font-medium text-foreground">Time spent teaching, not building</div>
                  <div className="text-sm text-muted-foreground">AI is a tool you keep instructing</div>
                </div>
              </div>
            </div>
          </div>

          {/* Context Engineering */}
          <div className="space-y-6 flex flex-col">
            <div className="text-center -mb-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-memory-blue/20 to-memory-purple/20 text-foreground rounded-full text-xl font-medium mb-4">
                Context Engineering
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-memory-blue/30 min-h-20 sm:h-20">
                <span className="text-memory-blue text-xl flex-shrink-0">🧠</span>
                <div>
                  <div className="font-medium text-foreground">Teach once → AI remembers forever</div>
                  <div className="text-sm text-muted-foreground">Your expertise becomes permanent intelligence</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-memory-purple/30 min-h-20 sm:h-20">
                <span className="text-memory-purple text-xl flex-shrink-0">🏗️</span>
                <div>
                  <div className="font-medium text-foreground">Building cumulative knowledge assets</div>
                  <div className="text-sm text-muted-foreground">Every explanation adds permanent value to your AI</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-green-500/30 min-h-20 sm:h-20">
                <span className="text-green-500 text-xl flex-shrink-0">🚀</span>
                <div>
                  <div className="font-medium text-foreground">AI becomes your intelligent partner</div>
                  <div className="text-sm text-muted-foreground">It knows YOUR patterns, preferences, and expertise</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Message */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-memory-blue/10 to-memory-purple/10 border border-memory-blue/20 rounded-2xl p-8 text-center">
            <p className="text-xl sm:text-2xl text-foreground mb-4 leading-relaxed">
              Every explanation, correction, and domain insight becomes part of your AI's <strong>permanent intelligence</strong>. 
              You're building a knowledge system that amplifies your unique expertise.
            </p>
            <p className="text-lg text-muted-foreground">
              <strong>Context Engineering:</strong> Build assets, not training data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContextEngineering;