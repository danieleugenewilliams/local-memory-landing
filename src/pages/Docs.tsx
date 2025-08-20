import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Shield, Bot, Settings } from "lucide-react";
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
              Complete installation and usage guide for Local Memory
            </p>
          </div>

          {/* Quick Navigation */}
          <Card className="mb-8 border-memory-blue/30">
            <CardHeader>
              <CardTitle className="text-xl">Quick Navigation</CardTitle>
              <CardDescription>Jump to the section you need</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-semibold">Install & Setup</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#agent-setup" className="block text-memory-blue hover:underline">• Agent Setup Prompts (Recommended)</a>
                    <a href="#manual-setup" className="block text-memory-blue hover:underline">• Manual Installation</a>
                    <a href="#system-requirements" className="block text-memory-blue hover:underline">• System Requirements</a>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Usage</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#starting-mcp" className="block text-memory-blue hover:underline">• Starting MCP Server</a>
                    <a href="#starting-rest" className="block text-memory-blue hover:underline">• Starting REST-only Mode</a>
                    <a href="#configuration" className="block text-memory-blue hover:underline">• Configuration Options</a>
                    <a href="#troubleshooting" className="block text-memory-blue hover:underline">• Troubleshooting</a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Install & Setup */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Install & Setup</h2>

            {/* Agent Setup Prompts */}
            <div id="agent-setup" className="mb-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Bot className="w-8 h-8 text-memory-blue" />
                  <h3 className="text-2xl font-bold text-foreground">Agent Setup Prompts</h3>
                  <span className="bg-memory-green/20 text-memory-green px-3 py-1 rounded-full text-sm font-medium">Recommended</span>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  The easiest way to install Local Memory. After purchasing and downloading, just copy our detailed prompts 
                  to your AI agent and let it handle the complete installation and configuration.
                </p>
              </div>

              <PostPurchaseAgentSetup />
            </div>

            {/* Manual Setup */}
            <div id="manual-setup" className="mb-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Settings className="w-8 h-8 text-muted-foreground" />
                  <h3 className="text-2xl font-bold text-foreground">Manual Installation</h3>
                  <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">Advanced</span>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  For developers who prefer manual installation or need custom configurations. 
                  These step-by-step instructions provide complete control over the setup process.
                </p>
              </div>

              {/* System Requirements */}
              <Card id="system-requirements" className="mb-8">
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
                    <h4 className="font-semibold text-lg mb-2">Step 1: Download <em>Local Memory</em></h4>
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
                    <h4 className="font-semibold text-lg mb-2">Step 2: Install Ollama (Required)</h4>
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

                  {/* Step 2.5 - Qdrant */}
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2">Step 2.5: Install Qdrant (Optional - 5-8x Faster Search)</h4>
                    <p className="text-muted-foreground mb-3">Qdrant provides lightning-fast vector search for enhanced performance:</p>
                    <div className="bg-muted p-3 rounded-md space-y-2">
                      <p className="text-sm"><strong>Download Qdrant binary:</strong></p>
                      <code className="text-sm bg-background px-2 py-1 rounded block break-all">
                        curl -L https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-apple-darwin.tar.gz -o qdrant.tar.gz
                      </code>
                      <p className="text-sm text-muted-foreground">For Linux: use <code className="bg-background px-1 rounded">qdrant-x86_64-unknown-linux-gnu.tar.gz</code></p>
                      
                      <p className="text-sm mt-3"><strong>Extract and setup:</strong></p>
                      <code className="text-sm bg-background px-2 py-1 rounded block">
                        tar -xzf qdrant.tar.gz && chmod +x qdrant
                      </code>
                      
                      <p className="text-sm mt-3"><strong>Start Qdrant server:</strong></p>
                      <code className="text-sm bg-background px-2 py-1 rounded block">
                        ./qdrant --uri localhost:6334 {`>`} qdrant.log 2{`>`}&1 &
                      </code>
                      
                      <p className="text-sm mt-3"><strong>Verify installation:</strong></p>
                      <code className="text-sm bg-background px-2 py-1 rounded block">
                        curl http://localhost:6333/healthz
                      </code>
                      
                      <div className="mt-3 p-2 bg-green-900/20 border border-green-700/30 rounded-md">
                        <p className="text-xs text-green-300">
                          <strong>Performance Benefit:</strong> Qdrant reduces search latency from ~100ms to &lt;10ms. 
                          <em>Local Memory</em> auto-detects Qdrant and falls back to SQLite if unavailable.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2">Step 3: Choose Your Integration Method</h4>
                    <p className="text-muted-foreground mb-3"><em>Local Memory</em> supports two integration methods:</p>
                    
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <h5 className="font-semibold text-green-400 mb-2">Option A: MCP Integration (Recommended for Claude)</h5>
                        <p className="text-sm text-muted-foreground mb-3">For Claude Desktop, Claude Code, and other MCP-enabled agents</p>
                        
                        <div className="space-y-4">
                          <div>
                            <h6 className="font-semibold text-sm mb-2">Claude Code (Terminal AI):</h6>
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
                            <h6 className="font-semibold text-sm mb-2">Claude Desktop (Native App):</h6>
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
                        <h5 className="font-semibold text-blue-400 mb-2">Option B: REST API Integration (Universal)</h5>
                        <p className="text-sm text-muted-foreground mb-3">For OpenCode, ChatGPT, custom agents, and web applications</p>
                        <div className="bg-background p-3 rounded-md">
                          <p className="text-sm mb-2"><strong>Start REST API server:</strong></p>
                          <code className="text-sm bg-muted px-2 py-1 rounded block">
                            ./local-memory --rest-api-only --rest-port 3001 --session-id api-session
                          </code>
                          
                          <p className="text-xs text-muted-foreground mt-3">
                             🌐 Access 26+ endpoints at http://localhost:3001/api/v1/
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="border-l-4 border-pink-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2">Step 4: Verify Installation</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">For MCP Integration:</h5>
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
                        <h5 className="font-semibold text-sm mb-2">For REST API:</h5>
                        <code className="text-sm bg-background px-2 py-1 rounded block">
                          curl http://localhost:3001/api/v1/health
                        </code>
                        <p className="text-sm mt-2 text-muted-foreground">Should return: <code className="bg-background px-1 rounded">&#123;"status":"ok"&#125;</code></p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Usage Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Usage</h2>

            {/* Starting Local Memory */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Starting Local Memory</CardTitle>
                <CardDescription>Different ways to run Local Memory based on your needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* MCP Server Mode */}
                <div id="starting-mcp">
                  <h4 className="font-semibold text-lg mb-3">MCP Server Mode</h4>
                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">Standard mode for Claude Desktop and Claude Code integration:</p>
                    <code className="text-sm bg-background px-2 py-1 rounded block">
                      ./local-memory --session-id my-project
                    </code>
                    <p className="text-xs text-muted-foreground">This starts the MCP server that agents can connect to via stdio.</p>
                  </div>
                </div>

                {/* REST-only Mode */}
                <div id="starting-rest">
                  <h4 className="font-semibold text-lg mb-3">REST-only Mode</h4>
                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <p className="text-sm text-muted-foreground">For OpenCode, web apps, and custom integrations:</p>
                    <code className="text-sm bg-background px-2 py-1 rounded block">
                      ./local-memory --rest-api-only --rest-port 3001 --session-id api-session
                    </code>
                    <p className="text-xs text-muted-foreground">Provides HTTP endpoints at http://localhost:3001/api/v1/</p>
                  </div>
                </div>

                {/* Configuration Options */}
                <div id="configuration">
                  <h4 className="font-semibold text-lg mb-3">Configuration Options</h4>
                  <div className="bg-muted p-4 rounded-lg space-y-4">
                    <div>
                      <h5 className="font-semibold text-sm mb-2">Common Options:</h5>
                      <div className="space-y-2 text-sm">
                        <div><code className="bg-background px-2 py-1 rounded">--db-path ./memories.db</code> - Custom database location</div>
                        <div><code className="bg-background px-2 py-1 rounded">--session-id "my-session"</code> - Session identifier for memory isolation</div>
                        <div><code className="bg-background px-2 py-1 rounded">--rest-port 3002</code> - Custom REST API port</div>
                        <div><code className="bg-background px-2 py-1 rounded">--ollama-url http://localhost:11434</code> - Custom Ollama endpoint</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-sm mb-2">With Qdrant (High Performance):</h5>
                      <code className="text-sm bg-background px-2 py-1 rounded block">
                        QDRANT_ENABLED=true QDRANT_URL=http://localhost:6333 ./local-memory --session-id my-project
                      </code>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-sm mb-2">Environment Variables:</h5>
                      <div className="space-y-2 text-sm">
                        <div><code className="bg-background px-2 py-1 rounded">QDRANT_ENABLED=true</code> - Enable Qdrant integration</div>
                        <div><code className="bg-background px-2 py-1 rounded">QDRANT_URL=http://localhost:6333</code> - Qdrant server URL</div>
                        <div><code className="bg-background px-2 py-1 rounded">OLLAMA_URL=http://localhost:11434</code> - Ollama server URL</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CLI Reference */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>CLI Reference</CardTitle>
                <CardDescription>Complete command-line interface documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Available Commands:</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div><code>./local-memory --help</code> - Show all available options</div>
                    <div><code>./local-memory --version</code> - Show version information</div>
                    <div><code>./local-memory --session-id "name"</code> - Start with specific session</div>
                    <div><code>./local-memory --rest-api-only</code> - Start in REST-only mode</div>
                    <div><code>./local-memory --db-path "path"</code> - Specify database location</div>
                    <div><code>./local-memory --rest-port 3001</code> - Set REST API port</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Troubleshooting */}
            <Card id="troubleshooting" className="mb-8">
              <CardHeader>
                <CardTitle>Troubleshooting</CardTitle>
                <CardDescription>Common issues and solutions</CardDescription>
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
                    <h4 className="font-semibold mb-2">Getting Help</h4>
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
            <p className="text-muted-foreground mb-4">Need to purchase Local Memory?</p>
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