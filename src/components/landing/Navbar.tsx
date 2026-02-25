import { Link } from "react-router-dom";
import { Database, Github, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex h-14 w-full max-w-4xl items-center justify-between rounded-full border border-white/10 bg-black/20 px-6 backdrop-blur-xl transition-all duration-300 hover:bg-black/30">
        <Link to="/" className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <span className="font-display text-lg font-bold tracking-tight">FData</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </a>
          <a
            href="https://github.com/forzayt/FData"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            Contribute
          </a>
          <Link to="/datasets">
           
          </Link>

          {user ? (
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogin}
              className="rounded-full text-muted-foreground hover:text-foreground"
            >
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <a
            href="https://github.com/forzayt/FData"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
          <Link to="/datasets">
            <Button size="sm" className="rounded-full bg-primary/90 px-4 hover:bg-primary">
              Explore
            </Button>
          </Link>

          {user ? (
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogin}
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
            >
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
