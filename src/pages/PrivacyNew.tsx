import { Helmet } from "react-helmet-async";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollToTop from "@/components/ScrollToTop";

/* Privacy Policy — redesigned from Privacy.dc.html (warm-paper theme).
   Content is validated against the real stack: the marketing site loads
   Google Analytics (index.html, G-6PENS9FSFW), payments go through Stripe,
   purchase emails go through Resend (lambda-email-webhook), and Discord is the
   community. The Local Memory *software* itself is telemetry-free — that claim
   is about the app, not this website, so both are stated distinctly. */

const LAST_UPDATED = "July 5, 2026";

interface CollectRow {
  source: string;
  what: string;
}

const COLLECT: CollectRow[] = [
  {
    source: "Our website",
    what: "Anonymous usage analytics via Google Analytics — pages viewed, referrers, and rough device/region. No account, no profile, and no data from the Local Memory software.",
  },
  {
    source: "Payments",
    what: "Stripe handles everything. We never see your payment details — only the email needed to deliver your license key.",
  },
  {
    source: "The software",
    what: "Nothing leaves your machine. Local Memory runs entirely locally — your memories, your data, your hardware. No telemetry.",
  },
];

interface ThirdParty {
  name: string;
  desc: string;
  link: string;
}

const THIRD_PARTIES: ThirdParty[] = [
  {
    name: "Stripe",
    desc: "Processes payments securely. We never access your payment information.",
    link: "https://stripe.com/privacy",
  },
  {
    name: "Resend",
    desc: "Delivers your license key email after purchase. Your email is used for delivery only.",
    link: "https://resend.com/legal/privacy-policy",
  },
  {
    name: "Google Analytics",
    desc: "Aggregate, anonymous website traffic — which pages get visited. IP anonymization is on.",
    link: "https://policies.google.com/privacy",
  },
  {
    name: "Discord",
    desc: "Optional community for support. The software works without it.",
    link: "https://discord.com/privacy",
  },
];

const PrivacyNew = () => {
  return (
    <div className="lm-theme min-h-screen">
      <Helmet>
        <title>Privacy Policy — Local Memory</title>
        <meta
          name="description"
          content="How Local Memory handles your data: the software runs entirely on your machine, and the website collects only anonymous analytics."
        />
      </Helmet>

      <SiteHeader />

      <main>
        {/* Header */}
        <div className="mx-auto max-w-[1080px] border-b border-lm-line px-6 pb-12 pt-[72px] sm:px-10 lg:px-16">
          <div className="mb-[18px] font-plex text-xs font-medium uppercase tracking-[0.08em] text-lm-amber">
            Legal
          </div>
          <h1 className="mb-3.5 font-serif text-[40px] font-normal leading-[1.1] tracking-[-0.02em] text-lm-ink sm:text-[46px]">
            Privacy Policy
          </h1>
          <div className="font-plex text-[13px] text-lm-muted">
            Last updated: {LAST_UPDATED} ·{" "}
            <a href="/terms" className="text-lm-amber hover:underline">
              Terms of Service →
            </a>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-[1080px] px-6 pb-[88px] pt-14 sm:px-10 lg:px-16">
          {/* The short version */}
          <div className="mb-14 max-w-[720px] rounded-2xl bg-lm-ink px-[38px] py-[34px] text-[#f3ead9]">
            <div className="mb-3 font-plex text-[11px] font-medium uppercase tracking-[0.08em] text-lm-gold">
              The short version
            </div>
            <div className="font-serif text-[26px] font-normal leading-[1.35] tracking-[-0.01em]">
              Your Local Memory data never leaves your machine. On the website we use anonymous Google
              Analytics, Stripe for payments, Resend for purchase emails, and Discord for community —{" "}
              <em className="italic text-lm-gold">that's it.</em>
            </div>
          </div>

          <div className="max-w-[62ch]">
            {/* 01 · What we collect */}
            <div className="mb-12">
              <div className="mb-[18px] flex items-baseline gap-3.5">
                <span className="font-plex text-[13px] text-lm-amber">01</span>
                <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-lm-ink">
                  What we collect
                </h2>
              </div>
              {COLLECT.map((row) => (
                <div
                  key={row.source}
                  className="grid grid-cols-[110px_1fr] gap-4 border-b border-lm-line py-3.5 sm:grid-cols-[150px_1fr] sm:gap-[18px]"
                >
                  <span className="font-plex text-[12.5px] font-medium text-lm-ink">{row.source}</span>
                  <span className="text-[14.5px] leading-[1.6] text-lm-stone">{row.what}</span>
                </div>
              ))}
            </div>

            {/* 02 · Third-party services */}
            <div className="mb-12">
              <div className="mb-[18px] flex items-baseline gap-3.5">
                <span className="font-plex text-[13px] text-lm-amber">02</span>
                <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-lm-ink">
                  Third-party services
                </h2>
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {THIRD_PARTIES.map((tp) => (
                  <div key={tp.name} className="rounded-xl border border-lm-line bg-lm-cream px-[22px] py-5">
                    <div className="mb-2 font-serif text-base font-medium text-lm-ink">{tp.name}</div>
                    <p className="mb-3 text-[13px] leading-[1.6] text-lm-stone-2">{tp.desc}</p>
                    <a
                      href={tp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-plex text-[11.5px] font-medium text-lm-amber hover:underline"
                    >
                      Their policy →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* 03 · Security */}
            <div className="mb-12">
              <div className="mb-3.5 flex items-baseline gap-3.5">
                <span className="font-plex text-[13px] text-lm-amber">03</span>
                <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-lm-ink">Security</h2>
              </div>
              <p className="mb-3.5 text-[15px] leading-[1.7] text-lm-stone">
                Our approach: the best way to protect your data is to not collect it.
              </p>
              <p className="text-[15px] leading-[1.7] text-lm-stone">
                The website uses HTTPS. Payments go through Stripe's secure infrastructure. Your Local Memory
                data never touches our servers — it exists only on your computer.
              </p>
            </div>

            {/* 04 · Policy updates */}
            <div className="mb-12">
              <div className="mb-3.5 flex items-baseline gap-3.5">
                <span className="font-plex text-[13px] text-lm-amber">04</span>
                <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-lm-ink">
                  Policy updates
                </h2>
              </div>
              <p className="text-[15px] leading-[1.7] text-lm-stone">
                If we update this policy, changes appear here with a new date.
              </p>
            </div>

            {/* Questions card */}
            <div className="rounded-xl bg-lm-ink px-[30px] py-[26px] text-[#f3ead9]">
              <div className="mb-2 font-serif text-[20px] font-normal">Questions about this policy?</div>
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

export default PrivacyNew;
