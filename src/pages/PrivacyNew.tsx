import { Link } from "react-router-dom";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";

const PrivacyNew = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-tight relative">
          <div className="flex flex-col items-center justify-center py-16 text-center md:py-24">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: September 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-sm border-t border-border">
        <div className="container-tight">
          <div className="space-y-12">

            {/* TL;DR */}
            <div className="rounded-xl border border-[hsl(var(--brand-green))]/30 bg-[hsl(var(--brand-green))]/5 p-6">
              <h2 className="text-lg font-semibold text-[hsl(var(--brand-green))]">The short version</h2>
              <p className="mt-2 text-muted-foreground">
                Your data stays on your machine. We don't collect personal information from 
                our website. We use Stripe for payments and Discord for community — that's it.
              </p>
            </div>

            {/* What We Collect */}
            <div>
              <h2 className="text-xl font-semibold">What we collect</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">From our website:</span> Nothing. 
                  No personal information on you.
                </p>
                <p>
                  <span className="font-medium text-foreground">From payments:</span> Stripe 
                  handles everything. We never see your payment details.
                </p>
                <p>
                  <span className="font-medium text-foreground">From the software:</span> Nothing 
                  leaves your machine. Local Memory runs entirely locally — your memories, 
                  your data, your hardware.
                </p>
              </div>
            </div>

            {/* Third Parties */}
            <div>
              <h2 className="text-xl font-semibold">Third-party services</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold">Stripe</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Processes payments securely. We never access your payment information. 
                    See{" "}
                    <a 
                      href="https://stripe.com/privacy" 
                      className="text-[hsl(var(--brand-blue))] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Stripe's Privacy Policy
                    </a>.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold">Discord</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Optional community for support. Subject to{" "}
                    <a 
                      href="https://discord.com/privacy" 
                      className="text-[hsl(var(--brand-blue))] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Discord's Privacy Policy
                    </a>. 
                    The software works without it.
                  </p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div>
              <h2 className="text-xl font-semibold">Security</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  Our approach: the best way to protect your data is to not collect it.
                </p>
                <p>
                  The website uses HTTPS. Payments go through Stripe's secure infrastructure. 
                  Your Local Memory data never touches our servers — it exists only on your computer.
                </p>
              </div>
            </div>

            {/* Updates */}
            <div>
              <h2 className="text-xl font-semibold">Policy updates</h2>
              <div className="mt-4 text-muted-foreground">
                <p>
                  If we update this policy, changes appear here with a new date.
                </p>
              </div>
            </div>

            {/* Questions */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Questions?</h2>
              <p className="mt-2 text-muted-foreground">
                Join our{" "}
                <a 
                  href="https://discord.gg/rMmn8xP3fZ" 
                  className="text-[hsl(var(--brand-blue))] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord community
                </a>
                {" "}for clarification on this policy.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="border-t border-border py-8">
        <div className="container-tight">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
            <span className="text-border">·</span>
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="text-border">·</span>
            <Link to="/docs" className="hover:text-foreground">
              Documentation
            </Link>
          </div>
        </div>
      </section>

      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default PrivacyNew;
