const CodeExample = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            Simple Setup, Powerful Results
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Works with MCP tools and REST API for universal compatibility
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
          {/* MCP Setup */}
          <div className="bg-code-bg rounded-2xl p-4 sm:p-6 lg:p-8 border border-primary/20 shadow-glow overflow-x-auto">
            <div className="text-sm font-mono">
              <div className="text-code-comment mb-4">// MCP Setup (Claude Desktop, OpenCode)</div>
              
              <div className="mb-6">
                <span className="text-foreground">{"{"}</span>
                <div className="ml-4">
                  <span className="text-code-string">"mcpServers"</span>
                  <span className="text-foreground">: {"{"}</span>
                  <div className="ml-4">
                    <span className="text-code-string">"local-memory"</span>
                    <span className="text-foreground">: {"{"}</span>
                    <div className="ml-4">
                      <span className="text-code-string">"command"</span>
                      <span className="text-foreground">:</span>{" "}
                      <span className="text-code-string">"node"</span>
                      <span className="text-foreground">,</span>
                      <br />
                      <span className="text-code-string">"args"</span>
                      <span className="text-foreground">:</span>{" "}
                      <span className="text-foreground">[</span>
                      <span className="text-code-string">"/path/to/local-memory-mcp/dist/index.js"</span>
                      <span className="text-foreground">]</span>
                    </div>
                    <span className="text-foreground">{"}"}</span>
                  </div>
                  <span className="text-foreground">{"}"}</span>
                </div>
                <span className="text-foreground">{"}"}</span>
              </div>
            </div>
          </div>

          {/* REST API Setup */}
          <div className="bg-code-bg rounded-2xl p-4 sm:p-6 lg:p-8 border border-primary/20 shadow-glow overflow-x-auto">
            <div className="text-sm font-mono">
              <div className="text-code-comment mb-4">// REST API Usage (Any AI platform)</div>
              
              <div className="mb-6">
                <div className="text-code-comment mb-2">// Store a memory</div>
                <span className="text-code-keyword">curl</span>{" "}
                <span className="text-foreground">-X POST</span>{" "}
                <span className="text-code-string">"http://localhost:3002/api/memories"</span>{" "}
                <span className="text-foreground">\</span>
                <br />
                <span className="ml-4 text-foreground">-H</span>{" "}
                <span className="text-code-string">"Content-Type: application/json"</span>{" "}
                <span className="text-foreground">\</span>
                <br />
                <span className="ml-4 text-foreground">-d</span>{" "}
                <span className="text-code-string">'{"{"}"content": "Learned React hooks pattern", "importance": 8{"}"}'</span>
              </div>
              
              <div>
                <div className="text-code-comment mb-2">// Ask questions about your memories</div>
                <span className="text-code-keyword">curl</span>{" "}
                <span className="text-foreground">-X POST</span>{" "}
                <span className="text-code-string">"http://localhost:3002/api/ask"</span>{" "}
                <span className="text-foreground">\</span>
                <br />
                <span className="ml-4 text-foreground">-H</span>{" "}
                <span className="text-code-string">"Content-Type: application/json"</span>{" "}
                <span className="text-foreground">\</span>
                <br />
                <span className="ml-4 text-foreground">-d</span>{" "}
                <span className="text-code-string">'{"{"}"question": "What patterns have I learned?"{"}"}'</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeExample;