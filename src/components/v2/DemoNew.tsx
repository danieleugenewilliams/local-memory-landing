import { useState, useEffect, useRef } from "react";

interface DemoStep {
  label: string;
  type: "command" | "system" | "user";
  command?: string;
  message?: string;
  output: string;
  delay: number;
}

const demoSteps: DemoStep[] = [
  {
    label: "Bootstrap session",
    type: "command",
    command: 'bootstrap({ mode: "full", include_questions: true })',
    output: `Memory Status: 47 memories across 3 domains

Highlights:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
L3 Schemas (2):  Auth patterns, API design
L2 Patterns (8): Rate limiting, caching, errors...
L1 Learnings (15): Recent insights

Pending Questions: 2
• Token refresh edge cases?
• Optimal Redis TTL for sessions?

Context loaded. Ready for queries.`,
    delay: 2500,
  },
  {
    label: "Session cleared",
    type: "system",
    message: "User types /clear — session context is wiped",
    output: `Context cleared. Starting new session...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  New session started. Previous context forgotten.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    delay: 1500,
  },
  {
    label: "New task",
    type: "user",
    message: "I need to add rate limiting to the new /api/users endpoint. What patterns do we use?",
    output: `I'll search your memory for relevant patterns...`,
    delay: 1200,
  },
  {
    label: "Search memory",
    type: "command",
    command: 'search({ query: "rate limiting API security", use_ai: true })',
    output: `Found 3 memories (8ms):

1. Auth uses JWT with 24h expiry. Rate limit: 100 req/min.
   Level: L2 Pattern | Weight: 7.2 | Tags: auth, security
   → enables: Redis session caching

2. API endpoints follow /api/v1/{resource} pattern.
   Level: L2 Pattern | Weight: 6.5 | Tags: api, architecture
   → references: Auth middleware

3. Redis used for session caching and rate limit counters.
   Level: L2 Pattern | Weight: 6.8 | Tags: infrastructure`,
    delay: 2000,
  },
  {
    label: "Observe learning",
    type: "command",
    command: 'observe({ content: "Users endpoint: 100 req/min per API key via Redis", level: "learning", tags: ["api", "rate-limiting"] })',
    output: `{
  "id": "mem_8d4f2c",
  "level": "L1",
  "weight": 1.0,
  "tags": ["api", "rate-limiting"],
  "relationships": ["enables:mem_7f3a9b"]
}`,
    delay: 2000,
  },
  {
    label: "Predict outcomes",
    type: "command",
    command: 'predict({ given: "High traffic spike on /api/users", domain: "api" })',
    output: `Based on 3 relevant patterns:

Predicted outcomes:
• Rate limiter triggers at 100 req/min threshold
• Redis counters increment, may hit memory pressure
• 429 responses returned with Retry-After headers
• User experience: brief delays, automatic retry

Confidence: 0.87 | Sources: L2 patterns`,
    delay: 2500,
  },
];

const DemoNew = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  const typeCommand = async (text: string) => {
    setIsTyping(true);
    setDisplayedCommand("");
    setShowOutput(false);

    for (let i = 0; i <= text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 12));
      setDisplayedCommand(text.slice(0, i));
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    setShowOutput(true);
    setIsTyping(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const step = demoSteps[activeStep];
    const textToType = step.command || step.message || "";
    
    typeCommand(textToType);

    const timeout = setTimeout(() => {
      if (activeStep < demoSteps.length - 1) {
        setActiveStep((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setActiveStep(0);
        }, 4000);
      }
    }, step.delay + textToType.length * 12 + 500);

    return () => clearTimeout(timeout);
  }, [activeStep, isAutoPlaying]);

  const handleStepClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveStep(index);
    const step = demoSteps[index];
    typeCommand(step.command || step.message || "");
  };

  const currentStep = demoSteps[activeStep];

  const getPromptSymbol = (type: string) => {
    switch (type) {
      case "system":
        return <span className="text-[hsl(var(--terminal-amber))]">⚡</span>;
      case "user":
        return <span className="text-[hsl(var(--terminal-muted))]">→</span>;
      default:
        return <span className="text-[hsl(var(--terminal-blue))]">❯</span>;
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case "system":
        return "text-[hsl(var(--terminal-amber))]";
      case "user":
        return "text-foreground/70 italic";
      default:
        return "text-[hsl(var(--terminal-green))]";
    }
  };

  return (
    <section id="demo" className="scroll-target section-sm bg-background">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Memory that survives /clear
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Bootstrap context. Observe learnings. Predict outcomes. Pick up right where you left off.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* Step selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
              {demoSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`flex-shrink-0 rounded-lg border px-4 py-3 text-left text-sm transition-all lg:flex-shrink ${
                    activeStep === index
                      ? step.type === "system"
                        ? "border-[hsl(var(--terminal-amber))] bg-[hsl(var(--terminal-amber))]/10 text-foreground"
                        : step.type === "user"
                        ? "border-border bg-secondary text-foreground"
                        : "border-[hsl(var(--brand-blue))] bg-[hsl(var(--brand-blue))]/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-border/80 hover:bg-secondary"
                  }`}
                >
                  <span className="font-medium">{step.label}</span>
                </button>
              ))}
            </div>

            {/* Terminal */}
            <div className="terminal glow">
              <div className="terminal-header">
                <div className="flex gap-2">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                </div>
                <span className="ml-4 font-mono text-xs text-muted-foreground">
                  local-memory
                </span>
              </div>

              <div
                ref={terminalRef}
                className="terminal-body min-h-[360px] lg:min-h-[400px]"
              >
                {/* Command prompt */}
                <div className="flex items-start gap-2">
                  {getPromptSymbol(currentStep.type)}
                  <div className="flex-1">
                    <span className={`break-all ${getTextColor(currentStep.type)}`}>
                      {displayedCommand}
                    </span>
                    {isTyping && (
                      <span className="cursor-blink ml-0.5 inline-block h-4 w-2 bg-[hsl(var(--terminal-green))]" />
                    )}
                  </div>
                </div>

                {/* Output */}
                {showOutput && (
                  <div className="mt-4 whitespace-pre-wrap text-[hsl(var(--foreground))]/80">
                    {currentStep.output}
                  </div>
                )}

                {/* Next prompt indicator */}
                {showOutput && !isTyping && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-[hsl(var(--terminal-blue))]">❯</span>
                    <span className="cursor-blink inline-block h-4 w-2 bg-[hsl(var(--terminal-green))]" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoNew;
