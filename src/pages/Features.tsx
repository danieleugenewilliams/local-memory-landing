import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Shield, Globe, Settings, Wrench, Key, ChevronDown, Database, Search, Brain, LucideBrainCircuit, WholeWord, Workflow } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Performance from "@/components/Performance";
import ScrollToTop from "@/components/ScrollToTop";

const FeaturesPage = () => {
  const [openExamples, setOpenExamples] = useState<{[key: string]: boolean}>({});
  
  const toggleExample = (exampleId: string) => {
    setOpenExamples(prev => ({
      ...prev,
      [exampleId]: !prev[exampleId]
    }));
  };
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
              It's the only memory system that works natively with both MCP-enabled AI agents and traditional agent platforms.
            </p>
          </div>

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
                        <p className="text-sm text-muted-foreground">26 tools for Claude Desktop & Code</p>
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
                      <h4 className="font-semibold">Privacy First</h4>
                      <p className="text-sm text-muted-foreground">All data stays on your machine</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Platform Compatibility */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-500" />
                <CardTitle className="text-xl">Universal AI Memory Platform</CardTitle>
              </div>
              <CardDescription><em>Local Memory</em> is designed for both modern MCP-enabled agents and traditional AI platforms.</CardDescription>
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
                      <em>All your AI agents store, retrieve, and analyze shared contextual memories effortlessly.</em>
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
                       <em>Connect once, give all your AI agents instant access to shared memories and context.</em>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">How Is This Transformational for Agentic Workflows?</h4>
                <p className="text-sm text-muted-foreground">
                  Think of it like this: Most memory tools are like USB drives that only work with one computer at a time, at that moment. <em>Local Memory</em> is like cloud storage that works with all of your agents, except it stays private on your machine.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Start */}
          <Card className="mb-8 border-memory-muted/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-memory-blue" />
                <CardTitle className="text-xl">Setup So Easy, Your AI Does It For You</CardTitle>
              </div>
              <CardDescription>No technical knowledge is required—seriously.</CardDescription>
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
                <h4 className="font-semibold mb-2">Could Transforming All AI Agents Really Be This Simple?</h4>
                <p className="text-sm text-muted-foreground">
                  No coding, no terminal commands, no confusion. All of your AI agents will have access to contextual memories to deliver exponentially better outcomes.
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
              <CardDescription><em>Local Memory</em> is unique to the AI ecosystem.</CardDescription>
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
                          <p className="text-xs text-muted-foreground">Tracks learning patterns over time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Why This Matters?</h4>
                  <p className="text-sm text-muted-foreground">
                    The AI landscape is rapidly evolving. While older platforms rely on manual API integration, 
                    new MCP-enabled agents can discover and use tools automatically. <em>Local Memory</em> bridges this gap, 
                    ensuring your memory system works seamlessly regardless of which AI platform you choose today, tomorrow, or the next day.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Using Local Memory */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-memory-blue" />
                Agent Collaboration Scenarios
              </CardTitle>
              <CardDescription>
                Real agent conversations showing how Local Memory transforms AI from stateless helpers into learning, evolving collaborators. Click to see full interactions.
              </CardDescription>
            </CardHeader>
              <CardContent>
                <div className="mb-10">

                  {/* Agent Collaboration Scenarios */}
                  <div className="mb-8">              
                    <div className="space-y-6">

                      {/* Store Insights → Performance Optimization */}
                      <Collapsible open={openExamples['store-insights']} onOpenChange={() => toggleExample('store-insights')}>
                        <div className="border-2 border-memory-blue/30 rounded-lg p-4 bg-card">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Database className="w-5 h-5 text-memory-blue" />
                              <h4 className="font-semibold">Store Insights → Performance Optimization</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <CollapsibleTrigger asChild>
                                <Button size="sm" variant="ghost" className="gap-1">
                                  <ChevronDown className={`w-4 h-4 transition-transform ${openExamples['store-insights'] ? 'rotate-180' : ''}`} />
                                  {openExamples['store-insights'] ? 'Hide' : 'Show'} Full Interaction
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                          </div>
                          
                          <div className="bg-muted p-3 rounded-md border border-border mb-3">
                            <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                              From documenting 100ms searches to achieving 34K memories/second. Watch the agent build expertise over 4 months, connecting performance insights and breakthrough optimizations...
                            </pre>
                          </div>
                          
                          <CollapsibleContent>
                            <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-blue">💬 Month 1 - Storing Performance Baselines</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "Search is taking 5-10 seconds per query. Investigate this issue, identify root causes, and document your findings, and recommended solution."
                                  </div>
                                  <div className="bg-blue-950/20 p-2 rounded border border-blue-700/30">
                                    <strong>Agent:</strong> "Let me store this performance baseline for tracking." <br/><em>MCP: <code>store_memory</code> - "SQLite search: ~100ms baseline"</em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-green">✨ Month 2 - Documenting Breakthrough</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "Qdrant gives us &lt;10ms searches! This is incredible."
                                  </div>
                                  <div className="bg-green-950/20 p-2 rounded border border-green-700/30">
                                    <strong>Agent:</strong> "Storing this breakthrough and linking to our baseline." <br/><em>MCP: <code>store_memory</code> + <code>create_relationship</code> - Performance evolution tracking</em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-purple">🚀 Month 4 - Building on Stored Knowledge</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "Need to import 50,000 memories from our old system"
                                  </div>
                                  <div className="bg-purple-950/20 p-2 rounded border border-purple-700/30">
                                    <strong>Agent:</strong> "I remember our performance journey! Using those insights to design bulk operations achieving 34K memories/second." <br/><em>MCP: <code>track_learning_progression</code> + <code>analyze_memories</code> - Building expertise over time</em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                <h5 className="font-semibold mb-2 text-memory-orange">📈 Tools Used: 6 MCP tools showing how stored insights compound into expertise</h5>
                              </div>
                            </div>
                          </CollapsibleContent>
                          
                          <p className="text-xs text-muted-foreground mt-2">
                            <em>Agent learns from performance patterns and builds compound expertise over months</em>
                          </p>
                        </div>
                      </Collapsible>

                      {/* Find Relevant Context → Search & Tag Discovery */}
                      <Collapsible open={openExamples['find-context']} onOpenChange={() => toggleExample('find-context')}>
                        <div className="border-2 border-memory-green/30 rounded-lg p-4 bg-card">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Search className="w-5 h-5 text-memory-green" />
                              <h4 className="font-semibold">Find Relevant Context → Search & Tag Discovery</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <CollapsibleTrigger asChild>
                                <Button size="sm" variant="ghost" className="gap-1">
                                  <ChevronDown className={`w-4 h-4 transition-transform ${openExamples['find-context'] ? 'rotate-180' : ''}`} />
                                  {openExamples['find-context'] ? 'Hide' : 'Show'} Full Interaction
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                          </div>
                          
                          <div className="bg-muted p-3 rounded-md border border-border mb-3">
                            <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                              Sophisticated search that understands context, time, and relationships. From basic tag search to temporal filtering and relationship discovery...
                            </pre>
                          </div>
                          
                          <CollapsibleContent>
                            <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-blue">💬 Looking for Security Insights</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "Find everything related to authentication and security from our client projects"
                                  </div>
                                  <div className="bg-blue-950/20 p-2 rounded border border-blue-700/30">
                                    <strong>Agent:</strong> "I'll search by tags and context..." <br/><em>MCP: <code>search_by_tags</code> - Finds memories tagged with security, auth, oauth, etc.</em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-green">✨ Smart Tag Results</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-green-950/20 p-2 rounded border border-green-700/30">
                                    <strong>Agent:</strong> "Found 12 security memories: OIDC patterns (3), JWT implementation (2), OAuth flows (4), password policies (2), API key rotation (1). Want me to search within specific timeframes?" <br/><em>MCP: <code>search_memories</code> - Semantic search within results</em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-purple">🚀 Temporal + Relationship Search</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "Show me only the security insights from the last 3 months that relate to our current OAuth implementation"
                                  </div>
                                  <div className="bg-purple-950/20 p-2 rounded border border-purple-700/30">
                                    <strong>Agent:</strong> "Perfect! Here are 5 recent OAuth memories, plus 3 related token refresh patterns that might help." <br/><em>MCP: <code>search_by_date_range</code> + <code>get_related_memories</code> - Time + relationship filtering</em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                <h5 className="font-semibold mb-2 text-memory-orange">📈 Tools Used: All 5 search tools working together for precise, contextual results</h5>
                              </div>
                            </div>
                          </CollapsibleContent>
                          
                          <p className="text-xs text-muted-foreground mt-2">
                            <em>Multi-dimensional search combining tags, semantic similarity, temporal filters, and relationships</em>
                          </p>
                        </div>
                      </Collapsible>

                      {/* Connect Ideas → Discover Relationships & Insights */}
                      <Collapsible open={openExamples['connect-ideas']} onOpenChange={() => toggleExample('connect-ideas')}>
                        <div className="border-2 border-memory-orange/30 rounded-lg p-4 bg-card">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Brain className="w-5 h-5 text-memory-orange" />
                              <h4 className="font-semibold">Connect Ideas → Discover Relationships & Insights</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <CollapsibleTrigger asChild>
                                <Button size="sm" variant="ghost" className="gap-1">
                                  <ChevronDown className={`w-4 h-4 transition-transform ${openExamples['connect-ideas'] ? 'rotate-180' : ''}`} />
                                  {openExamples['connect-ideas'] ? 'Hide' : 'Show'} Full Interaction
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                          </div>
                          
                          <div className="bg-muted p-3 rounded-md border border-border mb-3">
                            <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                              Agent finds hidden connections across your knowledge domains and time. From pattern recognition to meta-strategy identification...
                            </pre>
                          </div>
                          
                          <CollapsibleContent>
                            <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-blue">💬 Working on Database Optimization</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "I feel like I've solved similar performance problems before"
                                  </div>
                                  <div className="bg-blue-950/20 p-2 rounded border border-blue-700/30">
                                    <strong>Agent:</strong> "Let me find connections in your knowledge..." <br/><em>MCP: <code>discover_relationships</code> - Finds hidden patterns across your memories</em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-green">✨ Discovered Connections</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-green-950/20 p-2 rounded border border-green-700/30">
                                    <strong>Agent:</strong> "Found 5 relationships! Your database indexing work 'builds_on' API caching patterns from last month. Both follow 'selective data loading' principle." <br/><em>MCP: <code>map_memory_graph</code> + <code>create_relationship</code> - Visualizes knowledge connections</em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-purple">🚀 Strategic Pattern Recognition</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "What patterns do you see in my problem-solving approach?"
                                  </div>
                                  <div className="bg-purple-950/20 p-2 rounded border border-purple-700/30">
                                    <strong>Agent:</strong> "Fascinating! You consistently solve performance through 'selective access' - database indexes, API field filtering, CDN edge caching. This is your signature strategy." <br/><em>MCP: <code>analyze_memories</code> + <code>get_related_memories</code> - Finds meta-patterns in thinking</em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                <h5 className="font-semibold mb-2 text-memory-orange">📈 Tools Used: 6 relationship tools that reveal hidden connections in your knowledge</h5>
                              </div>
                            </div>
                          </CollapsibleContent>
                          
                          <p className="text-xs text-muted-foreground mt-2">
                            <em>AI discovers your thinking patterns and strategic approaches across all domains</em>
                          </p>
                        </div>
                      </Collapsible>

                      {/* See Learning Journey → Knowledge Gaps & Learning */}
                      <Collapsible open={openExamples['learning-journey']} onOpenChange={() => toggleExample('learning-journey')}>
                        <div className="border-2 border-memory-purple/30 rounded-lg p-4 bg-card">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <LucideBrainCircuit className="w-5 h-5 text-memory-purple" />
                              <h4 className="font-semibold">See Learning Journey → Knowledge Gaps & Learning</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <CollapsibleTrigger asChild>
                                <Button size="sm" variant="ghost" className="gap-1">
                                  <ChevronDown className={`w-4 h-4 transition-transform ${openExamples['learning-journey'] ? 'rotate-180' : ''}`} />
                                  {openExamples['learning-journey'] ? 'Hide' : 'Show'} Full Interaction
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                          </div>
                          
                          <div className="bg-muted p-3 rounded-md border border-border mb-3">
                            <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                              Agent identifies knowledge gaps and guides learning with AI analysis tools. From gap detection to personalized learning paths...
                            </pre>
                          </div>
                          
                          <CollapsibleContent>
                            <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-blue">💬 Learning Assessment Request</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "I feel like I'm missing something important in my React knowledge"
                                  </div>
                                  <div className="bg-blue-950/20 p-2 rounded border border-blue-700/30">
                                    <strong>Agent:</strong> "Let me analyze your learning patterns..." <br/><em>MCP: <code>detect_knowledge_gaps</code> + <code>track_learning_progression</code> - Scans memories for missing concepts</em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-green">✨ Gap Analysis Results</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-green-950/20 p-2 rounded border border-green-700/30">
                                    <strong>Agent:</strong> "You know state and props well, but haven't explored: useCallback, useMemo, React.memo for performance. Also missing: error boundaries and custom hooks patterns." <br/><em>MCP: <code>analyze_temporal_patterns</code> - Shows learning progression over time</em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-purple">🚀 Guided Learning Path</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "What should I learn next and how should I organize it?"
                                  </div>
                                  <div className="bg-purple-950/20 p-2 rounded border border-purple-700/30">
                                    <strong>Agent:</strong> "Based on your current projects, start with useCallback. I'll create a React Performance category to track your progress and organize related concepts." <br/><em>MCP: <code>create_category</code> + <code>categorize_memory</code> - Organizes learning by topic</em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                <h5 className="font-semibold mb-2 text-memory-orange">📈 Tools Used: 7 AI-powered analysis tools that understand and guide your learning patterns</h5>
                              </div>
                            </div>
                          </CollapsibleContent>
                          
                          <p className="text-xs text-muted-foreground mt-2">
                            <em>Personalized learning guidance based on your actual knowledge patterns and project needs</em>
                          </p>
                        </div>
                      </Collapsible>

                    </div>
                  </div>


                  {/* Setup Reference */}
                  <div className="bg-muted/20 p-6 rounded-lg border border-memory-blue/30">
                    <h4 className="font-semibold text-memory-blue mb-3">🚀 Ready to Experience Collaborative Intelligence?</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      All setup and configuration details are covered in the sections above. Choose your preferred path:
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <a href="#quick-start" className="text-memory-blue hover:underline font-medium">📚 Quick Start</a>
                        <p className="text-xs text-muted-foreground">2-minute zero-config setup</p>
                      </div>
                      <div>
                        <a href="#agent-setup" className="text-memory-blue hover:underline font-medium">🤖 Agent Setup</a>
                        <p className="text-xs text-muted-foreground">Let AI handle installation</p>
                      </div>
                      <div>
                        <a href="#api-reference" className="text-memory-blue hover:underline font-medium">⚙️ API Reference</a>
                        <p className="text-xs text-muted-foreground">26 tools + REST endpoints</p>
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
                    Join our <a href="https://discord.gg/pjVX4BWu" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord</a> community for 
                    support and discussion, or check our comprehensive <a href="/docs" className="text-memory-blue hover:underline">documentation</a> for detailed setup instructions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Ready to give your AI permanent memory?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/payment">
                <Button variant="hero" size="lg" className="gap-2">
                  Purchase <em>Local Memory</em>
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" size="lg" className="gap-2">
                  View Documentation
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