import { Helmet } from "react-helmet-async";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollToTop from "@/components/ScrollToTop";

/* Terms of Service — redesigned from Terms.dc.html (warm-paper theme).
   TOC + numbered sections are derived from the SECTIONS data below so the
   numbering and the sidebar links can never drift apart. */

const LAST_UPDATED = "July 5, 2026";

interface Section {
  title: string;
  anchor: string;
  paras: string[];
  bullets?: string[];
}

const SECTIONS: Section[] = [
  {
    title: "Agreement",
    anchor: "agreement",
    paras: [
      "By purchasing or using Local Memory, you agree to these terms. If you don't agree, don't use the software.",
    ],
  },
  {
    title: "License",
    anchor: "license",
    paras: [
      "You receive a personal, non-transferable, non-exclusive license to use Local Memory for individual or business purposes. Your license key never expires and can reactivate the software anytime.",
      "You cannot:",
    ],
    bullets: [
      "Share, distribute, or resell the software or license keys",
      "Reverse engineer or decompile the software",
      "Create derivative works",
    ],
  },
  {
    title: "Payment & refunds",
    anchor: "payment",
    paras: [
      "Payments are processed through Stripe. Local Memory is a one-time purchase — no subscriptions, no recurring fees. Prices are in USD and may change, but purchased licenses remain valid regardless of future pricing.",
      "If Local Memory isn't for you, request a refund within 30 days of purchase via our Discord community. You're responsible for applicable taxes based on your location.",
    ],
  },
  {
    title: "Delivery",
    anchor: "delivery",
    paras: [
      "After purchase, your license key is shown on the confirmation page and emailed to you along with download links. Install via npm (npm install -g local-memory-mcp) or download the binary, then activate with: local-memory license activate [KEY] --accept-terms.",
      "Lost your key? Reply to your purchase email or contact support via Discord.",
    ],
  },
  {
    title: "Acceptable use",
    anchor: "use",
    paras: [
      "Use Local Memory for legitimate purposes: personal productivity, business, education, research, creative projects.",
      "Don't use it for illegal activities, violating regulations, harming others, or processing malicious content.",
    ],
  },
  {
    title: "Intellectual property",
    anchor: "ip",
    paras: [
      "Local Memory and all related IP remain the property of its creators. Your license doesn't transfer ownership.",
    ],
  },
  {
    title: "Disclaimers",
    anchor: "disclaimers",
    paras: [
      'Local Memory is provided "as-is". We work to keep it reliable, but can\'t guarantee it will always be error-free.',
      "We're not liable for indirect damages from using the software. Back up your important data regularly.",
    ],
  },
  {
    title: "Termination",
    anchor: "termination",
    paras: [
      "Licenses last until terminated. Break these terms, and your license ends immediately — stop using the software and delete all copies.",
    ],
  },
  {
    title: "Updates",
    anchor: "updates",
    paras: [
      "Software updates are subject to these same terms. We may modify these terms at any time — changes are posted here with a new date. Continued use means acceptance.",
    ],
  },
  {
    title: "Legal",
    anchor: "legal",
    paras: [
      "These terms are governed by applicable law. Disputes will be resolved through appropriate legal channels. If any part is unenforceable, the rest still applies.",
    ],
  },
];

const num = (i: number) => String(i + 1).padStart(2, "0");

const TermsNew = () => {
  return (
    <div className="lm-theme min-h-screen">
      <Helmet>
        <title>Terms of Service — Local Memory</title>
        <meta name="description" content="The terms that govern your purchase and use of Local Memory." />
      </Helmet>

      <SiteHeader />

      <main>
        {/* Header */}
        <div className="mx-auto max-w-[1080px] border-b border-lm-line px-6 pb-12 pt-[72px] sm:px-10 lg:px-16">
          <div className="mb-[18px] font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
            Legal
          </div>
          <h1 className="mb-3.5 font-serif text-[40px] font-normal leading-[1.1] tracking-[-0.02em] text-lm-ink sm:text-[46px]">
            Terms of Service
          </h1>
          <div className="font-plex text-[13px] text-lm-muted">
            Last updated: {LAST_UPDATED} ·{" "}
            <a href="/privacy" className="text-lm-amber hover:underline">
              Privacy Policy →
            </a>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto grid max-w-[1080px] items-start gap-16 px-6 pb-[88px] pt-14 sm:px-10 lg:grid-cols-[220px_1fr] lg:px-16">
          {/* TOC */}
          <nav className="sticky top-24 hidden flex-col gap-0.5 lg:flex">
            {SECTIONS.map((sec, i) => (
              <a
                key={sec.anchor}
                href={`#${sec.anchor}`}
                className="flex gap-2.5 py-1.5 font-plex text-[12.5px] text-lm-muted transition-colors hover:text-lm-amber"
              >
                <span className="text-lm-line-2">{num(i)}</span> {sec.title}
              </a>
            ))}
          </nav>

          {/* Sections */}
          <div className="max-w-[62ch]">
            {SECTIONS.map((sec, i) => (
              <section key={sec.anchor} id={sec.anchor} className="mb-12 scroll-mt-24">
                <div className="mb-3.5 flex items-baseline gap-3.5">
                  <span className="font-plex text-[13px] text-lm-amber">{num(i)}</span>
                  <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-lm-ink">
                    {sec.title}
                  </h2>
                </div>
                {sec.paras.map((p) => (
                  <p key={p} className="mb-3.5 text-[15px] leading-[1.7] text-lm-stone">
                    {p}
                  </p>
                ))}
                {sec.bullets?.map((b) => (
                  <div key={b} className="mb-2 flex gap-3 text-[14.5px] leading-[1.65] text-lm-stone">
                    <span className="shrink-0 text-lm-amber">→</span> <span>{b}</span>
                  </div>
                ))}
              </section>
            ))}

            {/* Questions card */}
            <div className="rounded-xl bg-lm-ink px-[30px] py-[26px] text-[#f3ead9]">
              <div className="mb-2 font-serif text-[20px] font-normal">Questions about these terms?</div>
              <div className="text-[13.5px] leading-[1.6] text-[#b8ad99]">
                Ask in our{" "}
                <a
                  href="https://discord.gg/rMmn8xP3fZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lm-gold hover:underline"
                >
                  Discord community
                </a>{" "}
                — it's the fastest (and only) support channel.
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter minimal />
      <ScrollToTop />
    </div>
  );
};

export default TermsNew;
