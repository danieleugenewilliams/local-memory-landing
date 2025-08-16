import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-foreground">LM</span>
          </div>
          <span className="font-bold text-xl">Local Memory</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {isHomepage && (
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
          )}
          <Link to="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </Link>
          {isHomepage && (
            <Link to="/payment">
              <Button variant="cta" size="sm">
                Get Started
              </Button>
            </Link>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Link to="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mr-4">
            Docs
          </Link>
          {isHomepage && (
            <Link to="/payment">
              <Button variant="cta" size="sm">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;