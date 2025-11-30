import { Link } from "react-router-dom";
import HeaderNew from "@/components/v2/HeaderNew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";

const TermsNew = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern grid-fade" />
        <div className="container-tight relative">
          <div className="flex flex-col items-center justify-center py-16 text-center md:py-24">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Terms of Service
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

            {/* Agreement */}
            <div>
              <h2 className="text-xl font-semibold">Agreement</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  By purchasing or using Local Memory, you agree to these terms. 
                  If you don't agree, don't use the software.
                </p>
              </div>
            </div>

            {/* License */}
            <div>
              <h2 className="text-xl font-semibold">License</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  You receive a personal, non-transferable, non-exclusive license to use 
                  Local Memory for individual or business purposes.
                </p>
                <p className="font-medium text-foreground">You cannot:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Share, distribute, or resell the software or license keys</li>
                  <li>Reverse engineer or decompile the software</li>
                  <li>Create derivative works</li>
                </ul>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="text-xl font-semibold">Payment</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  Payments are processed through Stripe. Local Memory is a one-time purchase — 
                  no subscriptions, no recurring fees. Prices are in USD and may change, 
                  but purchased licenses remain valid regardless of future pricing.
                </p>
                <p>
                  You're responsible for applicable taxes based on your location.
                </p>
              </div>
            </div>

            {/* Delivery */}
            <div>
              <h2 className="text-xl font-semibold">Delivery</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  Install via npm: <code className="rounded bg-card px-2 py-1 text-sm">npm install -g local-memory-mcp</code>
                </p>
                <p>
                  Your license key appears on the success page after purchase. 
                  <span className="font-medium text-foreground"> Copy it immediately — you have 30 minutes.</span> 
                  {" "}After that, the key is no longer accessible.
                </p>
                <p>
                  Activate with: <code className="rounded bg-card px-2 py-1 text-sm">local-memory license activate [KEY]</code>
                </p>
                <p>
                  Lost your key? Contact support via{" "}
                  <a 
                    href="https://discord.gg/rMmn8xP3fZ" 
                    className="text-[hsl(var(--brand-blue))] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </a>.
                </p>
              </div>
            </div>

            {/* Acceptable Use */}
            <div>
              <h2 className="text-xl font-semibold">Acceptable Use</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  Use Local Memory for legitimate purposes: personal productivity, business, 
                  education, research, creative projects.
                </p>
                <p>
                  Don't use it for illegal activities, violating regulations, harming others, 
                  or processing malicious content.
                </p>
              </div>
            </div>

            {/* IP */}
            <div>
              <h2 className="text-xl font-semibold">Intellectual Property</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  Local Memory and all related IP remain the property of its creators. 
                  Your license doesn't transfer ownership.
                </p>
              </div>
            </div>

            {/* Disclaimers */}
            <div>
              <h2 className="text-xl font-semibold">Disclaimers</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  Local Memory is provided "as-is". We work to keep it reliable, 
                  but can't guarantee it will always be error-free.
                </p>
                <p>
                  <span className="font-medium text-foreground">All sales are final.</span> 
                  {" "}For setup help, visit our Discord community.
                </p>
                <p>
                  We're not liable for indirect damages from using the software. 
                  Back up your important data regularly.
                </p>
              </div>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-xl font-semibold">Termination</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  Licenses last until terminated. Break these terms, and your license 
                  ends immediately — stop using the software and delete all copies.
                </p>
              </div>
            </div>

            {/* Updates */}
            <div>
              <h2 className="text-xl font-semibold">Updates</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  Software updates are subject to these same terms. 
                  We may modify these terms at any time — changes are posted here with 
                  a new date. Continued use means acceptance.
                </p>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h2 className="text-xl font-semibold">Legal</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  These terms are governed by applicable law. Disputes will be resolved 
                  through appropriate legal channels. If any part is unenforceable, 
                  the rest still applies.
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
                {" "}for clarification on these terms.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="border-t border-border py-8">
        <div className="container-tight">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy Policy
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

export default TermsNew;
