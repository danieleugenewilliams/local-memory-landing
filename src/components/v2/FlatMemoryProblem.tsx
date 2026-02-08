const FlatMemoryProblem = () => {
  return (
    <section className="section bg-secondary/30">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Why Other Memory Tools Fail
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Flat memory is broken by design
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            You tried the free tools. They worked at first. Then they stopped working.
            Here's why.
          </p>
        </div>

        {/* The problems */}
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Problem 1: Scale */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold mb-3">Drowns at Scale</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <span className="font-mono text-foreground">100 memories:</span> Works great
                </p>
                <p>
                  <span className="font-mono text-foreground">1,000 memories:</span> Getting noisy
                </p>
                <p>
                  <span className="font-mono text-foreground">10,000 memories:</span> Chaos
                </p>
              </div>
              <p className="mt-4 text-sm">
                When everything has the same weight, the signal drowns in noise.
              </p>
            </div>

            {/* Problem 2: Contradictions */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold mb-3">Contradictions Accumulate</h3>
              <div className="space-y-2 text-sm font-mono text-muted-foreground">
                <p>Jan: <span className="text-foreground">"Use React"</span></p>
                <p>Mar: <span className="text-foreground">"Vue migration complete"</span></p>
                <p className="text-[hsl(var(--brand-red))]">→ Both stored. AI picks randomly.</p>
              </div>
              <p className="mt-4 text-sm">
                Append-only memory has no mechanism for truth. Old and new coexist forever.
              </p>
            </div>

            {/* Problem 3: No uncertainty */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold mb-3">Confident Hallucination</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Query: <span className="font-mono text-foreground">"API rate limit?"</span></p>
                <p>Memory: <span className="italic">no results</span></p>
                <p className="text-[hsl(var(--brand-red))]">→ "Probably 100 req/min" (made up)</p>
              </div>
              <p className="mt-4 text-sm">
                No way to track unknowns. When nothing's found, AI guesses instead of admitting uncertainty.
              </p>
            </div>

            {/* Problem 4: No lifecycle */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold mb-3">Memory Graveyard</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="font-mono text-foreground">"Use Node 16"</span> <span className="text-xs">(2 years old)</span></p>
                <p><span className="font-mono text-foreground">"John handles deploys"</span> <span className="text-xs">(John left)</span></p>
                <p><span className="font-mono text-foreground">"API at /v1/users"</span> <span className="text-xs">(now /v2)</span></p>
              </div>
              <p className="mt-4 text-sm">
                Memories never die. Every stale fact pollutes your results forever.
              </p>
            </div>
          </div>

          {/* The insight */}
          <div className="mt-12 rounded-xl border-2 border-[hsl(var(--brand-blue))/50] bg-[hsl(var(--brand-blue))/5] p-6 md:p-8 text-center">
            <h3 className="text-xl font-bold mb-4">
              You don't need better storage. You need a knowledge layer.
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Files, notes, and flat memory tools are for
              <span className="text-foreground font-medium"> working</span>.
              Local Memory is for
              <span className="text-foreground font-medium"> knowing</span> — where
              observations mature into learnings, learnings into patterns, and patterns into understanding.
            </p>
            <p className="mt-4 text-lg font-medium">
              Complementary, not competing. A layer above your files.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlatMemoryProblem;
