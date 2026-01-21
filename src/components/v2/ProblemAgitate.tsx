const problems = [
  {
    title: "The 15-Minute Ritual",
    quote: "Let me explain our architecture again...",
    description:
      "Every session starts the same way. You explain your auth patterns. Your API conventions. Why you made that database decision six months ago. Your AI nods along, pretending it doesn't have amnesia.",
    stat: "15 minutes per session. 5 sessions a day. That's over 6 hours a week re-teaching your tools what they should already know.",
  },
  {
    title: "Knowledge That Walks Out the Door",
    quote: null,
    description:
      "You spent three hours debugging that WebSocket race condition. You finally fixed it. You explained why the obvious solution made things worse. Then you typed /clear. Gone. All of it. Tomorrow you'll rediscover the same bug and have the same conversation from scratch.",
    stat: "Your debugging insights, your architectural decisions, your hard-won patterns — they're training data for corporations, not assets for you.",
  },
  {
    title: "The AI You Can't Trust",
    quote: "Didn't we already establish this?",
    description:
      "You've told Claude your testing philosophy. You've told GPT your deployment preferences. You've told Cursor your code style. They remember nothing. So you stop trusting them with anything important. You keep them at arm's length. And you never get the AI partnership you were promised.",
    stat: null,
  },
];

const ProblemAgitate = () => {
  return (
    <section className="section bg-background">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[hsl(var(--brand-amber))]">
            The Real Cost of Context Amnesia
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            You're bleeding time. Every single session.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Every time you start a new conversation, you pay the context tax.
          </p>
        </div>

        {/* Problem cards */}
        <div className="mx-auto max-w-4xl space-y-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold md:text-2xl">
                {problem.title}
              </h3>

              {problem.quote && (
                <p className="mt-4 border-l-2 border-[hsl(var(--brand-amber))] pl-4 italic text-muted-foreground">
                  "{problem.quote}"
                </p>
              )}

              <p className="mt-4 text-muted-foreground leading-relaxed">
                {problem.description}
              </p>

              {problem.stat && (
                <p className="mt-4 font-medium text-foreground">
                  {problem.stat}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* The Math section */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="rounded-xl border-2 border-[hsl(var(--brand-red))/50] bg-[hsl(var(--brand-red))/5] p-6 md:p-8">
            <h3 className="text-xl font-bold text-[hsl(var(--brand-red))] md:text-2xl">
              The Math
            </h3>
            <p className="mt-4 text-lg font-medium">
              The average developer loses $50-100 per day to context re-explanation.
            </p>
            <p className="mt-4 font-mono text-sm text-muted-foreground">
              10-15 min × 5-8 sessions × $50-75/hr = $42-100 daily waste
            </p>
            <p className="mt-4 text-lg">
              That's{" "}
              <span className="font-bold text-[hsl(var(--brand-red))]">
                $10,000-25,000 per year
              </span>
              . Gone.
            </p>
            <p className="mt-4 text-lg font-medium">
              Local Memory costs{" "}
              <span className="text-[hsl(var(--brand-green))]">$49</span>. Once.
            </p>
          </div>
        </div>

        {/* Transition */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg text-muted-foreground">
            There's a better way. Your context is your competitive advantage.{" "}
            <span className="font-medium text-foreground">
              It's time to stop giving it away.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemAgitate;
