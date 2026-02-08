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
    label: "Bootstrap",
    type: "command",
    command: 'bootstrap({ mode: "full", include_questions: true })',
    output: `Session initialized:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  memories:  142 total
             12 observations · 89 learnings
             34 patterns · 7 schemas

  domains:   backend · infrastructure · auth
             frontend · deployment

  pending:   2 unresolved questions
             ⚠ "JWT auth vs OAuth2 — which is current?"
             ⚠ "Redis pool size: 10 or 50 connections?"

  context:   3 schemas loaded
             18 high-weight patterns active

  ✓ Knowledge layer ready`,
    delay: 3000,
  },
  {
    label: "Observe",
    type: "command",
    command: 'observe({ content: "Auth service migrated to OAuth2 with PKCE flow", level: "observation", tags: ["auth", "security"] })',
    output: `Observation stored:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  id:     mem_9e2d4f
  level:  L0 Observation
  weight: 0.5
  tags:   auth, security
  domain: backend`,
    delay: 2500,
  },
  {
    label: "Contradiction found",
    type: "system",
    message: "⚠ Contradiction detected with existing memory",
    output: `Conflict found:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  EXISTING  "Auth uses JWT with 24h expiry"
            Level: L2 Pattern | Weight: 7.2

  NEW       "Auth service migrated to OAuth2 with PKCE"
            Level: L0 Observation | Weight: 0.5

  → Question created: q_3f8a1c
    "JWT auth vs OAuth2 PKCE — which is current?"`,
    delay: 2500,
  },
  {
    label: "Resolve conflict",
    type: "command",
    command: 'resolve({ question_id: "q_3f8a1c", resolution_type: "a_supersedes", rationale: "OAuth2 migration completed, JWT deprecated" })',
    output: `Resolved: new observation supersedes old pattern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ "Auth uses JWT" weight: 7.2 → 1.0 (deprecated)
  ✓ "Auth migrated to OAuth2" weight: 0.5 → 2.5
  ✓ Question q_3f8a1c marked resolved
  ✓ Contradicts relationship recorded`,
    delay: 2500,
  },
  {
    label: "Reflect",
    type: "command",
    command: 'reflect({ mode: "single", observation_id: "mem_9e2d4f" })',
    output: `Promoted: L0 Observation → L1 Learning
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  id:      mem_9e2d4f
  level:   L0 → L1
  weight:  2.5 → 3.2
  insight: "Auth stack modernized to OAuth2/PKCE,
           replacing legacy JWT token flow"`,
    delay: 2500,
  },
  {
    label: "Validate",
    type: "command",
    command: 'evolve({ operation: "validate", entity_id: "mem_9e2d4f", success: true, context: "Confirmed in production deploy" })',
    output: `Validation recorded:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  weight:      3.2 → 5.4
  validations: 3
  confidence:  0.92

  ⬆ Auto-promotion criteria met
    validations ≥ 3  ✓
    weight ≥ 5.0     ✓
    confidence ≥ 0.8 ✓`,
    delay: 2500,
  },
  {
    label: "Knowledge evolved",
    type: "system",
    message: "Auto-promotion triggered: L1 Learning → L2 Pattern",
    output: `Knowledge evolved:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  mem_9e2d4f promoted to L2 Pattern

  "Auth stack uses OAuth2 with PKCE flow"
  Weight: 6.8 | Confidence: 0.92

  This pattern now influences:
  • predict() outcomes for auth queries
  • explain() causal chains
  • Future contradiction detection`,
    delay: 3000,
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
            A knowledge layer in action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Observe. Detect contradictions. Evolve knowledge. Watch insights mature.
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
