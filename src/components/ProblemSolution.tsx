const ProblemSolution = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
            Your AI Suffers from{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Context Amnesia
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Before - Problem */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-sm font-medium mb-4">
                😤 Before <em>Local Memory</em>
              </div>
              <h3 className="text-2xl font-bold text-foreground">The Frustration Cycle</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-red-500/20">
                <span className="text-red-500 text-xl flex-shrink-0">🔄</span>
                <div>
                  <div className="font-medium text-foreground">"What was that auth flow again?"</div>
                  <div className="text-sm text-muted-foreground">Re-explaining architecture every session</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-red-500/20">
                <span className="text-red-500 text-xl flex-shrink-0">😤</span>
                <div>
                  <div className="font-medium text-foreground">"I literally just explained this error pattern"</div>
                  <div className="text-sm text-muted-foreground">Repeating the same debugging steps</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-red-500/20">
                <span className="text-red-500 text-xl flex-shrink-0">⏰</span>
                <div>
                  <div className="font-medium text-foreground">Context-switching hell with every new session or /clear</div>
                  <div className="text-sm text-muted-foreground">Lost productivity from constant re-onboarding</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-red-500/20">
                <span className="text-red-500 text-xl flex-shrink-0">📝</span>
                <div>
                  <div className="font-medium text-foreground">Copy-pasting the same explanations</div>
                  <div className="text-sm text-muted-foreground">Maintaining manual context docs that get stale</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-red-500/20">
                <span className="text-red-500 text-xl flex-shrink-0">🤯</span>
                <div>
                  <div className="font-medium text-foreground">Starting fresh with each agent switch</div>
                  <div className="text-sm text-muted-foreground">Claude → Codex → Gemini → back to square one</div>
                </div>
              </div>
            </div>
          </div>

          {/* After - Solution */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-medium mb-4">
                ✨ After <em>Local Memory</em>
              </div>
              <h3 className="text-2xl font-bold text-foreground">The Flow State</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-green-500/20">
                <span className="text-green-500 text-xl flex-shrink-0">✨</span>
                <div>
                  <div className="font-medium text-foreground">"Remember that refactor we discussed yesterday?"</div>
                  <div className="text-sm text-muted-foreground">Instant context recall across all sessions</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-green-500/20">
                <span className="text-green-500 text-xl flex-shrink-0">🧠</span>
                <div>
                  <div className="font-medium text-foreground">Every code review comment saved forever</div>
                  <div className="text-sm text-muted-foreground">Building institutional knowledge automatically</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-green-500/20">
                <span className="text-green-500 text-xl flex-shrink-0">🚀</span>
                <div>
                  <div className="font-medium text-foreground">Progressive understanding of your architecture</div>
                  <div className="text-sm text-muted-foreground">AI agents that get smarter about your codebase over time</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-green-500/20">
                <span className="text-green-500 text-xl flex-shrink-0">🎯</span>
                <div>
                  <div className="font-medium text-foreground">Jump straight to solving, not explaining</div>
                  <div className="text-sm text-muted-foreground">Skip the setup, dive into deep work immediately</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-green-500/20">
                <span className="text-green-500 text-xl flex-shrink-0">🔗</span>
                <div>
                  <div className="font-medium text-foreground">Seamless context across ALL your agents</div>
                  <div className="text-sm text-muted-foreground">Claude, Codex, Gemini, OpenCode - same memory everywhere</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-memory-blue/10 text-memory-blue rounded-full text-sm font-medium mb-4">
            💡 The Solution
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop losing context. Start building on yesterday's progress. 
            <strong className="text-foreground"> Give your AI permanent memory.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;