import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

const Performance = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-memory-blue" />
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
                  <th className="text-left p-4 font-semibold text-foreground">Before</th>
                  <th className="text-left p-4 font-semibold text-foreground">After</th>
                  <th className="text-left p-4 font-semibold text-foreground">Improvement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-4 font-medium text-foreground">Vector Search</td>
                  <td className="p-4 text-left text-red-500 text-muted-foreground">50-100ms</td>
                  <td className="p-4 text-left text-memory-green font-muted">11-15ms</td>
                  <td className="p-4 text-left">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-blue/20 text-memory-blue rounded-md text-sm font-bold">
                      5-8x FASTER
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 font-medium text-foreground">Memory Usage</td>
                  <td className="p-4 text-left text-red-500 text-muted-foreground">200MB+</td>
                  <td className="p-4 text-left text-memory-green font-muted">16MB</td>
                  <td className="p-4 text-left">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-blue/20 text-memory-blue rounded-md text-sm font-bold">
                      12x LIGHTER
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 font-medium text-foreground">Dependencies</td>
                  <td className="p-4 text-left text-red-500 text-muted-foreground">Node.js, Typescript</td>
                  <td className="p-4 text-left text-memory-green font-muted">Zero</td>
                  <td className="p-4 text-left">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-blue/20 text-memory-blue rounded-md text-sm font-bold">
                      ACTUALLY ZERO
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
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