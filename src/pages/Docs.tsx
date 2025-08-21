import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Bot, Settings, Globe, Terminal, Plug, Apple } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostPurchaseAgentSetup from "@/components/PostPurchaseAgentSetup";
import ScrollToTop from "@/components/ScrollToTop";

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              <em>Local Memory</em> Documentation
            </h1>
            <p className="text-xl text-muted-foreground">
              Here's the complete installation and user guide for <em>Local Memory</em>.</p>
          </div>

          {/* Quick Navigation */}
          <Card className="mb-8 border-memory-blue/30">
            <CardHeader>
              <CardTitle className="text-xl">Quick Navigation</CardTitle>
              <CardDescription>Jump to the section you need.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="font-semibold">Getting Started</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#quick-start" className="block text-memory-blue hover:underline">• Quick Start (2 minutes)</a>
                    <a href="#agent-setup" className="block text-memory-blue hover:underline">• Agent Setup Prompts</a>
                    <a href="#manual-setup" className="block text-memory-blue hover:underline">• Advanced Setup</a>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Usage</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#coding-agents" className="block text-memory-blue hover:underline">• Coding Agents</a>
                    <a href="#claude-desktop" className="block text-memory-blue hover:underline">• Claude Desktop</a>
                    <a href="#rest-api" className="block text-memory-blue hover:underline">• REST API</a>
                    <a href="#cli-commands" className="block text-memory-blue hover:underline">• CLI Commands</a>
                    <a href="#api-reference" className="block text-memory-blue hover:underline">• API Documentation</a>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Resources</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#troubleshooting" className="block text-memory-blue hover:underline">• Troubleshooting</a>
                    <a href="#community" className="block text-memory-blue hover:underline">• Community</a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Install & Setup */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Easy Install & Setup</h2>

            {/* Quick Start (NEW - Primary Path) */}
            <div id="quick-start" className="mb-12 scroll-target">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Plug className="w-8 h-8 text-memory-green" />
                  <h3 className="text-2xl font-bold text-foreground">Quick Start</h3>
                  <span className="bg-memory-green/20 text-memory-green px-3 py-1 rounded-full text-sm font-medium">2 minutes to install</span>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Download, start, and connect to any AI agent with zero-config setup.
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-6">
                {/* Step 1: Confirm Purchase */}
                <div className="border-l-4 border-memory-blue pl-4">
                  <h4 className="font-semibold text-lg mb-2">Step 1: Confirm Purchase</h4>
                  <p className="text-muted-foreground mb-3">If you haven't already, get <em>Local Memory</em> below, and download to your machine.</p>
                  <div className="bg-muted p-3 rounded-md">
                    <Link to="/payment" target="_blank">
                      <Button variant="hero" size="lg" className="gap-2">
                        Purchase <em>Local Memory</em>
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Step 2: Start */}
                <div className="border-l-4 border-memory-green pl-4">
                  <h4 className="font-semibold text-lg mb-2">Step 2: Start Local Memory</h4>
                  <p className="text-muted-foreground mb-3">Copy, paste, and run the command below.</p>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm bg-background px-2 py-1 rounded block mb-2">
                      &gt; local-memory start
                    </code>
                    <div className="mt-2 p-2 bg-amber-900/20 border border-amber-700/30 rounded text-xs">
                      <p className="text-amber-300 font-medium mb-1">macOS users:</p>
                      <p className="text-amber-200">Before running the above command, first run: <code className="bg-amber-800/30 px-1 rounded text-amber-100">sudo xattr -rd com.apple.quarantine ~/Downloads/local-memory-macos-*</code></p>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground mb-2">
                      <em>Auto-detects Ollama, Qdrant, and configures everything automatically</em>
                    </p>
                  </div>
                </div>

                {/* Step 3: Connect */}
                <div className="border-l-4 border-memory-purple pl-4">
                  <h4 className="font-semibold text-lg mb-2">Step 3: Connect Your AI Agent</h4>
                  <p className="text-muted-foreground mb-3">Choose your preferred integration method.</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted p-3 rounded-md">
                      <h5 className="font-semibold text-sm mb-2">Claude Code:</h5>
                      <code className="text-xs bg-background px-2 py-1 rounded block">
                        claude mcp add local-memory /path/to/local-memory
                      </code>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <h5 className="font-semibold text-sm mb-2">REST API:</h5>
                      <code className="text-xs bg-background px-2 py-1 rounded block">
                        curl http://localhost:3002/api/v1/health
                      </code>
                    </div>
                  </div>
                </div>

                {/* Step 4: Success */}
                <div className="border-l-4 border-memory-orange pl-4">
                  <h4 className="font-semibold text-lg mb-2">Step 4: You're Done!</h4>
                  <p className="text-muted-foreground mb-3">All your AI agents now have access to shared, persistent memory.</p>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Give a go! Try asking your AI agent to "remember this conversation" or use any of the <a href="#api-reference" className="text-memory-blue hover:underline">26 memory tools</a>.
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-muted/20 p-4 rounded border border-memory-blue/30">
                  <h5 className="font-semibold mb-3 text-memory-blue">💡 <strong>Pro Tip:</strong> Add instructions to use <em>Local Memory</em> in your agent files.</h5>
                  <p className="text-sm text-muted-foreground mb-3">Copy and paste this section into your agent files like CLAUDE.md, AGENTS.md, or .github/copilot-instructions.md:</p>
                  <div className="bg-background p-3 rounded-md">
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
{`## Local Memory

Proactively use local-memory MCP to store, retrieve, update, and analyze memories to maintain context and build expertise over time. Store key insights including lessons learned, architectural decisions, development strategies, and project outcomes. Use semantic search and relationship mapping to find relevant memories across all projects and sessions.`}
                    </pre>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    This prompts your AI agents to automatically use Local Memory for persistent context across conversations.
                  </p>
                </div>
              </div>
            </div>

            {/* Agent Setup Prompts */}
            <div id="agent-setup" className="mb-12 scroll-target">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Bot className="w-8 h-8 text-memory-blue" />
                  <h3 className="text-2xl font-bold text-foreground">Agent Setup Prompts</h3>
                  <span className="bg-memory-blue/20 text-memory-blue px-3 py-1 rounded-full text-sm font-medium">Alternative Method</span>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Prefer having your AI agent handle the setup? After downloading <em>Local Memory</em>, copy our detailed prompts 
                  and let your AI assistant handle the complete installation and configuration.
                </p>
              </div>

              <PostPurchaseAgentSetup />
            </div>

            {/* Advanced Setup */}
            <div id="manual-setup" className="mb-12 scroll-target">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Settings className="w-8 h-8 text-memory-purple" />
                  <h3 className="text-2xl font-bold text-foreground">Advanced Setup</h3>
                <span className="bg-memory-purple/20 text-memory-purple px-3 py-1 rounded-full text-sm font-medium">Custom Configurations</span>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  This is for developers who need custom configurations or those who want to understand the underlying setup process.
                </p>
              </div>

              {/* Installation Steps */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Installation Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Step 1 */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2">Step 1: Download <em>Local Memory</em></h4>
                    <p className="text-muted-foreground mb-3">Copy and paste your OS-specific binary into your preferred location.</p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm mb-2"><strong>macOS/Linux:</strong></p>
                      <code className="text-sm bg-background px-2 py-1 rounded">
                        chmod +x local-memory && mv local-memory /path/to/your/preferred/location
                      </code>
                      <p className="text-sm mt-3 mb-2"><strong>Windows:</strong></p>
                      <code className="text-sm bg-background px-2 py-1 rounded">
                        mv local-memory.exe
                      </code>
                      <p className="mt-2 text-sm text-muted-foreground">&nbsp; Move to C:\path\to\your\preferred\location, then add to PATH variable.</p>

                      <details className="mt-2 bg-amber-900/20 border border-amber-700/30 rounded p-2">
                        <summary className="cursor-pointer text-xs font-medium text-amber-300">
                          macOS Security Notice
                        </summary>
                        <p className="text-amber-200 text-xs mt-2">Before installation, run: <code className="bg-amber-800/30 px-1 rounded text-amber-100">sudo xattr -rd com.apple.quarantine ~/Downloads/local-memory-macos-*</code></p>
                      </details>
                    </div>
                  </div>

                  {/* Step 2 - Dependencies */}
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2">Step 2: Install Recommended Features</h4>
                    <p className="text-muted-foreground mb-3">Install Ollama.</p>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm mb-2"><strong>macOS/Linux:</strong></p>
                      <code className="text-sm bg-background px-2 py-1 rounded">
                        curl -fsSL https://ollama.ai/install.sh | sh
                      </code>
                      <p className="text-sm mt-3 mb-2"><strong>Windows:</strong></p>
                      <p className="text-sm text-muted-foreground mb-3">Download from <a href="https://ollama.ai" className="text-blue-500 hover:underline" target="_blank">ollama.ai</a></p>

                      <p className="text-sm mb-2"><strong>Pull required model:</strong></p>
                      <code className="text-sm bg-background px-2 py-1 rounded">
                        ollama pull nomic-embed-text
                      </code>

                      <details className="mt-4 bg-blue-50/5 border border-blue-500/20 rounded p-2">
                        <summary className="cursor-pointer text-xs font-medium text-blue-400">
                          Recommended: Qdrant (10x faster search)
                        </summary>
                        <div className="mt-2 space-y-1">
                          <code className="text-xs bg-background px-2 py-1 rounded block">
                            curl -L https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-apple-darwin.tar.gz -o qdrant.tar.gz
                          </code>
                          <code className="text-xs bg-background px-2 py-1 rounded block">
                            tar -xzf qdrant.tar.gz && chmod +x qdrant && mkdir -p ~/.local-memory && mv qdrant ~/.local-memory/
                          </code>
                          <code className="text-xs bg-background px-2 py-1 rounded block">
                            cd ~/.local-memory && ./qdrant &
                          </code>
                          <p className="text-xs text-muted-foreground mt-4">
                            See Pro Tip below for more details.
                          </p>
                        </div>
                      </details>
                    </div>

                    <div className="mt-4 bg-muted/20 p-4 rounded border border-memory-blue/30">
                      <h5 className="font-semibold mb-3 text-memory-blue">💡 <strong>Pro Tip:</strong> Use Qdrant for lightning-fast search performance</h5>
                      <p className="text-sm text-muted-foreground mb-3">Setting up Qdrant with <em>Local Memory</em> dramatically improves search speed from ~100ms to &lt;10ms. This is especially valuable for large memory databases and frequent semantic searches.</p>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div>• <strong>Instant Results:</strong> Sub-10ms semantic search across thousands of memories</div>
                        <div>• <strong>Auto-Detection:</strong> Local Memory automatically detects and uses Qdrant when available</div>
                        <div>• <strong>Graceful Fallback:</strong> Falls back to SQLite if Qdrant is unavailable</div>
                        <div>• <strong>Zero Config:</strong> Works out-of-the-box with default Qdrant settings</div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        For power users: Qdrant enables advanced vector operations and scales to millions of memories with consistent performance.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 - Integration */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2">Step 3: Connect to Your AI Editor</h4>
                    <p className="text-muted-foreground mb-3">Add 'local-memory' to your preferred AI editor:</p>
                    
                    {/* Primary: MCP Integration */}
                    <div className="bg-muted p-3 rounded-md mb-4">
                      <p className="text-sm font-medium mb-3">🔗 MCP Integration (Recommended)</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Claude Code:</p>
                          <code className="text-xs bg-background px-2 py-1 rounded block">
                            claude mcp add local-memory -- /usr/local/bin/local-memory
                          </code>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Claude Desktop:</p>
                          <p className="text-xs text-muted-foreground mb-1">~/.claude_desktop_config.json:</p>
                          <div className="text-xs font-mono bg-background p-2 rounded">
                            &#123;"mcpServers":&#123;"local-memory":&#123;"command":"/usr/local/bin/local-memory"&#125;&#125;&#125;
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">VS Code (Copilot):</p>
                          <p className="text-xs text-muted-foreground mb-1">.vscode/mcp.json:</p>
                          <div className="text-xs font-mono bg-background p-2 rounded">
                            &#123;"servers":&#123;"local-memory":&#123;"command":"/usr/local/bin/local-memory","args":[]&#125;&#125;&#125;
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Cursor:</p>
                          <p className="text-xs text-muted-foreground mb-1">.cursor/mcp.json:</p>
                          <div className="text-xs font-mono bg-background p-2 rounded">
                            &#123;"servers":&#123;"local-memory":&#123;"command":"/usr/local/bin/local-memory","args":[]&#125;&#125;&#125;
                          </div>
                        </div>
                      </div>
                      
                      <details className="mt-3 bg-blue-50/5 border border-blue-500/20 rounded p-2">
                        <summary className="cursor-pointer text-xs font-medium text-blue-400">
                          ➕ More Editors
                        </summary>
                        <div className="mt-2">
                          <p className="text-sm font-medium">Windsurf:</p>
                          <p className="text-xs text-muted-foreground mb-1">Settings &gt; MCP Configuration:</p>
                          <div className="text-xs font-mono bg-background p-2 rounded">
                            &#123;"mcpServers":&#123;"local-memory":&#123;"command":"/usr/local/bin/local-memory"&#125;&#125;&#125;
                          </div>
                        </div>
                      </details>
                    </div>

                    {/* Alternative: REST API - Collapsible */}
                    <details className="bg-blue-50/5 border border-blue-500/20 rounded-md p-3">
                      <summary className="cursor-pointer text-sm font-medium text-blue-400">
                        🌐 Alternative: REST API (for other editors)
                      </summary>
                      <div className="mt-3">
                        <code className="text-xs bg-background px-2 py-1 rounded block">
                          local-memory start
                        </code>
                        <p className="text-xs text-muted-foreground mt-2">
                          Access 26 endpoints at http://localhost:3002/api/v1/
                        </p>
                      </div>
                    </details>
                  </div>

                  {/* Step 4 - Verify */}
                  <div className="border-l-4 border-pink-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2">Step 4: Test Installation</h4>
                    <p className="text-muted-foreground mb-3">Quick verification steps:</p>
                    
                    <div className="bg-muted p-3 rounded-md space-y-3">
                      <div>
                        <p className="text-sm font-medium">✅ MCP Integration:</p>
                        <code className="text-xs bg-background px-2 py-1 rounded block mb-1">
                          claude mcp list
                        </code>
                        <p className="text-xs text-muted-foreground">Should show "local-memory" server</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">✅ REST API:</p>
                        <code className="text-xs bg-background px-2 py-1 rounded block mb-1">
                          curl http://localhost:3002/api/v1/health
                        </code>
                        <p className="text-xs text-muted-foreground">Should return &#123;"status":"ok"&#125;</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Using Local Memory */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Using <em>Local Memory</em></h2>

            {/* Coding Agents */}
            <div id="coding-agents" className="mb-8 scroll-target">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-memory-blue" />
                    Coding Agents
                  </CardTitle>
                  <CardDescription>26 MCP tools for Claude Code and other coding agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-memory-blue/30">
                      <CardHeader>
                        <CardTitle className="text-lg">🛠️ Tool Categories</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div>📝 <strong>Memory Management:</strong> store, search, relate memories</div>
                          <div>🔍 <strong>Advanced Search:</strong> semantic, temporal, vector search</div>
                          <div>🤖 <strong>AI Integration:</strong> ask questions, analyze patterns</div>
                          <div>📊 <strong>Analytics:</strong> usage stats, learning progression</div>
                          <div>🔗 <strong>Relationships:</strong> automatic context linking</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-memory-green/30">
                      <CardHeader>
                        <CardTitle className="text-lg">🧠 Cross-Session Memory</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div>🔄 <strong>Session Filters:</strong> current, recent, all sessions</div>
                          <div>🏷️ <strong>Smart Tagging:</strong> auto-categorization by domain</div>
                          <div>📈 <strong>Progressive Learning:</strong> builds expertise over time</div>
                          <div>🔗 <strong>Context Linking:</strong> automatic relationship detection</div>
                          <div>⚡ <strong>Instant Recall:</strong> sub-second memory retrieval</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6 bg-muted p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Simple Setup for Claude Code:</h5>
                    <div className="space-y-2">
                      <div className="bg-green-950/20 p-3 rounded border border-green-700/30">
                        <h6 className="text-green-300 font-medium mb-2">✨ Easiest Method (Auto-install):</h6>
                        <code className="text-sm bg-background px-2 py-1 rounded block mb-2">local-memory install mcp</code>
                        <p className="text-xs text-muted-foreground">Automatically detects and configures Claude Desktop & Claude Code</p>
                      </div>
                      
                      <div className="bg-blue-950/20 p-3 rounded border border-blue-700/30">
                        <h6 className="text-blue-300 font-medium mb-2">Manual Method:</h6>
                        <code className="text-sm bg-background px-2 py-1 rounded">claude mcp add local-memory /path/to/local-memory</code>
                      </div>
                      
                      <details className="bg-muted/50 p-3 rounded">
                        <summary className="text-sm cursor-pointer text-muted-foreground">Advanced: Custom Configuration</summary>
                        <div className="mt-2 space-y-2">
                          <code className="text-xs bg-background px-2 py-1 rounded block">
                            claude mcp add local-memory /path/to/local-memory
                          </code>
                          <p className="text-xs text-muted-foreground">
                            The old flag-based approach still works, but auto-config is recommended.
                          </p>
                        </div>
                      </details>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Claude Desktop */}
            <div id="claude-desktop" className="mb-8 scroll-target">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-memory-purple" />
                    Claude Desktop
                  </CardTitle>
                  <CardDescription>Natural language memory interface with AI-powered features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold mb-3">Natural Language Interface</h5>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div>💬 <strong>Conversational:</strong> "Remember this conversation"</div>
                        <div>🔍 <strong>Semantic Search:</strong> "What did we discuss about APIs?"</div>
                        <div>📊 <strong>Analysis:</strong> "Summarize my learning this week"</div>
                        <div>🔗 <strong>Connections:</strong> "How does this relate to yesterday's work?"</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-3">AI-Powered Features</h5>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div>🏷️ <strong>Auto-Categorization:</strong> Smart tagging by domain</div>
                        <div>📈 <strong>Temporal Analysis:</strong> Learning progression tracking</div>
                        <div>🧠 <strong>Vector Search:</strong> Qdrant integration for speed</div>
                        <div>🔄 <strong>Cross-Reference:</strong> Automatic relationship building</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-muted p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Setup for Claude Desktop:</h5>
                    <div className="bg-background p-3 rounded-md">
                      <p className="text-sm mb-2">The <code>local-memory start</code> command auto-generates configuration.</p>
                      <p className="text-sm mb-2">Or manually edit <code className="bg-muted px-1 rounded">~/.claude_desktop_config.json</code>:</p>
                      <div className="text-xs font-mono text-muted-foreground bg-muted p-2 rounded mt-2">
                        <div>&#123;</div>
                        <div>&nbsp;&nbsp;"mcpServers": &#123;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;"local-memory": &#123;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"command": "/path/to/local-memory"</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                        <div>&nbsp;&nbsp;&#125;</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* REST API */}
            <div id="rest-api" className="mb-8 scroll-target">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-memory-green" />
                    REST API
                  </CardTitle>
                  <CardDescription>Universal HTTP interface for any platform (26+ endpoints)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-green-950/20 p-3 rounded border border-green-700/30">
                      <h5 className="text-green-300 font-medium mb-2">✨ Auto-Configured:</h5>
                      <p className="text-sm text-green-200 mb-2">
                        <code>local-memory start</code> automatically starts REST API on port 3002
                      </p>
                      <code className="text-sm bg-background px-2 py-1 rounded">curl http://localhost:3002/api/v1/health</code>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Memory Operations</h5>
                        <div className="space-y-1 text-sm font-mono bg-muted p-3 rounded">
                          <div>POST /api/v1/memories</div>
                          <div>GET /api/v1/memories/search</div>
                          <div>POST /api/v1/ask</div>
                          <div>POST /api/v1/relate</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Analytics & Admin</h5>
                        <div className="space-y-1 text-sm font-mono bg-muted p-3 rounded">
                          <div>GET /api/v1/stats</div>
                          <div>GET /api/v1/health</div>
                          <div>POST /api/v1/summarize</div>
                          <div>GET /api/v1/temporal/*</div>
                        </div>
                      </div>
                    </div>

                    <details className="bg-muted/50 p-3 rounded">
                      <summary className="text-sm cursor-pointer text-muted-foreground">Advanced: Custom REST Configuration</summary>
                      <div className="mt-2">
                         <code className="text-sm bg-background px-2 py-1 rounded block">
                           local-memory start
                         </code>
                         <p className="text-xs text-muted-foreground mt-2">
                           Auto-detects available port (default 3002). For specific port needs, use config file or environment variables.
                         </p>
                      </div>
                    </details>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CLI Commands */}
            <div id="cli-commands" className="mb-8 scroll-target">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-memory-blue" />
                    CLI Commands
                  </CardTitle>
                  <CardDescription>Modern command-line interface with simplified usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-blue-950/20 p-4 rounded border border-blue-700/30">
                      <h5 className="text-blue-300 font-semibold mb-3">✨ New Simplified Commands:</h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2 text-sm font-mono">
                          <div><code>local-memory start</code> <span className="text-muted-foreground">- Zero-config startup</span></div>
                          <div><code>local-memory stop</code> <span className="text-muted-foreground">- Stop daemon</span></div>
                          <div><code>local-memory status</code> <span className="text-muted-foreground">- Check status</span></div>
                          <div><code>local-memory setup</code> <span className="text-muted-foreground">- Interactive setup</span></div>
                          <div><code>local-memory install mcp</code> <span className="text-muted-foreground">- Auto-install MCP</span></div>
                        </div>
                        <div className="space-y-2 text-sm font-mono">
                          <div><code>local-memory remember "text"</code> <span className="text-muted-foreground">- Store memory</span></div>
                          <div><code>local-memory search "query"</code> <span className="text-muted-foreground">- Search memories</span></div>
                          <div><code>local-memory relate "A" to "B"</code> <span className="text-muted-foreground">- Link concepts</span></div>
                          <div><code>local-memory forget &lt;id&gt;</code> <span className="text-muted-foreground">- Delete memory</span></div>
                          <div><code>local-memory doctor</code> <span className="text-muted-foreground">- System check</span></div>
                        </div>
                      </div>
                    </div>

                    <details className="bg-muted/50 p-3 rounded">
                      <summary className="text-sm cursor-pointer text-muted-foreground">Advanced: Flag-Based Configuration (Legacy)</summary>
                      <div className="mt-2 space-y-2">
                        <div className="text-sm">
                          <h6 className="font-semibold mb-2">Simple Usage:</h6>
                          <div className="space-y-1 text-xs font-mono bg-background p-2 rounded">
                             <div>local-memory start</div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Zero-configuration startup with auto-detection and smart defaults.
                          </p>
                        </div>
                      </div>
                    </details>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* API Reference */}
          <div id="api-reference" className="mb-12 scroll-target">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">API Documentation</h2>
            
            {/* REST API */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  REST API (26+ Endpoints)
                </CardTitle>
                <CardDescription><em>Local Memory</em> has a universal HTTP interface for any platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-blue">Core Memory (4)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>POST /api/v1/memories</div>
                        <div>PUT /api/v1/memories/:id</div>
                        <div>DELETE /api/v1/memories/:id</div>
                        <div>GET /api/v1/memories/:id</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-green">Search (3)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>GET /api/v1/memories/search</div>
                        <div>POST /api/v1/search/tags</div>
                        <div>POST /api/v1/search/date-range</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-purple">AI Operations (3)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>POST /api/v1/ask</div>
                        <div>POST /api/v1/summarize</div>
                        <div>POST /api/v1/analyze</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-blue">Temporal Analysis (3)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>POST /api/v1/temporal/patterns</div>
                        <div>POST /api/v1/temporal/progression</div>
                        <div>POST /api/v1/temporal/gaps</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-green">Relationships (4)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>GET /api/v1/memories/:id/related</div>
                        <div>POST /api/v1/relationships/discover</div>
                        <div>POST /api/v1/relationships</div>
                        <div>GET /api/v1/memories/:id/graph</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-purple">Categorization (4)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>POST /api/v1/categories</div>
                        <div>POST /api/v1/memories/:id/categorize</div>
                        <div>GET /api/v1/categories</div>
                        <div>GET /api/v1/categories/stats</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-blue">Statistics (2)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>GET /api/v1/memories/stats</div>
                        <div>GET /api/v1/domains/:domain/stats</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-green">Management (3)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>POST /api/v1/domains</div>
                        <div>GET /api/v1/sessions</div>
                        <div>GET /api/v1/health</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h6 className="font-semibold mb-2">🌐 REST API Summary:</h6>
                  <p className="text-sm text-muted-foreground mb-2">
                    All 26 MCP tools have corresponding REST endpoints with identical functionality. 
                    Base URL: <code className="bg-background px-1 rounded">http://localhost:3002/api/v1/</code>
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>• Core Memory: 4 endpoints</div>
                    <div>• Search: 3 endpoints</div>
                    <div>• AI Operations: 3 endpoints</div>
                    <div>• Temporal Analysis: 3 endpoints</div>
                    <div>• Relationships: 4 endpoints</div>
                    <div>• Categorization: 4 endpoints</div>
                    <div>• Statistics: 2 endpoints</div>
                    <div>• Management: 3 endpoints</div>
                    <div className="font-semibold">• <strong>Total: 26 endpoints</strong></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MCP Protocol */}
            <div id="mcp-reference" className="scroll-target" />
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  MCP Protocol (26 Tools)
                </CardTitle>
                <CardDescription>Native integration with Claude and MCP agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-blue">Memory Operations (4)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>store_memory</div>
                        <div>update_memory</div>
                        <div>delete_memory</div>
                        <div>get_memory_by_id</div>
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-green">Search Operations (3)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>search_memories</div>
                        <div>search_by_tags</div>
                        <div>search_by_date_range</div>
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-purple">AI Analysis (3)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>ask_question</div>
                        <div>summarize_memories</div>
                        <div>analyze_memories</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-blue">Temporal Analysis (3)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>analyze_temporal_patterns</div>
                        <div>track_learning_progression</div>
                        <div>detect_knowledge_gaps</div>
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-green">Relationships (4)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>get_related_memories</div>
                        <div>discover_relationships</div>
                        <div>create_relationship</div>
                        <div>map_memory_graph</div>
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-purple">Categorization (4)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>categorize_memory</div>
                        <div>create_category</div>
                        <div>list_categories</div>
                        <div>get_category_stats</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-blue">Statistics (2)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>get_session_stats</div>
                        <div>get_domain_stats</div>
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-green">Management (3)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>list_sessions</div>
                        <div>create_domain</div>
                        <div>list_domains</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h6 className="font-semibold mb-2">📊 Tool Categories Summary:</h6>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>• Memory Operations: 4 tools</div>
                    <div>• Search Operations: 3 tools</div>
                    <div>• AI Analysis: 3 tools</div>
                    <div>• Temporal Analysis: 3 tools</div>
                    <div>• Relationships: 4 tools</div>
                    <div>• Categorization: 4 tools</div>
                    <div>• Statistics: 2 tools</div>
                    <div>• Management: 3 tools</div>
                    <div className="font-semibold">• <strong>Total: 26 tools</strong></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Help & Community */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Help & Community</h2>

            {/* Troubleshooting */}
            <Card id="troubleshooting" className="mb-8 scroll-target">
              <CardHeader>
                <CardTitle>Troubleshooting</CardTitle>
                <CardDescription>Here are some common concerns and remedies.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Common Challenges</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Command not found:</strong> Ensure binary is in PATH or use <code className="bg-background px-1 rounded">./local-memory</code></li>
                       <li>• <strong>Port already in use:</strong> Stop existing process with <code className="bg-background px-1 rounded">local-memory stop</code> (auto-detects available port)</li>
                      <li>• <strong>Ollama not detected:</strong> Install Ollama from <a href="https://ollama.ai" className="text-memory-blue hover:underline">ollama.ai</a></li>
                      <li>• <strong>macOS security warning:</strong> Right-click binary → "Open" or run <code className="bg-background px-1 rounded">sudo xattr -rd com.apple.quarantine /path/to/local-memory</code></li>
                      <li>• <strong>Claude tools not appearing:</strong> Restart Claude Desktop after adding MCP server</li>
                      <li>• <strong>Memory not persisting:</strong> Check database path with <code className="bg-background px-1 rounded">local-memory status</code></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Migration from Old Setup</h4>
                    <div className="bg-blue-950/20 p-3 rounded border border-blue-700/30">
                      <p className="text-sm text-blue-200 mb-2">
                        <strong>Upgrading from complex flag setup?</strong> Your existing database and config will work with the new commands.
                      </p>
                      <p className="text-xs text-blue-300">
                        Just run <code>local-memory start</code> and it will detect your existing setup automatically.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Configuration File (config.yaml)</h4>
                    <div className="bg-green-950/20 p-3 rounded border border-green-700/30">
                      <p className="text-sm text-green-200 mb-2">
                        <strong>✨ Auto-Generated Configuration:</strong> local-memory creates <code className="bg-background px-1 rounded">~/.local-memory/config.yaml</code> automatically
                      </p>
                      <div className="text-xs text-green-300 space-y-1">
                        <div>• <strong>Ollama:</strong> Auto-detects at http://localhost:11434</div>
                        <div>• <strong>Qdrant:</strong> Auto-detects at http://localhost:6333 (storage in ~/.local-memory/qdrant-storage)</div>
                        <div>• <strong>Database:</strong> Creates unified SQLite database</div>
                        <div>• <strong>Sessions:</strong> Git-based or UUID session management</div>
                        <div>• <strong>REST API:</strong> Auto-selects available port (3002-3005)</div>
                      </div>
                      <p className="text-xs text-green-300 mt-2">
                        Everything organized in ~/.local-memory/ - no manual environment variables or complex JSON configs needed!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community */}
            <Card id="community" className="mb-8 scroll-target">
              <CardHeader>
                <CardTitle>Community & Support</CardTitle>
                <CardDescription>Get help and connect with other users.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-3">🆘 Getting Help</h5>
                    <div className="space-y-2 text-sm">
                      <div>💬 <a href="https://discord.gg/pjVX4BWu" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord Community</a>: Live support and discussion</div>
                      <div>📚 <strong>Documentation:</strong> This page covers most use cases</div>
                      <div>🐛 <strong>Bug Reports:</strong> Use GitHub issues for reproducible problems</div>
                      <div>💡 <strong>Feature Requests:</strong> Share ideas in Discord #feature-requests</div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-3">🌟 Use Cases & Integrations</h5>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>🤖 <strong>AI Agents:</strong> Claude, OpenCode, Custom agents</div>
                      <div>💻 <strong>Development:</strong> Code review memory, architecture knowledge</div>
                      <div>📊 <strong>Analytics:</strong> Learning progression, usage patterns</div>
                      <div>🔗 <strong>Integrations:</strong> REST API, MCP protocol, webhooks</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Need to purchase <em>Local Memory</em>?</p>
            <Link to="/payment">
              <Button size="lg" className="gap-2">
                <Download className="w-4 h-4" />
                Get <em>Local Memory</em>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default DocsPage;