const BeforeAfter = () => {
  return (
    <section className="py-32 bg-muted/20">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Before */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="inline-flex items-center gap-2 text-destructive">
              <span className="text-xl sm:text-2xl">😕</span>
              <h3 className="text-xl sm:text-2xl font-bold">Before: Confused Agent</h3>
            </div>
            
            <div className="bg-code-bg rounded-lg p-6 border border-border">
              <div className="text-sm text-code-comment mb-2">// AI Agent</div>
              <div className="space-y-2 text-sm">
                <div className="text-code-string">"I don't understand your architecture"</div>
                <div className="text-code-string">"What's your coding style?"</div>
                <div className="text-code-string">"Can you explain this pattern?"</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-1">
                  <span className="text-destructive text-xs">✗</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Starts from zero every conversation</div>
                  <div className="text-sm text-muted-foreground">No context about your codebase</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-1">
                  <span className="text-destructive text-xs">✗</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Ignores team conventions</div>
                  <div className="text-sm text-muted-foreground">Suggests patterns that don't fit</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-1">
                  <span className="text-destructive text-xs">✗</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Repeats basic questions</div>
                  <div className="text-sm text-muted-foreground">Wastes time explaining fundamentals</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* After */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="inline-flex items-center gap-2 text-memory-green">
              <span className="text-xl sm:text-2xl">🚀</span>
              <h3 className="text-xl sm:text-2xl font-bold">After: Expert Agent</h3>
            </div>
            
            <div className="bg-code-bg rounded-lg p-6 border border-primary/20 shadow-glow">
              <div className="text-sm text-code-comment mb-2">// AI Agent with Memory</div>
              <div className="space-y-2 text-sm">
                <div className="text-code-string">"Based on your team's patterns..."</div>
                <div className="text-code-string">"Following your architecture..."</div>
                <div className="text-code-string">"Using your established conventions..."</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-memory-green/20 flex items-center justify-center mt-1">
                  <span className="text-memory-green text-xs">✓</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Remembers architectural decisions</div>
                  <div className="text-sm text-muted-foreground">Never explain your system design twice</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-memory-green/20 flex items-center justify-center mt-1">
                  <span className="text-memory-green text-xs">✓</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Learns coding patterns</div>
                  <div className="text-sm text-muted-foreground">AI adapts to your team's style automatically</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-memory-green/20 flex items-center justify-center mt-1">
                  <span className="text-memory-green text-xs">✓</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Builds domain expertise</div>
                  <div className="text-sm text-muted-foreground">Deep understanding of your business logic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;