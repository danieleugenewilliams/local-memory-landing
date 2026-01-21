const stages = [
  {
    time: "Day 1",
    title: "Installation",
    description:
      "Two-minute setup. Your first memory saved. You tell Claude about your auth patterns. You tell it about your API conventions. This time, it actually remembers.",
    color: "brand-blue",
  },
  {
    time: "Week 1",
    title: "Recognition",
    description:
      "Your AI starts finishing your sentences. \"Based on your preference for JWT with 24h expiry...\" it begins, without you explaining anything. It remembers the Redis session caching decision. It knows why you chose PostgreSQL over MongoDB. You stop explaining. You start building.",
    color: "brand-green",
  },
  {
    time: "Month 1",
    title: "Intelligence",
    description:
      "Patterns emerge across projects. That debugging insight from Project A? It helps you in Project B. Your AI notices the same error pattern and suggests the fix you discovered last month. You're not just remembering. You're accumulating advantage.",
    color: "brand-amber",
  },
  {
    time: "Quarter 1",
    title: "Institution",
    description:
      "Your knowledge becomes infrastructure. New team member joins. Instead of 3 weeks of \"let me explain how we do things,\" your AI walks them through every decision, every convention, every lesson learned. You've built institutional memory that doesn't quit, doesn't forget, and doesn't get sick.",
    color: "brand-purple",
  },
];

const TransformationTimeline = () => {
  return (
    <section className="section bg-background">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            From day one to unfair advantage
          </h2>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:block md:-translate-x-1/2" />

            {/* Timeline items */}
            <div className="space-y-12">
              {stages.map((stage, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col gap-4 md:flex-row ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-0 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background md:left-1/2 md:block"
                    style={{
                      backgroundColor: `hsl(var(--${stage.color}))`,
                    }}
                  />

                  {/* Content */}
                  <div
                    className={`flex-1 rounded-xl border border-border bg-card p-6 md:max-w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    {/* Mobile dot */}
                    <div
                      className="mb-4 h-3 w-3 rounded-full md:hidden"
                      style={{
                        backgroundColor: `hsl(var(--${stage.color}))`,
                      }}
                    />

                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: `hsl(var(--${stage.color}))`,
                        }}
                      >
                        {stage.time}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold">{stage.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 md:block md:max-w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Compound Effect */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h3 className="text-xl font-semibold">The Compound Effect</h3>
          <div className="mt-6 space-y-2 text-muted-foreground">
            <p>Every explanation you save becomes searchable.</p>
            <p>Every pattern you teach becomes reusable.</p>
            <p>Every decision you document becomes institutional knowledge.</p>
          </div>
          <p className="mt-6 text-lg font-medium">
            This isn't a tool. It's a competitive moat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TransformationTimeline;
