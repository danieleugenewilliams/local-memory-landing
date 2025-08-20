import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMobileNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm flex items-center justify-center">
            <div className="flex items-center gap-0">
              <span 
                className="text-white font-black text-xs leading-none transform -skew-x-[25deg] translate-y-[-3px] -mr-0.5"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                L
              </span>
              <span 
                className="text-white font-black text-xs leading-none transform -skew-x-[25deg] translate-y-[3px]"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                M
              </span>
            </div>
          </div>
          <div className="h-8 flex items-center">
            <span className="font-medium leading-none" style={{ fontSize: '36px', lineHeight: '36px' }}>Local Memory</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => handleNavClick('/')}
          >
            Home
          </Link>
          <Link 
            to="/features" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => handleNavClick('/features')}
          >
            Features
          </Link>
          <Link 
            to="/docs" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => handleNavClick('/docs')}
          >
            Docs
          </Link>
          <Link to="/payment">
            <Button variant="cta" size="sm">
              Purchase
            </Button>
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="container px-6 py-4 space-y-4 text-right">
            <Link 
              to="/" 
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => handleMobileNavClick('/')}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => handleMobileNavClick('/features')}
            >
              Features
            </Link>
            <Link 
              to="/docs" 
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => handleMobileNavClick('/docs')}
            >
              Docs
            </Link>
            <Link to="/payment" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 block">
              <Button variant="cta" size="sm">
                Purchase
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;