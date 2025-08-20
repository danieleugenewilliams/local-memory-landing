import { Wrench } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            Persistent Knowledge Storage for AI Assistants
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Cross-session memory sharing with dual protocol support (MCP + REST) for any AI platform
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Universal Compatibility */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-memory-blue/50 transition-colors animate-fade-in">
            <div className="w-12 h-12 bg-memory-blue/20 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">Universal Compatibility</h3>
            <p className="text-muted-foreground mb-4">
              Works seamlessly with Claude Code, Claude Desktop, OpenCode, Cursor, and any custom AI agent
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-memory-blue mt-1">•</span>
                <span>MCP (Model Context Protocol) integration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memory-blue mt-1">•</span>
                <span>REST API for custom implementations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memory-blue mt-1">•</span>
                <span>Agent-assisted installation and setup</span>
              </li>
            </ul>
          </div>

          {/* Lightning Fast Search */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-memory-green/50 transition-colors animate-fade-in">
            <div className="w-12 h-12 bg-memory-green/20 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">Lightning Fast Search</h3>
            <p className="text-muted-foreground mb-4">
              Advanced vector search with multiple backend options for instant memory retrieval
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-memory-green mt-1">•</span>
                <span>Qdrant vector database with SQLite fallback</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memory-green mt-1">•</span>
                <span>Semantic similarity matching</span>
              </li>
            </ul>
          </div>

          {/* AI-Powered Intelligence */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-memory-purple/50 transition-colors animate-fade-in">
            <div className="w-12 h-12 bg-memory-purple/20 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">AI-Powered Intelligence</h3>
            <p className="text-muted-foreground mb-4">
              Smart categorization, relationship discovery, and contextual answers using Ollama
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-memory-purple mt-1">•</span>
                <span>Automatic memory categorization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memory-purple mt-1">•</span>
                <span>Intelligent question answering</span>
              </li>
            </ul>
          </div>

          {/* Temporal Analysis */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-memory-blue/50 transition-colors animate-fade-in">
            <div className="w-12 h-12 bg-memory-blue/20 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">Temporal Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Track learning progression, detect knowledge gaps, and analyze patterns over time
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-memory-blue mt-1">•</span>
                <span>Learning progression tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memory-blue mt-1">•</span>
                <span>Knowledge gap detection</span>
              </li>
            </ul>
          </div>

          {/* Privacy & Security */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-memory-green/50 transition-colors animate-fade-in">
            <div className="w-12 h-12 bg-memory-green/20 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">100% Local & Private</h3>
            <p className="text-muted-foreground mb-4">
              All data stays on your machine with no cloud dependencies or external data sharing
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-memory-green mt-1">•</span>
                <span>No internet required for core functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memory-green mt-1">•</span>
                <span>Complete data ownership</span>
              </li>
            </ul>
          </div>

          {/* Production Ready */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-memory-purple/50 transition-colors animate-fade-in">
            <div className="w-12 h-12 bg-memory-purple/20 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">Production Ready</h3>
            <p className="text-muted-foreground mb-4">
              Enterprise-grade reliability with comprehensive tooling and deployment options
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Wrench className="text-memory-purple mt-1 w-4 h-4" />
                <span>Single binary deployment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memory-purple mt-1">•</span>
                <span>26+ MCP tools for complete control</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats callout */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-memory-blue mb-2">26+</div>
              <div className="text-sm text-muted-foreground">MCP Tools</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-memory-green mb-2">7</div>
              <div className="text-sm text-muted-foreground">Tool Categories</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-memory-purple mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Memory Storage</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-memory-blue mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Local & Private</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;