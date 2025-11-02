import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { handleStripePayment } from "@/lib/payment";
import { trackAddToCart } from "@/lib/analytics";
import { useEffect } from "react";

const PaymentPage = () => {
  // Track add_to_cart event when user reaches payment page
  useEffect(() => {
    trackAddToCart();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="pt-8 sm:pt-12 pb-2">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              Become a Context Engineer
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground px-2">
              Transform your expertise into permanent AI intelligence with Local Memory.
            </p>
          </div>

          {/* Streamlined Pricing */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            {/* Early Access Special - Main Focus */}
            <div className="bg-black-800 rounded-xl sm:rounded-2xl border-2 border-memory-blue/50 relative overflow-hidden mb-6 mx-2 sm:mx-0">
              {/* Popular badge */}
              
              <div className="p-4 sm:p-6 lg:p-8 text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="text-xl font-bold text-white mb-2">Personal License</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">$49</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-6 text-memory-green"> </div>
                
                {/* Mobile-optimized features list */}
                <div className="mb-6 text-sm">
                  {/* Mobile: Simple vertical list */}
                  <div className="grid grid-cols-1 gap-3 md:hidden px-2">
                    <div className="flex items-center justify-center gap-2 text-center">
                      <span className="text-green-500">✓</span>
                      <span>Context Engineering System</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-center">
                      <span className="text-green-500">✓</span>
                      <span>Worth $100-$300 Daily</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-center">
                      <span className="text-green-500">✓</span>
                      <span>Unlimited Usage Forever</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-center">
                      <span className="text-green-500">✓</span>
                      <span>26 MCP Tools Included</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-center">
                      <span className="text-green-500">✓</span>
                      <span>100% Local & Private</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-center">
                      <span className="text-green-500">✓</span>
                      <span>Save 2+ Hours Daily</span>
                    </div>
                  </div>
                  
                  {/* Desktop: Original 3-column grid */}
                  <div className="hidden md:grid grid-cols-3 gap-4 px-4">
                    <div className="flex items-center justify-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Context Engineering System</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 lg:ml-10">
                      <span className="text-green-500">✓</span>
                      <span>Worth $100-$300 Daily</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 lg:ml-16">
                      <span className="text-green-500">✓</span>
                      <span>Unlimited Usage Forever</span>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Expertise → AI Permanent Memory</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 lg:ml-10">
                      <span className="text-green-500">✓</span>
                      <span>26 MCP Tools Included</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 lg:ml-16">
                      <span className="text-green-500">✓</span>
                      <span>Pays for Itself in 2 Days</span>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>100% Local & Private</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 lg:ml-10">
                      <span className="text-green-500">✓</span>
                      <span>Save 2+ Hours Daily</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 lg:ml-16">
                      <span className="text-green-500">✓</span>
                      <span>2,500%+ Monthly ROI</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center px-4">
                  <Button 
                    onClick={handleStripePayment} 
                    variant="hero" 
                    className="w-full sm:w-auto text-lg py-4 px-8 min-h-[52px]" 
                    size="lg"
                  >
                    Get Instant Access
                  </Button>
                </div>
                <div className="mt-2 text-sm text-gray-300">🔒 One-Time Secure Stripe Payment</div>

                <div className="mt-2 text-sm text-gray-300">
                  <em>Two-minute setup. Zero dependencies. Yes, actually zero. Not 'zero*' with 47 footnotes.</em>
                </div>

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