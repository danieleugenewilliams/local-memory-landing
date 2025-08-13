const CodeExample = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            The Architecture Engineers Actually Want
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple integration, powerful results
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-code-bg rounded-2xl p-8 border border-primary/20 shadow-glow overflow-x-auto">
            <div className="text-sm font-mono">
              <div className="text-code-comment mb-4">// Your AI agent, enhanced with persistent memory</div>
              
              <div className="mb-6">
                <span className="text-code-keyword">const</span>{" "}
                <span className="text-foreground">agent</span>{" "}
                <span className="text-foreground">=</span>{" "}
                <span className="text-code-keyword">new</span>{" "}
                <span className="text-memory-blue">AIAgent</span>
                <span className="text-foreground">(</span>
                <span className="text-foreground">{"{"}</span>
                <div className="ml-4">
                  <span className="text-foreground">memory:</span>{" "}
                  <span className="text-code-keyword">new</span>{" "}
                  <span className="text-memory-purple">LocalMemory</span>
                  <span className="text-foreground">(</span>
                  <span className="text-foreground">{"{"}</span>
                  <div className="ml-4">
                    <span className="text-foreground">session:</span>{" "}
                    <span className="text-code-string">'enterprise-backend-team'</span>
                    <span className="text-foreground">,</span>
                    <br />
                    <span className="text-foreground">domain:</span>{" "}
                    <span className="text-code-string">'payment-processing'</span>
                  </div>
                  <span className="text-foreground">{"}"}</span>
                  <span className="text-foreground">)</span>
                </div>
                <span className="text-foreground">{"}"}</span>
                <span className="text-foreground">)</span>
                <span className="text-foreground">;</span>
              </div>
              
              <div className="mb-6">
                <div className="text-code-comment mb-2">// Now it remembers your architectural decisions</div>
                <span className="text-code-keyword">await</span>{" "}
                <span className="text-foreground">agent</span>
                <span className="text-foreground">.</span>
                <span className="text-memory-blue">ask</span>
                <span className="text-foreground">(</span>
                <span className="text-code-string">"How should I implement rate limiting here?"</span>
                <span className="text-foreground">)</span>
                <span className="text-foreground">;</span>
                <br />
                <div className="text-code-comment">// → References your team's established patterns and past decisions</div>
              </div>
              
              <div>
                <div className="text-code-comment mb-2">// Learns from every interaction</div>
                <span className="text-code-keyword">await</span>{" "}
                <span className="text-foreground">agent</span>
                <span className="text-foreground">.</span>
                <span className="text-memory-green">remember</span>
                <span className="text-foreground">(</span>
                <span className="text-foreground">{"{"}</span>
                <div className="ml-4">
                  <span className="text-foreground">content:</span>{" "}
                  <span className="text-code-string">"Rate limiting: Use Redis sliding window with 1000 req/min limit"</span>
                  <span className="text-foreground">,</span>
                  <br />
                  <span className="text-foreground">importance:</span>{" "}
                  <span className="text-memory-orange">9</span>
                  <span className="text-foreground">,</span>
                  <br />
                  <span className="text-foreground">tags:</span>{" "}
                  <span className="text-foreground">[</span>
                  <span className="text-code-string">"rate-limiting"</span>
                  <span className="text-foreground">,</span>{" "}
                  <span className="text-code-string">"redis"</span>
                  <span className="text-foreground">,</span>{" "}
                  <span className="text-code-string">"performance"</span>
                  <span className="text-foreground">]</span>
                </div>
                <span className="text-foreground">{"}"}</span>
                <span className="text-foreground">)</span>
                <span className="text-foreground">;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeExample;