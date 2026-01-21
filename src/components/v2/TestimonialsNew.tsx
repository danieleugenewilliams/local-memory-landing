const testimonials = [
  {
    quote:
      "I added a single line to my agentic workflow that forces AI to save every decision and fix to Local Memory. Now during refactors, it searches memories for improvements automatically.",
    highlight:
      "My code reviews went from 'why did we do this?' to 'here's the context from when we decided.'",
    author: "Jamie S.",
    role: "Senior Developer",
    rating: 5,
  },
  {
    quote:
      "Latency after warm-up: ~0.5s store, ~0.2s search, ~1.0s relate.",
    highlight:
      "Local Memory boosted my productivity with Construct Buddy more than any other tool I've added this year. The response times are production-ready.",
    author: "Devontae W.",
    role: "Senior Developer",
    rating: 5,
  },
  {
    quote:
      "I was skeptical. Another AI memory tool? But this one actually works.",
    highlight:
      "When the tools are prompted well, the results are amazing — minus the hallucinations. That's the key difference: it remembers the real context, not made-up nonsense.",
    author: "Neil P.",
    role: "Senior Engineer",
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "text-[hsl(var(--brand-amber))]"
              : "text-muted-foreground/30"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialsNew = () => {
  return (
    <section className="section-sm bg-background">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Don't take our word for it
          </h2>
        </div>

        {/* Testimonial grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              {/* Star rating */}
              <StarRating rating={testimonial.rating} />

              {/* Quote */}
              <blockquote className="mt-4 flex-1">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  "{testimonial.quote}"
                </p>
                {testimonial.highlight && (
                  <p className="mt-4 text-sm font-medium leading-relaxed text-foreground">
                    {testimonial.highlight}
                  </p>
                )}
              </blockquote>

              {/* Author */}
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
