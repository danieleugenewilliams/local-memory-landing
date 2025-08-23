import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-8 py-8">
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <div className="flex justify-center items-center gap-6">
            <Link 
              to="/privacy" 
              className="text-memory-blue hover:underline hover:text-memory-blue/80 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-memory-blue hover:underline hover:text-memory-blue/80 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
          <div>
            © 2025 <em>Local Memory</em>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;