import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { handleStripePayment } from "@/lib/payment";

const PaymentPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Get <em>Local Memory</em>
            </h1>
            <p className="text-lg text-muted-foreground">
              Context amnesia is killing your productivity—it's time to fix that.
            </p>
          </div>

          <div className="bg-card rounded-2xl border-2 border-memory-blue/50 relative overflow-hidden mb-6">
            <div className="p-8 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="text-xl font-bold text-foreground mb-2">Launch Special</h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-foreground">$59</span>
                <div className="text-left">
                  <div className="text-sm text-muted-foreground line-through">normally $99</div>
                  <div className="text-sm text-memory-blue font-medium">40% OFF</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-6 text-memory-green">Use code LMLAUNCH40 at checkout</div>
              
              <div className="grid grid-cols-3 gap-4 mb-6 text-sm px-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Complete Memory System</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Worth $100-$300 Daily</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Unlimited Usage Forever</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>$2K-$6K Monthly Value</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>26 MCP Tools Included</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Pays for Itself in 2 Days</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>100% Local & Private</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Save 2+ Hours Daily</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>2,500%+ Monthly ROI</span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleStripePayment}
                  variant="hero" 
                  className="w-full sm:w-auto" 
                  size="lg"
                >
                  Upgrade Your Coding Agents Memory Now
                </Button>
              </div>
              
              <div className="mt-2 text-sm text-muted-foreground">
                <em>Two-minute setup. Zero dependencies. Yes, actually zero. Not 'zero*' with 47 footnotes.</em>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;