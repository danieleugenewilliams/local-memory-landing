import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentPage = () => {
  const handlePayment = () => {
    const paymentLinkUrl = import.meta.env.VITE_STRIPE_PAYMENT_LINK;
    
    // Check if environment variable is configured
    if (!paymentLinkUrl || paymentLinkUrl.includes('your_payment_link_here')) {
      alert(`Payment link not configured. Please set VITE_STRIPE_PAYMENT_LINK in your environment variables.

To complete the setup:

1. Go to https://dashboard.stripe.com/payment-links
2. Click "Create payment link"
3. Select your $29 product/price
4. Set success URL to: ${window.location.origin}/success
5. Copy the payment link URL
6. Add it to your .env file as VITE_STRIPE_PAYMENT_LINK

This keeps your payment configuration secure and maintainable!`);
      return;
    }
    
    // Redirect to Stripe Payment Link
    window.location.href = paymentLinkUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="py-12">
        <div className="container max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Get Local Memory
            </h1>
            <p className="text-lg text-muted-foreground">
              Transform your AI with persistent memory that never forgets
            </p>
          </div>

          <Card className="border-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Local Memory</CardTitle>
              <CardDescription className="text-lg">
                One-time purchase, lifetime updates
              </CardDescription>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-3xl font-bold">$29</span>
                <Badge variant="secondary">Limited Time</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {[
                  "Cross-platform executables (macOS, Windows, Linux)",
                  "100% local - your data never leaves your machine",
                  "Works with Claude, GPT, Cursor, and more",
                  "Semantic memory search and retrieval",
                  "2-minute setup with LLM prompts"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handlePayment}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                Get Instant Access - $29
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>Secure payment powered by Stripe</p>
                <p className="mt-1">30-day money-back guarantee</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;