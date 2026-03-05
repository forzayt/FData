import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Database, Search, X, Github, User, LogOut, LayoutDashboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DatasetCard from "@/components/catalog/DatasetCard";
import DatasetDetailDialog from "@/components/catalog/DatasetDetailDialog";
import { datasets, formats as allFormats, Dataset } from "@/data/datasets";

import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 9;

const Datasets = () => {
  const [search, setSearch] = useState("");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [detailDataset, setDetailDataset] = useState<Dataset | null>(null);


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

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full px-4 text-white hover:bg-white/5"
                >
                  Submit Dataset
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Submit a Dataset</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to submit a new dataset.
                  </DialogDescription>
                </DialogHeader>
                <form action="https://formsubmit.co/vishnusanthoshvr@gmail.com" method="POST" className="grid gap-4 py-4 max-h-[80vh] overflow-y-auto pr-2">
                  <input type="hidden" name="_subject" value="New Dataset Submission!" />
                  <input type="hidden" name="_captcha" value="true" />
                  <div className="grid gap-2">
                    <Label htmlFor="name">Dataset Name</Label>
                    <Input id="name" name="name" placeholder="e.g. All India Pincode Dataset" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" placeholder="Dataset containing pincode-wise information..." required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="size">Size</Label>
                    <Input id="size" name="size" placeholder="e.g. 45 MB" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="license">License</Label>
                    <Input id="license" name="license" placeholder="e.g. MIT" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="source">Source Entity</Label>
                    <Input id="source" name="source" placeholder="e.g. data.gov.in" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="url">Dataset URL</Label>
                    <Input id="url" name="url" type="url" placeholder="https://forzayt.github.io/FData/src/data/datasets/..." required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="submitter">Submitter</Label>
                    <Input id="submitter" name="submitter" type="url" placeholder="e.g. https://github.com/forzayt" required />
                  </div>
                  <Button type="submit" className="w-full">Submit Dataset</Button>
                  
                </form>
              </DialogContent>
            </Dialog>

            {/* <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="rounded-full px-4 text-white hover:bg-white/5">Dashboard</Button>
            </Link> */}
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
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${selectedFormats.includes(format)
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
                    className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${page === i + 1
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
