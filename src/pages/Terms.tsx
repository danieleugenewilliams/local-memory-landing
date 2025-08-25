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
              Please read these terms carefully before using <em>Local Memory</em>.
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
                  By purchasing, downloading, or using <em>Local Memory</em> software, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our software.
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
                    Subject to these terms, we grant you a personal, non-transferable, non-exclusive license to use <em>Local Memory</em> for your personal, business, or hobbyist purposes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">License Restrictions</h4>
                  <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                    <li>You may <strong>not</strong> share, distribute, or redistribute <em>Local Memory</em> software or license keys</li>
                    <li>You may <strong>not</strong> reverse engineer, decompile, or disassemble the software</li>
                    <li>You may <strong>not</strong> create derivative works based on the software</li>
                    <li>You may <strong>not</strong> rent, lease, or sublicense the software to others</li>
                    <li>Each license is for single-user use only</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Acceptable Use */}
            <Card>
              <CardHeader>
                <CardTitle>Acceptable Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You agree to use <em>Local Memory</em> only for legitimate purposes, including but not limited to:
                </p>
                <ul className="text-muted-foreground space-y-1 list-disc pl-5">
                  <li>Personal productivity and organization</li>
                  <li>Business and professional development</li>
                  <li>Educational and research purposes</li>
                  <li>Hobbyist and creative projects</li>
                </ul>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Prohibited Uses</h4>
                  <p className="text-muted-foreground">You may <strong>not</strong> use the software for:</p>
                  <ul className="text-muted-foreground space-y-1 list-disc pl-5 mt-2">
                    <li>Any illegal activities or purposes</li>
                    <li>Violating any applicable laws or regulations</li>
                    <li>Harming or attempting to harm individuals or organizations</li>
                    <li>Creating, storing, or processing malicious content</li>
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
                <CardTitle>Disclaimers and Limitations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Software "As Is"</h4>
                  <p className="text-muted-foreground">
                    <em>Local Memory</em> is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the software will be error-free or uninterrupted.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Limitation of Liability</h4>
                  <p className="text-muted-foreground">
                    In no event shall <em>Local Memory</em>, its creators, owners, or investors be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the software.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Backup Responsibility</h4>
                  <p className="text-muted-foreground">
                    You are responsible for backing up your data. We are not responsible for any data loss that may occur while using <em>Local Memory</em>.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  This license is effective until terminated. We may terminate your license immediately if you breach any of these terms. Upon termination, you must cease all use of <em>Local Memory</em> and delete all copies of the software.
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
                <CardTitle>Governing Law and Disputes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  These terms are governed by applicable law. Any disputes arising under these terms will be resolved through appropriate legal channels.
                </p>
                <p className="text-muted-foreground">
                  If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you have questions about these Terms and Conditions, please contact us through our <a href="https://discord.gg/rMmn8xP3fZ" className="text-memory-blue hover:underline" target="_blank" rel="noopener noreferrer">Discord community</a>.
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