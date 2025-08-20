import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Zap, Shield, Globe, Settings, Wrench, Key } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Performance from "@/components/Performance";
import ScrollToTop from "@/components/ScrollToTop";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              <em>Local Memory</em> Features
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
                      <em>Your AI's memory appears like magic—no configuration needed.</em>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-400 flex items-center gap-2">
                    Traditional AI Platforms (REST API)
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>OpenCode</strong> - Uses REST & JSON-RPC</li>
                      <li>• <strong>GPT & Others</strong> - Connects via REST</li>
                      <li>• <strong>Your Custom Setup</strong> - Uses REST or JSON-RPC</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                       <em>Connect once, remember everything—just like adding a browser extension.</em>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Why This Changes Everything</h4>
                <p className="text-sm text-muted-foreground">
                  Think of it like this: Most memory tools are like USB drives that only work with one computer. <em>Local Memory</em> is like cloud storage that works everywhere—except it stays on your computer for privacy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Start */}
          <Card className="mb-8 border-memory-green/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-memory-blue" />
                <CardTitle className="text-xl">Setup So Easy, Your AI Does It For You</CardTitle>
              </div>
              <CardDescription>No technical knowledge required—seriously.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-memory-green/20 text-memory-green flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Download Local Memory</h4>
                    <p className="text-sm text-muted-foreground">(like downloading any app)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-memory-green/20 text-memory-green flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Copy our setup instructions</h4>
                    <p className="text-sm text-muted-foreground">(we provide everything)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-memory-green/20 text-memory-green flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Paste into your AI assistant</h4>
                    <p className="text-sm text-muted-foreground">(Claude, ChatGPT, etc.)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-memory-green/20 text-memory-green flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold">Your AI installs everything</h4>
                    <p className="text-sm text-muted-foreground">(it handles all the technical stuff)</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">That's it. Your AI now has permanent memory.</h4>
                <p className="text-sm text-muted-foreground">
                  No coding, no terminal commands, no confusion.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Performance Benchmarks */}
          <Performance />

          {/* Technical Architecture */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-memory-blue" />
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

          {/* Key Elements */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-memory-blue" />
                Key Elements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-memory-green mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Native MCP Integration</h4>
                       <p className="text-sm text-muted-foreground">26+ tools for Claude Desktop & Code</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-memory-green mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Universal REST API</h4>
                       <p className="text-sm text-muted-foreground">26+ endpoints for any platform</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-memory-green mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">AI-Powered Search</h4>
                      <p className="text-sm text-muted-foreground">Semantic search with Ollama integration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-memory-green mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Vector Search</h4>
                      <p className="text-sm text-muted-foreground">Qdrant integration with SQLite fallback</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-memory-green mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Future-Proof Design</h4>
                      <p className="text-sm text-muted-foreground">Works with emerging MCP agents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-memory-green mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Temporal Analysis</h4>
                      <p className="text-sm text-muted-foreground">Learning progression tracking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-memory-green mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Cross-Platform</h4>
                      <p className="text-sm text-muted-foreground">Single binary deployment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-memory-green mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Privacy-First</h4>
                      <p className="text-sm text-muted-foreground">All data stays on your machine</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Support & Community</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Join our <a href="https://discord.gg/pjVX4BWu" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord community</a> for 
                    support and discussion, or check our comprehensive documentation for detailed setup instructions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What's Included</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Complete installation with AI-guided setup</li>
                    <li>• 26+ memory tools and API endpoints</li>
                    <li>• Support for all major AI platforms</li>
                    <li>• Discord community access</li>
                    <li>• Regular updates and improvements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Ready to give your AI permanent memory?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/docs">
                <Button variant="outline" size="lg" className="gap-2">
                  <Shield className="w-4 h-4" />
                  View Documentation
                </Button>
              </Link>
              <Link to="/payment">
                <Button size="lg" className="gap-2">
                  <Download className="w-4 h-4" />
                  Purchase <em>Local Memory</em>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default FeaturesPage;