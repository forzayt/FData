import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dataset } from "@/data/datasets";
import { Eye, Copy, Check, Calendar, Scale, Shield, Loader2, X, Hash, Github, User } from "lucide-react";

interface DatasetDetailDialogProps {
  dataset: Dataset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DatasetDetailDialog = ({ dataset, open, onOpenChange }: DatasetDetailDialogProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setRowCount(null);
      setPreviewData([]);
    }
  }, [open, dataset]);

  if (!dataset) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dataset.url);
    setCopied(true);
    toast({
      title: "URL Copied",
      description: "Just use 'GET' method on the copied URL to access the dataset!",
      duration: 4000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchPreviewData = async () => {
    setLoading(true);
    setPreviewOpen(true);
    try {
      const response = await fetch(dataset.url);
      const text = await response.text();
      
      // Basic CSV parsing
      const lines = text.split("\n").filter(line => line.trim());
      const headers = lines[0].split(",");
      setRowCount(lines.length - 1);
      const data = lines.slice(1, 11).map(line => {
        const values = line.split(",");
        return headers.reduce((obj: any, header, index) => {
          obj[header.trim()] = values[index]?.trim();
          return obj;
        }, {});
      });
      
      setPreviewData(data);
    } catch (error) {
      console.error("Error fetching preview data:", error);
    } finally {
      setLoading(false);
    }
  };

  const previewColumns = previewData.length > 0 ? Object.keys(previewData[0]) : [];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto border-border/50 bg-card">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{dataset.name}</DialogTitle>
            <DialogDescription className="text-base">{dataset.description}</DialogDescription>
          </DialogHeader>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Scale, label: "Size", value: dataset.size },
              { icon: Shield, label: "License", value: dataset.license },
              { icon: Calendar, label: "Updated", value: dataset.lastUpdated },
              { 
                icon: User, 
                label: "Submitter", 
                value: (
                  <a 
                    href={dataset.submitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    {dataset.submitter.split('/').pop()}
                    <Github className="h-3 w-3" />
                  </a>
                )
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-lg bg-secondary/50 p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon className="h-3 w-3" />
                  {label}
                </div>
                <div className="mt-1 text-sm font-medium">{value}</div>
              </div>
            ))}
          </div>

          <div className="text-xs text-muted-foreground">
            Source: {dataset.source}
          </div>

          {/* Format */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {dataset.url.split('.').pop()?.toUpperCase() || 'DATA'}
            </Badge>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button 
              className="flex-1 gap-2 bg-primary hover:bg-primary/90"
              onClick={fetchPreviewData}
            >
              <Eye className="h-4 w-4" />
              View Dataset
            </Button>
            <Button 
              variant="outline"
              className="flex-1 gap-2 border-border/50"
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy API URL
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col border-border/50 bg-card">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="font-display text-xl">{dataset.name} - Data Preview</DialogTitle>
                <DialogDescription>
                  Showing first 10 rows {rowCount !== null && `out of ${rowCount.toLocaleString()} total rows`}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-auto rounded-lg border border-border/50 mt-4">
            {loading ? (
              <div className="flex h-64 flex-col items-center justify-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Fetching data preview...</p>
              </div>
            ) : previewData.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 bg-secondary/30">
                    {previewColumns.map((col) => (
                      <TableHead key={col} className="text-xs font-semibold uppercase tracking-wider text-foreground whitespace-nowrap">
                        {col}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.map((row, i) => (
                    <TableRow key={i} className="border-border/50 hover:bg-secondary/20">
                      {previewColumns.map((col) => (
                        <TableCell key={col} className="text-xs whitespace-nowrap">
                          {String(row[col])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center gap-2 text-center p-6">
                <X className="h-8 w-8 text-destructive" />
                <p className="text-sm font-medium">Could not load preview</p>
                <p className="text-xs text-muted-foreground">The dataset might be too large or the link is inaccessible directly. Try downloading it instead.</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>Close</Button>
            {/* <Button onClick={() => window.open(dataset.url, "_blank")}>Download Full CSV</Button> */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DatasetDetailDialog;
