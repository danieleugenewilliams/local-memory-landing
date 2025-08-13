import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-24 bg-hero-gradient">
      <div className="container max-w-screen-2xl mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Give Your AI Real Memory?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join engineering teams who've moved beyond toy demos to production AI that understands their real codebases.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="default" size="lg" className="w-full sm:w-auto">
              Start Free - Download Now
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Book Enterprise Demo
            </Button>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-memory-green text-2xl mb-2">⚡</div>
              <div className="font-bold text-foreground">5 Minute Setup</div>
              <div className="text-sm text-muted-foreground">npm install and you're running</div>
            </div>
            <div>
              <div className="text-memory-blue text-2xl mb-2">🔒</div>
              <div className="font-bold text-foreground">100% Local</div>
              <div className="text-sm text-muted-foreground">Your code never leaves your servers</div>
            </div>
            <div>
              <div className="text-memory-purple text-2xl mb-2">🚀</div>
              <div className="font-bold text-foreground">Production Ready</div>
              <div className="text-sm text-muted-foreground">Used by enterprise teams today</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;