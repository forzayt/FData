import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dataset } from "@/data/datasets";
import { Download, Calendar, Scale, FileText, Shield } from "lucide-react";

interface DatasetDetailDialogProps {
  dataset: Dataset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DatasetDetailDialog = ({ dataset, open, onOpenChange }: DatasetDetailDialogProps) => {
  if (!dataset) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto border-border/50 bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{dataset.name}</DialogTitle>
          <DialogDescription className="text-base">{dataset.fullDescription}</DialogDescription>
        </DialogHeader>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Scale, label: "Size", value: dataset.size },
            { icon: FileText, label: "Rows", value: dataset.rows },
            { icon: Shield, label: "License", value: dataset.license },
            { icon: Calendar, label: "Updated", value: dataset.lastUpdated },
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

        {/* Formats */}
        <div className="flex flex-wrap gap-2">
          {dataset.formats.map((format) => (
            <Badge key={format} variant="outline" className="text-xs">
              {format}
            </Badge>
          ))}
        </div>

        <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
          <Download className="h-4 w-4" />
          Download Dataset
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DatasetDetailDialog;
