import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-foreground">LM</span>
          </div>
          <span className="font-bold text-xl">Local Memory</span>
        </div>
        
        <nav className="flex items-center space-x-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Documentation
          </a>
          <a href="#enterprise" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Enterprise
          </a>
          <Button variant="outline" size="sm">
            GitHub
          </Button>
          <Button variant="cta" size="sm">
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;