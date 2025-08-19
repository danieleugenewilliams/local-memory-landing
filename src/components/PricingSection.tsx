import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-memory-blue/10 via-background to-memory-purple/10" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      
      <div className="container relative max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            Premium Performance, Indie Price
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Costs less than 2 hours of development time. Saves hundreds of hours of re-explaining context to AI agents.
          </p>
        </div>

        {/* Streamlined Pricing */}
        <div className="max-w-2xl mx-auto mb-12">
          {/* Early Access Special - Main Focus */}
          <div className="bg-card rounded-2xl border-2 border-memory-blue/50 relative overflow-hidden mb-6">
            {/* Popular badge */}
            <div className="absolute top-4 right-4 bg-memory-blue text-white text-xs font-bold px-2 py-1 rounded-full">
              POPULAR
            </div>
            
            <div className="p-8 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-xl font-bold text-foreground mb-2">Early Access Special</h3>
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-4xl font-bold text-foreground">$29</span>
                <div className="text-left">
                  <div className="text-sm text-muted-foreground line-through">normally $49</div>
                  <div className="text-sm text-memory-blue font-medium">40% OFF</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-memory-blue">✓</span>
                  <span>Complete memory system</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-memory-blue">✓</span>
                  <span>26+ MCP tools included</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-memory-blue">✓</span>
                  <span>Unlimited usage forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-memory-blue">✓</span>
                  <span>Future updates included</span>
                </div>
              </div>
              
              <Link to="/payment" className="w-full">
                <Button className="w-full" size="lg">
                  🚀 Get Early Access Now - $29
                </Button>
              </Link>
              
              <div className="mt-4 text-xs text-muted-foreground">
                💰 One-time purchase • 🎁 $10 referral credit
              </div>
            </div>
          </div>

          {/* Power User Bundle - Compact */}
          <div className="bg-gradient-to-r from-memory-purple/10 to-memory-blue/10 border border-memory-purple/30 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">💎</span>
                  <span className="font-bold text-foreground">Power User Bundle</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  + Priority Discord + Setup Guide + 1-on-1 Call
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground line-through">$149 Enterprise</div>
                <div className="text-2xl font-bold text-memory-purple">$49</div>
                <Button variant="outline" size="sm" className="mt-2">
                  💎 Upgrade Bundle
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Compact FAQ */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="grid sm:grid-cols-3 gap-4 text-center text-sm">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-lg mb-2">❓</div>
              <div className="font-medium text-foreground mb-1">Don't like it?</div>
              <div className="text-xs text-muted-foreground">30-day money-back guarantee</div>
            </div>
            
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-lg mb-2">⚙️</div>
              <div className="font-medium text-foreground mb-1">Dependencies?</div>
              <div className="text-xs text-muted-foreground">Zero. Actually zero.</div>
            </div>
            
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-lg mb-2">🔒</div>
              <div className="font-medium text-foreground mb-1">Works offline?</div>
              <div className="text-xs text-muted-foreground">100% local & private</div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-6">
            <span>✅ Secure Stripe payment</span>
            <span>✅ Instant download</span>
            <span>✅ Email support</span>
          </div>
          
          <p className="text-sm text-muted-foreground italic max-w-xl mx-auto">
            "The only AI memory system with native MCP integration AND universal REST API. Future-proof your AI workflow today."
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;