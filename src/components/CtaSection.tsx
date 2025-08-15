import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-24 bg-hero-gradient">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            Ready to Give Your AI Persistent Memory?
          </h2>
          <p className="text-lg sm:text-xl text-foreground mb-8">
            Transform any AI from generic to personalized intelligence. Works with Claude Code, Claude Desktop, OpenCode, Cursor, and more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="default" size="lg" className="w-full sm:w-auto">
              Get Started with Local Memory
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 text-center">
            <div>
              <div className="text-memory-green text-xl sm:text-2xl mb-2">⚡</div>
              <div className="font-bold text-foreground text-sm sm:text-base">5 Minute Setup</div>
              <div className="text-xs sm:text-sm text-foreground">npm install and you're running</div>
            </div>
            <div>
              <div className="text-memory-blue text-xl sm:text-2xl mb-2">🔒</div>
              <div className="font-bold text-foreground text-sm sm:text-base">100% Private</div>
              <div className="text-xs sm:text-sm text-foreground">Your data never leaves your machine</div>
            </div>
            <div>
              <div className="text-memory-purple text-xl sm:text-2xl mb-2">🌐</div>
              <div className="font-bold text-foreground text-sm sm:text-base">Universal Support</div>
              <div className="text-xs sm:text-sm text-foreground">Works with all AI platforms</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;