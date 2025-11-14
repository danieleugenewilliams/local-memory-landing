const ProblemSolution = () => {
  return (
    <section className="py-8 lg:py-16 bg-slate-900 pb-8">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
            Your Context Is Trapped in Silos While Training AI Competitors
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Every AI agent starts from zero. Your proprietary workflows become training data. Projects drown in stale markdown files.
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
                  <div className="font-medium text-white">"Claude knows our auth flow, but GPT doesn't"</div>
                  <div className="text-sm text-gray-300">Context trapped in agent silos - starting from scratch with every switch</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-red-500/60 min-h-24 sm:h-24">
                <span className="text-red-500 text-xl flex-shrink-0">🧠</span>
                <div>
                  <div className="font-medium text-white">Your workflows are training competitor AI models</div>
                  <div className="text-sm text-gray-300">Proprietary architectural decisions become free training data</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-red-500/60 min-h-24 sm:h-24">
                <span className="text-red-500 text-xl flex-shrink-0">⌛️</span>
                <div>
                  <div className="font-medium text-white">Every '/clear' erases hours of architectural decisions</div>
                  <div className="text-sm text-gray-300">Session amnesia wastes 2+ hours daily rebuilding context</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-red-500/60 min-h-24 sm:h-24">
                <span className="text-red-500 text-xl flex-shrink-0">📋</span>
                <div>
                  <div className="font-medium text-white">Projects drowning in stale context markdown files</div>
                  <div className="text-sm text-gray-300">Manual copy-paste workflows between agents that go out of date</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-red-500/60 min-h-24 sm:h-24">
                <span className="text-red-500 text-xl flex-shrink-0">💸</span>
                <div>
                  <div className="font-medium text-white">Agent switching costs pile up daily</div>
                  <div className="text-sm text-gray-300">Claude → GPT → Gemini = constantly rebuilding the same context</div>
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
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-red-500/60 min-h-24 sm:h-24">
                <span className="text-green-500 text-xl flex-shrink-0">🔗</span>
                <div>
                  <div className="font-medium text-white">Universal agent memory across Claude, GPT, Gemini, Qwen</div>
                  <div className="text-sm text-gray-300">Context persists and transfers seamlessly between any AI agent</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-red-500/60 min-h-24 sm:h-24">
                <span className="text-green-500 text-xl flex-shrink-0">🛡️</span>
                <div>
                  <div className="font-medium text-white">100% local data sovereignty - never trains AI models</div>
                  <div className="text-sm text-gray-300">Your competitive advantage stays yours, not shared with competitors</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-green-500/60 min-h-24 sm:h-24">
                <span className="text-green-500 text-xl flex-shrink-0">⚡</span>
                <div>
                  <div className="font-medium text-white">Context survives '/clear', restarts, and agent switches</div>
                  <div className="text-sm text-gray-300">Session persistence eliminates daily context reconstruction waste</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-green-500/60 min-h-24 sm:h-24">
                <span className="text-green-500 text-xl flex-shrink-0">🗂️</span>
                <div>
                  <div className="font-medium text-white">Replace markdown chaos with smart, searchable memory</div>
                  <div className="text-sm text-gray-300">No more stale context docs - dynamic, always-current knowledge</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 pt-6 bg-slate-800 rounded-lg border-2 border-green-500/60 min-h-24 sm:h-24">
                <span className="text-green-500 text-xl flex-shrink-0">🎯</span>
                <div>
                  <div className="font-medium text-white">Jump straight to solving, not explaining</div>
                  <div className="text-sm text-gray-300">End context reconstruction costs - start productive work immediately</div>
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