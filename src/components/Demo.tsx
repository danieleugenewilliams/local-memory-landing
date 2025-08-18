import { useState } from "react";
import { Button } from "@/components/ui/button";

const Demo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [memories, setMemories] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const demoSteps = [
    {
      title: "Store a Memory",
      description: "Watch as we store information about a React optimization",
      action: "store_memory",
      input: "React performance tip: Use React.memo() for expensive components that re-render frequently. Wrap functional components to prevent unnecessary re-renders when props haven't changed.",
      response: "✅ Memory stored successfully with importance: 8"
    },
    {
      title: "Store Another Memory", 
      description: "Let's add knowledge about debugging",
      action: "store_memory",
      input: "Debugging strategy: When React components aren't updating, check if state mutations are happening. Always use setState() or hooks properly - never mutate state directly.",
      response: "✅ Memory stored successfully with importance: 7"
    },
    {
      title: "Search Memories",
      description: "Now let's search for React-related knowledge",
      action: "search_memories", 
      input: "React performance optimization",
      response: "Found 1 relevant memory:\n• React performance tip: Use React.memo() for expensive components..."
    },
    {
      title: "Ask a Question",
      description: "Let's ask the AI a question using stored memories",
      action: "ask_question",
      input: "How do I optimize React component performance?",
      response: "Based on your stored memories, I recommend using React.memo() for expensive components that re-render frequently. This will prevent unnecessary re-renders when props haven't changed, significantly improving performance."
    }
  ];

  const executeStep = async (stepIndex: number) => {
    setIsTyping(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const step = demoSteps[stepIndex];
    
    if (step.action === "store_memory") {
      setMemories(prev => [...prev, {
        id: Date.now(),
        content: step.input,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
    
    setIsTyping(false);
    setCurrentStep(stepIndex + 1);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setMemories([]);
    setIsTyping(false);
  };

  return (
    <section id="demo" className="py-24 bg-muted/20">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            See <em>Local Memory</em> in Action
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how AI agents gain persistent memory and learning capabilities
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Demo Controls */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Interactive Demo</h3>
                
                {demoSteps.map((step, index) => (
                  <div key={index} className={`mb-4 p-4 rounded-lg border ${
                    index < currentStep ? 'bg-memory-green/10 border-memory-green/20' :
                    index === currentStep ? 'bg-memory-blue/10 border-memory-blue/20' :
                    'bg-muted/50 border-border'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index < currentStep ? 'bg-memory-green text-white' :
                        index === currentStep ? 'bg-memory-blue text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index < currentStep ? '✓' : index + 1}
                      </div>
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    
                    {index === currentStep && (
                      <Button 
                        onClick={() => executeStep(index)}
                        disabled={isTyping}
                        size="sm"
                        className="w-full"
                      >
                        {isTyping ? 'Processing...' : `Execute ${step.action.replace('_', ' ')}`}
                      </Button>
                    )}
                  </div>
                ))}

                {currentStep >= demoSteps.length && (
                  <Button onClick={resetDemo} variant="outline" className="w-full">
                    Reset Demo
                  </Button>
                )}
              </div>
            </div>

            {/* Demo Output */}
            <div className="space-y-6">
              {/* Memory Storage */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Stored Memories</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {memories.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No memories stored yet...</p>
                  ) : (
                    memories.map((memory) => (
                      <div key={memory.id} className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">{memory.timestamp}</div>
                        <div className="text-sm text-foreground">{memory.content.substring(0, 100)}...</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Current Action */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Current Action</h3>
                {currentStep === 0 ? (
                  <p className="text-muted-foreground">Click "Execute store memory" to begin the demo</p>
                ) : currentStep <= demoSteps.length ? (
                  <div className="space-y-3">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-xs text-memory-blue mb-1">INPUT:</div>
                      <div className="text-sm text-foreground">{demoSteps[currentStep - 1]?.input}</div>
                    </div>
                    {!isTyping && currentStep > 0 && (
                      <div className="bg-memory-green/10 rounded-lg p-3">
                        <div className="text-xs text-memory-green mb-1">OUTPUT:</div>
                        <div className="text-sm text-foreground whitespace-pre-line">{demoSteps[currentStep - 1]?.response}</div>
                      </div>
                    )}
                    {isTyping && (
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">PROCESSING...</div>
                        <div className="flex items-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-memory-blue border-t-transparent rounded-full"></div>
                          <span className="text-sm text-muted-foreground"><em>Local Memory</em> is thinking...</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-memory-green/10 rounded-lg p-4 text-center">
                    <div className="text-memory-green text-2xl mb-2">🎉</div>
                    <div className="font-semibold text-foreground">Demo Complete!</div>
                    <div className="text-sm text-muted-foreground mt-1">You've seen how AI agents can store, search, and use persistent memories</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-memory-green/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💾</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Persistent Storage</h4>
              <p className="text-sm text-muted-foreground">Memories persist across sessions and conversations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-memory-blue/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🔍</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Intelligent Search</h4>
              <p className="text-sm text-muted-foreground">Find relevant memories using semantic similarity</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-memory-purple/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🧠</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Contextual Answers</h4>
              <p className="text-sm text-muted-foreground">AI uses stored knowledge to provide better responses</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;