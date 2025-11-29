const testimonials = [
  {
    quote:
      "I love that this tool just works, and when the tools are prompted well... it gets amazing results minus the hallucinations.",
    author: "Neil P.",
    role: "Senior Engineer",
  },
  {
    quote:
      "I added a line in my agentic-code-workflow that forces AI to save decisions and fixes to local memory and then during refactor to search the memories for improvements.",
    author: "Jamie S.",
    role: "Senior Developer",
  },
  {
    quote:
      "Local Memory MCP has really helped boost my productivity with Construct Buddy. Thanks so much! Latency is solid after warm-up (~0.5s store EN, ~0.2s store ES, ~0.3s search, ~1.0s relate, ~1.0-1.3s stats).",
    author: "Devontae W.",
    role: "Senior Developer",
  },
];

const TestimonialsNew = () => {
  return (
    <section className="section-sm bg-background">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Developers shipping with Local Memory
          </h2>
        </div>

        {/* Testimonial grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                "{testimonial.quote}"
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-green))]" />
                <div>
                  <p className="text-sm font-medium">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsNew;
