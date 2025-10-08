import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, FileText, Code, Lightbulb, Zap, BookOpen } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const PromptsPage = () => {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const copyToClipboard = (text: string, promptId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(promptId);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const basicPrompt = `## Local Memory

Proactively use local-memory MCP to store, retrieve, update, and analyze memories to maintain context and build expertise over time. Store key insights including lessons learned, architectural decisions, development strategies, and project outcomes. Use semantic search and relationship mapping to find relevant memories across all projects and sessions.`;

  const standardPrompt = `## Local Memory Integration

Proactively use Local Memory to maintain persistent knowledge across sessions. This is your external brain for storing and retrieving project context, decisions, and learnings.

### Core Operations
- **Store insights**: Use \`store_memory\` for important information, decisions, and learnings
- **Search knowledge**: Use \`search\` with semantic queries to find relevant past context
- **Analyze patterns**: Use \`analysis\` to identify trends and connections in stored knowledge
- **Map relationships**: Use \`relationships\` to understand how different memories connect

### When to Store Memories
- Architecture decisions and their rationale
- Problem-solving approaches that worked (or didn't)
- Configuration details and setup procedures
- Bug fixes and their root causes
- Performance optimization results
- Project-specific conventions and patterns

### Search Before Answering
Always search for relevant memories before providing solutions to ensure consistency with past decisions and learnings.`;

  const comprehensivePrompt = `## Local Memory - Persistent Knowledge System

Local Memory is your persistent knowledge base across all sessions. Use it to build expertise, maintain context, and provide consistent, informed assistance.

### Memory Storage Strategy

Store memories proactively when encountering:
- **Decisions**: Architecture choices, design patterns, technology selections
- **Solutions**: Bug fixes, workarounds, successful implementations
- **Learnings**: What worked, what didn't, why certain approaches were chosen
- **Context**: Project requirements, constraints, team preferences
- **Insights**: Performance findings, optimization results, best practices

Example:
\`\`\`javascript
store_memory({
  content: "Chose PostgreSQL over MongoDB for user data because we need ACID compliance and complex relational queries. Team has PostgreSQL expertise.",
  importance: 9,
  tags: ["architecture", "database", "decision", "project-x"],
  domain: "project-x"
})
\`\`\`

### Intelligent Retrieval

Before answering questions or making suggestions:

1. **Search for context**:
\`\`\`javascript
search({
  query: "database architecture decisions",
  search_type: "semantic",
  use_ai: true,
  session_filter_mode: "all",
  response_format: "concise"
})
\`\`\`

2. **Check relationships**:
\`\`\`javascript
relationships({
  relationship_type: "find_related",
  memory_id: "relevant-memory-id",
  limit: 5
})
\`\`\`

3. **Analyze patterns**:
\`\`\`javascript
analysis({
  analysis_type: "question",
  question: "What database patterns have we used successfully?",
  session_filter_mode: "all",
  context_limit: 10
})
\`\`\`

### Advanced Usage Patterns

#### Cross-Project Intelligence
\`\`\`javascript
// Find patterns across all projects
search({
  query: "authentication implementation",
  search_type: "semantic",
  use_ai: true,
  session_filter_mode: "all",
  domain: null  // Search across all domains
})
\`\`\`

#### Learning Progression Tracking
\`\`\`javascript
// Track understanding evolution
analysis({
  analysis_type: "temporal_patterns",
  concept: "microservices architecture",
  temporal_timeframe: "quarter"
})
\`\`\`

#### Knowledge Gap Detection
\`\`\`javascript
// Identify missing information
analysis({
  analysis_type: "analyze",
  query: "kubernetes deployment knowledge",
  limit: 20
})
\`\`\`

### Best Practices

1. **Be Specific**: Store detailed context, not just outcomes
2. **Tag Consistently**: Use standard tags for easy retrieval
3. **Rate Importance**: Use 1-10 scale (7+ for significant items)
4. **Link Knowledge**: Create relationships between related memories
5. **Search First**: Always check existing knowledge before answering
6. **Update Outdated**: Modify memories when information changes
7. **Cross-Session Access**: Use \`session_filter_mode: "all"\` for complete knowledge

### Response Enhancement

When providing answers:
- Reference relevant memories to support recommendations
- Highlight when current approach differs from past decisions
- Identify patterns from previous similar situations
- Suggest storing new insights for future reference`;

  const toolSpecificPrompt = `## Local Memory Tool Examples

### Storing Knowledge
\`\`\`javascript
// Architecture decision
store_memory({
  content: "Implemented event-driven architecture using Redis Pub/Sub for real-time notifications. Chose Redis over RabbitMQ for simpler operations and lower latency.",
  importance: 9,
  tags: ["architecture", "real-time", "redis", "events"],
  domain: "notification-system"
})

// Bug fix documentation
store_memory({
  content: "Fixed memory leak in WebSocket handler by properly cleaning up event listeners on disconnect. Root cause: closures holding references to large data structures.",
  importance: 8,
  tags: ["bug-fix", "websocket", "memory-leak", "performance"],
  source: "debugging-session-2024-01-15"
})
\`\`\`

### Searching Knowledge
\`\`\`javascript
// Semantic search across all memories
search({
  query: "performance optimization database queries",
  search_type: "semantic",
  use_ai: true,
  limit: 10,
  session_filter_mode: "all"
})

// Tag-based filtering
search({
  search_type: "tags",
  tags: ["security", "authentication"],
  session_filter_mode: "all"
})

// Hybrid search with temporal bounds
search({
  search_type: "hybrid",
  query: "API design",
  tags: ["rest", "graphql"],
  start_date: "2024-01-01",
  end_date: "2024-12-31"
})
\`\`\`

### Analyzing Patterns
\`\`\`javascript
// Ask complex questions
analysis({
  analysis_type: "question",
  question: "What are the common causes of performance issues we've encountered?",
  context_limit: 15,
  session_filter_mode: "all"
})

// Summarize domain knowledge
analysis({
  analysis_type: "summarize",
  timeframe: "month",
  query: "authentication implementation",
  limit: 30
})

// Track learning progression
analysis({
  analysis_type: "temporal_patterns",
  concept: "kubernetes",
  temporal_timeframe: "quarter"
})
\`\`\`

### Managing Relationships
\`\`\`javascript
// Find related memories
relationships({
  relationship_type: "find_related",
  memory_id: "memory-about-caching-strategy",
  min_strength: 0.7
})

// Create explicit connections
relationships({
  relationship_type: "create",
  source_memory_id: "redis-decision",
  target_memory_id: "performance-requirements",
  relationship_type_enum: "references",
  strength: 0.9,
  context: "Redis chosen specifically to meet sub-100ms latency requirement"
})

// Map knowledge graph
relationships({
  relationship_type: "map_graph",
  memory_id: "core-architecture-decision",
  depth: 3
})
\`\`\``;

  const quickReferencePrompt = `## Local Memory Quick Reference

Store: \`store_memory(content, importance: 1-10, tags[], domain)\`
Search: \`search(query, search_type: "semantic", use_ai: true, session_filter_mode: "all")\`
Ask: \`analysis(analysis_type: "question", question, session_filter_mode: "all")\`
Related: \`relationships(relationship_type: "find_related", memory_id)\`

Always search before answering. Store important decisions and learnings.`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-8 lg:pt-12 lg:pb-0 bg-slate-900">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Agent Memory Integration Prompts
            </h1>
            <p className="text-xl text-gray-300">
              Ready-to-use prompts to enhance your AI agents with persistent memory capabilities
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-8 lg:pt-10 lg:pb-14 bg-slate-900">
        <div className="container max-w-2xl mx-auto px-6">
          <Card className="mb-0 bg-slate-800/50 border-slate-600">
            <CardHeader>
              <CardTitle className="text-xl text-white">Shortcuts</CardTitle>
              <CardDescription className="text-gray-300">Jump to the integration level you need.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Getting Started</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#basic-integration" className="block text-memory-green hover:underline">• Basic Integration</a>
                    <a href="#standard-integration" className="block text-memory-orange hover:underline">• Standard Integration</a>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Advanced</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#comprehensive-integration" className="block text-memory-purple hover:underline">• Comprehensive Integration</a>
                    <a href="#tool-examples" className="block text-memory-pink hover:underline">• Tool Examples</a>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Reference</h4>
                  <div className="space-y-1 text-sm">
                    <a href="#quick-reference" className="block text-memory-yellow hover:underline">• Quick Reference</a>
                    <a href="#platform-guide" className="block text-memory-blue hover:underline">• Platform Guide</a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Integration Guide Section */}
      <section className="py-8 lg:pt-14 lg:pb-8 bg-background">
        <div className="container max-w-4xl mx-auto px-6">
          <Card className="mb-8 border border-memory-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-memory-blue" />
                Integration Guide
              </CardTitle>
              <CardDescription>
                Add these prompts to your AI agent configuration files: <code className="bg-muted px-1 py-0.5 rounded text-sm">CLAUDE.md</code>, <code className="bg-muted px-1 py-0.5 rounded text-sm">AGENTS.md</code>, <code className="bg-muted px-1 py-0.5 rounded text-sm">.cursorrules</code>, <code className="bg-muted px-1 py-0.5 rounded text-sm">Cline</code>, <code className="bg-muted px-1 py-0.5 rounded text-sm">.github/copilot-instructions.md</code>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-memory-green/20 text-memory-green flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Choose Your Level</h4>
                    <p className="text-sm text-muted-foreground">Start with Basic, upgrade as needed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-memory-orange/20 text-memory-orange flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Copy the Prompt</h4>
                    <p className="text-sm text-muted-foreground">Use the copy button on any prompt</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-memory-purple/20 text-memory-purple flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Paste in Config</h4>
                    <p className="text-sm text-muted-foreground">Add to your agent's instruction file</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Integration */}
          <div id="basic-integration" className="mb-12 scroll-target">
            <Card className="border border-memory-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-memory-green" />
                  Basic Integration
                </CardTitle>
                <CardDescription>
                  Minimal 3-line prompt to get started with Local Memory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg relative">
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 gap-2 border-memory-green/30"
                      onClick={() => copyToClipboard(basicPrompt, 'basic')}
                    >
                      <Copy className="w-4 h-4" />
                      {copiedPrompt === 'basic' ? 'Copied!' : 'Copy'}
                    </Button>
                    <pre className="text-sm whitespace-pre-wrap pr-20">{basicPrompt}</pre>
                  </div>
                  <div className="bg-green-800/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Perfect For:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• First-time Local Memory users</li>
                      <li>• Simple memory storage and retrieval</li>
                      <li>• Getting started quickly without complexity</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Standard Integration */}
          <div id="standard-integration" className="mb-12 scroll-target">
            <Card className="border border-memory-orange">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-memory-orange" />
                  Standard Integration
                </CardTitle>
                <CardDescription>
                  Detailed guidance with core operations and best practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg relative">
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 gap-2 border-memory-orange/30"
                      onClick={() => copyToClipboard(standardPrompt, 'standard')}
                    >
                      <Copy className="w-4 h-4" />
                      {copiedPrompt === 'standard' ? 'Copied!' : 'Copy'}
                    </Button>
                    <pre className="text-sm whitespace-pre-wrap pr-20">{standardPrompt}</pre>
                  </div>
                  <div className="bg-orange-800/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Perfect For:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Intermediate users ready for structured memory</li>
                      <li>• Agents that need clear operational guidelines</li>
                      <li>• Teams establishing memory best practices</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comprehensive Integration */}
          <div id="comprehensive-integration" className="mb-12 scroll-target">
            <Card className="border border-memory-purple">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-memory-purple" />
                  Comprehensive Integration
                </CardTitle>
                <CardDescription>
                  Full-featured implementation with advanced patterns and code examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg relative max-h-96 overflow-y-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 z-10 gap-2 border-memory-purple/30"
                      onClick={() => copyToClipboard(comprehensivePrompt, 'comprehensive')}
                    >
                      <Copy className="w-4 h-4" />
                      {copiedPrompt === 'comprehensive' ? 'Copied!' : 'Copy'}
                    </Button>
                    <pre className="text-sm whitespace-pre-wrap pr-20">{comprehensivePrompt}</pre>
                  </div>
                  <div className="bg-purple-800/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Perfect For:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Advanced users maximizing Local Memory potential</li>
                      <li>• Complex projects requiring sophisticated memory patterns</li>
                      <li>• Teams building comprehensive knowledge systems</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tool Examples */}
          <div id="tool-examples" className="mb-12 scroll-target">
            <Card className="border border-memory-pink">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-memory-pink" />
                  Tool-Specific Examples
                </CardTitle>
                <CardDescription>
                  Real-world JavaScript/JSON examples for all Local Memory operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg relative max-h-96 overflow-y-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 z-10 gap-2 border-memory-pink/30"
                      onClick={() => copyToClipboard(toolSpecificPrompt, 'tools')}
                    >
                      <Copy className="w-4 h-4" />
                      {copiedPrompt === 'tools' ? 'Copied!' : 'Copy'}
                    </Button>
                    <pre className="text-sm whitespace-pre-wrap pr-20">{toolSpecificPrompt}</pre>
                  </div>
                  <div className="bg-pink-800/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Perfect For:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Developers needing concrete implementation examples</li>
                      <li>• Understanding parameter usage and syntax</li>
                      <li>• Copy-paste ready code snippets</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Reference */}
          <div id="quick-reference" className="mb-12 scroll-target">
            <Card className="border border-memory-yellow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-memory-yellow" />
                  Quick Reference
                </CardTitle>
                <CardDescription>
                  Ultra-condensed format for experienced users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg relative">
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 gap-2 border-memory-yellow/30"
                      onClick={() => copyToClipboard(quickReferencePrompt, 'quick')}
                    >
                      <Copy className="w-4 h-4" />
                      {copiedPrompt === 'quick' ? 'Copied!' : 'Copy'}
                    </Button>
                    <pre className="text-sm whitespace-pre-wrap pr-20">{quickReferencePrompt}</pre>
                  </div>
                  <div className="bg-yellow-800/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Perfect For:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Experienced Local Memory users</li>
                      <li>• Quick setup without detailed explanations</li>
                      <li>• Minimal configuration with maximum efficiency</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PromptsPage;