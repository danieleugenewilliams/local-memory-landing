const ProblemSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            AI Agents Work Great... Until They Meet Real Code
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The gap between demo projects and enterprise reality
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Perfect for New Projects */}
          <div className="bg-card rounded-2xl p-8 border border-border animate-fade-in">
            <div className="text-4xl mb-4">🧩</div>
            <h3 className="text-xl font-bold text-memory-green mb-4">Perfect for New Projects</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-memory-green mt-1">→</span>
                <span>Clone repos, build todo apps, follow tutorials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memory-green mt-1">→</span>
                <span>Clean slate development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memory-green mt-1">→</span>
                <span>Demo-friendly scenarios</span>
              </li>
            </ul>
          </div>
          
          {/* Useless for Enterprise */}
          <div className="bg-card rounded-2xl p-8 border border-border animate-fade-in">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-xl font-bold text-destructive mb-4">Useless for Enterprise Reality</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">→</span>
                <span>500K+ lines, legacy patterns, domain expertise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">→</span>
                <span>Team conventions and architectural decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">→</span>
                <span>Complex business logic and constraints</span>
              </li>
            </ul>
          </div>
          
          {/* The Gap */}
          <div className="bg-card-gradient rounded-2xl p-8 border border-primary/20 shadow-glow animate-fade-in">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold text-memory-blue mb-4">The Gap?</h3>
            <div className="text-2xl font-bold text-foreground mb-2">Memory</div>
            <p className="text-muted-foreground">
              Your codebase knowledge disappears every conversation. AI agents start from zero, every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;