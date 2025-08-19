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
            Context amnesia is killing your productivity—it's time to fix that.
          </p>
        </div>

        {/* Compatibility Content */}
        <div className="animate-fade-in">

            {/* Real User Testimonial - Prominent */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-gradient-to-r from-memory-blue/10 to-memory-purple/10 border border-memory-blue/20 rounded-2xl p-8 lg:p-12">
                <div className="text-center">
                  <div className="text-4xl mb-6">💬</div>
                  <blockquote className="text-xl sm:text-2xl text-foreground mb-6 italic leading-relaxed">
                    "I just wanted to share that the <em>local memory</em> MCP has really helped boost my productivity with [my project]. Thanks so much again for sharing!"
                  </blockquote>
                  <cite className="text-sm text-muted-foreground font-medium">
                    — Early Access Developer
                  </cite>
                  
                </div>
              </div>
            </div>

            {/* Platform Grid */}
            <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-memory-blue/10 to-memory-blue/5 border border-memory-blue/20 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-4">🖥️</div>
                <h3 className="text-lg font-bold text-foreground mb-2">Claude Desktop</h3>
                <p className="text-sm text-muted-foreground mb-4">Native MCP Integration</p>
                <p className="text-xs text-muted-foreground"><em>26+ tools appear directly</em></p>
              </div>
              
              <div className="bg-gradient-to-br from-memory-green/10 to-memory-green/5 border border-memory-green/20 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-4">💻</div>
                <h3 className="text-lg font-bold text-foreground mb-2">Claude Code</h3>
                <p className="text-sm text-muted-foreground mb-4">MCP + REST API</p>
                <p className="text-xs text-muted-foreground"><em>Terminal & web integration</em></p>
              </div>
              
              <div className="bg-gradient-to-br from-memory-purple/10 to-memory-purple/5 border border-memory-purple/20 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-4">🌐</div>
                <h3 className="text-lg font-bold text-foreground mb-2">Any AI Platform</h3>
                <p className="text-sm text-muted-foreground mb-4">Universal REST API</p>
                <p className="text-xs text-muted-foreground"><em>OpenCode, custom agent, etc.</em></p>
              </div>
            </div>

            {/* Unique Message */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground italic max-w-xl mx-auto">
                The only AI memory system with native MCP integration AND universal REST API. Future-proof your AI workflow today.
              </p>
            </div>

          </div>

      </div>
    </section>
  );
};

export default WhyLocalMemory;