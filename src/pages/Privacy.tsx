import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              We believe in transparency and keeping things simple. Here's our clear approach to your privacy.
            </p>
          </div>

          <div className="space-y-8">
            {/* Overview */}
            <Card className="border border-memory-blue">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Last updated: September 1, 2025</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  <em>Local Memory</em> takes a privacy-first approach. This policy explains our transparent practices for handling your information when you visit our website and use our software.
                </p>
                <p className="text-muted-800 italic pl-4">
                  🛡️ Privacy Promise: We do not collect, store, or track your personal information on our website. Your data stays private and secure, because YOUR AI memory data resides on YOUR machine.
                </p>

                <p className="text-muted-foreground">
                  We only use two third-party services: Stripe for secure payments and Discord for our community, which is optional. That's it — no hidden tracking or data collection.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="border border-memory-green">
              <CardHeader>
                <CardTitle>What Information We Collect (Spoiler: Practically Nothing)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="ont-semibold mb-2">Website Browsing</h4>
                  <p className="text-muted-foreground">
                    Zero personal information is collected — only minimally necessary data is used to optimize the experience in your browser.
                  </p>
                </div>
                <div>
                  <h4 className="ont-semibold mb-2">Payment Processing</h4>
                  <p className="text-muted-foreground">
                    We never see your payment details. All payment processing is handled entirely by Stripe (see details in the "Third-Party Services" section below).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card className="border border-memory-orange">
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Stripe (For Secure Payments)</h4>
                  <p className="text-muted-foreground">
                    When you buy <em>Local Memory</em>, you are redirected to Stripe's checkout — the same payment system used and trusted by millions of companies. Stripe handles all payment security, so we never have access to your payment information. You may refer to <a href="https://stripe.com/privacy" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Stripe's Privacy Policy</a> for information about how your payment data is handled.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Discord (For Support & Community)</h4>
                  <p className="text-muted-foreground">
                    Online discussions and collaboration related to <em>Local Memory</em> happen on Discord, where developers and likeminded individuals help each other and share tips. By joining our Discord server, you are subject to Discord's own privacy practices. You may refer to <a href="https://discord.com/privacy" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord's Privacy Policy</a> to learn more. Joining is optional — the software still works great without it.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="border border-memory-purple">
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Here is our security philosophy: The best way to protect your data is not to collect it in the first place. Since we don't gather personal information on our website, there's virtually no security risk through <em>Local Memory</em>.
                </p>
                <p className="text-muted-foreground mt-3">
                  Our website utilizes HTTPS encryption for secure communication and employs Stripe for payments, taking advantage of their secure payment infrastructure. Your <em>Local Memory</em> software runs entirely on your computer. Your data never leaves your machine.
                </p>
              </CardContent>
            </Card>

            {/* Changes to This Policy */}
            <Card className="border border-memory-pink">
              <CardHeader>
                <CardTitle>Policy Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If we ever need to update this Privacy Policy, we'll post changes right here with a new "Last updated" date.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border border-memory-yellow">
              <CardHeader>
                <CardTitle>Questions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Need clarification on this Privacy Policy? Join our <a href="https://discord.gg/rMmn8xP3fZ" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord community</a> where our team, developers, and other users can help answer your questions. It's a collaborative place to discuss and get support for <em>Local Memory</em>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Privacy;