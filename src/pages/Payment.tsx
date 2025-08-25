import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentPage = () => {
  const generateToken = () => {
    // Generate a random token for payment verification
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const handlePayment = () => {
    const paymentLinkUrl = import.meta.env.VITE_STRIPE_PAYMENT_LINK;
    
    // Check if environment variable is configured
    if (!paymentLinkUrl || paymentLinkUrl.includes('your_payment_link_here')) {
      alert(`Payment link not configured. Please set VITE_STRIPE_PAYMENT_LINK in your environment variables.

To complete the setup:

1. Go to https://dashboard.stripe.com/payment-links
2. Click "Create payment link"
3. Select your $29 product/price
4. Set success URL to: ${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}
5. Copy the payment link URL
6. Add it to your .env file as VITE_STRIPE_PAYMENT_LINK

This keeps your payment configuration secure and maintainable!`);
      return;
    }
    
    // Generate payment session data with timestamp
    const paymentTimestamp = Date.now();
    const token = generateToken();
    const paymentData = {
      token: token,
      timestamp: paymentTimestamp,
      initiated: paymentTimestamp // Store when payment was initiated for URL generation
    };
    
    // Store comprehensive payment data in localStorage for verification
    localStorage.setItem('payment_token', JSON.stringify(paymentData));
    
    // Store session indicators for additional verification
    sessionStorage.setItem('payment_initiated', 'true');
    sessionStorage.setItem('payment_timestamp', paymentTimestamp.toString());
    sessionStorage.setItem('payment_token_backup', token);
    
    // Redirect to Stripe Payment Link
    // Note: The success URL should be configured in Stripe Dashboard as:
    // ${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}
    window.location.href = paymentLinkUrl;
  };

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
              Transform your AI with persistent memory that never forgets.
            </p>
          </div>

          <div className="bg-card rounded-2xl border-2 border-memory-blue/50 relative overflow-hidden mb-6">
            <div className="p-8 text-center">
              <div className="text-3xl mb-2">🎯</div>
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
                  <span>Complete memory system</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>One-Time Secure Stripe Payment</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Unlimited usage forever</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>$2K-6K Monthly Value</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>26 MCP tools included</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>2,500%+ monthly ROI</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>100% Local & Private</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Worth $100-300 daily</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Instant Access</span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handlePayment}
                  variant="hero" 
                  className="w-full sm:w-auto" 
                  size="lg"
                >
                  Get Instant Access
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