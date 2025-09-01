import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Medal, Trophy, Zap } from "lucide-react";

const Performance = () => {
  return (
    <Card className="mb-0 bg-transparent border-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-memory-blue" />
          <CardTitle className="text-xl text-white">Performance Benchmarks</CardTitle>
        </div>
        <CardDescription className="text-gray-300">
          Enjoy enterprise-grade performance with minimal resource usage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Benchmark Table */}
        {/* Desktop Table */}
        <div className="hidden md:block bg-slate-800/50 rounded-2xl border-2 border-slate-600 overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-slate-800">
              <tr className="border-b-2 border-slate-600">
                <th className="text-left p-4 font-semibold text-white border-r border-slate-600">Metric</th>
                <th className="text-left p-4 font-semibold text-white border-r border-slate-600">Before <em>Local Memory</em></th>
                <th className="text-left p-4 font-semibold text-white border-r border-slate-600">After <em>Local Memory</em></th>
                <th className="text-left p-4 font-semibold text-white">Improvement</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-600">
                <td className="p-4 font-medium text-white border-r border-slate-600">Vector Search</td>
                <td className="p-4 text-left text-red-400 border-r border-slate-600">50-100ms</td>
                <td className="p-4 text-left text-memory-green font-medium border-r border-slate-600">11-15ms</td>
                <td className="p-4 text-left">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-purple/20 text-memory-purple rounded-md text-sm font-bold">
                    5-8x FASTER
                  </span>
                </td>
              </tr>
              <tr className="border-b border-slate-600">
                <td className="p-4 font-medium text-white border-r border-slate-600">Memory Usage</td>
                <td className="p-4 text-left text-red-400 border-r border-slate-600">200MB+</td>
                <td className="p-4 text-left text-memory-green font-medium border-r border-slate-600">16MB</td>
                <td className="p-4 text-left">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-purple/20 text-memory-purple rounded-md text-sm font-bold">
                    12x LIGHTER
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white border-r border-slate-600">Dependencies</td>
                <td className="p-4 text-left text-red-400 border-r border-slate-600">Node.js, Typescript</td>
                <td className="p-4 text-left text-memory-green font-medium border-r border-slate-600">Zero</td>
                <td className="p-4 text-left">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-purple/20 text-memory-purple rounded-md text-sm font-bold">
                    ACTUALLY ZERO
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          <div className="bg-slate-800/50 rounded-lg border border-slate-600 p-4">
            <h4 className="font-semibold text-white mb-3">Vector Search</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Before:</span>
                <span className="text-red-400">50-100ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">After:</span>
                <span className="text-memory-green font-medium">11-15ms</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-300">Improvement:</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-blue/20 text-memory-blue rounded-md text-xs font-bold">
                  5-8x FASTER
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg border border-slate-600 p-4">
            <h4 className="font-semibold text-white mb-3">Memory Usage</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Before:</span>
                <span className="text-red-400">200MB+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">After:</span>
                <span className="text-memory-green font-medium">16MB</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-300">Improvement:</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-blue/20 text-memory-blue rounded-md text-xs font-bold">
                  12x LIGHTER
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg border border-slate-600 p-4">
            <h4 className="font-semibold text-white mb-3">Dependencies</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Before:</span>
                <span className="text-red-400">Node.js, Typescript</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">After:</span>
                <span className="text-memory-green font-medium">Zero</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-300">Improvement:</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-blue/20 text-memory-blue rounded-md text-xs font-bold">
                  ACTUALLY ZERO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Details */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">What Makes It Fast?</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-memory-yellow">✓</span>
                <span>Qdrant vector database integration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-memory-yellow">✓</span>
                <span>Optimized embeddings with nomic-embed-text</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-memory-yellow">✓</span>
                <span>Single binary deployment</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-memory-yellow">✓</span>
                <span>SQLite fallback for compatibility</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-memory-yellow">✓</span>
                <span>Rust-based performance optimizations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-memory-yellow">✓</span>
                <span>Intelligent caching strategies</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Performance;