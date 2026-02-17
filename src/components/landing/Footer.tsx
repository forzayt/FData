import { Link } from "react-router-dom";
import { Database } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link to="/" className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold">FData</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <Link to="/datasets" className="transition-colors hover:text-foreground">Datasets</Link>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How It Works</a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 FData. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
