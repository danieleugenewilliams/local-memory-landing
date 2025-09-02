import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Bot, Settings, Globe, Terminal, Plug, Apple, Dot } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostPurchaseAgentSetup from "@/components/PostPurchaseAgentSetup";
import ScrollToTop from "@/components/ScrollToTop";
import { handleStripePayment } from "@/lib/payment";

const DocsPage = () => {
  // Troubleshooting data for responsive layout
  const troubleshootingItems = [
    {
      challenge: "Command not found",
      resolution: "Ensure binary is in PATH or use relative path",
      command: "> ./local-memory"
    },
    {
      challenge: "Ollama not detected",
      resolution: "Install Ollama from official website",
      command: 'Visit ollama.ai',
      isLink: true,
      linkUrl: "https://ollama.ai"
    },
    {
      challenge: "macOS security warning",
      resolution: "Right-click binary → \"Open\" or remove quarantine",
      command: "> xattr -rd com.apple.quarantine /path/to/local-memory"
    },
    {
      challenge: "MCP tools not appearing",
      resolution: "Restart Claude Desktop after adding MCP server",
      command: "Restart application"
    },
    {
      challenge: "Memory not persisting",
      resolution: "Check database path and permissions",
      command: "> local-memory status"
    },
    {
      challenge: "Browser download warning",
      resolution: "Browser may display warning about downloads of zip files containing multiple executables",
      command: "Dismiss the warning or download your platform-specific file"
    },
    {
      challenge: "Can't get past 'local-memory start'",
      resolution: "Local Memory requires you to agree to Terms & Conditions when 'local-memory start' is run for the first time",
      command: "Agree to the terms by entering 'Y' to continue and start Local Memory"
    },
    {
      challenge: "Success page timeout/lost license key",
      resolution: "Download window expires after 30 minutes. If you had not copied your license key immediately after payment, contact Local Memory for support.",
      command: "Check Discord #support and message admin to request help.",
      isLink: true,
      linkUrl: "https://discord.gg/rMmn8xP3fZ",
      linkText: "Discord #support"
    },
    {
      challenge: "Success page timeout/lost downloads",
      resolution: "Download window expires after 30 minutes. If you had not downloaded your software immediately after payment, run the npm install command.",
      command: "> npm install -g local-memory-mcp"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Section 1: Header - Light Background */}
      <section className="py-8 lg:pt-12 lg:pb-0 bg-slate-900">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4 scroll-target" id="documentation">
              <em>Local Memory</em> Documentation
            </h1>
            <p className="text-xl text-muted-foreground">
              Here's the complete installation and user guide for <em>Local Memory</em>.</p>
          </div>
        </div>
      </section>

      {/* Section 2: Quick Navigation - Dark Background */}
      <section className="py-8 lg:pt-10 lg:pb-14 bg-slate-900">
        <div className="container max-w-2xl mx-auto px-6">
          {/* Quick Navigation */}
          <Card className="mb-0 bg-slate-800/50 border-slate-600">
            <CardHeader>
              <CardTitle className="text-xl text-white">Shortcuts</CardTitle>
              <CardDescription className="text-gray-300">Jump to the section you need.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Getting Started</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#quick-start" className="block text-memory-blue hover:underline">• Quick Start</a>
                    <a href="#agent-setup" className="block text-memory-blue hover:underline">• Agent Setup Prompts</a>
                    <a href="#manual-setup" className="block text-memory-blue hover:underline">• Advanced Setup</a>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Usage</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#api-reference" className="block text-memory-blue hover:underline">• API Documentation</a>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Resources</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#troubleshooting" className="block text-memory-blue hover:underline">• Troubleshooting</a>
                    <a href="#community" className="block text-memory-blue hover:underline">• Community</a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 3: Install & Setup - Light Background */}
      <section className="py-8 lg:pt-12 lg:pb-2 bg-background">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Install & Setup */}
          <div className="mb-2">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Easy Install & Setup</h2>

            {/* Quick Start (NEW - Primary Path) */}
            <div id="quick-start" className="mb-12 scroll-target">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Plug className="w-8 h-8 text-memory-green" />
                  <h3 className="text-2xl font-bold text-foreground">Quick Start</h3>
                  <span className="bg-memory-green/20 text-memory-green px-3 py-1 rounded-full text-sm font-medium">2 Minutes to Install</span>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Download, start, and connect to any AI agent with zero-config setup.
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-6">
                {/* Step 1: Confirm Purchase */}
                <div className="border-l-4 border-memory-orange pl-4">
                  <h4 className="font-semibold text-lg mb-2">Step 1: Confirm Purchase and Download</h4>
                  <p className="text-muted-foreground mb-3">If you haven't already, get <em>Local Memory</em> below, and download to your machine.</p>
                  <div className="bg-muted p-3 rounded-md">
                    <Button onClick={handleStripePayment} variant="hero" size="lg" className="gap-2">
                      Purchase <em>Local Memory</em>
                    </Button>
                  </div>
                </div>

                {/* Step 2: Start */}
                <div className="border-l-4 border-memory-purple pl-4">
                  <h4 className="font-semibold text-lg mb-2">Step 2: Start Local Memory</h4>
                  <p className="text-muted-foreground mb-3">Copy, paste, and run the command below.</p>
                  <div className="bg-muted p-3 rounded-md w-full max-w-full overflow-hidden">
                    <code className="text-sm bg-background px-2 py-1 rounded block mb-2 w-full max-w-full break-words overflow-wrap-anywhere">
                      &gt; local-memory start
                    </code>
                    <p className="mt-2 text-xs text-muted-foreground mb-2">
                      <em>Auto-detects Ollama and Qdrant, and configures everything automatically</em>
                    </p>
                  </div>
                </div>

                {/* Step 3: Connect */}
                <div className="border-l-4 border-memory-pink pl-4">
                  <h4 className="font-semibold text-lg mb-2">Step 3: Connect Your AI Agent</h4>
                  <p className="text-muted-foreground mb-3">Run the command below to configure <em>Local Memory</em> in Claude Code, or have your agent connect to the REST API.</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted p-3 rounded-md">
                      <h5 className="font-semibold text-sm mb-2">Claude Code:</h5>
                      <code className="text-xs bg-background px-2 py-1 rounded block w-full max-w-full break-words overflow-wrap-anywhere">
                        &gt; claude mcp add local-memory /path/to/local-memory --mcp
                      </code>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <h5 className="font-semibold text-sm mb-2">REST API:</h5>
                      <code className="text-xs bg-background px-2 py-1 rounded block w-full max-w-full break-words overflow-wrap-anywhere">
                        &gt; curl http://localhost:3002/api/v1/health
                      </code>
                    </div>
                  </div>
                </div>

                {/* Step 4: Success */}
                <div className="border-l-4 border-memory-blue pl-4">
                  <h4 className="font-semibold text-lg mb-2">Step 4: You're Done!</h4>
                  <p className="text-muted-foreground mb-3">Your AI agent now has access to shared, persistent memory.</p>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Give a go! Try asking your AI agent to "remember this conversation" or use any of the 26 available <a target="_blank"href="/docs#api-reference" className="text-memory-blue hover:underline">memory tools</a>.
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-muted/20 p-4 rounded border border-memory-yellow/30">
                  <h5 className="font-semibold mb-3 text-memory-yellow">💡 <strong>Pro Tip:</strong> Add instructions to use <em>Local Memory</em> in your agent files.</h5>
                  <p className="text-sm text-muted-foreground mb-3">Copy and paste this section into your agent files like CLAUDE.md, AGENTS.md, or .github/copilot-instructions.md:</p>
                  <div className="bg-background p-3 rounded-md">
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap w-full max-w-full break-words overflow-wrap-anywhere">
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

          </div>
        </div>
      </section>

      {/* Section 4: Agent Setup Prompts - Dark Background */}
      <section className="py-8 lg:pt-14 lg:pb-8 bg-slate-900">
        <div className="container max-w-4xl mx-auto px-6">
          <div id="agent-setup" className="mb-0 scroll-target">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Bot className="w-8 h-8 text-memory-orange" />
                <h3 className="text-2xl font-bold text-white">Agent Setup Prompts</h3>
                <span className="bg-memory-orange/20 text-memory-orange px-3 py-1 rounded-full text-sm font-medium">Alternative Method</span>
              </div>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Prefer having your AI agent handle the setup? After downloading <em>Local Memory</em>, copy our detailed prompts 
                and let your AI assistant handle the complete installation and configuration.
              </p>
            </div>

            <PostPurchaseAgentSetup />
          </div>
        </div>
      </section>

      {/* Section 5: Advanced Setup - Light Background */}
      <section className="py-8 lg:pt-14 lg:pb-2 bg-background">
        <div className="container max-w-4xl mx-auto px-6">

            {/* Advanced Setup */}
            <div id="manual-setup" className="mb-12 scroll-target">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Settings className="w-8 h-8 text-memory-purple" />
                  <h3 className="text-2xl font-bold text-foreground">Advanced Setup</h3>
                <span className="bg-memory-purple/20 text-memory-purple px-3 py-1 rounded-full text-sm font-medium">Custom Configurations</span>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  This is for developers who need custom configurations or for those who want to understand the underlying setup process.
                </p>
              </div>

              {/* Installation Steps */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Installation Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Step 1 */}
                  <div className="border-l-4 border-pink-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2">Step 1: Purchase and Download <em>Local Memory</em></h4>
                    <p className="text-muted-foreground mb-3">If you haven't already, get <em>Local Memory</em> below, and download to your machine.</p>
                    <div className="bg-muted p-3 rounded-md">
                      <Button onClick={handleStripePayment} variant="hero" size="lg" className="gap-2">
                        Purchase <em>Local Memory</em>
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-3">After downloading, copy and paste your OS-specific binary into your preferred location:</p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm mb-2"><strong>macOS/Linux:</strong></p>
                      <code className="text-sm bg-background px-2 py-1 rounded block w-full max-w-full break-words overflow-wrap-anywhere">
                        &gt; chmod +x local-memory && mv local-memory /path/to/your/preferred/location
                      </code>
                      <p className="text-sm mt-3 mb-2"><strong>Windows:</strong></p>
                      <code className="text-sm bg-background px-2 py-1 rounded block w-full max-w-full break-words overflow-wrap-anywhere">
                        &gt; mv local-memory.exe
                      </code>
                      <div className="mt-2 p-2 bg-none border-none border-yellow-700/30 rounded text-xs">
                        <p className="text-yellow-500 font-medium mb-1">macOS users:</p>
                        <p className="text-yellow-500">Before running the above command, first run: <code className="bg-yellow-800/30 px-1 rounded text-yellow-500 break-words overflow-wrap-anywhere">&gt; xattr -rd com.apple.quarantine ~/Downloads/local-memory-macos-*</code></p>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground mb-2">
                        <em>&nbsp; Move to /path/to/your/preferred/location, then add to PATH variable.</em>
                      </p>
                    </div>
                  </div>

                  {/* Step 2 - Dependencies */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2">Step 2: Install Recommended Features</h4>
                    <p className="text-muted-foreground mb-3">Install Ollama.</p>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm mb-2"><strong>macOS/Linux:</strong></p>
                      <code className="text-sm bg-background px-2 py-1 rounded block w-full max-w-full break-words overflow-wrap-anywhere">
                        &gt; curl -fsSL https://ollama.ai/install.sh | sh
                      </code>
                      <p className="text-sm mt-3 mb-2"><strong>Windows:</strong></p>
                      <p className="text-sm text-muted-foreground mb-3">Download from <a href="https://ollama.ai" className="text-blue-500 hover:underline" target="_blank">ollama.ai</a></p>

                      <p className="text-sm mb-2"><strong>Pull required model:</strong></p>
                      <code className="text-sm bg-background px-2 py-1 rounded block w-full max-w-full break-words overflow-wrap-anywhere">
                        &gt; ollama pull nomic-embed-text
                      </code>
                    </div>

                    <div className="mt-4 bg-muted/20 p-4 rounded border border-memory-yellow/30">
                      <h5 className="font-semibold mb-3 text-memory-yellow">💡 <strong>Pro Tip:</strong> Use Qdrant for lightning-fast search performance</h5>
                      <p className="text-sm text-muted-foreground mb-3">Setting up Qdrant with <em>Local Memory</em> dramatically improves search speed from ~100ms to &lt;10ms. This is especially valuable for large memory databases and frequent semantic searches.</p>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div>• <strong>Instant Results:</strong> Sub-10ms semantic search across thousands of memories</div>
                        <div>• <strong>Auto-Detection:</strong> Local Memory automatically detects and uses Qdrant when available</div>
                        <div>• <strong>Graceful Fallback:</strong> Falls back to SQLite if Qdrant is unavailable</div>
                        <div>• <strong>Zero Config:</strong> Works out-of-the-box with default Qdrant settings</div>
                        <div>• Run these commands to download, configure, and start Qdrant:</div>
                      </div>
                      <div className="mt-2 space-y-1 ml-4">
                        <code className="text-xs bg-background px-2 py-1 rounded block w-full max-w-full break-words overflow-wrap-anywhere">
                          &gt; curl -L https://github.com/qdrant/qdrant/releases/latest/download/qdrant-x86_64-apple-darwin.tar.gz -o qdrant.tar.gz
                        </code>
                        <code className="text-xs bg-background px-2 py-1 rounded block w-full max-w-full break-words overflow-wrap-anywhere">
                          &gt; tar -xzf qdrant.tar.gz && chmod +x qdrant && mkdir -p ~/.local-memory && mv qdrant ~/.local-memory/
                        </code>
                        <code className="text-xs bg-background px-2 py-1 rounded block w-full max-w-full break-words overflow-wrap-anywhere">
                          &gt; cd ~/.local-memory && ./qdrant &
                        </code>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        For power users: Qdrant enables advanced vector operations and scales to millions of memories with consistent performance.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 - Integration */}
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2">Step 3: Connect to Your AI Editor</h4>
                    <p className="text-muted-foreground mb-3">Add 'local-memory' to your preferred AI editor:</p>
                    
                    {/* Primary: Claude Code */}
                    <div className="bg-muted-950/20 p-3 rounded border border-muted-700/30 mb-4">
                      <h5 className="text-muted-300 font-medium mb-2">Claude Code:</h5>
                      <code className="text-sm bg-background px-2 py-1 rounded block w-full max-w-full break-words overflow-wrap-anywhere">&gt; claude mcp add local-memory -- /usr/local/bin/local-memory --mcp</code>
                      <p className="text-xs text-muted-foreground mt-2"><em>Automatically detects and configures Claude Code</em></p>
                    </div>

                    {/* MCP Integration */}
                    <div className="bg-muted p-3 rounded-md mb-4">
                      <p className="text-muted-300 font-medium mb-3">MCP Integration (Other Editors)</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Claude Desktop:</p>
                          <p className="text-xs text-muted-foreground mb-1">~/.claude_desktop_config.json:</p>
                          <div className="text-xs font-mono bg-background p-2 rounded w-full max-w-full overflow-x-auto">
                            <div>&#123;</div>
                            <div>&nbsp;&nbsp;"mcpServers": &#123;</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;"local-memory": &#123;</div>
                            <div className="break-words overflow-wrap-anywhere">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"command": "/usr/local/bin/local-memory",</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"args": ["--mcp"]</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                            <div>&nbsp;&nbsp;&#125;</div>
                            <div>&#125;</div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">VS Code (Copilot):</p>
                          <p className="text-xs text-muted-foreground mb-1">.vscode/mcp.json:</p>
                          <div className="text-xs font-mono bg-background p-2 rounded w-full max-w-full overflow-x-auto">
                            <div>&#123;</div>
                            <div>&nbsp;&nbsp;"servers": &#123;</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;"local-memory": &#123;</div>
                            <div className="break-words overflow-wrap-anywhere">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"command": "/usr/local/bin/local-memory",</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"args": ["--mcp"]</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                            <div>&nbsp;&nbsp;&#125;</div>
                            <div>&#125;</div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Cursor:</p>
                          <p className="text-xs text-muted-foreground mb-1">.cursor/mcp.json:</p>
                          <div className="text-xs font-mono bg-background p-2 rounded w-full max-w-full overflow-x-auto">
                            <div>&#123;</div>
                            <div>&nbsp;&nbsp;"servers": &#123;</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;"local-memory": &#123;</div>
                            <div className="break-words overflow-wrap-anywhere">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"command": "/usr/local/bin/local-memory",</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"args": ["--mcp"]</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                            <div>&nbsp;&nbsp;&#125;</div>
                            <div>&#125;</div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium">Windsurf:</p>
                          <p className="text-xs text-muted-foreground mb-1">Settings &gt; MCP Configuration:</p>
                          <div className="text-xs font-mono bg-background p-2 rounded w-full max-w-full overflow-x-auto">
                            <div>&#123;</div>
                            <div>&nbsp;&nbsp;"mcpServers": &#123;</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;"local-memory": &#123;</div>
                            <div className="break-words overflow-wrap-anywhere">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"command": "/usr/local/bin/local-memory"</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"args": ["--mcp"]</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                            <div>&nbsp;&nbsp;&#125;</div>
                            <div>&#125;</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Alternative: REST API - Collapsible */}
                    <div className="bg-muted p-3 rounded-md mb-4">
                      <p className="text-muted-300 font-medium mb-3">
                        REST API (non-MCP)
                      </p>
                      <div className="mt-3">
                        <code className="text-xs bg-background px-2 py-1 rounded block w-full max-w-full break-words overflow-wrap-anywhere">
                          &gt; /path/to/local-memory start
                        </code>
                      </div>
                    </div>

                  </div>

                  {/* Step 4 - Verify */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2">Step 4: Test Installation</h4>
                    <p className="text-muted-foreground mb-3">Run these commands to verify installation and configuration of <em>Local Memory</em>:</p>
                    
                    <div className="bg-muted p-3 rounded-md space-y-3">
                      <div>
                        <p className="text-sm font-medium">MCP Integration:</p>
                        <code className="text-xs bg-background px-2 py-1 rounded block mb-1 w-full max-w-full break-words overflow-wrap-anywhere">
                          &gt; claude mcp list
                        </code>
                        <p className="text-xs text-muted-foreground">Expectation: "local-memory: /path/to/local-memory - ✓ Connected"</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">REST API:</p>
                        <code className="text-xs bg-background px-2 py-1 rounded block mb-1 w-full max-w-full break-words overflow-wrap-anywhere">
                          &gt; curl http://localhost:3002/api/v1/health
                        </code>
                        <p className="text-xs text-muted-foreground">Expectation: &#123;"success": true, "data": &#123;"session": "your-coding-session", "status": "healthy", "timestamp": "2025-08-21T18:14:15Z"&#125;, "message": "Server is healthy"&#125;</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
        </div>
      </section>

      {/* Section 6: API Reference - Dark Background */}
      <section className="py-8 lg:pt-12 lg:pb-8 bg-slate-900">
        <div className="container max-w-4xl mx-auto px-6">
          <div id="api-reference" className="mb-0 scroll-target">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">API Documentation</h2>

            {/* MCP Protocol */}
            <div id="mcp-reference" className="scroll-target" />
            <Card className="mb-6 bg-slate-800/50 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  MCP Protocol (26 Tools)
                </CardTitle>
                <CardDescription className="text-gray-300"><em>Local Memory</em> has native integration with Claude, other MCP agents, and AI editors.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-purple">Memory Operations (4)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>store_memory</div>
                        <div>update_memory</div>
                        <div>delete_memory</div>
                        <div>get_memory_by_id</div>
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-purple">Search Operations (3)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>search_memories</div>
                        <div>search_by_tags</div>
                        <div>search_by_date_range</div>
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-pink">AI Analysis (3)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>ask_question</div>
                        <div>analyze_memories</div>
                        <div>summarize_memories</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-pink">Temporal Analysis (3)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>analyze_temporal_patterns</div>
                        <div>track_learning_progression</div>
                        <div>detect_knowledge_gaps</div>
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-yellow">Relationships (4)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>get_related_memories</div>
                        <div>discover_relationships</div>
                        <div>create_relationship</div>
                        <div>map_memory_graph</div>
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="font-semibold mb-2 text-memory-blue">Categorization (4)</h6>
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
                      <h6 className="font-semibold mb-2 text-memory-blue">Management (3)</h6>
                      <div className="space-y-1 font-mono text-xs">
                        <div>list_sessions</div>
                        <div>create_domain</div>
                        <div>list_domains</div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </CardContent>
            </Card>

            {/* REST API */}
            <Card className="mb-6 bg-slate-800/50 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  REST API (25 Endpoints)
                </CardTitle>
                <CardDescription className="text-gray-300 mt-2">
                  <em>Local Memory</em> has a universal REST API interface for any platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-2 font-mono text-white font-semibold mb-3">Base URL: http://localhost:3002/api/v1</div>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-purple">Memory Operations (4)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>POST /memories</div>
                        <div>PUT /memories/:id</div>
                        <div>DELETE /memories/:id</div>
                        <div>GET /memories/:id</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-purple">Search Operations (3)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>GET /memories/search</div>
                        <div>POST /search/tags</div>
                        <div>POST /search/date-range</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-pink">AI Analysis (2)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>POST /ask</div>
                        <div>POST /analyze</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-pink">Temporal Analysis (3)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>POST /temporal/patterns</div>
                        <div>POST /temporal/progression</div>
                        <div>POST /temporal/gaps</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-yellow">Relationships (4)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>GET /memories/:id/related</div>
                        <div>POST /relationships/discover</div>
                        <div>POST /relationships</div>
                        <div>GET /memories/:id/graph</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-blue">Categorization (4)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>POST /categories</div>
                        <div>POST /memories/:id/categorize</div>
                        <div>GET /categories</div>
                        <div>GET /categories/stats</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-blue">Statistics (2)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>GET /memories/stats</div>
                        <div>GET /domains/:domain/stats</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2 text-memory-blue">Management (3)</h5>
                      <div className="space-y-1 font-mono text-xs">
                        <div>POST /domains</div>
                        <div>GET /sessions</div>
                        <div>GET /health</div>
                      </div>
                    </div>
                  </div>
                </div>
                

              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Section 7: Troubleshooting - Light Background */}
      <section className="py-8 lg:pt-14 lg:pb-2 bg-background">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Help & Community</h2>

            {/* Troubleshooting */}
            <Card id="troubleshooting" className="mb-8 scroll-target border border-memory-green">
              <CardHeader>
                <CardTitle>Troubleshooting</CardTitle>
                <CardDescription>Here are some common concerns and remedies.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Desktop Table Layout */}
                <div className="hidden md:block">
                  <div className="overflow-x-auto w-full max-w-full">
                    <table className="w-full border-collapse border border-border min-w-full">
                      <colgroup>
                        <col className="w-1/4 min-w-32" />
                        <col className="w-1/2 min-w-48" />
                        <col className="w-1/4 min-w-32" />
                      </colgroup>
                      <thead>
                        <tr className="border-b-2 border-border bg-muted/30">
                          <th className="text-left py-2 px-3 font-semibold border-r border-border">Challenge</th>
                          <th className="text-left py-2 px-3 font-semibold border-r border-border">Resolution</th>
                          <th className="text-left py-2 px-3 font-semibold">Command/Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {troubleshootingItems.map((item, index) => (
                          <tr key={index} className="border-b border-border">
                            <td className="py-2 px-3 text-muted-foreground border-r border-border">{item.challenge}</td>
                            <td className="py-2 px-3 text-muted-foreground border-r border-border">
                              {item.resolution.includes('Local Memory') ? (
                                <span>{item.resolution.replace('Local Memory', '')}<em>Local Memory</em>{item.resolution.split('Local Memory')[1] || ''}</span>
                              ) : (
                                item.resolution
                              )}
                            </td>
                            <td className="py-2 px-3 pl-4 -indent-4">
                              <code className="bg-background px-2 py-1 rounded text-xs text-muted-foreground break-words overflow-wrap-anywhere">
                                {item.isLink ? (
                                  item.linkText ? (
                                    <>Check <a href={item.linkUrl} className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">{item.linkText}</a> and message admin to request help.</>
                                  ) : (
                                    <>Visit <a href={item.linkUrl} className="text-memory-blue hover:underline" target="_blank">{item.linkUrl.replace('https://', '')}</a></>
                                  )
                                ) : (
                                  item.command.includes('Local Memory') ? (
                                    <span>{item.command.replace('Local Memory', '')}<em>Local Memory</em></span>
                                  ) : (
                                    item.command
                                  )
                                )}
                              </code>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Card Layout */}
                <div className="block md:hidden space-y-4">
                  {troubleshootingItems.map((item, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 bg-muted/10">
                      <h4 className="font-semibold text-foreground mb-2">{item.challenge}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.resolution.includes('Local Memory') ? (
                          <span>{item.resolution.replace('Local Memory', '')}<em>Local Memory</em>{item.resolution.split('Local Memory')[1] || ''}</span>
                        ) : (
                          item.resolution
                        )}
                      </p>
                      <div className="bg-background border rounded p-2">
                        <code className="text-xs text-foreground break-words overflow-wrap-anywhere">
                          {item.isLink ? (
                            item.linkText ? (
                              <>Check <a href={item.linkUrl} className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">{item.linkText}</a> and message admin to request help.</>
                            ) : (
                              <>Visit <a href={item.linkUrl} className="text-memory-blue hover:underline" target="_blank">{item.linkUrl.replace('https://', '')}</a></>
                            )
                          ) : (
                            item.command.includes('Local Memory') ? (
                              <span>{item.command.replace('Local Memory', '')}<em>Local Memory</em></span>
                            ) : (
                              item.command
                            )
                          )}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Section 8: Community - Dark Background */}
      <section className="py-8 lg:pt-14 lg:pb-0 bg-slate-900">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Community */}
          <Card id="community" className="mb-0 scroll-target bg-slate-800/50 border-orange-600">
            <CardHeader>
              <CardTitle className="text-white">Support & Community</CardTitle>
              <CardDescription className="text-gray-300">Get help and connect with other users.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <ul className="space-y-2 text-sm list-disc pl-5 text-gray-300">
                    <li><strong>Documentation</strong>: This page covers most use cases</li>
                    <li><strong><a href="https://discord.gg/rMmn8xP3fZ" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord Community</a></strong>: Live support and discussion</li>
                    <li><strong className="text-white">Bug Reports:</strong> Share bug reports on Discord #bug-reports</li>
                    <li><strong className="text-white">Feature Requests:</strong> Share ideas on Discord #feature-requests</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 9: Final CTA - Light Background */}
      <section className="py-8 lg:pt-14 lg:pb-14 bg-slate-900">
        <div className="container max-w-4xl mx-auto px-6">
          
          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Need to purchase <em>Local Memory</em>?</p>
            <Button onClick={handleStripePayment} variant="hero" size="lg" className="gap-2">
              Purchase <em>Local Memory</em>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default DocsPage;