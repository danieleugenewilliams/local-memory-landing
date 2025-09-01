const ProblemSolution = () => {
  return (
    <section className="py-8 lg:py-16 bg-slate-900">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
            AI Agents Are Smart...But They Have A Lousy Memory
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            <em>Local Memory</em> amplifies context engineering to create a seamless bridge between human expertise and AI knowledge.
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
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-red-500/60 min-h-24 sm:h-24">
                <span className="text-red-500 text-xl flex-shrink-0">🔄</span>
                <div>
                  <div className="font-medium text-white">"What was that auth flow again?"</div>
                  <div className="text-sm text-gray-300">Reexplaining architecture and reteaching patterns every session</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-red-500/60 min-h-24 sm:h-24">
                <span className="text-red-500 text-xl flex-shrink-0">😒</span>
                <div>
                  <div className="font-medium text-white">"I literally just explained this error pattern!"</div>
                  <div className="text-sm text-gray-300">Repeating the same debugging steps</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-red-500/60 min-h-24 sm:h-24">
                <span className="text-red-500 text-xl flex-shrink-0">⌛️</span>
                <div>
                  <div className="font-medium text-white">Context-switching hell with every new session or '/clear'</div>
                  <div className="text-sm text-gray-300">Lost productivity from constant re-onboarding</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-red-500/60 min-h-24 sm:h-24">
                <span className="text-red-500 text-xl flex-shrink-0">📋</span>
                <div>
                  <div className="font-medium text-white">Human clipboards for AI agents</div>
                  <div className="text-sm text-gray-300">Having to maintain dozens of context docs that get stale</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-red-500/60 min-h-24 sm:h-24">
                <span className="text-red-500 text-xl flex-shrink-0">😤</span>
                <div>
                  <div className="font-medium text-white">Starting over with each agent switch</div>
                  <div className="text-sm text-gray-300">Claude → OpenCode → Qwen → back to square one</div>
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
              <div className="flex items-start gap-3 p-4 pt-3 bg-slate-800 rounded-lg border-2 border-green-500/60 min-h-24 sm:h-24">
                <span className="text-green-500 text-xl flex-shrink-0">✨</span>
                <div>
                  <div className="font-medium text-white">"Remember that refactor pattern we established?"</div>
                  <div className="text-sm text-gray-300">Your decisions become institutional knowledge with instant context recall across all sessions</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-green-500/60 min-h-24 sm:h-24">
                <span className="text-green-500 text-xl flex-shrink-0">🧠</span>
                <div>
                  <div className="font-medium text-white">Your expertise becomes an intelligence asset</div>
                  <div className="text-sm text-gray-300">Context engineering transforms experience into permanent AI capability</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-green-500/60 min-h-24 sm:h-24">
                <span className="text-green-500 text-xl flex-shrink-0">🤓</span>
                <div>
                  <div className="font-medium text-white">Progressive understanding of YOUR patterns</div>
                  <div className="text-sm text-gray-300">AI learns your unique approaches and architectural preferences</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-green-500/60 min-h-24 sm:h-24">
                <span className="text-green-500 text-xl flex-shrink-0">🎯</span>
                <div>
                  <div className="font-medium text-white">Jump straight to solving, not explaining</div>
                  <div className="text-sm text-gray-300">Skip the context-setting and dive into productive work immediately</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-green-500/60 min-h-24 sm:h-24">
                <span className="text-green-500 text-xl flex-shrink-0">🔗</span>
                <div>
                  <div className="font-medium text-white">Seamless context across ALL of your agents</div>
                  <div className="text-sm text-gray-300">Claude, OpenCode, etc. — same memory available anywhere</div>
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