import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhyLocalMemory = () => {

  return (
    <section id="benchmarks" className="py-24 bg-muted/30">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            Shared Memories, Every Agent
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop losing context when switching between AI tools.
          </p>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Local Memory works everywhere:
          </p>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Same memory. Same context. Every agent.
          </p>
        </div>

        {/* Compatibility Content */}
        <div className="animate-fade-in">
            {/* Platform Grid */}
            <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="text-3xl mb-4">🖥️</div>
                <h3 className="text-lg font-bold text-foreground mb-2">Claude Desktop</h3>
                <p className="text-sm text-muted-foreground mb-4">Native MCP Integration</p>
                <p className="text-xs text-muted-foreground">26 tools appear directly</p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="text-3xl mb-4">💻</div>
                <h3 className="text-lg font-bold text-foreground mb-2">Claude Code</h3>
                <p className="text-sm text-muted-foreground mb-4">MCP + REST API</p>
                <p className="text-xs text-muted-foreground">Terminal & web integration</p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="text-3xl mb-4">🌐</div>
                <h3 className="text-lg font-bold text-foreground mb-2">Any AI Platform</h3>
                <p className="text-sm text-muted-foreground mb-4">Universal REST API</p>
                <p className="text-xs text-muted-foreground">OpenCode, ChatGPT, custom</p>
              </div>
            </div>

            {/* Quick Setup Example */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4 text-center">
                  2 Minutes to Full AI Memory
                </h4>
                <div className="bg-muted rounded-lg p-4 mb-4 overflow-x-auto">
                  <pre className="text-sm text-foreground">
{`# Download, extract, run
./local-memory-mcp --db-path ./memories.db

# Add to Claude Desktop config
{
  "mcpServers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory"
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-memory-green">✅</span>
                    <span>Database created automatically</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-memory-green">✅</span>
                    <span>26 MCP tools ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-memory-green">✅</span>
                    <span>Vector search optimized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-memory-green">✅</span>
                    <span>REST API listening on :3002</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Micro-CTA */}
        <div className="text-center mt-12">
          <Link to="/payment">
            <Button size="lg" className="mb-4">
              🚀 Give Your Coding Agent Memory Now - $29
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            <em>"Zero dependencies. Yes, actually zero. Not 'zero*' with 47 footnotes."</em>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLocalMemory;