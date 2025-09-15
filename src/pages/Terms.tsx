import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Terms & Conditions
            </h1>
            <p className="text-xl text-muted-foreground">
              Please read these Terms & Conditions for using <em>Local Memory</em> carefully.
            </p>
            <p className="text-xl text-muted-foreground">
              We've kept the legal language straightforward and clear.
            </p>
          </div>

          <div className="space-y-8">
            {/* Agreement */}
            <Card className="border border-memory-blue">
              <CardHeader>
                <CardTitle>Agreement to Terms</CardTitle>
                <CardDescription>Last updated: September 1, 2025</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  By purchasing, downloading, or using <em>Local Memory</em> software, you agree to these Terms & Conditions. If you decline to agree with these terms, you will not be permitted to use our software.
                </p>
              </CardContent>
            </Card>

            {/* Software License */}
            <Card className="border border-memory-green">
              <CardHeader>
                <CardTitle>Software License</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">License Grant</h4>
                  <p className="text-muted-foreground">
                    Subject to these terms, you are granted a singular, non-transferable, non-exclusive license to use <em>Local Memory</em> for your individual, business, or hobbyist purposes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What You Can't Do</h4>
                  <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                    <li>Share, distribute, or give away <em>Local Memory</em> software or license keys to others</li>
                    <li>Reverse engineer, decompile, or take apart the software</li>
                    <li>Create modified versions or derivative works based on the software</li>
                    <li>Rent, lease, or resell the software</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payment & Billing */}
            <Card className="border border-memory-orange">
              <CardHeader>
                <CardTitle>Payment and Billing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Payment Processing</h4>
                  <p className="text-muted-foreground">
                    All payments are securely processed through Stripe, our trusted payment partner. We accept major credit cards and other payment methods supported by Stripe.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">One-Time Purchase</h4>
                  <p className="text-muted-foreground">
                    <em>Local Memory</em> is sold as a one-time purchase with lifetime usage rights. No subscriptions, no recurring fees, no surprises. You pay once, you own it forever.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Pricing</h4>
                  <p className="text-muted-foreground">
                    Prices, which are listed in USD, may change at any time. However, once you've purchased <em>Local Memory</em>, your license remains valid regardless of future pricing updates.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Taxes</h4>
                  <p className="text-muted-foreground">
                    You are responsible for any applicable taxes, duties, or fees based on your location and local tax laws.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Software Delivery */}
            <Card className="border border-memory-purple">
              <CardHeader>
                <CardTitle>Software Delivery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Installation Methods</h4>
                  <p className="text-muted-foreground">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Recommended: Install via npm with <code className="bg-muted px-1 rounded">'npm install -g local-memory-mcp'</code></li>
                      <li>Alternative: Download platform-specific binaries directly after purchase for manual installation</li>
                    </ul>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">License Key</h4>
                  <p className="text-muted-foreground">
                    Your license key will be displayed on the success page immediately after purchase. <strong>You have 30 minutes to copy and store your license key.</strong> After this window, the key will no longer be accessible. If you forget to copy your license key, submit a #support request in our <a href="https://discord.com/channels/894742967728885760/1406058052485906483" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord Community</a>.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">License Activation</h4>
                  <p className="text-muted-foreground">
                    Activate your license immediately after installation using <code className="bg-muted px-1 rounded">'local-memory license activate [YOUR-LICENSE-KEY]'</code>.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2"></h4>
                  <p className="text-muted-foreground italic">
                    Note: To reiterate, copy your license key immediately after purchase. The 30-minute window is firm, and we cannot regenerate lost license keys.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Acceptable Use */}
            <Card className="border border-memory-pink">
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Acceptable Use
                  </h4>
                  <p className="text-muted-foreground">
                    You are free to use <em>Local Memory</em> for legitimate purposes, which include the following:
                  </p>
                  <ul className="text-muted-foreground space-y-1 list-disc pl-5 mt-2">
                    <li>Personal productivity and organization</li>
                    <li>Business and professional development</li>
                    <li>Educational and research purposes</li>
                    <li>Hobbyist and creative projects</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">We Shouldn't Have to Say This, But...</h4>
                  <p className="text-muted-foreground">Please do not use the software for any activities that include the following, without limitation:</p>
                  <ul className="text-muted-foreground space-y-1 list-disc pl-5 mt-2">
                    <li>Illegal actions or purposes</li>
                    <li>Violating laws or regulations</li>
                    <li>Harming individuals or organizations</li>
                    <li>Creating or processing malicious content</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="border border-memory-yellow">
              <CardHeader>
                <CardTitle>Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  <em>Local Memory</em> and all related intellectual property rights remain the exclusive property of its creators, owners, and investors. This license does not transfer any ownership rights to you.
                </p>
                <p className="text-muted-foreground">
                  All trademarks, service marks, and trade names used in connection with <em>Local Memory</em> are proprietary to their respective owners.
                </p>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card className="border border-memory-blue">
              <CardHeader>
                <CardTitle>Important Disclaimers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Software Provided "As-Is"</h4>
                  <p className="text-muted-foreground">
                    <em>Local Memory</em> is provided "as-is". While we are dedicated to the ongoing evolution and innovation of our platform, please note that we cannot promise it will always be entirely error-free or function flawlessly. We recognize that software complexity is a reality, but our commitment to continuous improvement ensures that we are always working to enhance your experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Refund Policy</h4>
                  <p className="text-muted-foreground">
                    All sales are final. We have worked to ensure that <em>Local Memory</em> meets your needs. If you require additional assistance based on your particular set up, you can find support and guidance in our <a href="https://discord.com/channels/894742967728885760/1406058052485906483" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord Community</a>.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Limitation of Liability</h4>
                  <p className="text-muted-foreground">
                    <em>Local Memory</em>, along with its creators and investors, cannot be held liable for any indirect damages arising from the use of this software. This legal protection is standard and enables us to continue developing excellent tools.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Back Up Your Data</h4>
                  <p className="text-muted-foreground">
                    As a general rule of thumb, please back up your important data regularly. While <em>Local Memory</em> is designed to be safe and reliable, it's always good practice to have backups of anything important.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="border border-memory-green">
              <CardHeader>
                <CardTitle>License Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Licenses last until terminated. If terms are broken, your license will end immediately and you will need to cease use of <em>Local Memory</em> and delete all copies of the software.
                </p>
              </CardContent>
            </Card>

            {/* Updates and Changes */}
            <Card className="border border-memory-orange">
              <CardHeader>
                <CardTitle>Updates and Changes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Software Updates</h4>
                  <p className="text-muted-foreground">
                    We may provide updates, patches, or new versions of <em>Local Memory</em>. Those updates are subject to the same terms and conditions explained here.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Changes to Terms</h4>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these Terms & Conditions at any time. Any changes will be posted on this page with a new "Last updated" date. Continued use of the software after any changes constitutes acceptance of the new terms.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="border border-memory-purple">
              <CardHeader>
                <CardTitle>Legal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  These terms are governed by applicable law. If a dispute arises, we will work to resolve it through the appropriate legal channels.
                </p>
                <p className="text-muted-foreground">
                  If any part of these Terms & Conditions cannot be enforced legally, the remaining terms will still apply.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border border-memory-pink">
              <CardHeader>
                <CardTitle>Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Need clarification on these Terms & Conditions? Join our <a href="https://discord.com/channels/894742967728885760/1406058052485906483" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord Community</a> where our team, developers, and other users can help answer your questions. It's a collaborative place to discuss and get support for <em>Local Memory</em>.
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

export default Terms;