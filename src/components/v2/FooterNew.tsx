import { Link } from "react-router-dom";

const FooterNew = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-wide py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/lm-logo.png" 
              alt="Local Memory" 
              className="h-7 w-7"
            />
            <span className="text-sm font-medium">Local Memory</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/docs" className="transition-colors hover:text-foreground">
              Docs
            </Link>
            <Link to="/features" className="transition-colors hover:text-foreground">
              Features
            </Link>
            <a
              href="https://discord.gg/rMmn8xP3fZ"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Community
            </a>
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Local Memory
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
