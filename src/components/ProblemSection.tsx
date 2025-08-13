const ProblemSection = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            AI Agents Are Smart... But They Forget Everything
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            The gap between intelligent AI and persistent knowledge
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Great for Single Tasks */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border animate-fade-in">
            <div className="text-3xl sm:text-4xl mb-4">⚡</div>
            <h3 className="text-lg sm:text-xl font-bold text-memory-green mb-4">Great for Single Tasks</h3>
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
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border animate-fade-in sm:col-span-2 lg:col-span-1">
            <div className="text-3xl sm:text-4xl mb-4">🔄</div>
            <h3 className="text-lg sm:text-xl font-bold text-destructive mb-4">Terrible for Long-term Work</h3>
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
          <div className="bg-card-gradient rounded-2xl p-6 lg:p-8 border border-primary/20 shadow-glow animate-fade-in sm:col-span-2 lg:col-span-1">
            <div className="text-3xl sm:text-4xl mb-4">🧠</div>
            <h3 className="text-lg sm:text-xl font-bold text-memory-blue mb-4">The Solution?</h3>
            <div className="text-xl sm:text-2xl font-bold text-foreground mb-2">Persistent Memory</div>
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