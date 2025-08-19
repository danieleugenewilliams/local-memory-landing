import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Copy, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const WhyLocalMemory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const macosPrompt = `I just purchased and downloaded local-memory to ~/Downloads. Please help me install and configure it completely:

STEP 1 - INSTALL BINARY:
1. Find the local-memory binary in ~/Downloads (exact filename will be "local-memory-macos" or similar)
2. Make it executable: chmod +x ~/Downloads/local-memory*
3. Move it to /usr/local/bin/local-memory: sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory
4. Verify it works: /usr/local/bin/local-memory --version

STEP 2 - INSTALL OLLAMA:
1. Download and install Ollama from https://ollama.ai/download/mac
2. After installation, pull the required model: ollama pull nomic-embed-text
3. Optionally pull chat model: ollama pull qwen2.5:7b
4. Verify Ollama is running: ollama list

STEP 2.5 - INSTALL QDRANT (OPTIONAL - HIGH PERFORMANCE):
For 10x faster search (~10ms vs SQLite's ~100ms):
1. Download Qdrant: curl -L https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-apple-darwin.tar.gz -o qdrant.tar.gz
2. Extract: tar -xzf qdrant.tar.gz
3. Make executable and move: chmod +x qdrant && sudo mv qdrant /usr/local/bin/
4. Start Qdrant: qdrant --config-path "" &
5. Verify: curl http://localhost:6333/health (should return OK)
6. Set environment: export QDRANT_ENABLED=true && export QDRANT_URL=http://localhost:6333

STEP 3 - CONFIGURE MCP FOR CLAUDE CODE:
Run this exact command to add local-memory as an MCP server:
claude mcp add local-memory -- /usr/local/bin/local-memory --db-path ~/.local-memory/local-memories.db --session-id "claude-code-session" --log-level info

STEP 4 - CONFIGURE MCP FOR CLAUDE DESKTOP:
Edit ~/.claude_desktop_config.json (create if it doesn't exist):
{
  "mcpServers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": ["--db-path", "~/.local-memory/local-memories.db", "--session-id", "claude-desktop-session", "--log-level", "info"],
      "env": {
        "QDRANT_ENABLED": "true",
        "QDRANT_URL": "http://localhost:6333"
      }
    }
  }
}

STEP 5 - VERIFY INSTALLATION:
1. Create memory directory: mkdir -p ~/.local-memory
2. Test Claude Code MCP: claude mcp list (should show local-memory server)
3. For Claude Desktop: restart the app and check for memory tools
4. Test basic functionality by storing a test memory
5. If using Qdrant: Check performance with search queries

Use my existing downloaded binary - don't try to download a new one. Follow these exact commands and file paths.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(macosPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <em>Local Memory</em> works everywhere.
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
                
                <div className="bg-memory-blue/10 border border-memory-blue/20 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-5 h-5 text-memory-blue" />
                    <h5 className="font-semibold text-memory-blue">Just Copy & Paste to Your AI Agent</h5>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    No manual installation needed! Copy the prompt below and paste it into Claude or any AI agent. 
                    Your agent will handle the complete setup automatically.
                  </p>
                  
                  <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <div className="bg-muted rounded-lg p-4 mb-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🍎</span>
                          <span className="font-medium">macOS Setup Prompt</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={copyToClipboard}
                            className="gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            {copied ? 'Copied!' : 'Copy'}
                          </Button>
                          <CollapsibleTrigger asChild>
                            <Button size="sm" variant="ghost" className="gap-1">
                              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                              {isOpen ? 'Hide' : 'Show'} Full Prompt
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                      </div>
                      
                      <div className="bg-background p-3 rounded border">
                        <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                          {macosPrompt.substring(0, 300)}...
                        </pre>
                      </div>
                    </div>
                    
                    <CollapsibleContent>
                      <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre className="text-xs text-foreground whitespace-pre-wrap font-mono">
                          {macosPrompt}
                        </pre>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-memory-green">✅</span>
                    <span>Agent installs Ollama automatically</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-memory-green">✅</span>
                    <span>26 MCP tools configured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-memory-green">✅</span>
                    <span>Claude Desktop & Code ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-memory-green">✅</span>
                    <span>Optional Qdrant for 10x speed</span>
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