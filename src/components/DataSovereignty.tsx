const DataSovereignty = () => {
  return (
    <section className="py-8 lg:pt-8 lg:pb-6 bg-slate-900">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
            Why "Local" Matters More Than Ever
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Every context you engineer is an asset. Why would you give it away for free?!
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-6">
          <div className="bg-slate-800 rounded-2xl border-2 border-amber-500/30 p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">The New Reality: Cloud-based AI companies will exploit your context data</h3>
            <div className="grid grid-cols-[auto_1fr] gap-8 items-center lg:justify-center lg:max-w-4xl lg:mx-auto pb-8">
              <div className="flex items-center justify-center">
                <div className="text-amber-500 text-6xl">⚠️</div>
              </div>
              <div className="space-y-1">
                <div className="text-white text-md">Your debugging patterns = their training data</div>
                <div className="text-white text-md">Your architecture decisions = their model improvements</div>
                <div className="text-white text-md">Your domain expertise = their competitive advantage</div>
              </div>
            </div>
              <div className="lg:max-w-5xl lg:mx-auto">
              <table className="w-full text-sm p-4 lg:p-8">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 lg:px-8 font-medium text-muted-foreground"></th>
                    <th className="text-left py-3 px-4 lg:px-8 font-bold text-muted-400">Cloud AI Memory</th>
                    <th className="text-left py-3 px-4 lg:px-8 font-bold text-muted-400">Local Memory</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 px-4 lg:px-8 font-medium text-white">Who owns your context?</td>
                    <td className="py-3 px-4 lg:px-8 text-left text-white-400">
                      <span className="text-green-500 hidden md:inline">❌ </span>
                      <span className="text-left md:text-left">Them</span>
                    </td>
                    <td className="py-3 px-4 lg:px-8 text-left text-white-400">
                      <span className="text-green-500 hidden md:inline">✅ </span>
                      <span className="text-left md:text-left">You</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 lg:px-8 font-medium text-white">Training data?</td>
                    <td className="py-3 px-4 lg:px-8 text-left text-white-400">
                      <span className="text-green-500 hidden md:inline">❌ </span>
                      <span className="text-left md:text-left">Yes, yours</span>
                    </td>
                    <td className="py-3 px-4 lg:px-8 text-left text-white-400">
                      <span className="text-green-500 hidden md:inline">✅ </span>
                      <span className="text-left md:text-left">Never</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 lg:px-8 font-medium text-white">Portable?</td>
                    <td className="py-3 px-4 lg:px-8 text-left text-white-400">
                      <span className="text-green-500 hidden md:inline">❌ </span>
                      <span className="text-left md:text-left">Locked in</span>
                    </td>
                    <td className="py-3 px-4 lg:px-8 text-left text-white-400">
                      <span className="text-green-500 hidden md:inline">✅ </span>
                      <span className="text-left md:text-left">Use with any AI model</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 lg:px-8 font-medium text-white">Private?</td>
                    <td className="py-3 px-4 lg:px-8 text-left text-white-400">
                      <span className="text-green-500 hidden md:inline">❌ </span>
                      <span className="text-left md:text-left">"Trust us"</span>
                    </td>
                    <td className="py-3 px-4 lg:px-8 text-left text-white-400">
                      <span className="text-green-500 hidden md:inline">✅ </span>
                      <span className="text-left md:text-left">Actually private</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 lg:px-8 font-medium text-white">Your competitive advantage?</td>
                    <td className="py-3 px-4 lg:px-8 text-left text-white-400">
                      <span className="text-green-500 hidden md:inline">❌ </span>
                      <span className="text-left md:text-left">Shared with millions</span>
                    </td>
                    <td className="py-3 px-4 lg:px-8 text-left text-white-400">
                      <span className="text-green-500 hidden md:inline">✅ </span>
                      <span className="text-left md:text-left">Your expertise stays yours</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center pt-8">
                <p className="text-lg font-medium text-white mb-2">Your years of experience = <span className="text-memory-blue font-bold">$500k - $1M+</span> in encoded expertise</p>
                <p className="text-sm text-gray-300">Context Engineering = Building knowledgeassets, not training data</p>
              </div>
              </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DataSovereignty;