import { Link } from "react-router-dom";
import { useEffect } from "react";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";
import { handleStripePayment } from "@/lib/payment";
import { trackAddToCart, trackCTAClick } from "@/lib/analytics";

const PaymentNew = () => {
  useEffect(() => {
    trackAddToCart();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-tight relative">
          <div className="flex min-h-[70vh] flex-col items-center justify-center py-16 text-center md:py-24">
            
            {/* Price card */}
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
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
                  <span className="mt-0.5 text-[hsl(var(--brand-green))]">✓</span>
                  <span>11 MCP tools + 27 REST endpoints + CLI</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[hsl(var(--brand-green))]">✓</span>
                  <span>Works with Claude, GPT, Gemini, Cursor, Cline</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[hsl(var(--brand-green))]">✓</span>
                  <span>100% local — your data never leaves your machine</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[hsl(var(--brand-green))]">✓</span>
                  <span>Unlimited usage, forever</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[hsl(var(--brand-green))]">✓</span>
                  <span>All future updates included</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[hsl(var(--brand-green))]">✓</span>
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

            {/* Additional info */}
            <div className="mt-12 flex flex-col items-center gap-6 text-sm text-muted-foreground sm:flex-row sm:gap-8">
              <Link 
                to="/features" 
                className="hover:text-foreground"
                onClick={() => trackCTAClick("payment", "See Features", "/features")}
              >
                See all features →
              </Link>
              <Link 
                to="/docs" 
                className="hover:text-foreground"
                onClick={() => trackCTAClick("payment", "Read Docs", "/docs")}
              >
                Read the docs →
              </Link>
              <Link 
                to="/architecture" 
                className="hover:text-foreground"
                onClick={() => trackCTAClick("payment", "View Architecture", "/architecture")}
              >
                View architecture →
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span>One-time purchase</span>
              <span className="hidden sm:inline">·</span>
              <span>No cloud dependency</span>
              <span className="hidden sm:inline">·</span>
              <span>No data collection</span>
            </div>

          </div>
        </div>
      </section>

      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default PaymentNew;
