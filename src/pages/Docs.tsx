import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Local Memory Documentation
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
            <CardDescription>Local Memory is the first solution designed for both modern MCP-enabled agents and traditional AI platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  MCP-Enabled Agents (Native Integration)
                </h4>
                <div className="bg-muted p-4 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Claude Code</strong> - Terminal AI with `claude mcp` commands</li>
                    <li>• <strong>Claude Desktop</strong> - Native app with config file</li>
                    <li>• <strong>Future MCP Agents</strong> - Automatic compatibility</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3 italic">
                    Memory tools appear natively in the agent's toolkit - no API calls needed
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-400 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Traditional AI Platforms (REST API)
                </h4>
                <div className="bg-muted p-4 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>OpenCode</strong> - Via REST endpoints</li>
                    <li>• <strong>ChatGPT</strong> - Through API integration</li>
                    <li>• <strong>Custom Agents</strong> - Standard HTTP calls</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3 italic">
                    Full memory capabilities through 20+ REST API endpoints
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">What Makes This Unique?</h4>
              <p className="text-sm text-muted-foreground">
                Most AI memory solutions only work with one type of platform. Local Memory is the first to provide 
                <strong> seamless native integration for MCP agents</strong> while maintaining 
                <strong> full REST API compatibility</strong> for traditional platforms - giving you the best of both worlds.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card className="mb-8 border-green-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-green-600" />
              <CardTitle className="text-xl">Quick Start (2 minutes)</CardTitle>
            </div>
            <CardDescription>Get up and running in just a few steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold">Download</h4>
                  <p className="text-sm text-muted-foreground">Get the binary for your OS</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold">Install Ollama</h4>
                  <p className="text-sm text-muted-foreground">Visit ollama.ai and pull model</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold">Run</h4>
                  <p className="text-sm text-muted-foreground">Execute and start remembering</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
              <h3 className="font-semibold text-lg mb-2">Step 1: Download Local Memory</h3>
              <p className="text-muted-foreground mb-3">Get the binary for your operating system:</p>
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm mb-2"><strong>Linux/macOS:</strong></p>
                <code className="text-sm bg-background px-2 py-1 rounded">
                  chmod +x local-memory && mv local-memory /usr/local/bin
                </code>
                <p className="text-sm mt-3 mb-2"><strong>Windows:</strong></p>
                <p className="text-sm text-muted-foreground">Add to PATH or run from download folder</p>
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

            {/* Step 3 */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Step 3: Choose Your Integration Method</h3>
              <p className="text-muted-foreground mb-3">Local Memory supports two integration methods:</p>
              
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
                          claude mcp add local-memory -- /path/to/local-memory --db-path ./claude-memories.db --session-id "claude-code-session"
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
                           <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"args": ["--db-path", "./claude-memories.db", "--session-id", "claude-desktop-session"]</div>
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
                          ./local-memory --db-path ./my-memories.db --session-id my-session
                        </code>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-3">
                      🌐 Access 20+ endpoints at http://localhost:3001/api/v1/
                    </p>
                  </div>
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
            <CardDescription>What makes Local Memory unique in the AI ecosystem</CardDescription>
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
                  new MCP-enabled agents can discover and use tools automatically. Local Memory bridges this gap, 
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
                    <p className="text-sm text-muted-foreground">20 tools for Claude Desktop & Code</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Universal REST API</h4>
                    <p className="text-sm text-muted-foreground">20+ endpoints for any platform</p>
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
                  Join our <a href="https://discord.gg/pjVX4BWu" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Discord community</a> for 
                  support and discussion.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Ready to get started?</p>
            <Link to="/payment">
              <Button size="lg" className="gap-2">
                <Download className="w-4 h-4" />
                Get Local Memory
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