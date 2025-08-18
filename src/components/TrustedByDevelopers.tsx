
const TrustedByDevelopers = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            Stop Re-explaining Your Codebase
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Built by developers, for developers. Context amnesia is killing your productivity—time to fix that.
          </p>
        </div>

        {/* Real User Testimonial - Prominent */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-memory-blue/10 to-memory-purple/10 border border-memory-blue/20 rounded-2xl p-8 lg:p-12">
            <div className="text-center">
              <div className="text-4xl mb-6">💬</div>
              <blockquote className="text-xl sm:text-2xl text-foreground mb-6 italic leading-relaxed">
                "...I just wanted to share that the local memory MCP has really helped boost my productivity with [my project]. I'll package everything up and share it with you tomorrow... Thanks so much again for sharing!"
              </blockquote>
              <cite className="text-sm text-muted-foreground font-medium">
                — Early Access Developer
              </cite>
              
              {/* Before/After Metrics */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="text-lg font-bold text-red-500 mb-1">Before</div>
                  <div className="text-sm text-muted-foreground">AI Context Amnesia</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="text-lg font-bold text-memory-green mb-1">After</div>
                  <div className="text-sm text-muted-foreground">Zero re-explaining</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="text-lg font-bold text-memory-blue mb-1">Time Saved</div>
                  <div className="text-sm text-muted-foreground">4+ hours per day</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Benefits Grid */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-memory-blue/10 to-memory-purple/10 rounded-2xl p-6 border border-memory-blue/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-memory-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🧠</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Persistent Expertise</h4>
                  <p className="text-sm text-muted-foreground">
                    AI agents remember your codebase, patterns, and solutions. No more explaining the same architecture 50 times.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-memory-green/10 to-memory-blue/10 rounded-2xl p-6 border border-memory-green/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-memory-green/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Cross-Session Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    Knowledge builds up over time, not lost between conversations. Your AI gets smarter with every interaction.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-memory-purple/10 to-memory-green/10 rounded-2xl p-6 border border-memory-purple/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-memory-purple/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Smart Context Retrieval</h4>
                  <p className="text-sm text-muted-foreground">
                    Vector search finds relevant context automatically. From 50 explanations to zero in one install.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-memory-green/10 to-memory-purple/10 rounded-2xl p-6 border border-memory-green/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-memory-green/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Team Knowledge Base</h4>
                  <p className="text-sm text-muted-foreground">
                    Shared memory across your development team. Everyone benefits from collective expertise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Micro-CTA */}
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-4">
            <em>"Like giving your AI a brain upgrade—except it actually ships"</em>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedByDevelopers;