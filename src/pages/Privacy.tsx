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
              Your privacy matters to us. Here's how we handle your information.
            </p>
          </div>

          <div className="space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Last updated: August 22, 2025</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  <em>Local Memory</em> is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you visit our website and use our services.
                </p>
                <p className="text-muted-foreground">
                  <strong>Key Point:</strong> We do not collect, store, or process personal information on our website. All payments are processed securely through Stripe, and our community operates on Discord.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Website Usage</h4>
                  <p className="text-muted-foreground">
                    We do not collect personal information directly on our website. We do not use cookies, analytics, or tracking technologies that identify individual users.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Payment Information</h4>
                  <p className="text-muted-foreground">
                    All payment processing is handled securely by Stripe. We do not store or have access to your payment card details. Please refer to <a href="https://stripe.com/privacy" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Stripe's Privacy Policy</a> for information about how your payment data is handled.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Stripe</h4>
                  <p className="text-muted-foreground">
                    We use Stripe for secure payment processing. When you make a purchase, you are redirected to Stripe's secure checkout system. Stripe's privacy practices are governed by their own Privacy Policy.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Discord</h4>
                  <p className="text-muted-foreground">
                    Our community discussions take place on Discord. If you choose to join our Discord server, Discord's privacy practices apply. Please refer to <a href="https://discord.com/privacy" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord's Privacy Policy</a> for more information.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Since we do not collect personal information on our website, there is minimal data security risk. Our website is served over HTTPS to ensure secure communication. For payment security, we rely on Stripe's industry-leading security infrastructure.
                </p>
              </CardContent>
            </Card>

            {/* Changes to This Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us through our <a href="https://discord.gg/rMmn8xP3fZ" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord community</a>.
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