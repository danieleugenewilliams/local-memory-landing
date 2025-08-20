import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Medal, Trophy, Zap } from "lucide-react";

const Performance = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-memory-blue" />
          <CardTitle className="text-xl">Performance Benchmarks</CardTitle>
        </div>
        <CardDescription>
          Enjoy enterprise-grade performance with minimal resource usage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Benchmark Table */}
        {/* Desktop Table */}
        <div className="hidden md:block bg-muted/50 rounded-2xl border-2 border-border overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-muted">
              <tr className="border-b-2 border-border">
                <th className="text-left p-4 font-semibold text-foreground border-r border-border">Metric</th>
                <th className="text-left p-4 font-semibold text-foreground border-r border-border">Before</th>
                <th className="text-left p-4 font-semibold text-foreground border-r border-border">After</th>
                <th className="text-left p-4 font-semibold text-foreground">Improvement</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-4 font-medium text-foreground border-r border-border">Vector Search</td>
                <td className="p-4 text-left text-red-500 text-muted-foreground border-r border-border">50-100ms</td>
                <td className="p-4 text-left text-memory-green font-muted border-r border-border">11-15ms</td>
                <td className="p-4 text-left">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-blue/20 text-memory-blue rounded-md text-sm font-bold">
                    5-8x FASTER
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-medium text-foreground border-r border-border">Memory Usage</td>
                <td className="p-4 text-left text-red-500 text-muted-foreground border-r border-border">200MB+</td>
                <td className="p-4 text-left text-memory-green font-muted border-r border-border">16MB</td>
                <td className="p-4 text-left">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-blue/20 text-memory-blue rounded-md text-sm font-bold">
                    12x LIGHTER
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-foreground border-r border-border">Dependencies</td>
                <td className="p-4 text-left text-red-500 text-muted-foreground border-r border-border">Node.js, Typescript</td>
                <td className="p-4 text-left text-memory-green font-muted border-r border-border">Zero</td>
                <td className="p-4 text-left">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-blue/20 text-memory-blue rounded-md text-sm font-bold">
                    ACTUALLY ZERO
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          <div className="bg-muted/50 rounded-lg border border-border p-4">
            <h4 className="font-semibold text-foreground mb-3">Vector Search</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Before:</span>
                <span className="text-red-500">50-100ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">After:</span>
                <span className="text-memory-green font-medium">11-15ms</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-muted-foreground">Improvement:</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-blue/20 text-memory-blue rounded-md text-xs font-bold">
                  5-8x FASTER
                </span>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg border border-border p-4">
            <h4 className="font-semibold text-foreground mb-3">Memory Usage</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Before:</span>
                <span className="text-red-500">200MB+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">After:</span>
                <span className="text-memory-green font-medium">16MB</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-muted-foreground">Improvement:</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-memory-blue/20 text-memory-blue rounded-md text-xs font-bold">
                  12x LIGHTER
                </span>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg border border-border p-4">
            <h4 className="font-semibold text-foreground mb-3">Dependencies</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Before:</span>
                <span className="text-red-500">Node.js, Typescript</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">After:</span>
                <span className="text-memory-green font-medium">Zero</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-muted-foreground">Improvement:</span>
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