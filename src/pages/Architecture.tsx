import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Server,
  Building,
  Database,
  Lock,
  CheckCircle,
  AlertTriangle,
  Layers,
  Code2,
  FileCheck,
  Eye,
  Package,
  Key,
  Activity,
  Cpu,
  Network,
  ArrowRight
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const ArchitecturePage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="py-8 lg:pt-12 lg:pb-12 bg-slate-900 overflow-x-hidden">
        <div className="container max-w-4xl mx-auto px-6 min-w-0">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Local Memory Architecture
            </h1>
            <p className="text-xl text-gray-300">
              Local-first AI agent memory with enterprise security and comprehensive system design
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Diagram Section */}
      <section className="py-8 lg:pt-14 lg:pb-8 bg-background overflow-x-hidden">
        <div className="container max-w-4xl mx-auto px-6 min-w-0">
          <Card className="mb-8 border border-memory-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-memory-blue" />
                System Architecture Overview
              </CardTitle>
              <CardDescription>
                5-layer architecture with 8 MCP tools and complete local processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-center">
                  <img
                    src="/images/system-architecture.png"
                    alt="Local Memory System Architecture"
                    className="max-w-full h-auto rounded-lg border border-border"
                  />
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-memory-blue mb-1">5</div>
                    <div className="text-sm text-muted-foreground">Architecture Layers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-memory-green mb-1">8</div>
                    <div className="text-sm text-muted-foreground">MCP Tools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-memory-purple mb-1">0</div>
                    <div className="text-sm text-muted-foreground">External Data Transfer</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-8 lg:pt-10 lg:pb-14 bg-slate-900 overflow-x-hidden">
        <div className="container max-w-2xl mx-auto px-6 min-w-0">
          <Card className="mb-0 bg-slate-800/50 border-slate-600">
            <CardHeader>
              <CardTitle className="text-xl text-white">Architecture Navigation</CardTitle>
              <CardDescription className="text-gray-300">Jump to the section you need.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">System Details</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#system-overview" className="block text-memory-blue hover:underline">• System Overview</a>
                    <a href="#security" className="block text-memory-blue hover:underline">• Security Architecture</a>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Implementation</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#developers" className="block text-memory-blue hover:underline">• For Developers</a>
                    <a href="#enterprise" className="block text-memory-blue hover:underline">• For Enterprise</a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* System Overview Section */}
      <section className="py-8 lg:pt-14 lg:pb-8 bg-background overflow-x-hidden">
        <div className="container max-w-4xl mx-auto px-6 min-w-0">
          <h2 className="text-3xl font-bold mb-8 scroll-target" id="system-overview">
            System Overview
          </h2>

          <div className="space-y-6">
            <div className="grid gap-6">
                <Card className="border border-memory-green">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="w-5 h-5 text-memory-green" />
                      Architecture Layers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        <div className="border-l-4 border-memory-blue pl-4">
                          <h4 className="font-semibold">External Clients Layer</h4>
                          <p className="text-sm text-muted-foreground">MCP Clients (Claude Code, Cursor, VSCode), REST API Clients, CLI Users, Web Interface (Future)</p>
                        </div>
                        <div className="border-l-4 border-memory-orange pl-4">
                          <h4 className="font-semibold">Entry Points Layer</h4>
                          <p className="text-sm text-muted-foreground">Single binary with intelligent mode detection (MCP/CLI/API), JSON-RPC over stdio, HTTP server on localhost:3002</p>
                        </div>
                        <div className="border-l-4 border-memory-purple pl-4">
                          <h4 className="font-semibold">MCP Tools Layer (8 Total)</h4>
                          <p className="text-sm text-muted-foreground">4 Core Memory Operations + 7 Unified Tools for search, analysis, relationships, stats, categories, domains, sessions</p>
                        </div>
                        <div className="border-l-4 border-memory-green pl-4">
                          <h4 className="font-semibold">Services Layer</h4>
                          <p className="text-sm text-muted-foreground">8 services with dependency injection: Manager, Memory, Vector, Analysis, Ollama, Qdrant, License, Setup</p>
                        </div>
                        <div className="border-l-4 border-memory-pink pl-4">
                          <h4 className="font-semibold">Storage Layer</h4>
                          <p className="text-sm text-muted-foreground">SQLite primary database, optional Qdrant vector database, configuration files, license storage</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-memory-purple">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-memory-purple" />
                      Core Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 min-w-0">
                      <div className="space-y-3 min-w-0">
                        <div className="flex items-start gap-3 min-w-0">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <div className="min-w-0">
                            <h4 className="font-semibold">Dual Protocol Support</h4>
                            <p className="text-sm text-muted-foreground">MCP (JSON-RPC over stdio) + REST API (HTTP endpoints)</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Vector Embeddings</h4>
                            <p className="text-sm text-muted-foreground">Semantic search with local AI models via Ollama</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Session Management</h4>
                            <p className="text-sm text-muted-foreground">Cross-session knowledge sharing with proper isolation</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3 min-w-0">
                        <div className="flex items-start gap-3 min-w-0">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <div className="min-w-0">
                            <h4 className="font-semibold">Temporal Analysis</h4>
                            <p className="text-sm text-muted-foreground">Learning progression tracking and pattern detection</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Token Optimization</h4>
                            <p className="text-sm text-muted-foreground">Response format controls for efficient processing</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Clean Architecture</h4>
                            <p className="text-sm text-muted-foreground">Dependency injection and modular service design</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-8 lg:pt-14 lg:pb-8 bg-slate-900 overflow-x-hidden">
        <div className="container max-w-4xl mx-auto px-6 min-w-0">
          <h2 className="text-3xl font-bold mb-8 scroll-target" id="security">
            Security Architecture
          </h2>

          <div className="space-y-6">
            <div className="grid gap-6">
                <Card className="border border-memory-orange">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-memory-orange" />
                      Security Architecture
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-green-800/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          Zero-Privilege Design
                        </h4>
                        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 text-sm">
                          <div className="break-words">• No sudo/administrator rights needed</div>
                          <div className="break-words">• No system service installation</div>
                          <div className="break-words">• No background daemon registration</div>
                          <div className="break-words">• Runs entirely in user space</div>
                          <div className="break-words">• No system-wide configuration changes</div>
                          <div className="break-words">• Containerization ready</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Required Permissions & Access</h4>

                        {/* Desktop Table */}
                        <div className="overflow-x-auto hidden md:block">
                          <table className="w-full text-sm border-collapse border border-border">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left p-3 border-r border-border">Permission Type</th>
                                <th className="text-left p-3 border-r border-border">Access Level</th>
                                <th className="text-left p-3">Justification</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="p-3 border-r border-border font-medium">File System</td>
                                <td className="p-3 border-r border-border break-words">Read/write to ~/.local-memory/ only</td>
                                <td className="p-3">Database storage and configuration</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="p-3 border-r border-border font-medium">Network</td>
                                <td className="p-3 border-r border-border break-words">Optional localhost binding (port 3002)</td>
                                <td className="p-3">REST API server for integrations</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="p-3 border-r border-border font-medium">Process</td>
                                <td className="p-3 border-r border-border break-words">Standard user process</td>
                                <td className="p-3">No system services or background daemons</td>
                              </tr>
                              <tr>
                                <td className="p-3 border-r border-border font-medium">Resources</td>
                                <td className="p-3 border-r border-border break-words">Standard memory/CPU allocation</td>
                                <td className="p-3">No special resource requirements</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="block md:hidden space-y-4">
                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">File System</h5>
                            <p className="text-sm text-muted-foreground mb-3 break-words overflow-wrap-anywhere">Read/write to ~/.local-memory/ only</p>
                            <div className="bg-background border rounded p-2">
                              <p className="text-xs text-muted-foreground">Database storage and configuration</p>
                            </div>
                          </div>

                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">Network</h5>
                            <p className="text-sm text-muted-foreground mb-3 break-words overflow-wrap-anywhere">Optional localhost binding (port 3002)</p>
                            <div className="bg-background border rounded p-2">
                              <p className="text-xs text-muted-foreground">REST API server for integrations</p>
                            </div>
                          </div>

                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">Process</h5>
                            <p className="text-sm text-muted-foreground mb-3 break-words overflow-wrap-anywhere">Standard user process</p>
                            <div className="bg-background border rounded p-2">
                              <p className="text-xs text-muted-foreground">No system services or background daemons</p>
                            </div>
                          </div>

                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">Resources</h5>
                            <p className="text-sm text-muted-foreground mb-3 break-words overflow-wrap-anywhere">Standard memory/CPU allocation</p>
                            <div className="bg-background border rounded p-2">
                              <p className="text-xs text-muted-foreground">No special resource requirements</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-memory-green">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-memory-green" />
                      System & Process Boundaries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Process Isolation</h4>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-3 min-w-0">
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold break-words">Single User-Space Process</h5>
                                <p className="text-sm text-muted-foreground break-words">No system-level privileges required</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold break-words">Designated Directory</h5>
                                <p className="text-sm text-muted-foreground break-all overflow-wrap-anywhere">All operations confined to ~/.local-memory/</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold break-words">No System Modifications</h5>
                                <p className="text-sm text-muted-foreground break-words">No kernel modules, drivers, or system services</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3 min-w-0">
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold break-words">Network Isolation</h5>
                                <p className="text-sm text-muted-foreground break-words">Communication limited to localhost interfaces</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold break-words">Clean Lifecycle</h5>
                                <p className="text-sm text-muted-foreground break-words">Graceful shutdown with proper resource cleanup</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold break-words">Container Compatible</h5>
                                <p className="text-sm text-muted-foreground break-words">Fully compatible with Docker/container isolation</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-800/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3">Boundary Enforcement</h4>
                        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 text-sm">
                          <div className="break-words">• File system access limited to application directory</div>
                          <div className="break-words">• Runs under invoking user's standard permissions</div>
                          <div className="break-words">• No access to system directories or other user data</div>
                          <div className="break-words">• No privileged operations or escalations</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-memory-blue">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="w-5 h-5 text-memory-blue" />
                      Secrets & Credential Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-green-800/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          No Built-in Secrets Required
                        </h4>
                        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 text-sm">
                          <div className="break-words overflow-wrap-anywhere">• No cloud API keys needed</div>
                          <div className="break-words">• No external authentication required</div>
                          <div className="break-words">• No network credentials needed</div>
                          <div className="break-words">• Core functionality works completely offline</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Optional External Service Integration</h4>

                        {/* Desktop Table */}
                        <div className="overflow-x-auto hidden md:block">
                          <table className="w-full text-sm border-collapse border border-border">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left p-3 border-r border-border">Service</th>
                                <th className="text-left p-3 border-r border-border">Credential Type</th>
                                <th className="text-left p-3 border-r border-border">Storage</th>
                                <th className="text-left p-3">Purpose</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="p-3 border-r border-border font-medium">Ollama</td>
                                <td className="p-3 border-r border-border break-words">None required</td>
                                <td className="p-3 border-r border-border break-words">N/A</td>
                                <td className="p-3">Local AI models (no authentication)</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="p-3 border-r border-border font-medium">Qdrant</td>
                                <td className="p-3 border-r border-border break-words">None required</td>
                                <td className="p-3 border-r border-border break-words">N/A</td>
                                <td className="p-3">Local vector database (no authentication)</td>
                              </tr>
                              <tr>
                                <td className="p-3 border-r border-border font-medium">License Key</td>
                                <td className="p-3 border-r border-border break-words">Format: LM-XXXX-XXXX-...</td>
                                <td className="p-3 border-r border-border break-words overflow-wrap-anywhere">~/.local-memory/license.json</td>
                                <td className="p-3">License validation/activation</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="block md:hidden space-y-4">
                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">Ollama</h5>
                            <div className="space-y-2 min-w-0">
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Credential Type</span>
                                <p className="text-sm text-foreground">None required</p>
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Storage</span>
                                <p className="text-sm text-foreground">N/A</p>
                              </div>
                              <div className="bg-background border rounded p-2">
                                <p className="text-xs text-muted-foreground">Local AI models (no authentication)</p>
                              </div>
                            </div>
                          </div>

                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">Qdrant</h5>
                            <div className="space-y-2 min-w-0">
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Credential Type</span>
                                <p className="text-sm text-foreground">None required</p>
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Storage</span>
                                <p className="text-sm text-foreground">N/A</p>
                              </div>
                              <div className="bg-background border rounded p-2">
                                <p className="text-xs text-muted-foreground">Local vector database (no authentication)</p>
                              </div>
                            </div>
                          </div>

                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">License Key</h5>
                            <div className="space-y-2 min-w-0">
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Credential Type</span>
                                <p className="text-sm text-foreground break-words overflow-wrap-anywhere">Format: LM-XXXX-XXXX-...</p>
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Storage</span>
                                <p className="text-sm text-foreground break-words overflow-wrap-anywhere">~/.local-memory/license.json</p>
                              </div>
                              <div className="bg-background border rounded p-2">
                                <p className="text-xs text-muted-foreground">License validation/activation</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">License Key Security</h4>
                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 min-w-0">
                          <div className="flex items-start gap-3">
                            <Lock className="w-5 h-5 text-green-500 mt-0.5" />
                            <div className="min-w-0">
                              <h5 className="font-semibold break-words">Local Storage Only</h5>
                              <p className="text-sm text-muted-foreground break-words">License keys stored locally, never transmitted</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Lock className="w-5 h-5 text-green-500 mt-0.5" />
                            <div className="min-w-0">
                              <h5 className="font-semibold break-words">Cryptographic Validation</h5>
                              <p className="text-sm text-muted-foreground break-words">Format validation without network calls</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-memory-purple">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-memory-purple" />
                      Supply Chain Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-green-800/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          Minimal Dependency Profile
                        </h4>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-memory-purple mb-2">47</div>
                          <div className="text-sm text-muted-foreground break-words">Go modules (significantly lower than typical)</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Core Dependencies</h4>
                        <div className="space-y-3">
                          <div className="border-l-4 border-memory-green pl-4">
                            <h5 className="font-semibold break-words">Database Layer</h5>
                            <p className="text-sm text-muted-foreground break-words">SQLite (CGO & Pure Go) - Mature, widely audited drivers</p>
                          </div>
                          <div className="border-l-4 border-memory-blue pl-4">
                            <h5 className="font-semibold break-words">CLI Framework</h5>
                            <p className="text-sm text-muted-foreground break-words">Cobra & Viper - Industry-standard configuration management</p>
                          </div>
                          <div className="border-l-4 border-memory-orange pl-4">
                            <h5 className="font-semibold break-words">Core Utilities</h5>
                            <p className="text-sm text-muted-foreground break-words">Zap logging, Google UUID - Google-maintained libraries</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Supply Chain Protection Measures</h4>
                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 min-w-0">
                          <div className="space-y-3 min-w-0">
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Version Pinning</h5>
                                <p className="text-sm text-muted-foreground">All dependencies locked to specific versions</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Cryptographic Verification</h5>
                                <p className="text-sm text-muted-foreground">Go module checksums verified automatically</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Regular Updates</h5>
                                <p className="text-sm text-muted-foreground">Security patch monitoring and updates</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3 min-w-0">
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Controlled Build Environment</h5>
                                <p className="text-sm text-muted-foreground">Reproducible builds in isolated environments</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Dependency Auditing</h5>
                                <p className="text-sm text-muted-foreground">Regular security scans of third-party libraries</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Minimal Attack Surface</h5>
                                <p className="text-sm text-muted-foreground">Fewer dependencies = reduced risk exposure</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-memory-pink">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="w-5 h-5 text-memory-pink" />
                      Data Flow & Privacy Architecture
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-blue-800/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3">Local-First Architecture</h4>
                        <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
                          <span className="break-words">User Input</span>
                          <ArrowRight className="w-4 h-4 hidden sm:inline" />
                          <span className="break-words">Local Validation</span>
                          <ArrowRight className="w-4 h-4 hidden sm:inline" />
                          <span className="break-words">Local Processing</span>
                          <ArrowRight className="w-4 h-4 hidden sm:inline" />
                          <span className="break-words">Local Storage</span>
                          <ArrowRight className="w-4 h-4 hidden sm:inline" />
                          <span className="break-words">User Output</span>
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-3 break-words">Complete data sovereignty with no external transmission</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Privacy Guarantees</h4>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-3 min-w-0">
                            <div className="flex items-start gap-3 min-w-0">
                              <Lock className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">No Telemetry</h5>
                                <p className="text-sm text-muted-foreground">Zero usage tracking or analytics collection</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <Lock className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">No External Calls</h5>
                                <p className="text-sm text-muted-foreground">Core functionality operates completely offline</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <Lock className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Local AI Processing</h5>
                                <p className="text-sm text-muted-foreground">Optional AI via local Ollama instance only</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3 min-w-0">
                            <div className="flex items-start gap-3 min-w-0">
                              <Lock className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Complete Data Control</h5>
                                <p className="text-sm text-muted-foreground">Users maintain full ownership and portability</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <Lock className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">No Cloud Dependencies</h5>
                                <p className="text-sm text-muted-foreground">All processing happens on user's machine</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <Lock className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Air-Gap Compatible</h5>
                                <p className="text-sm text-muted-foreground">Fully functional without internet access</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Data Categories & Protection</h4>

                        {/* Desktop Table */}
                        <div className="overflow-x-auto hidden md:block">
                          <table className="w-full text-sm border-collapse border border-border">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left p-3 border-r border-border">Data Type</th>
                                <th className="text-left p-3 border-r border-border">Storage Location</th>
                                <th className="text-left p-3 border-r border-border">Encryption</th>
                                <th className="text-left p-3">Access Control</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="p-3 border-r border-border font-medium">User Memories</td>
                                <td className="p-3 border-r border-border break-words">SQLite database</td>
                                <td className="p-3 border-r border-border break-words">At-rest encryption available</td>
                                <td className="p-3">User-only access</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="p-3 border-r border-border font-medium">Vector Embeddings</td>
                                <td className="p-3 border-r border-border break-words">Local database/Qdrant</td>
                                <td className="p-3 border-r border-border break-words">Optional encryption</td>
                                <td className="p-3">User-only access</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="p-3 border-r border-border font-medium">Configuration</td>
                                <td className="p-3 border-r border-border break-words">JSON files</td>
                                <td className="p-3 border-r border-border break-words">User-configurable</td>
                                <td className="p-3">User-only access</td>
                              </tr>
                              <tr>
                                <td className="p-3 border-r border-border font-medium">Session Data</td>
                                <td className="p-3 border-r border-border break-words">SQLite database</td>
                                <td className="p-3 border-r border-border break-words">At-rest encryption available</td>
                                <td className="p-3">User-only access</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="block md:hidden space-y-4">
                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">User Memories</h5>
                            <div className="space-y-2 min-w-0">
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Storage Location</span>
                                <p className="text-sm text-foreground">SQLite database</p>
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Encryption</span>
                                <p className="text-sm text-foreground break-words">At-rest encryption available</p>
                              </div>
                              <div className="bg-background border rounded p-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Access Control</span>
                                <p className="text-xs text-muted-foreground">User-only access</p>
                              </div>
                            </div>
                          </div>

                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">Vector Embeddings</h5>
                            <div className="space-y-2 min-w-0">
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Storage Location</span>
                                <p className="text-sm text-foreground break-words">Local database/Qdrant</p>
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Encryption</span>
                                <p className="text-sm text-foreground">Optional encryption</p>
                              </div>
                              <div className="bg-background border rounded p-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Access Control</span>
                                <p className="text-xs text-muted-foreground">User-only access</p>
                              </div>
                            </div>
                          </div>

                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">Configuration</h5>
                            <div className="space-y-2 min-w-0">
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Storage Location</span>
                                <p className="text-sm text-foreground">JSON files</p>
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Encryption</span>
                                <p className="text-sm text-foreground">User-configurable</p>
                              </div>
                              <div className="bg-background border rounded p-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Access Control</span>
                                <p className="text-xs text-muted-foreground">User-only access</p>
                              </div>
                            </div>
                          </div>

                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">Session Data</h5>
                            <div className="space-y-2 min-w-0">
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Storage Location</span>
                                <p className="text-sm text-foreground">SQLite database</p>
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Encryption</span>
                                <p className="text-sm text-foreground break-words">At-rest encryption available</p>
                              </div>
                              <div className="bg-background border rounded p-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Access Control</span>
                                <p className="text-xs text-muted-foreground">User-only access</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-memory-orange">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-memory-orange" />
                      Vulnerability Management & Response
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Security Practices</h4>
                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 min-w-0">
                          <div className="space-y-3 min-w-0">
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Input Validation</h5>
                                <p className="text-sm text-muted-foreground">Comprehensive sanitization of all user inputs</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">SQL Injection Protection</h5>
                                <p className="text-sm text-muted-foreground">Prepared statements throughout database layer</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Memory Protection</h5>
                                <p className="text-sm text-muted-foreground">Content size limits prevent DoS attacks</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3 min-w-0">
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Error Handling</h5>
                                <p className="text-sm text-muted-foreground">No sensitive information leakage in errors</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">Session Isolation</h5>
                                <p className="text-sm text-muted-foreground">Multi-session support with proper data separation</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <div className="min-w-0">
                                <h5 className="font-semibold">API Rate Limiting</h5>
                                <p className="text-sm text-muted-foreground">Built-in protection against endpoint abuse</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Update & Patching Process</h4>

                        {/* Desktop Table */}
                        <div className="overflow-x-auto hidden md:block">
                          <table className="w-full text-sm border-collapse border border-border">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left p-3 border-r border-border">Update Type</th>
                                <th className="text-left p-3 border-r border-border">Response Time</th>
                                <th className="text-left p-3">Distribution Method</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="p-3 border-r border-border font-medium">Critical Security</td>
                                <td className="p-3 border-r border-border break-words">24-48 hours</td>
                                <td className="p-3">Immediate binary release</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="p-3 border-r border-border font-medium">Security Patches</td>
                                <td className="p-3 border-r border-border break-words">1 week</td>
                                <td className="p-3">Regular maintenance release</td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="p-3 border-r border-border font-medium">Feature Updates</td>
                                <td className="p-3 border-r border-border break-words">Monthly</td>
                                <td className="p-3">Scheduled release cycle</td>
                              </tr>
                              <tr>
                                <td className="p-3 border-r border-border font-medium">Dependency Updates</td>
                                <td className="p-3 border-r border-border break-words">Bi-weekly</td>
                                <td className="p-3">Automated security scanning</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="block md:hidden space-y-4">
                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">Critical Security</h5>
                            <div className="space-y-2 min-w-0">
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Response Time</span>
                                <p className="text-sm text-foreground">24-48 hours</p>
                              </div>
                              <div className="bg-background border rounded p-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Distribution Method</span>
                                <p className="text-xs text-muted-foreground">Immediate binary release</p>
                              </div>
                            </div>
                          </div>

                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">Security Patches</h5>
                            <div className="space-y-2 min-w-0">
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Response Time</span>
                                <p className="text-sm text-foreground">1 week</p>
                              </div>
                              <div className="bg-background border rounded p-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Distribution Method</span>
                                <p className="text-xs text-muted-foreground">Regular maintenance release</p>
                              </div>
                            </div>
                          </div>

                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">Feature Updates</h5>
                            <div className="space-y-2 min-w-0">
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Response Time</span>
                                <p className="text-sm text-foreground">Monthly</p>
                              </div>
                              <div className="bg-background border rounded p-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Distribution Method</span>
                                <p className="text-xs text-muted-foreground">Scheduled release cycle</p>
                              </div>
                            </div>
                          </div>

                          <div className="border border-border rounded-lg p-4 bg-muted/10">
                            <h5 className="font-semibold text-foreground mb-2">Dependency Updates</h5>
                            <div className="space-y-2 min-w-0">
                              <div className="min-w-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Response Time</span>
                                <p className="text-sm text-foreground">Bi-weekly</p>
                              </div>
                              <div className="bg-background border rounded p-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Distribution Method</span>
                                <p className="text-xs text-muted-foreground">Automated security scanning</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Monitoring & Detection</h4>
                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 min-w-0">
                          <div className="space-y-2 min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm break-words">Static analysis & code security scanning</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm break-words">Regular CVE database monitoring</span>
                            </div>
                          </div>
                          <div className="space-y-2 min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm break-words">SHA256 checksums for all releases</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm break-words">Built-in version & integrity validation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>

      {/* For Developers Section */}
      <section className="py-8 lg:pt-14 lg:pb-8 bg-background overflow-x-hidden">
        <div className="container max-w-4xl mx-auto px-6 min-w-0">
          <h2 className="text-3xl font-bold mb-8 scroll-target" id="developers">
            For Developers
          </h2>

          <div className="space-y-6">
            <div className="grid gap-6">
                <Card className="border border-memory-green">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-memory-green" />
                      MCP Integration Guide
                    </CardTitle>
                    <CardDescription>
                      Model Context Protocol enables AI agents to access Local Memory seamlessly
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-800/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">What is MCP?</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          MCP is a protocol developed by Anthropic that allows AI agents to securely connect to external data sources and tools.
                          Think of it as a standardized way for AI assistants to "remember" information across conversations.
                        </p>
                        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 text-sm">
                          <div>• Persistent memory across sessions</div>
                          <div>• Structured data access</div>
                          <div>• Security through controlled channels</div>
                          <div>• Easy integration with AI workflows</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Quick Start Integration</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-memory-green/20 text-memory-green flex items-center justify-center text-sm font-bold">1</div>
                            <div>
                              <h5 className="font-semibold">Install Local Memory</h5>
                              <code className="text-sm bg-muted px-2 py-1 rounded break-words overflow-wrap-anywhere">npm install -g local-memory-mcp</code>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-memory-orange/20 text-memory-orange flex items-center justify-center text-sm font-bold">2</div>
                            <div>
                              <h5 className="font-semibold">Start the Service</h5>
                              <code className="text-sm bg-muted px-2 py-1 rounded break-words overflow-wrap-anywhere">local-memory start</code>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-memory-purple/20 text-memory-purple flex items-center justify-center text-sm font-bold">3</div>
                            <div>
                              <h5 className="font-semibold">Configure Your AI Agent</h5>
                              <p className="text-sm text-muted-foreground">Add MCP server to your agent's configuration</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-memory-pink/20 text-memory-pink flex items-center justify-center text-sm font-bold">4</div>
                            <div>
                              <h5 className="font-semibold">Begin Storing Memories</h5>
                              <p className="text-sm text-muted-foreground">Use <code className="break-words overflow-wrap-anywhere">store_memory</code> to save important context</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-memory-purple">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-memory-purple" />
                      MCP Tool Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Memory Management (4 Core Tools)</h4>
                        <div className="bg-muted p-3 rounded-lg">
                          <code className="text-sm break-words overflow-wrap-anywhere whitespace-pre-wrap">
                            store_memory() • update_memory() • delete_memory() • get_memory_by_id()
                          </code>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Intelligent Search & Analysis (7 Unified Tools)</h4>
                        <div className="bg-muted p-3 rounded-lg">
                          <code className="text-sm break-words overflow-wrap-anywhere whitespace-pre-wrap">
                            search() • analysis() • relationships() • stats() • categories() • domains() • sessions()
                          </code>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Session Management Features</h4>
                        <div className="space-y-2 text-sm">
                          <div>• <strong>Cross-Session Access:</strong> <code className="break-words overflow-wrap-anywhere">session_filter_mode: "all"</code> - Access memories from all sessions</div>
                          <div>• <strong>Session Isolation:</strong> <code className="break-words overflow-wrap-anywhere">session_filter_mode: "session_only"</code> - Current session only</div>
                          <div>• <strong>Hybrid Mode:</strong> <code className="break-words overflow-wrap-anywhere">session_filter_mode: "session_and_shared"</code> - Current + shared memories</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>

      {/* For Enterprise Section */}
      <section className="py-8 lg:pt-14 lg:pb-8 bg-slate-900 overflow-x-hidden">
        <div className="container max-w-4xl mx-auto px-6 min-w-0">
          <h2 className="text-3xl font-bold mb-8 scroll-target" id="enterprise">
            For Enterprise
          </h2>

          <div className="space-y-6">
            <div className="grid gap-6">
                <Card className="border border-memory-orange">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-memory-orange" />
                      Enterprise Deployment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Network Security</h4>
                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 min-w-0">
                          <div className="space-y-2 min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm break-words">Default: No network exposure (CLI-only)</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm break-words">Optional API: localhost:3002 binding only</span>
                            </div>
                          </div>
                          <div className="space-y-2 min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm break-words">Firewall friendly: No inbound connections</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm break-words">Air-gap compatible: Fully offline capable</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Data Governance</h4>
                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 min-w-0">
                          <div className="space-y-2 min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm break-words">100% on-premises, user-controlled storage</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm break-words">GDPR compliant: Data never leaves user's machine</span>
                            </div>
                          </div>
                          <div className="space-y-2 min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm break-words">HIPAA compatible with additional controls</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm break-words">SOC 2 ready: Comprehensive audit trails</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-memory-pink">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-memory-pink" />
                      Compliance Framework Alignment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Desktop Table */}
                    <div className="overflow-x-auto hidden md:block">
                      <table className="w-full text-sm border-collapse border border-border">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3 border-r border-border">Framework</th>
                            <th className="text-left p-3 border-r border-border">Status</th>
                            <th className="text-left p-3">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="p-3 border-r border-border font-medium">GDPR</td>
                            <td className="p-3 border-r border-border">
                              <Badge variant="default" className="bg-green-600 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Fully Compliant
                              </Badge>
                            </td>
                            <td className="p-3">Data never leaves user control</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-3 border-r border-border font-medium">HIPAA</td>
                            <td className="p-3 border-r border-border">
                              <Badge variant="outline" className="border-orange-500 text-orange-600">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Requires Additional Controls
                              </Badge>
                            </td>
                            <td className="p-3">Encryption at rest recommended</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-3 border-r border-border font-medium">SOC 2 Type II</td>
                            <td className="p-3 border-r border-border">
                              <Badge variant="default" className="bg-green-600 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Compatible
                              </Badge>
                            </td>
                            <td className="p-3">Audit logging available</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-3 border-r border-border font-medium">ISO 27001</td>
                            <td className="p-3 border-r border-border">
                              <Badge variant="default" className="bg-green-600 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Supportive
                              </Badge>
                            </td>
                            <td className="p-3">Minimal attack surface</td>
                          </tr>
                          <tr>
                            <td className="p-3 border-r border-border font-medium break-words">NIST Cybersecurity Framework</td>
                            <td className="p-3 border-r border-border">
                              <Badge variant="default" className="bg-green-600 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Aligned
                              </Badge>
                            </td>
                            <td className="p-3">Comprehensive security controls</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="block md:hidden space-y-4">
                      <div className="border border-border rounded-lg p-4 bg-muted/10">
                        <h5 className="font-semibold text-foreground mb-3">GDPR</h5>
                        <div className="space-y-3">
                          <div>
                            <Badge variant="default" className="bg-green-600 text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Fully Compliant
                            </Badge>
                          </div>
                          <div className="bg-background border rounded p-2">
                            <p className="text-xs text-muted-foreground">Data never leaves user control</p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-border rounded-lg p-4 bg-muted/10">
                        <h5 className="font-semibold text-foreground mb-3">HIPAA</h5>
                        <div className="space-y-3">
                          <div>
                            <Badge variant="outline" className="border-orange-500 text-orange-600">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Requires Additional Controls
                            </Badge>
                          </div>
                          <div className="bg-background border rounded p-2">
                            <p className="text-xs text-muted-foreground">Encryption at rest recommended</p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-border rounded-lg p-4 bg-muted/10">
                        <h5 className="font-semibold text-foreground mb-3">SOC 2 Type II</h5>
                        <div className="space-y-3">
                          <div>
                            <Badge variant="default" className="bg-green-600 text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Compatible
                            </Badge>
                          </div>
                          <div className="bg-background border rounded p-2">
                            <p className="text-xs text-muted-foreground">Audit logging available</p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-border rounded-lg p-4 bg-muted/10">
                        <h5 className="font-semibold text-foreground mb-3">ISO 27001</h5>
                        <div className="space-y-3">
                          <div>
                            <Badge variant="default" className="bg-green-600 text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Supportive
                            </Badge>
                          </div>
                          <div className="bg-background border rounded p-2">
                            <p className="text-xs text-muted-foreground">Minimal attack surface</p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-border rounded-lg p-4 bg-muted/10">
                        <h5 className="font-semibold text-foreground mb-3 break-words overflow-wrap-anywhere">NIST Cybersecurity Framework</h5>
                        <div className="space-y-3">
                          <div>
                            <Badge variant="default" className="bg-green-600 text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Aligned
                            </Badge>
                          </div>
                          <div className="bg-background border rounded p-2">
                            <p className="text-xs text-muted-foreground">Comprehensive security controls</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-memory-green">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-memory-green" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-800/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3 text-green-400">Low Risk Profile</h4>
                        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>No network attack surface</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>No elevated privileges required</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Minimal dependency chain</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>No external data transmission</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Open source auditability</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ArchitecturePage;