import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Copy, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { handleStripePayment } from "@/lib/payment";

const WhyLocalMemory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const macosPrompt = `I just purchased and downloaded local-memory to ~/Downloads. Please help me install and configure it completely:

STEP 1 - INSTALL BINARY:
1. Find the local-memory binary in ~/Downloads (exact filename will be "local-memory-macos" or similar)
2. Make it executable: chmod +x ~/Downloads/local-memory*
3. Move it to /usr/local/bin/local-memory: sudo mv ~/Downloads/local-memory* /usr/local/bin/local-memory
4. Verify it works: /usr/local/bin/local-memory --version

INSTALL RECOMMENDED FEATURES:
STEP 2 - INSTALL OLLAMA:
1. Download and install Ollama from https://ollama.ai/download/mac
2. After installation, pull the required model: ollama pull nomic-embed-text
3. Pull chat model: ollama pull qwen2.5:7b
4. Verify Ollama is running: ollama list

STEP 2.5 - INSTALL QDRANT (RECOMMENDED - HIGH PERFORMANCE):
For 10x faster search (~10ms vs SQLite's ~100ms):
1. Create local-memory directory: mkdir -p ~/.local-memory
2. Download Qdrant: curl -L https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-apple-darwin.tar.gz -o qdrant.tar.gz
3. Extract: tar -xzf qdrant.tar.gz
4. Make executable and move: chmod +x qdrant && mv qdrant ~/.local-memory/
5. Start Qdrant: cd ~/.local-memory && ./qdrant &
6. Verify: curl http://localhost:6333/health (should return OK)
7. Qdrant storage will be created in ~/.local-memory/qdrant-storage

STEP 3 - CONFIGURE MCP FOR CLAUDE CODE:
Run this exact command to add local-memory as an MCP server:
claude mcp add local-memory /usr/local/bin/local-memory

STEP 4 - CONFIGURE MCP FOR CLAUDE DESKTOP:
Edit ~/.claude_desktop_config.json (create if it doesn't exist):
{
  "mcpServers": {
    "local-memory": {
      "command": "/usr/local/bin/local-memory",
      "args": [
        "--mcp"
      ]
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
    <section id="benchmarks" className="py-10 pb-2 bg-background">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
            Shared Memories, Every Agent
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your AI agents with persistent memory that never forgets.
          </p>
        </div>

        {/* Streamlined Pricing */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Early Access Special - Main Focus */}
          <div className="bg-slate-800 rounded-2xl border-2 border-memory-blue/50 relative overflow-hidden mb-6">
            {/* Popular badge */}
            
            <div className="p-8 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">Context Engineers Save Thousands</h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-white">$59</span>
                <div className="text-left">
                  <div className="text-sm text-gray-400 line-through">normally $99</div>
                  <div className="text-sm text-memory-blue font-medium">40% OFF</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-6 text-memory-green">Use code LMLAUNCH40 at checkout</div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm px-4">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-green-500 hidden md:inline">✓</span>
                  <span className="text-center md:text-left">Complete Context Engineering System</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 ml-10">
                  <span className="text-green-500 hidden md:inline">✓</span>
                  <span className="text-center md:text-left">Worth $100-$300 Daily</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 ml-16">
                  <span className="text-green-500 hidden md:inline">✓</span>
                  <span className="text-center md:text-left">Unlimited Usage Forever</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-green-500 hidden md:inline">✓</span>
                  <span className="text-center md:text-left">Your Expertise → AI's Permanent Memory</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 ml-10">
                  <span className="text-green-500 hidden md:inline">✓</span>
                  <span className="text-center md:text-left">26 MCP Tools Included</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 ml-16">
                  <span className="text-green-500 hidden md:inline">✓</span>
                  <span className="text-center md:text-left">Pays for Itself in 2 Days</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-green-500 hidden md:inline">✓</span>
                  <span className="text-center md:text-left">100% Local & Private</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 ml-10">
                  <span className="text-green-500 hidden md:inline">✓</span>
                  <span className="text-center md:text-left">Save 2+ Hours Daily</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 ml-16">
                  <span className="text-green-500 hidden md:inline">✓</span>
                  <span className="text-center md:text-left">2,500%+ Monthly ROI</span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button onClick={handleStripePayment} variant="hero" className="w-full sm:w-auto" size="lg">
                  Get Instant Access
                </Button>
              </div>
              <div className="mt-2 text-sm text-gray-300">🔒 One-Time Secure Stripe Payment</div>

              <div className="mt-2 text-sm text-gray-300">
                <em>The only AI memory system with native MCP integration <b>and</b> universal REST API.</em>
              </div>

            </div>
          </div>

        </div>

        {/* Compatibility Content */}
        <div className="animate-fade-in">

            {/* Real User Testimonial - Prominent */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-memory-blue/20 to-memory-purple/20 border border-memory-blue/30 rounded-2xl p-8 lg:p-12">
                <div className="text-center">
                  <div className="text-4xl mb-6">💬</div>
                  <blockquote className="text-xl sm:text-2xl text-white mb-6 italic leading-relaxed">
                    "Local memory MCP has really helped boost my productivity. I'm no longer just vibe coding...I'm engineering real solutions. Every day the coding agents gets smarter about MY specific project context."
                  </blockquote>
                  <cite className="text-sm text-gray-300 font-medium">
                    — Early Access User/Context Engineer
                  </cite>
                  
                </div>
              </div>
            </div>


            {/* Final CTA on Landing Page */}

            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in">
              <a href="/features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Want to learn more? →
                </Button>
              </a>
            </div>

        </div>

      </div>
    </section>
  );
};

export default WhyLocalMemory;