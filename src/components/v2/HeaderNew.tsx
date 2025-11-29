import { Link, useLocation } from "react-router-dom";
import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";

const HeaderNew = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Features", href: "/features" },
    { label: "Docs", href: "/docs" },
    { label: "Architecture", href: "/architecture" },
    { label: "Prompts", href: "/prompts" },
  ];

  const handleNavClick = useCallback((path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
            onClick={() => handleNavClick("/")}
          >
            <img 
              src="/lm-logo.png" 
              alt="Local Memory" 
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold tracking-tight">Local Memory</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://discord.gg/rMmn8xP3fZ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Community
            </a>
            <Link
              to="/payment"
              className="btn-primary text-sm"
              onClick={() => handleNavClick("/payment")}
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container-wide flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://discord.gg/rMmn8xP3fZ"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </a>
            <div className="mt-2 px-4">
              <Link
                to="/payment"
                className="btn-primary w-full text-center text-sm"
                onClick={() => handleNavClick("/payment")}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderNew;
