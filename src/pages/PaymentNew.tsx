import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Check } from "lucide-react";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";
import { handleStripePayment } from "@/lib/payment";
import { trackAddToCart, trackCTAClick, trackQualifyLead } from "@/lib/analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const testimonials = [
  {
    quote: "It's much simpler to set up than similar memory tools. That's honestly what I'm liking about it.",
    author: "electric_espeon",
    source: "Discord",
  },
  {
    quote: "I actually think it's great value for money and you improve upon suggestions. Well done!",
    author: "Jamie",
    source: "Discord",
  },
  {
    quote: "I find it amazing for long running Claude Code sessions.",
    author: "EstablishedMando",
    source: "Discord",
  },
];

const faqs = [
  {
    question: "What's your refund policy?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with Local Memory for any reason, contact us within 30 days of purchase for a full refund—no questions asked.",
  },
  {
    question: "What's included in my purchase?",
    answer: "You get the complete Local Memory system: 11 MCP tools, 27 REST API endpoints, CLI access, all integrations (Claude, GPT, Gemini, Cursor, Cline), and cross-platform support for macOS, Windows, and Linux. Plus free updates and bug fixes.",
  },
  {
    question: "How do I get support?",
    answer: "Join our Discord community for direct support, feature discussions, and tips from other developers. We're active and responsive—most questions get answered within hours.",
  },
  {
    question: "Is this for personal or commercial use?",
    answer: "This license is for personal use. A commercial/team license is coming soon. If you need commercial licensing now, reach out to us on Discord.",
  },
  {
    question: "How do updates work?",
    answer: "All future updates are included with your one-time purchase. When we release new features or improvements, you'll have immediate access—no additional payment required.",
  },
];

const PaymentNew = () => {
  useEffect(() => {
    trackAddToCart();
    trackQualifyLead();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero section with price card */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-tight relative">
          <div className="flex min-h-[60vh] flex-col items-center justify-center py-12 text-center md:py-20">

            {/* Price card */}
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 animate-in">
              {/* Money-back guarantee badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--brand-green)/0.3)] bg-[hsl(var(--brand-green)/0.1)] px-4 py-1.5 text-sm text-[hsl(var(--brand-green))]">
                <Shield className="h-4 w-4" />
                <span>30-day money-back guarantee</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Local Memory
              </h1>
              <p className="mt-2 text-muted-foreground">
                Personal License
              </p>

              <div className="my-8">
                <span className="text-5xl font-bold">$49</span>
                <span className="ml-2 text-muted-foreground">one-time</span>
              </div>

              {/* What's included */}
              <ul className="mb-8 space-y-3 text-left text-sm">
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--brand-green))]" />
                  <span>11 MCP tools + 27 REST endpoints + CLI</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--brand-green))]" />
                  <span>Works with Claude, GPT, Gemini, Cursor, Cline</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--brand-green))]" />
                  <span>100% local — your data never leaves your machine</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--brand-green))]" />
                  <span>Unlimited usage, forever</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--brand-green))]" />
                  <span>All future updates included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--brand-green))]" />
                  <span>macOS, Windows, and Linux</span>
                </li>
              </ul>

              {/* CTA */}
              <button
                onClick={() => {
                  trackCTAClick("payment", "Purchase", "/stripe");
                  handleStripePayment();
                }}
                className="btn-primary w-full text-base"
              >
                Purchase with Stripe
              </button>

              <p className="mt-4 text-xs text-muted-foreground">
                Secure payment via Stripe. Instant access after purchase.
              </p>
            </div>

            {/* Pricing comparison */}
            <div className="mt-8 rounded-xl border border-border bg-card/50 px-6 py-4 animate-in animate-in-delay-1">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">$49 one-time</span>
                {" "}vs{" "}
                <span className="line-through">$240+/year</span>
                {" "}for cloud alternatives
              </p>
            </div>

            {/* Additional links */}
            <div className="mt-8 flex flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-8 animate-in animate-in-delay-2">
              <Link
                to="/features"
                className="hover:text-foreground transition-colors"
                onClick={() => trackCTAClick("payment", "See Features", "/features")}
              >
                See all features →
              </Link>
              <Link
                to="/docs"
                className="hover:text-foreground transition-colors"
                onClick={() => trackCTAClick("payment", "Read Docs", "/docs")}
              >
                Read the docs →
              </Link>
              <Link
                to="/architecture"
                className="hover:text-foreground transition-colors"
                onClick={() => trackCTAClick("payment", "View Architecture", "/architecture")}
              >
                View architecture →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="section-sm border-t border-border">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              What developers are saying
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col rounded-xl border border-border bg-card p-6"
              >
                <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-green))]" />
                  <div>
                    <p className="text-sm font-medium">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.source}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="section-sm border-t border-border">
        <div className="container-tight">
          <div className="mb-10 text-center">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Frequently asked questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-sm hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Final trust elements */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span>One-time purchase</span>
            <span className="hidden sm:inline">·</span>
            <span>No subscription</span>
            <span className="hidden sm:inline">·</span>
            <span>No cloud dependency</span>
            <span className="hidden sm:inline">·</span>
            <span>No data collection</span>
          </div>
        </div>
      </section>

      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default PaymentNew;
