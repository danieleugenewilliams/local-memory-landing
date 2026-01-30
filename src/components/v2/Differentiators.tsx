import { useState } from "react";

interface DifferentiatorProps {
  icon: string;
  title: string;
  headline: string;
  problem: string;
  solution: string;
  example?: string;
  color: string;
}

const DifferentiatorCard = ({ icon, title, headline, problem, solution, example, color }: DifferentiatorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-border/80 hover:bg-card/80">
      
      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      
      {/* Headline */}
      <p className={`mb-4 text-sm font-medium text-${color}`}>{headline}</p>
      
      {/* Problem/Solution */}
      <div className="space-y-3 text-sm text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">The problem: </span>
          {problem}
        </div>
        <div>
          <span className="font-medium text-foreground">Our solution: </span>
          {solution}
        </div>
      </div>
      
      {/* Example (expandable) */}
      {example && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? "Hide example ↑" : "Show example ↓"}
        </button>
      )}
      {example && isExpanded && (
        <div className="mt-3 rounded-lg bg-secondary/50 p-3 text-sm font-mono text-muted-foreground">
          {example}
        </div>
      )}
    </div>
  );
};

const Differentiators = () => {
  const differentiators: DifferentiatorProps[] = [
    {
      icon: "📊",
      title: "L0-L3 Knowledge Hierarchy",
      headline: "Not all memories are created equal.",
      problem: "Other tools store everything at the same level. An observation gets the same weight as a core truth. At 10,000 memories, everything becomes noise.",
      solution: "Four levels of knowledge maturation: Observations → Learnings → Patterns → Schemas. Knowledge earns its permanence. Important truths surface first.",
      example: `L0: "User mentioned tabs"
L1: "User prefers tabs" (validated)
L2: "User follows Google style" (pattern)
L3: "Senior dev, readability focus" (schema)`,
      color: "[hsl(var(--brand-blue))]"
    },
    {
      icon: "⚡",
      title: "Contradiction Detection",
      headline: "Your AI is gaslighting itself.",
      problem: "Append-only memory stores conflicting facts. 'Use React' and 'Vue migration complete' both exist. Your AI picks one randomly.",
      solution: "5-layer contradiction detection catches conflicts before they cause problems. When new info conflicts with existing knowledge, you decide what's true.",
      example: `Stored: "Database is PostgreSQL"
New: "Use MySQL connection string"
→ Conflict detected. Resolve or archive.`,
      color: "[hsl(var(--brand-purple))]"
    },
    {
      icon: "❓",
      title: "Epistemic Gap Tracking",
      headline: "Know what you don't know.",
      problem: "Memory tools only store assertions. When AI finds nothing, it hallucinates confidently instead of admitting uncertainty.",
      solution: "Explicit tracking of unknowns. When your AI encounters a gap, it says 'I don't have this' instead of making something up.",
      example: `Query: "What's the API rate limit?"
→ Gap found: "Unknown since March 3"
→ "I don't have this info" (not hallucination)`,
      color: "[hsl(var(--brand-green))]"
    },
    {
      icon: "↻",
      title: "Knowledge Evolution",
      headline: "Memory that forgets on purpose.",
      problem: "Memories never die. Every fact from 2 years ago sits alongside current truth. Your AI does archaeology when it should be operating.",
      solution: "Knowledge lifecycle: confidence decay, promotion, supersession, archival. Unvalidated memories fade. Current knowledge stays sharp.",
      example: `6 months old, never revalidated:
"Use Node 16" → confidence: 23%
→ Archived. Won't pollute results.`,
      color: "[hsl(var(--brand-orange))]"
    }
  ];

  return (
    <section id="architecture" className="py-20 lg:py-28">
      <div className="container-wide">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="inline-block mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Why We're Different
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Cognitive Architecture,<br />Not Just Storage
          </h2>
          <p className="text-lg text-muted-foreground">
            Most memory tools are glorified text files — store everything, retrieve by keyword, hope for the best. 
            Local Memory models how knowledge actually works.
          </p>
        </div>

        {/* Comparison callout */}
        <div className="mx-auto max-w-2xl mb-16">
          <div className="rounded-2xl border border-border bg-card/50 p-6 text-center">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="text-muted-foreground">
                <div className="font-medium">Other tools</div>
                <div className="text-xs">Store → Retrieve</div>
              </div>
              <div className="text-muted-foreground">→</div>
              <div>
                <div className="font-medium">Local Memory</div>
                <div className="text-xs">Observe → Learn → Understand</div>
              </div>
            </div>
          </div>
        </div>

        {/* Differentiator cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {differentiators.map((diff, index) => (
            <DifferentiatorCard key={index} {...diff} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            The question isn't "what features do you have?" — it's "how do you model knowledge?"
          </p>
          <a 
            href="#demo" 
            className="btn-secondary"
          >
            See it in action
          </a>
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
