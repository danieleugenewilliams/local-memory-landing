const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-foreground">LM</span>
            </div>
            <span className="font-bold text-xl">Local Memory</span>
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2025 Local Memory. Give any AI agent persistent memory and learning capabilities.
        </div>
      </div>
    </footer>
  );
};

export default Footer;