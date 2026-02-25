import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Database, Search, X, Github, User, LogOut, LayoutDashboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DatasetCard from "@/components/catalog/DatasetCard";
import DatasetDetailDialog from "@/components/catalog/DatasetDetailDialog";
import { datasets, formats as allFormats, Dataset } from "@/data/datasets";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ITEMS_PER_PAGE = 9;

const Datasets = () => {
  const [search, setSearch] = useState("");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [detailDataset, setDetailDataset] = useState<Dataset | null>(null);
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
        redirectTo: window.location.origin + "/datasets",
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const filtered = useMemo(() => {
    return datasets.filter((d) => {
      const matchesSearch =
        !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase());
      const matchesFormat =
        selectedFormats.length === 0 || 
        selectedFormats.some((f) => d.url.toLowerCase().endsWith(f.toLowerCase()));
      return matchesSearch && matchesFormat;
    });
  }, [search, selectedFormats]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleFormat = (format: string) => {
    setSelectedFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="flex h-14 w-full max-w-4xl items-center justify-between rounded-full border border-white/10 bg-black/20 px-6 backdrop-blur-xl transition-all duration-300 hover:bg-black/30">
          <Link to="/" className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold tracking-tight">FData</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="rounded-full px-4 text-white hover:bg-white/5">Home</Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border border-white/10 p-0 overflow-hidden hover:bg-white/5">
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-blue-600 text-white text-[10px]">
                        {user.email?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-white/10 text-white">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs leading-none text-slate-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-white cursor-pointer">
                    <Link to="/dashboard" className="flex items-center gap-2 w-full">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-white cursor-pointer">
                    <Link to="/profile" className="flex items-center gap-2 w-full">
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="focus:bg-red-500/10 focus:text-red-500 text-red-500 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={handleLogin}
                variant="default" 
                size="sm" 
                className="rounded-full px-5 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-600/20"
              >
                Log In
              </Button>
            )}
          </div>
        </nav>
      </div>

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-display text-4xl font-bold tracking-tight">Dataset Catalog</h1>
          <p className="text-muted-foreground">
            Browse {datasets.length} curated datasets.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search datasets by name or description..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-10 bg-secondary/50 border-border/50"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <span className="mr-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Format</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {allFormats.map((format) => (
                <button
                  key={format}
                  onClick={() => toggleFormat(format)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedFormats.includes(format)
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {paginated.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} onViewDetails={setDetailDataset} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="border-border/50"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
                      page === i + 1
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="border-border/50"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Database className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 font-display text-xl font-semibold">No datasets found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      <DatasetDetailDialog
        dataset={detailDataset}
        open={!!detailDataset}
        onOpenChange={(open) => !open && setDetailDataset(null)}
      />
    </div>
  );
};

export default Datasets;
