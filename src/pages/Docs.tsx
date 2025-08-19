import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Zap, Shield, Globe, Bot, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostPurchaseAgentSetup from "@/components/PostPurchaseAgentSetup";
import Performance from "@/components/Performance";

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
              The only memory system that works natively with both MCP-enabled AI agents and traditional platforms
            </p>
          </div>

        {/* AI Platform Compatibility */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-500" />
              <CardTitle className="text-xl">Universal AI Platform Support</CardTitle>
            </div>
            <CardDescription><em>Local Memory</em> is designed for both modern MCP-enabled agents and traditional AI platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-400 flex items-center gap-2">
                  MCP-Enabled Agents (Native Integration)
                </h4>
                <div className="bg-muted p-4 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Claude Code</strong> - Setup with `claude mcp`</li>
                    <li>• <strong>Claude Desktop</strong> - Setup with config file</li>
                    <li>• <strong>Future MCP Agents</strong> - Automatic compatibility</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3 italic">
                    Memory tools appear natively in the agent's toolkit
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-green-400 flex items-center gap-2">
                  Traditional AI Platforms (REST API)
                </h4>
                <div className="bg-muted p-4 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>OpenCode</strong> - Via REST & JSON-RPC endpoints</li>
                    <li>• <strong>Tool-Aware Agents</strong> - Via REST endpoints</li>
                    <li>• <strong>Custom Agents</strong> - Via REST endpoints</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3 italic">
                     Full memory capabilities through 26+ REST API endpoints
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">What Makes This Unique?</h4>
              <p className="text-sm text-muted-foreground">
                Most AI memory solutions only work with one type of platform. <em>Local Memory</em> is the first to provide 
                <strong> seamless native integration for MCP agents</strong> while maintaining 
                <strong> full REST API compatibility</strong> for traditional platforms - giving you the best of both worlds.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card className="mb-8 border-memory-green/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-memory-green" />
              <CardTitle className="text-xl">Quick Start (2 minutes)</CardTitle>
            </div>
            <CardDescription>Get up and running in just a few steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-memory-green/20 text-memory-green flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold">Purchase & Download</h4>
                  <p className="text-sm text-muted-foreground">Get the binary for your OS</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-memory-green/20 text-memory-green flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold">Copy Agent Prompt</h4>
                  <p className="text-sm text-muted-foreground">Setup instructions for your OS</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-memory-green/20 text-memory-green flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold">Let Agent Install</h4>
                  <p className="text-sm text-muted-foreground">Your AI handles everything else</p>
                </div>
              </div>
            </div>
            
            <div className="bg-memory-blue/10 border border-memory-blue/20 p-4 rounded-lg">
              <h4 className="font-semibold text-memory-blue mb-2">🤖 The Easiest Installation Ever</h4>
              <p className="text-sm text-muted-foreground">
                After purchasing and downloading <em>Local Memory</em>, just copy our detailed prompts. 
                Your agent will install Ollama (optional), Qdrant (optional), configure MCP integration, set up proper file paths, 
                and verify everything works. No manual installation needed!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Performance Benchmarks */}
        <Performance />

        {/* Section 1: Agent Setup Prompts (Recommended) */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bot className="w-8 h-8 text-memory-blue" />
              <h2 className="text-3xl font-bold text-foreground">Agent Setup Prompts</h2>
              <span className="bg-memory-green/20 text-memory-green px-3 py-1 rounded-full text-sm font-medium">Recommended</span>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The easiest way to install Local Memory. After purchasing and downloading, just copy our detailed prompts 
              to your AI agent and let it handle the complete installation and configuration.
            </p>
          </div>

          <PostPurchaseAgentSetup />
        </div>

        {/* Section 2: Manual Setup Instructions */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Settings className="w-8 h-8 text-muted-foreground" />
              <h2 className="text-3xl font-bold text-foreground">Manual Setup Instructions</h2>
              <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">Advanced</span>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              For developers who prefer manual installation or need custom configurations. 
              These step-by-step instructions provide complete control over the setup process.
            </p>
          </div>

          {/* System Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              System Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Supported Platforms</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• macOS (Apple Silicon & Intel)</li>
                  <li>• Linux (x64)</li>
                  <li>• Windows 10/11</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Resources</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 50MB disk space</li>
                  <li>• 8GB+ RAM recommended</li>
                  <li>• No Node.js dependencies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

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
              <h3 className="font-semibold text-lg mb-2">Step 1: Download <em>Local Memory</em></h3>
              <p className="text-muted-foreground mb-3">Get the binary for your operating system:</p>
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm mb-2"><strong>Linux/macOS:</strong></p>
                <code className="text-sm bg-background px-2 py-1 rounded">
                  chmod +x local-memory && mv local-memory /usr/local/bin
                </code>
                <p className="text-sm mt-3 mb-2"><strong>Windows:</strong></p>
                <p className="text-sm text-muted-foreground">Add to PATH or run from download folder</p>
                
                <div className="mt-4 p-3 bg-amber-900/20 border border-amber-700/30 rounded-md">
                  <p className="text-sm font-medium text-amber-300 mb-1">macOS Security Notice:</p>
                  <p className="text-xs text-amber-300 mb-2">
                    macOS may show "cannot verify developer" warning. To bypass:
                  </p>
                  <div className="text-xs text-amber-200 space-y-1">
                    <p><strong>Option 1:</strong> Right-click the binary → "Open" → click "Open" in dialog</p>
                    <p><strong>Option 2:</strong> Run: <code className="bg-amber-800/30 px-1 rounded text-amber-100">sudo xattr -rd com.apple.quarantine /path/to/local-memory-macos-*</code></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Step 2: Install Ollama (Required)</h3>
              <p className="text-muted-foreground mb-3">Ollama provides AI-powered memory features:</p>
              <div className="bg-muted p-3 rounded-md space-y-2">
                <p className="text-sm"><strong>Install Ollama:</strong></p>
                <code className="text-sm bg-background px-2 py-1 rounded block">
                  curl -fsSL https://ollama.ai/install.sh | sh
                </code>
                <p className="text-sm text-muted-foreground">Or download from <a href="https://ollama.ai" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ollama.ai</a> for Windows</p>
                
                <p className="text-sm mt-3"><strong>Pull required model (350MB):</strong></p>
                <code className="text-sm bg-background px-2 py-1 rounded block">
                  ollama pull nomic-embed-text
                </code>
                
                <p className="text-sm mt-3"><strong>Optional - Enhanced chat model:</strong></p>
                <code className="text-sm bg-background px-2 py-1 rounded block">
                  ollama pull qwen2.5:7b
                </code>
              </div>
            </div>

            {/* Step 2.5 - Qdrant (Optional) */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Step 2.5: Install Qdrant (Optional - 5-8x Faster Search)</h3>
              <p className="text-muted-foreground mb-3">Qdrant provides lightning-fast vector search for enhanced performance:</p>
              <div className="bg-muted p-3 rounded-md space-y-2">
                <p className="text-sm"><strong>Download Qdrant binary:</strong></p>
                <code className="text-sm bg-background px-2 py-1 rounded block">
                  curl -L https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-apple-darwin.tar.gz -o qdrant.tar.gz
                </code>
                <p className="text-sm text-muted-foreground">For Linux: use <code className="bg-background px-1 rounded">qdrant-x86_64-unknown-linux-gnu.tar.gz</code></p>
                
                <p className="text-sm mt-3"><strong>Extract and setup:</strong></p>
                <code className="text-sm bg-background px-2 py-1 rounded block">
                  tar -xzf qdrant.tar.gz && chmod +x qdrant
                </code>
                
                <p className="text-sm mt-3"><strong>Start Qdrant server:</strong></p>
                <code className="text-sm bg-background px-2 py-1 rounded block">
                  ./qdrant --uri localhost:6334 {'>'} qdrant.log 2{'>'}&1 &
                </code>
                
                <p className="text-sm mt-3"><strong>Verify installation:</strong></p>
                <code className="text-sm bg-background px-2 py-1 rounded block">
                  curl http://localhost:6333/healthz
                </code>
                
                <div className="mt-3 p-2 bg-green-900/20 border border-green-700/30 rounded-md">
                  <p className="text-xs text-green-300">
                    <strong>Performance Benefit:</strong> Qdrant reduces search latency from ~100ms to {'<'}10ms. 
                    <em>Local Memory</em> auto-detects Qdrant and falls back to SQLite if unavailable.
                  </p>
                </div>
                
                <div className="mt-2 p-2 bg-blue-900/20 border border-blue-700/30 rounded-md">
                  <p className="text-xs text-blue-300">
                    <strong>Alternative:</strong> Use Docker: <code className="bg-background px-1 rounded">docker run -p 6333:6333 qdrant/qdrant</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Step 3: Choose Your Integration Method</h3>
              <p className="text-muted-foreground mb-3"><em>Local Memory</em> supports two integration methods:</p>
              
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Option A: MCP Integration (Recommended for Claude)</h4>
                  <p className="text-sm text-muted-foreground mb-3">For Claude Desktop, Claude Code, and other MCP-enabled agents</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-sm mb-2">Claude Code (Terminal AI):</h5>
                      <div className="bg-background p-3 rounded-md">
                        <p className="text-sm mb-2"><strong>Add local-memory server:</strong></p>
                        <code className="text-xs bg-muted px-2 py-1 rounded block mb-2">
                          claude mcp add local-memory -- /path/to/local-memory --db-path ./local-memories.db --session-id "claude-code-session"
                        </code>
                        <p className="text-sm mb-2"><strong>Or import from Claude Desktop:</strong></p>
                        <code className="text-xs bg-muted px-2 py-1 rounded block mb-2">
                          claude mcp add-from-claude-desktop
                        </code>
                        <p className="text-sm mb-2"><strong>Manage servers:</strong></p>
                        <code className="text-xs bg-muted px-2 py-1 rounded block">
                          claude mcp list | claude mcp get local-memory | claude mcp remove local-memory
                        </code>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-sm mb-2">Claude Desktop (Native App):</h5>
                      <div className="bg-background p-3 rounded-md">
                        <p className="text-sm mb-2">Edit <code className="bg-muted px-1 rounded">~/.claude_desktop_config.json</code>:</p>
                         <div className="text-xs font-mono text-muted-foreground bg-muted p-2 rounded">
                           <div>&#123;</div>
                           <div>&nbsp;&nbsp;"mcpServers": &#123;</div>
                           <div>&nbsp;&nbsp;&nbsp;&nbsp;"local-memory": &#123;</div>
                           <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"command": "/path/to/local-memory",</div>
                           <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"args": ["--db-path", "./local-memories.db", "--session-id", "claude-desktop-session"]</div>
                           <div>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                           <div>&nbsp;&nbsp;&#125;</div>
                           <div>&#125;</div>
                         </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-3">
                    ✨ Memory tools will appear natively in Claude's interface - no API calls needed
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Option B: REST API Integration (Universal)</h4>
                  <p className="text-sm text-muted-foreground mb-3">For OpenCode, ChatGPT, custom agents, and web applications</p>
                  <div className="bg-background p-3 rounded-md">
                    <p className="text-sm mb-2"><strong>Start REST API server:</strong></p>
                    <code className="text-sm bg-muted px-2 py-1 rounded block">
                      ./local-memory --rest-api-only --rest-port 3001 --session-id api-session
                    </code>
                    
                    <p className="text-sm mt-3 mb-2"><strong>Alternative configurations:</strong></p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Basic MCP mode (for future integration):</p>
                        <code className="text-xs bg-muted px-2 py-1 rounded block">
                          ./local-memory --session-id my-project
                        </code>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Custom database location:</p>
                        <code className="text-xs bg-muted px-2 py-1 rounded block">
                          ./local-memory --db-path ./local-memories.db --session-id my-session
                        </code>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">With Qdrant for high performance (requires Qdrant running):</p>
                        <code className="text-xs bg-muted px-2 py-1 rounded block">
                          QDRANT_ENABLED=true ./local-memory --session-id my-project
                        </code>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Full configuration with Qdrant and custom Ollama:</p>
                        <code className="text-xs bg-muted px-2 py-1 rounded block">
                          QDRANT_ENABLED=true QDRANT_URL=http://localhost:6333 ./local-memory --session-id full-setup --ollama-url http://localhost:11434
                        </code>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-3">
                       🌐 Access 26+ endpoints at http://localhost:3001/api/v1/
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Comparison */}
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Performance Optimization</h3>
              <p className="text-muted-foreground mb-3">Choose your configuration based on performance needs:</p>
              
              <div className="bg-muted p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-background p-3 rounded-md">
                    <h4 className="font-semibold text-sm mb-2 text-green-600">🚀 Qdrant Mode (Recommended)</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Vector search: {'<'}10ms latency</li>
                      <li>• Enterprise performance</li>
                      <li>• Auto-detected when available</li>
                      <li>• Falls back to SQLite gracefully</li>
                    </ul>
                  </div>
                  <div className="bg-background p-3 rounded-md">
                    <h4 className="font-semibold text-sm mb-2 text-blue-600">💾 SQLite Mode (Default)</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Vector search: ~100ms latency</li>
                      <li>• Zero dependencies</li>
                      <li>• Works anywhere</li>
                      <li>• Great for development</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-blue-900/20 border border-blue-700/30 rounded-md">
                  <p className="text-xs text-blue-300">
                    <strong>Tip:</strong> Start with SQLite mode for quick setup, add Qdrant later for production performance.
                    <em>Local Memory</em> automatically detects and uses the best available backend.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Step 4: Verify Installation</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">For MCP Integration:</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1"><strong>Claude Code:</strong> Use `claude mcp list` to verify server is added</p>
                      <div className="bg-green-950/20 p-2 rounded text-xs text-green-400">
                        ✅ Success: Server "local-memory" should appear in list with status "running"
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1"><strong>Claude Desktop:</strong> Restart app and look for memory tools</p>
                      <div className="bg-green-950/20 p-2 rounded text-xs text-green-400">
                        ✅ Success: You'll see tools like "store_memory", "search_memories", "ask_question" available
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">For REST API:</h4>
                  <code className="text-sm bg-background px-2 py-1 rounded block">
                    curl http://localhost:3001/api/v1/health
                  </code>
                  <p className="text-sm mt-2 text-muted-foreground">Should return: <code className="bg-background px-1 rounded">&#123;"status":"ok"&#125;</code></p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Architecture */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Technical Architecture
            </CardTitle>
            <CardDescription>What makes <em>Local Memory</em> unique in the AI ecosystem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Dual Protocol Support</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm"><strong>MCP Protocol (JSON-RPC over stdio)</strong></p>
                        <p className="text-xs text-muted-foreground">Direct integration with next-generation AI agents</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm"><strong>REST API (HTTP endpoints)</strong></p>
                        <p className="text-xs text-muted-foreground">Universal compatibility with existing platforms</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Advanced Memory Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm"><strong>Vector Embeddings</strong></p>
                        <p className="text-xs text-muted-foreground">Semantic search with local AI models</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm"><strong>Temporal Analysis</strong></p>
                        <p className="text-xs text-muted-foreground">Track learning patterns over time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Why This Matters</h4>
                <p className="text-sm text-muted-foreground">
                  The AI landscape is rapidly evolving. While older platforms rely on manual API integration, 
                  new MCP-enabled agents can discover and use tools automatically. <em>Local Memory</em> bridges this gap, 
                  ensuring your memory system works seamlessly regardless of which AI platform you choose - today or tomorrow.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Native MCP Integration</h4>
                     <p className="text-sm text-muted-foreground">26+ tools for Claude Desktop & Code</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Universal REST API</h4>
                     <p className="text-sm text-muted-foreground">26+ endpoints for any platform</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">AI-Powered Search</h4>
                    <p className="text-sm text-muted-foreground">Semantic search with Ollama integration</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Vector Search</h4>
                    <p className="text-sm text-muted-foreground">Qdrant integration with SQLite fallback</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Future-Proof Design</h4>
                    <p className="text-sm text-muted-foreground">Works with emerging MCP agents</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Temporal Analysis</h4>
                    <p className="text-sm text-muted-foreground">Learning progression tracking</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Cross-Platform</h4>
                    <p className="text-sm text-muted-foreground">Single binary deployment</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Support & Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Common Issues</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>macOS "cannot verify developer" warning:</strong> Right-click binary → "Open" or run <code className="bg-background px-1 rounded">sudo xattr -rd com.apple.quarantine /path/to/local-memory-macos-*</code></li>
                  <li>• <strong>Claude Code server not found:</strong> Run <code className="bg-background px-1 rounded">claude mcp list</code> to check status</li>
                  <li>• <strong>MCP commands not working:</strong> Ensure Claude Code is installed and authenticated</li>
                  <li>• <strong>MCP connection failed:</strong> Check Claude Desktop config path and syntax</li>
                  <li>• <strong>Tools not appearing:</strong> Restart Claude Desktop after config changes</li>
                  <li>• <strong>Port already in use:</strong> Change port with <code className="bg-background px-1 rounded">--rest-port 3002</code></li>
                  <li>• <strong>Ollama not found:</strong> Ensure Ollama is installed and in PATH</li>
                  <li>• <strong>Permission denied:</strong> Run <code className="bg-background px-1 rounded">chmod +x local-memory</code></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground">
                  Join our <a href="https://discord.gg/pjVX4BWu" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord community</a> for 
                  support and discussion.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Ready to get started?</p>
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
    </div>
  );
};

export default DocsPage;