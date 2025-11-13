import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Shield, Globe, Settings, Wrench, Key, ChevronDown, Database, Search, Brain, LucideBrainCircuit, Workflow, HelpCircle, Puzzle, Handshake, FileDown, Magnet, Hand, Sidebar, MapPin, Map, HandHelpingIcon, Link2, Link2Icon, LucideHandshake, HandHelping, HandHeart, HandMetal, HandCoins, Headset, Phone, Group, LucideGroup, WholeWord, Binary, Hexagon, LockOpen, Eye, ScanEye, ScanFace } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Performance from "@/components/Performance";
import ScrollToTop from "@/components/ScrollToTop";
import { Handle } from "vaul";
import { Head } from "react-day-picker";
import { DatabaseSync } from "node:sqlite";
import { handleStripePayment } from "@/lib/payment";

const FeaturesPage = () => {
  const [openExamples, setOpenExamples] = useState<{[key: string]: boolean}>({});
  
  const toggleExample = (exampleId: string) => {
    setOpenExamples(prev => ({
      ...prev,
      [exampleId]: !prev[exampleId]
    }));
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-background py-8 lg:pt-10 lg:pb-4">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-2">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              <em>Local Memory</em> Features
            </h1>
            <p className="text-xl text-muted-foreground">
              Every explanation, correction, and domain insight becomes part of your AI's permanent intelligence. 
              You are building a knowledge system that amplifies your unique expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Key Elements Section */}
      <section className="bg-background py-8 lg:pt-4 lg:pb-12">
        <div className="container max-w-4xl mx-auto px-6">

          {/* Key Elements */}
          <Card className="mb-0 border-memory-green/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-memory-blue" />
                Key Elements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-memory-white mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Native MCP Integration</h4>
                        <p className="text-sm text-muted-foreground">8 tools for Claude Desktop & Code</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-memory-white mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Universal REST API</h4>
                        <p className="text-sm text-muted-foreground">27 endpoints for any platform</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-memory-white mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">AI-Powered Search</h4>
                      <p className="text-sm text-muted-foreground">Semantic search with Ollama integration</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-memory-white mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Vector Search</h4>
                      <p className="text-sm text-muted-foreground">Qdrant integration with SQLite fallback</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-memory-white mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Temporal Analysis</h4>
                      <p className="text-sm text-muted-foreground">Learning progression tracking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-memory-white mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Privacy First</h4>
                      <p className="text-sm text-muted-foreground">All data stays on your machine</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-memory-white mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Future-Proof Design</h4>
                      <p className="text-sm text-muted-foreground">Works with emerging MCP agents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-memory-white mt-1 text-lg">•</span>
                    <div>
                      <h4 className="font-semibold">Cross-Platform</h4>
                      <p className="text-sm text-muted-foreground">Single binary deployment</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Platform Compatibility Section */}
      <section className="bg-slate-900 py-4 lg:pt-4 lg:pb-6">
        <div className="container max-w-4xl mx-auto px-6">
          <Card className="mb-0 bg-transparent border-none">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-500" />
                <CardTitle className="text-xl text-white">Universal AI Memory Platform</CardTitle>
              </div>
              <CardDescription className="text-gray-300"><em>Local Memory</em> is designed for both modern MCP-enabled agents and traditional AI platforms.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-400 flex items-center gap-2">
                    MCP-Enabled Agents (Native Integration)
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Claude Code</strong> — Setup with 'claude mcp'</li>
                      <li>• <strong>Claude Desktop</strong> — Setup with config file</li>
                      <li>• <strong>Future MCP Agents</strong> — Automatic compatibility</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      <em>All AI agents store, retrieve, and analyze shared contextual memories effortlessly.</em>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-400 flex items-center gap-2">
                    Traditional AI Platforms (REST API)
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>OpenCode</strong> — Uses REST & JSON-RPC</li>
                      <li>• <strong>GPT & Others</strong> — Connects via REST</li>
                      <li>• <strong>Your Custom Setup</strong> — Uses REST or JSON-RPC</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                       <em>Connect once and give all AI agents instant access to shared memories and context.</em>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-800/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-white">How Is This Transformational for Agentic Workflows?</h4>
                <p className="text-sm text-gray-300">
                  Think of it like this: Most memory tools are like USB drives that only work with one computer at a time, at that moment. <em>Local Memory</em> is like cloud storage that works with all of your agents, except it stays private on your machine.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="bg-background py-8 lg:py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <Card className="mb-0 border-memory-muted/30">
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
                  <div className="w-6 h-6 rounded-full bg-memory-orange/20 text-memory-orange flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Copy our setup instructions</h4>
                    <p className="text-sm text-muted-foreground">(we provide everything)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-memory-purple/20 text-memory-purple flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Paste into your AI assistant</h4>
                    <p className="text-sm text-muted-foreground">(Claude, ChatGPT, etc.)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-memory-pink/20 text-memory-pink flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold">Your AI installs everything</h4>
                    <p className="text-sm text-muted-foreground">(it handles all of the technical stuff)</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-800/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Could Transforming Every AI Agent Really Be This Simple?</h4>
                <p className="text-sm text-muted-foreground">
                  No coding, simple terminal commands, no confusion. Deliver exponentially better outcomes even when switching between AI agents, all of which will have seamless access to contextual memories.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Performance Benchmarks Section */}
      <section className="bg-slate-900 py-4 lg:pt-4 lg:pb-6">
        <div className="container max-w-4xl mx-auto px-6">
          <Performance />
        </div>
      </section>

      {/* Technical Architecture Section */}
      <section className="bg-background py-2 lg:pt-12 lg:pb-14">
        <div className="container max-w-4xl mx-auto px-6">
          <Card className="mb-0">
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
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
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
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm"><strong>Temporal Analysis</strong></p>
                          <p className="text-xs text-muted-foreground">Tracks learning patterns over time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-400/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Why Does This Matter?</h4>
                  <p className="text-sm text-muted-foreground">
                    The AI landscape is rapidly evolving. While older platforms rely on manual API integration, 
                    new MCP-enabled agents can discover and use tools automatically. <em>Local Memory</em> bridges this gap, 
                    ensuring your memory system works seamlessly regardless of which AI platform you choose today, tomorrow, or the next day.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Agent Collaboration Scenarios Section */}
      <section className="bg-slate-900 pt-2 lg:pb-4 lg:pt-4">
        <div className="container max-w-4xl mx-auto px-6">
          <Card className="mb-0 bg-transparent border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Workflow className="w-5 h-5 text-memory-blue" />
                Agent Collaboration Scenarios
              </CardTitle>
              <CardDescription className="text-gray-300">
                Below are real agent conversations showing how <em>Local Memory</em> transforms AI from stateless helpers into learning and evolving collaborators. Click to see full interactions.
              </CardDescription>
            </CardHeader>
              <CardContent>
                <div className="mb-2">

                  {/* Agent Collaboration Scenarios */}
                  <div className="mb-2">              
                    <div className="space-y-6">

                      {/* Store Insights → Performance Optimization */}
                      <Collapsible open={openExamples['store-insights']} onOpenChange={() => toggleExample('store-insights')}>
                        <div className="border-2 border-memory-green/30 rounded-lg p-4 bg-card">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                            <div className="flex items-center gap-2">
                              <Database className="w-5 h-5 text-memory-green" />
                              <h4 className="font-semibold">Store Insights → Performance Optimization</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <CollapsibleTrigger asChild>
                                <Button size="sm" variant="ghost" className="gap-1 bg-memory-green/5 border border-memory-green/20 hover:bg-memory-green/10 hover:border-memory-green/40 hover:text-foreground">
                                  <ChevronDown className={`w-4 h-4 transition-transform ${openExamples['store-insights'] ? 'rotate-180' : ''}`} />
                                  <span className="hidden sm:inline">{openExamples['store-insights'] ? 'Hide' : 'Show'} Full Interaction</span>
                                  <span className="sm:hidden">{openExamples['store-insights'] ? 'Hide' : 'Show'}</span>
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                          </div>
                          
                          <div className="bg-muted p-3 rounded-md border border-border mb-3">
                            <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                              An agent investigates slow searches, documents findings, discovers Qdrant optimization, then applies accumulated knowledge to design high-performance bulk operations. Four months of learning compressed into expertise...
                            </pre>
                          </div>
                          
                          <CollapsibleContent>
                            <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-blue">Month 1 - Initial Performance Investigation</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "Search is taking 5-10 seconds per query. Investigate this issue, identify root causes, document your findings, and recommended a solution."
                                  </div>
                                  <div className="bg-blue-950/20 p-2 rounded border border-blue-700/30 break-words overflow-hidden">
                                    <strong>Agent:</strong> "I'll investigate the search performance issue. First, let me profile the current system and document baseline metrics so we can track improvements over time. Based on initial analysis, SQLite queries are averaging ~100ms, but there's significant overhead in the semantic embedding pipeline. I'm documenting these findings and recommending we explore vector database optimization." <br/><em>MCP: <code className="break-all">store_memory</code> - <strong>Performance baseline and investigation findings</strong></em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-green">Month 2 - Major Performance Breakthrough</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "Just tested Qdrant integration - we're getting sub-10ms search times! This is exactly what we needed."
                                  </div>
                                  <div className="bg-green-950/20 p-2 rounded border border-green-700/30 break-words overflow-hidden">
                                    <strong>Agent:</strong> "Excellent! This is a 50x improvement over our baseline measurements from last month. I'm connecting this breakthrough to our earlier performance investigation - the vector database approach we discussed is proving highly effective. This validates our hypothesis about the embedding pipeline bottleneck. I'll document this success and the implementation details for future optimization projects." <br/><em>MCP: <code className="break-all">store_memory</code> + <code className="break-all">create_relationship</code> - <strong>Links breakthrough to previous investigation</strong></em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-purple">Month 4 - Applying Accumulated Expertise</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "We need to migrate 50,000 memories from our legacy system. What's the best approach for bulk operations at this scale?"
                                  </div>
                                  <div className="bg-purple-950/20 p-2 rounded border border-purple-700/30 break-words overflow-hidden">
                                    <strong>Agent:</strong> "Perfect timing to apply everything we've learned! Based on our performance optimization work from months 1-2, I know Qdrant can handle this scale efficiently. I'll design a batched import strategy using the same vector optimization principles that gave us our 50x speed improvement. From our previous investigations, I recommend 1000-record batches with parallel embedding generation. This should achieve around 30K+ memories/second based on our established performance patterns." <br/><em>MCP: <code className="break-all">track_learning_progression</code> + <code className="break-all">analyze_memories</code> - <strong>Applies months of accumulated performance knowledge</strong></em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                <h5 className="font-semibold mb-2 text-memory-orange">Result: Agent evolves from basic problem-solver to performance optimization expert</h5>
                                <p className="text-xs text-muted-foreground">Multiple unified MCP tools worked behind the scenes to store, connect, and apply insights across months of collaboration.</p>
                              </div>
                            </div>
                          </CollapsibleContent>
                          
                          <p className="text-xs text-muted-foreground mt-2">
                            <em>AI agent evolves from basic investigation to performance optimization expertise through persistent memory.</em>
                          </p>
                        </div>
                      </Collapsible>

                      {/* Find Relevant Context → Search & Tag Discovery */}
                      <Collapsible open={openExamples['find-context']} onOpenChange={() => toggleExample('find-context')}>
                        <div className="border-2 border-memory-orange/30 rounded-lg p-4 bg-card">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                            <div className="flex items-center gap-2">
                              <Search className="w-5 h-5 text-memory-orange" />
                              <h4 className="font-semibold">Find Relevant Context → Search & Tag Discovery</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <CollapsibleTrigger asChild>
                                <Button size="sm" variant="ghost" className="gap-1 bg-memory-orange/5 border border-memory-orange/20 hover:bg-memory-orange/10 hover:border-memory-orange/40 hover:text-foreground">
                                  <ChevronDown className={`w-4 h-4 transition-transform ${openExamples['find-context'] ? 'rotate-180' : ''}`} />
                                  <span className="hidden sm:inline">{openExamples['find-context'] ? 'Hide' : 'Show'} Full Interaction</span>
                                  <span className="sm:hidden">{openExamples['find-context'] ? 'Hide' : 'Show'}</span>
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                          </div>
                          
                          <div className="bg-muted p-3 rounded-md border border-border mb-3">
                            <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                              Agent conducts comprehensive security audit, categorizes 15 vulnerabilities, then discovers critical PII-authentication patterns hidden across 6 months of data. Multi-dimensional search reveals connections impossible to find manually...
                            </pre>
                          </div>
                          
                          <CollapsibleContent>
                            <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-blue">Security Vulnerability Assessment Request</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "Scan the codebase for security vulnerabilities specifically focused on, but not restricted to, user data and PII."
                                  </div>
                                  <div className="bg-blue-950/20 p-2 rounded border border-blue-700/30 break-words overflow-hidden">
                                    <strong>Agent:</strong> "I'll conduct a comprehensive security audit using multiple search strategies. Let me search for vulnerability patterns in our documented security reviews, plus any PII handling concerns from previous projects. I'm also checking for related authentication weaknesses and data exposure risks we've encountered before." <br/><em>MCP: <code className="break-all">search_memories</code> + <code className="break-all">search_by_tags</code> - <strong>Semantic search for vulnerabilities + tag-based categorization</strong></em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-green">Security Audit Findings</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-green-950/20 p-2 rounded border border-green-700/30 break-words overflow-hidden">
                                    <strong>Agent:</strong> "Found 15 security-related memories across multiple categories: **PII Exposure** (4 incidents - user email logging, unencrypted session data), **Authentication Bypass** (3 cases - JWT validation issues, OAuth state parameter vulnerabilities), **Data Leakage** (5 findings - API response oversharing, debug endpoint exposure), **Input Validation** (3 SQL injection and XSS prevention patterns). I'm also finding related memories about GDPR compliance gaps from our previous audits." <br/><em>MCP: <code className="break-all">get_related_memories</code> + <code className="break-all">analyze_memories</code> - <strong>Cross-references vulnerability patterns</strong></em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-purple">Advanced Pattern Analysis</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "Focus on the PII vulnerabilities from the last 6 months and show me any patterns with our user authentication flows."
                                  </div>
                                  <div className="bg-purple-950/20 p-2 rounded border border-purple-700/30 break-words overflow-hidden">
                                    <strong>Agent:</strong> "Critical pattern discovered! 3 recent PII exposures (Jan-June 2025) all connect to authentication flow weaknesses: session tokens containing user emails, password reset flows logging personal data, and OAuth callbacks exposing profile information in error responses. I'm mapping relationships between these incidents - they share a common vulnerability pattern around user data serialization in authentication contexts." <br/><em>MCP: <code className="break-all">search_by_date_range</code> + <code className="break-all">discover_relationships</code> + <code className="break-all">map_memory_graph</code> - <strong>Temporal filtering with relationship mapping</strong></em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                <h5 className="font-semibold mb-2 text-memory-orange">Result: AI discovers critical security patterns across time and domains</h5>
                                <p className="text-xs text-muted-foreground">Unified MCP search and analysis tools revealed hidden vulnerability connections and provided actionable insights.</p>
                              </div>
                            </div>
                          </CollapsibleContent>
                          
                          <p className="text-xs text-muted-foreground mt-2">
                            <em>Sophisticated AI security analysis finds patterns and connections across time, domains, and vulnerability types.</em>
                          </p>
                        </div>
                      </Collapsible>

                      {/* Connect Ideas → Discover Relationships & Insights */}
                      <Collapsible open={openExamples['connect-ideas']} onOpenChange={() => toggleExample('connect-ideas')}>
                        <div className="border-2 border-memory-purple/30 rounded-lg p-4 bg-card">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                            <div className="flex items-center gap-2">
                              <Puzzle className="w-5 h-5 text-memory-purple" />
                              <h4 className="font-semibold">Connect Ideas → Discover Relationships & Insights</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <CollapsibleTrigger asChild>
                                <Button size="sm" variant="ghost" className="gap-1 bg-memory-purple/5 border border-memory-purple/20 hover:bg-memory-purple/10 hover:border-memory-purple/40 hover:text-foreground">
                                  <ChevronDown className={`w-4 h-4 transition-transform ${openExamples['connect-ideas'] ? 'rotate-180' : ''}`} />
                                  <span className="hidden sm:inline">{openExamples['connect-ideas'] ? 'Hide' : 'Show'} Full Interaction</span>
                                  <span className="sm:hidden">{openExamples['connect-ideas'] ? 'Hide' : 'Show'}</span>
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                          </div>
                          
                          <div className="bg-muted p-3 rounded-md border border-border mb-3">
                            <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                              Agent discovers cross-agent knowledge and suggests workflow enhancements based on other agents' previous implementations...
                            </pre>
                          </div>
                          
                          <CollapsibleContent>
                            <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-blue">S3 Security Infrastructure Issue</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "I found a critical security flaw in our S3 secure download implementation. We need to completely redesign our approach to ensure downloads are properly secured, and implement automation so that new builds trigger secure uploads to S3 with fresh download links."
                                  </div>
                                  <div className="bg-blue-950/20 p-2 rounded border border-blue-700/30 break-words overflow-hidden">
                                    <strong>Agent:</strong> "This is a significant infrastructure challenge. Let me search our knowledge base for related CI/CD automation work and security implementations. I'll also check for any existing S3 upload strategies or GitHub Actions workflows from previous projects." <br/><em>MCP: <code className="break-all">search_memories</code> + <code className="break-all">search_by_tags</code> - <strong>Searches across all domain knowledge</strong></em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-green">Cross-Agent Discovery</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-green-950/20 p-2 rounded border border-green-700/30 break-words overflow-hidden">
                                    <strong>Agent:</strong> "Excellent discovery! I found memories from the **GoLang agent** who already implemented a comprehensive GitHub Actions workflow with S3 integration. They built a 3-phase system: **Enhanced GitHub Actions → Cross-Repository Automation → Production Reliability**. The workflow includes ZIP packaging, AWS OIDC authentication, time-windowed uploads, and cross-repo dispatch notifications. This solves exactly the automation challenge you're facing!" <br/><em>MCP: <code className="break-all">get_related_memories</code> + <code className="break-all">discover_relationships</code> - <strong>Finds cross-agent implementations</strong></em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-purple">Workflow Enhancement Strategy</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "Can we enhance their workflow to automatically notify our webapp when new binaries are available?"
                                  </div>
                                  <div className="bg-purple-950/20 p-2 rounded border border-purple-700/30 break-words overflow-hidden">
                                    <strong>Agent:</strong> "Perfect enhancement! Based on the GoLang agent's implementation, I recommend adding a **repository dispatch trigger** to their existing workflow. When GoLang builds complete and upload to S3, it dispatches to the webapp repository, triggering our `.github/workflows/update-binaries.yml` to generate fresh secure download URLs. This creates a seamless automation pipeline: **GoLang build → S3 upload → webapp notification → secure link generation → customer access**." <br/><em>MCP: <code className="break-all">map_memory_graph</code> + <code className="break-all">analyze_memories</code> - <strong>Connects implementations across agents</strong></em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                <h5 className="font-semibold mb-2 text-memory-orange">Result: Cross-agent knowledge connection enables complete automation redesign</h5>
                                <p className="text-xs text-muted-foreground">Unified MCP relationship and analysis tools reveal how **GoLang agent's** existing work solves webapp's security and automation challenges.</p>
                              </div>
                            </div>
                          </CollapsibleContent>
                          
                          <p className="text-xs text-muted-foreground mt-2">
                            <em>Cross-agent memory finds and connects implementations from different agents to solve complex infrastructure challenges.</em>
                          </p>
                        </div>
                      </Collapsible>

                      {/* See Learning Journey → Knowledge Gaps & Learning */}
                      <Collapsible open={openExamples['learning-journey']} onOpenChange={() => toggleExample('learning-journey')}>
                        <div className="border-2 border-memory-pink/30 rounded-lg p-4 bg-card">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                            <div className="flex items-center gap-2">
                              <Brain className="w-5 h-5 text-memory-pink" />
                              <h4 className="font-semibold">See Learning Journey → Knowledge Gaps & Learning</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <CollapsibleTrigger asChild>
                                <Button size="sm" variant="ghost" className="gap-1 bg-memory-pink/5 border border-memory-pink/20 hover:bg-memory-pink/10 hover:border-memory-pink/40 hover:text-foreground">
                                  <ChevronDown className={`w-4 h-4 transition-transform ${openExamples['learning-journey'] ? 'rotate-180' : ''}`} />
                                  <span className="hidden sm:inline">{openExamples['learning-journey'] ? 'Hide' : 'Show'} Full Interaction</span>
                                  <span className="sm:hidden">{openExamples['learning-journey'] ? 'Hide' : 'Show'}</span>
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                          </div>
                          
                          <div className="bg-muted p-3 rounded-md border border-border mb-3">
                            <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                              Track real learning progression from prototype to production. See how expertise builds over months of development...
                            </pre>
                          </div>
                          
                          <CollapsibleContent>
                            <div className="bg-background border rounded-lg p-4 max-h-96 overflow-y-auto">
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-blue">Learning Assessment Request</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "I built this prototype in TypeScript; but after using it and getting user feedback, I decided to refactor the entire platform in GoLang. Through this process, I've learned about modern memory management, vector databases, semantic search, MCP solution architecture, and AI integration. Help me understand what knowledge I've gained and where I still have gaps."
                                  </div>
                                  <div className="bg-blue-950/20 p-2 rounded border border-blue-700/30 break-words overflow-hidden">
                                    <strong>Agent:</strong> "Fascinating journey! Let me analyze your learning progression from the TypeScript prototype through the GoLang refactor..." <br/><em>MCP: <code className="break-all">detect_knowledge_gaps</code> + <code className="break-all">track_learning_progression</code> - <strong>Analyzes months of development memories</strong></em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-green">Month 1-2: Foundation Building</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-green-950/20 p-2 rounded border border-green-700/30 break-words overflow-hidden">
                                    <strong>Agent:</strong> "**Month 1**: You started with TypeScript prototype knowledge, then learned Go fundamentals and cross-compilation challenges. **Month 2**: Major breakthrough with CGO issues and dependency management - you discovered modernc.org/sqlite as a pure Go solution." <br/><em>MCP: <code className="break-all">analyze_temporal_patterns</code> - <strong>Identifies learning milestones and breakthrough moments</strong></em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <h5 className="font-semibold mb-2 text-memory-purple">Month 3-4: Advanced Architecture</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="bg-background p-2 rounded">
                                    <strong>You:</strong> "What advanced concepts have I actually mastered, and what gaps remain?"
                                  </div>
                                  <div className="bg-purple-950/20 p-2 rounded border border-purple-700/30 break-words overflow-hidden">
                                    <strong>Agent:</strong> "**Month 3**: You mastered vector databases - transitioned from FAISS research to production Qdrant implementation with 10ms search latency. **Month 4**: Advanced to MCP protocol architecture, 26-tool implementation, and GitHub Actions automation. **Knowledge Gap**: You haven't explored distributed systems scaling or Kubernetes deployment patterns yet." <br/><em>MCP: <code className="break-all">create_category</code> + <code className="break-all">categorize_memory</code> - <strong>Auto-organizes by Vector DB, MCP Architecture, DevOps domains</strong></em>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                <h5 className="font-semibold mb-2 text-memory-orange">Result: Expert Assessment - You've progressed from TypeScript developer to GoLang systems architect with production AI integration expertise.</h5>
                                <p className="text-xs text-muted-foreground">Unified MCP analysis and temporal tracking tools worked together to track and categorize your learning journey over 4 months.</p>
                              </div>
                            </div>
                          </CollapsibleContent>
                          
                          <p className="text-xs text-muted-foreground mt-2">
                            <em>Real learning progression tracks from prototype to production, showing actual expertise building over months of development work.</em>
                          </p>
                        </div>
                      </Collapsible>

                    </div>
                  </div>

                </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-background py-8 lg:pt-6 lg:pb-2">
        <div className="container max-w-4xl mx-auto px-6">
          <Card className="mb-0 bg-background border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-memory-blue" />
                Support & Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Join our <a href="https://discord.gg/rMmn8xP3fZ" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord Community</a> for
                    support and discussion, or check out our comprehensive <a href="/docs" className="text-memory-blue hover:underline">documentation</a> for detailed setup instructions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
          
      {/* CTA Section */}
      <section className="bg-slate-900 py-8 lg:pt-10 lg:pb-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-300 mb-4">Ready to give your AI permanent memory?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

                <Button onClick={handleStripePayment} variant="hero" className="w-full sm:w-auto" size="lg">
                  Purchase <em>Local Memory</em>
                </Button>

              <Link to="/docs">
                <Button variant="outline" size="lg" className="gap-2">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default FeaturesPage;