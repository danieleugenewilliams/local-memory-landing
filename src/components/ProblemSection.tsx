const ProblemSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            AI Agents Are Smart... But They Forget Everything
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The gap between intelligent AI and persistent knowledge
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Great for Single Tasks */}
          <div className="bg-card rounded-2xl p-8 border border-border animate-fade-in">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-memory-green mb-4">Great for Single Tasks</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-memory-green mt-1">→</span>
                <span>Answer questions, write code, analyze data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memory-green mt-1">→</span>
                <span>Perfect for one-time interactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-memory-green mt-1">→</span>
                <span>Fresh context, clean slate</span>
              </li>
            </ul>
          </div>
          
          {/* Terrible for Long-term Work */}
          <div className="bg-card rounded-2xl p-8 border border-border animate-fade-in">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-bold text-destructive mb-4">Terrible for Long-term Work</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">→</span>
                <span>Re-explain context every conversation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">→</span>
                <span>No learning from past interactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">→</span>
                <span>Lost insights and patterns</span>
              </li>
            </ul>
          </div>
          
          {/* The Solution */}
          <div className="bg-card-gradient rounded-2xl p-8 border border-primary/20 shadow-glow animate-fade-in">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold text-memory-blue mb-4">The Solution?</h3>
            <div className="text-2xl font-bold text-foreground mb-2">Persistent Memory</div>
            <p className="text-muted-foreground">
              Give your AI agents the ability to remember, learn, and build on previous interactions over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;