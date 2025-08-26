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
              Terms and Conditions
            </h1>
            <p className="text-xl text-muted-foreground">
              Here are the straightforward terms for using <em>Local Memory</em>. We've kept the legal language simple and clear.
            </p>
          </div>

          <div className="space-y-8">
            {/* Agreement */}
            <Card>
              <CardHeader>
                <CardTitle>Agreement to Terms</CardTitle>
                <CardDescription>Last updated: August 22, 2025</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  By purchasing, downloading, or using <em>Local Memory</em> software, you agree to these Terms and Conditions. If you don't agree with these terms, you are not permitted to use our software.
                </p>
              </CardContent>
            </Card>

            {/* Software License */}
            <Card>
              <CardHeader>
                <CardTitle>Software License</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">License Grant</h4>
                  <p className="text-muted-foreground">
                    Subject to these terms, we grant you a singular, non-transferable, non-exclusive license to use <em>Local Memory</em> for your individual, business, or hobbyist purposes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What You Can't Do</h4>
                  <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                    <li>Share, distribute, or give away <em>Local Memory</em> software or license keys to others</li>
                    <li>Reverse engineer, decompile, or take apart the software</li>
                    <li>Create modified versions or derivative works based on the software</li>
                    <li>Rent, lease, or resell the software</li>
                    <li>Each license is for one person only</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Acceptable Use */}
            <Card>
              <CardHeader>
                <CardTitle>How You Can Use Local Memory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You're free to use <em>Local Memory</em> for legitimate purposes, including:
                </p>
                <ul className="text-muted-foreground space-y-1 list-disc pl-5">
                  <li>Personal productivity and organization</li>
                  <li>Business and professional development</li>
                  <li>Educational and research purposes</li>
                  <li>Hobbyist and creative projects</li>
                </ul>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">What's Not Allowed</h4>
                  <p className="text-muted-foreground">Please don't use the software for:</p>
                  <ul className="text-muted-foreground space-y-1 list-disc pl-5 mt-2">
                    <li>Illegal activities or purposes</li>
                    <li>Violating laws or regulations</li>
                    <li>Harming individuals or organizations</li>
                    <li>Creating or processing malicious content</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
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
            <Card>
              <CardHeader>
                <CardTitle>Important Disclaimers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Software Provided "As Is"</h4>
                  <p className="text-muted-foreground">
                    <em>Local Memory</em> is provided "as is" – while we work hard to make it reliable, we can't guarantee it will be completely error-free or always work perfectly. Software is complex!
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Limitation of Liability</h4>
                  <p className="text-muted-foreground">
                    <em>Local Memory</em>, its creators, and investors won't be liable for indirect damages that might arise from using the software. This is standard legal protection that lets us keep building great tools.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Back Up Your Data</h4>
                  <p className="text-muted-foreground">
                    Please back up your important data regularly. While <em>Local Memory</em> is designed to be safe and reliable, it's always smart to have backups of anything important.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle>When This License Ends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  This license lasts until terminated. If you break these terms, we may end your license immediately. If that happens, you'll need to stop using <em>Local Memory</em> and delete all copies of the software.
                </p>
              </CardContent>
            </Card>

            {/* Updates and Changes */}
            <Card>
              <CardHeader>
                <CardTitle>Updates and Changes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Software Updates</h4>
                  <p className="text-muted-foreground">
                    We may provide updates, patches, or new versions of <em>Local Memory</em>. These updates are subject to these same terms and conditions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Changes to Terms</h4>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the software after changes constitutes acceptance of the new terms.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle>Legal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  These terms are governed by applicable law. If there's ever a dispute, we'll work to resolve it through appropriate legal channels.
                </p>
                <p className="text-muted-foreground">
                  If any part of these terms can't be enforced legally, the rest of the terms still apply.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Questions About These Terms?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Have questions about these terms or need clarification? Join our <a href="https://discord.gg/rMmn8xP3fZ" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord community</a> where our team and fellow developers can help answer your questions. It's a friendly place to get support and discuss Local Memory!
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