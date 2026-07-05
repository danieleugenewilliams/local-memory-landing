import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useCheckout } from "@/contexts/CheckoutContext";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollToTop from "@/components/ScrollToTop";

/* Pricing — redesigned from Pricing.dc.html.
   Testimonials are the genuine Discord quotes (verbatim from PaymentNew.tsx). */

const CONTAINER = "mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16 box-border";

const PRICE_FEATURES = [
  "24 MCP tools + full REST API + CLI",
  "Works with Claude, GPT, Gemini, Cursor, Cline",
  "100% local — your data never leaves your machine",
  "Unlimited usage, all future updates included",
  "macOS, Windows, and Linux",
];

const TESTIMONIALS = [
  {
    quote: "It's much simpler to set up than similar memory tools. That's honestly what I'm liking about it.",
    author: "electric_espeon · Discord",
  },
  {
    quote: "I actually think it's great value for money and you improve upon suggestions. Well done!",
    author: "Jamie · Discord",
  },
  {
    quote: "I find it amazing for long running Claude Code sessions.",
    author: "EstablishedMando · Discord",
  },
];

const FAQS = [
  {
    q: "What's your refund policy?",
    a: "We offer a 5-day money-back guarantee. If you're not satisfied with Local Memory for any reason, contact us within 5 days of purchase for a full refund — no questions asked.",
  },
  {
    q: "What's included in my purchase?",
    a: "You get the complete Local Memory system: 24 MCP tools, the full REST API, CLI access, all integrations (Claude, GPT, Gemini, Cursor, Cline), and cross-platform support for macOS, Windows, and Linux. Plus free updates and bug fixes.",
  },
  {
    q: "How do I get support?",
    a: "Join our Discord community for direct support, feature discussions, and tips from other developers. We're active and responsive — most questions get answered within hours.",
  },
  {
    q: "Is this for personal or commercial use?",
    a: "This license is for personal use. A commercial/team license is coming soon. If you need commercial licensing now, reach out to us on Discord.",
  },
  {
    q: "How do updates work?",
    a: "All future updates are included with your one-time purchase. When we release new features or improvements, you'll have immediate access — no additional payment required.",
  },
];

const Pricing = () => {
  const { openCheckout } = useCheckout();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="lm-theme min-h-screen">
      <Helmet>
        <title>Pricing — Local Memory</title>
        <meta
          name="description"
          content="Local Memory is $49, once — the database is on your disk, and the license never expires. No subscription, no cloud lock-in."
        />
      </Helmet>

      <SiteHeader />

      <main>
        {/* Hero + price card */}
        <section
          id="buy"
          className={`${CONTAINER} grid items-center gap-[72px] pb-[76px] pt-[84px] lg:grid-cols-[1.05fr_0.95fr]`}
        >
          <div>
            <div className="mb-5 font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
              Pricing
            </div>
            <h1 className="mb-[22px] text-balance font-serif text-[44px] font-normal leading-[1.08] tracking-[-0.02em] text-lm-ink sm:text-[54px]">
              One price. <em className="italic text-lm-amber">No meter running.</em>
            </h1>
            <p className="mb-7 max-w-[46ch] text-[17px] leading-[1.65] text-lm-stone">
              Cloud memory subscriptions cost $240+ a year and hold your knowledge hostage. Local
              Memory is $49, once — the database is on your disk, and the license never expires.
            </p>
            <div className="flex flex-col gap-3 font-plex text-[13px] leading-relaxed text-lm-stone">
              <div className="flex gap-3">
                <span className="text-lm-amber">→</span>
                <span>
                  $49 one-time <span className="text-lm-muted">vs</span>{" "}
                  <span className="text-lm-muted line-through">$240+/year</span> for cloud alternatives
                </span>
              </div>
              <div className="flex gap-3">
                <span className="text-lm-amber">→</span> Pays for itself the first time it remembers a
                root cause
              </div>
              <div className="flex gap-3">
                <span className="text-lm-amber">→</span> 5-day money-back guarantee, no questions asked
              </div>
            </div>
          </div>

          {/* Price card */}
          <div className="rounded-2xl border border-lm-line bg-lm-sand px-[38px] py-9 shadow-[0_24px_48px_-24px_rgba(31,27,22,0.25)]">
            <div className="mb-[22px] inline-flex items-center gap-2 rounded-full border border-lm-line-2 bg-lm-cream px-3.5 py-1.5 font-plex text-[11.5px] font-medium text-lm-amber">
              <span className="h-1.5 w-1.5 rounded-full bg-lm-amber" />
              5-day money-back guarantee
            </div>
            <div className="mb-0.5 font-serif text-xl font-medium text-lm-ink">Local Memory</div>
            <div className="mb-[22px] font-plex text-[13px] text-lm-muted">Personal license</div>
            <div className="mb-[26px] flex items-baseline gap-2.5">
              <span className="font-serif text-[56px] tracking-[-0.02em] text-lm-ink">$49</span>
              <span className="font-plex text-[13px] text-lm-muted">one-time · forever</span>
            </div>
            <div className="mb-7 flex flex-col gap-2.5 text-sm leading-snug text-lm-stone">
              {PRICE_FEATURES.map((f) => (
                <div key={f} className="flex gap-2.5">
                  <span className="text-lm-amber">✓</span> {f}
                </div>
              ))}
            </div>
            <button
              onClick={openCheckout}
              className="block w-full rounded-[9px] bg-lm-ink px-6 py-[15px] text-center text-[15px] font-semibold text-lm-cream transition-colors hover:bg-lm-ink-soft"
            >
              Purchase with Stripe
            </button>
            <div className="mt-3.5 text-center font-plex text-[11.5px] text-lm-muted">
              Secure payment via Stripe · instant license key
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-lm-line bg-lm-sand">
          <div className={`${CONTAINER} pb-16 pt-[60px]`}>
            <div className="mb-[30px] text-center font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
              What developers are saying
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.author}
                  className="flex flex-col gap-3.5 rounded-xl border border-lm-line bg-lm-cream px-[26px] py-6"
                >
                  <p className="flex-1 font-serif text-[15px] italic leading-snug text-lm-ink">
                    "{t.quote}"
                  </p>
                  <div className="font-plex text-xs text-lm-muted">{t.author}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-lm-line">
          <div className="mx-auto max-w-[820px] px-6 pb-20 pt-[68px] sm:px-10 lg:px-16">
            <h2 className="mb-9 text-center font-serif text-[34px] font-normal leading-[1.15] tracking-[-0.02em] text-lm-ink">
              Frequently asked questions
            </h2>
            <div className="flex flex-col">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={faq.q} className="border-b border-lm-line">
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-5 px-1 py-5 text-left transition-colors hover:text-lm-amber"
                    >
                      <span className="font-serif text-[16.5px] font-medium text-lm-ink">{faq.q}</span>
                      <span className="shrink-0 font-plex text-lg text-lm-amber">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <p className="max-w-[64ch] px-1 pb-[22px] text-[14.5px] leading-[1.65] text-lm-stone">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4 font-plex text-xs text-lm-muted">
              <span>One-time purchase</span>
              <span>·</span>
              <span>No subscription</span>
              <span>·</span>
              <span>No cloud dependency</span>
              <span>·</span>
              <span>No data collection</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter
        minimal
        note={
          <>
            Questions?{" "}
            <a href="https://discord.gg/rMmn8xP3fZ" className="text-lm-amber hover:underline">
              Discord
            </a>
          </>
        }
      />
      <ScrollToTop />
    </div>
  );
};

export default Pricing;
