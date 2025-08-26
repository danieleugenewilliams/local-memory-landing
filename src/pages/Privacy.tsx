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
              We believe in transparency and keeping things straightforward. Here's our clear approach to your privacy.
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
                  <em>Local Memory</em> takes a privacy-first approach. This policy explains our transparent practices for handling your information when you visit our website and use our software.
                </p>
                <div className="bg-muted border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">
                    🛡️ <strong>Privacy Promise:</strong> We don't collect, store, or track your personal information on our website. Your data stays private and secure.
                  </p>
                </div>
                <p className="text-muted-foreground">
                  We only use two external services: Stripe for secure payments and Discord for our optional community. That's it – no hidden tracking or data collection.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle>What Information We Collect (Spoiler: Almost Nothing)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-green-700">✅ Website Browsing</h4>
                  <p className="text-muted-foreground">
                    Zero personal information collected on our website. No cookies, no analytics, no user tracking. We believe in keeping your browsing private.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-blue-700">💳 Payment Processing</h4>
                  <p className="text-muted-foreground">
                    We never see your payment details. All payment processing is handled entirely by Stripe (details in the "External Services" section below).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card>
              <CardHeader>
                <CardTitle>External Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">💰 Stripe (For Secure Payments)</h4>
                  <p className="text-muted-foreground">
                    When you buy Local Memory, you're redirected to Stripe's checkout – the same payment system used and trusted by millions of companies. Stripe handles all payment security, so we never have access to your payment information. Their security is bank-grade and industry-leading. Please refer to <a href="https://stripe.com/privacy" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Stripe's Privacy Policy</a> for information about how your payment data is handled.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💬 Discord (For Community & Support)</h4>
                  <p className="text-muted-foreground">
                    Our community and support happen on Discord, where developers help each other and share tips. If you join our Discord server, you're subject to Discord's own privacy practices. Please refer to <a href="https://discord.com/privacy" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord's Privacy Policy</a> to learn more. Joining is optional – the software works great without it!
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
                  Here's our security philosophy: the best way to protect your data is not to collect it in the first place. Since we don't gather personal information on our website, there's minimal security risk.
                </p>
                <p className="text-muted-foreground mt-3">
                  Our website uses HTTPS encryption for secure communication, and for payments, we rely on Stripe's bank-level security infrastructure. Your Local Memory software runs entirely on your computer – your data never leaves your machine.
                </p>
              </CardContent>
            </Card>

            {/* Changes to This Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Policy Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If we ever need to update this privacy policy, we'll post changes right here with a new "Last updated" date. Since we keep things straightforward, updates will likely be rare and minor. We recommend checking back occasionally to stay informed.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Questions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Have questions about this privacy policy or how we handle your information? Join our friendly <a href="https://discord.gg/rMmn8xP3fZ" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord community</a> where you can ask questions and get help from both our team and other developers.
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