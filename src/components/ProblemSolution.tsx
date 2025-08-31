const ProblemSolution = () => {
  return (
    <section className="py-8 lg:py-16 bg-background">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
            AI Agents Are Smart...But They Have A Lousy Memory
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop losing context. Continue building on your progress with memory-enabled AI.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto lg:items-stretch">
          {/* Before - Problem */}
          <div className="space-y-6 flex flex-col">
            <div className="text-center -mb-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-2xl font-medium mb-4">
                BEFORE <em>Local Memory</em>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-red-500/60 min-h-20 sm:h-20">
                <span className="text-red-500 text-xl flex-shrink-0">🔄</span>
                <div>
                  <div className="font-medium text-foreground">"What was that auth flow again?"</div>
                  <div className="text-sm text-muted-foreground">Re-explaining architecture every session</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-red-500/60 min-h-20 sm:h-20">
                <span className="text-red-500 text-xl flex-shrink-0">😒</span>
                <div>
                  <div className="font-medium text-foreground">"I literally just explained this error pattern!"</div>
                  <div className="text-sm text-muted-foreground">Repeating the same debugging steps</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-red-500/60 min-h-20 sm:h-20">
                <span className="text-red-500 text-xl flex-shrink-0">⌛️</span>
                <div>
                  <div className="font-medium text-foreground">Context-switching hell with every new session or '/clear'</div>
                  <div className="text-sm text-muted-foreground">Lost productivity from constant re-onboarding</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-red-500/60 min-h-20 sm:h-20">
                <span className="text-red-500 text-xl flex-shrink-0">📝</span>
                <div>
                  <div className="font-medium text-foreground">Copy/pasting the same explanations</div>
                  <div className="text-sm text-muted-foreground">Having to maintain dozens of context docs that get stale</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-red-500/60 min-h-20 sm:h-20">
                <span className="text-red-500 text-xl flex-shrink-0">😤</span>
                <div>
                  <div className="font-medium text-foreground">Starting over with each agent switch</div>
                  <div className="text-sm text-muted-foreground">Claude → OpenCode → Qwen → back to square one</div>
                </div>
              </div>
            </div>
          </div>

          {/* After - Solution */}
          <div className="space-y-6 flex flex-col">
            <div className="text-center -mb-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-2xl font-medium mb-4">
                AFTER <em>Local Memory</em>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-green-500/60 min-h-20 sm:h-20">
                <span className="text-green-500 text-xl flex-shrink-0">✨</span>
                <div>
                  <div className="font-medium text-foreground">"Remember that refactor we discussed yesterday?"</div>
                  <div className="text-sm text-muted-foreground">Instant context recall across all sessions</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-green-500/60 min-h-20 sm:h-20">
                <span className="text-green-500 text-xl flex-shrink-0">🧠</span>
                <div>
                  <div className="font-medium text-foreground">Every code review comment saved forever</div>
                  <div className="text-sm text-muted-foreground">Builds institutional knowledge automatically</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-green-500/60 min-h-20 sm:h-20">
                <span className="text-green-500 text-xl flex-shrink-0">🤓</span>
                <div>
                  <div className="font-medium text-foreground">Progressive understanding of your architecture</div>
                  <div className="text-sm text-muted-foreground">AI agents get smarter about your codebase over time</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-green-500/60 min-h-20 sm:h-20">
                <span className="text-green-500 text-xl flex-shrink-0">🎯</span>
                <div>
                  <div className="font-medium text-foreground">Jump straight to solving, not explaining</div>
                  <div className="text-sm text-muted-foreground">Skip the context-setting and dive into productive work immediately</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border-2 border-green-500/60 min-h-20 sm:h-20">
                <span className="text-green-500 text-xl flex-shrink-0">🔗</span>
                <div>
                  <div className="font-medium text-foreground">Seamless context across ALL of your agents</div>
                  <div className="text-sm text-muted-foreground">Claude, OpenCode, etc. — same memory available anywhere</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ProblemSolution;