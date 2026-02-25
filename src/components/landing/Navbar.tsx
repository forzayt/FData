import { Link } from "react-router-dom";
import { Database, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold tracking-tight">FData</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </a>
          <a
            href="https://github.com/forzayt/FData"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            Contribute
          </a>
          <Link to="/datasets">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Explore Datasets
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <a
            href="https://github.com/forzayt/FData"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
          <Link to="/datasets">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
