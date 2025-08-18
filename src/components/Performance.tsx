import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

const Performance = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-memory-green" />
          <CardTitle className="text-xl">Performance Benchmarks</CardTitle>
        </div>
        <CardDescription>
          Enterprise-grade performance with minimal resource usage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Benchmark Table */}
        <div className="bg-muted/50 rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">Metric</th>
                  <th className="text-center p-4 font-semibold text-muted-foreground">Before</th>
                  <th className="text-center p-4 font-semibold text-muted-foreground">After</th>
                  <th className="text-center p-4 font-semibold text-foreground">Improvement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-4 font-medium text-foreground">Vector Search</td>
                  <td className="p-4 text-center text-muted-foreground">50-100ms</td>
                  <td className="p-4 text-center text-memory-green font-semibold">11-15ms</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-green/20 text-memory-green rounded-md text-sm font-bold">
                      🚀 5-8x FASTER
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 font-medium text-foreground">Memory Usage</td>
                  <td className="p-4 text-center text-muted-foreground">200MB+</td>
                  <td className="p-4 text-center text-memory-blue font-semibold">16MB</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-blue/20 text-memory-blue rounded-md text-sm font-bold">
                      🚀 12x LIGHTER
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 font-medium text-foreground">Dependencies</td>
                  <td className="p-4 text-center text-muted-foreground">Node.js, Python, Docker</td>
                  <td className="p-4 text-center text-memory-purple font-semibold">Zero</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-purple/20 text-memory-purple rounded-md text-sm font-bold">
                      🚀 ACTUALLY ZERO
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center bg-muted/50 rounded-lg p-4">
            <div className="text-2xl sm:text-3xl font-bold text-memory-green mb-2">11-15ms</div>
            <div className="text-sm text-muted-foreground">Vector Search</div>
          </div>
          <div className="text-center bg-muted/50 rounded-lg p-4">
            <div className="text-2xl sm:text-3xl font-bold text-memory-blue mb-2">±1ms</div>
            <div className="text-sm text-muted-foreground">Consistency</div>
          </div>
          <div className="text-center bg-muted/50 rounded-lg p-4">
            <div className="text-2xl sm:text-3xl font-bold text-memory-purple mb-2">16MB</div>
            <div className="text-sm text-muted-foreground">Memory Usage</div>
          </div>
        </div>

        {/* Performance Details */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">What Makes It Fast?</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-memory-green">✓</span>
                <span>Qdrant vector database integration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-memory-green">✓</span>
                <span>Optimized embeddings with nomic-embed-text</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-memory-green">✓</span>
                <span>Single binary deployment</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-memory-green">✓</span>
                <span>SQLite fallback for compatibility</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-memory-green">✓</span>
                <span>Rust-based performance optimizations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-memory-green">✓</span>
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