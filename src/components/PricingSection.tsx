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
                🔒 One-Time Secure Stripe Payment • ⚡ Instant Access • 🛡️ 100% Local & Private
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PricingSection;