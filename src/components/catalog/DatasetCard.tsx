import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, User } from "lucide-react";
import { Dataset } from "@/data/datasets";

interface DatasetCardProps {
  dataset: Dataset;
  onViewDetails: (dataset: Dataset) => void;
}

const DatasetCard = ({ dataset, onViewDetails }: DatasetCardProps) => {
  return (
    <div className="glass-card gradient-border group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold leading-tight">{dataset.name}</h3>
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{dataset.description}</p>

      <div className="mb-4 flex flex-wrap gap-1.5 items-center">
        <span
          className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
        >
          <FileText className="h-3 w-3" />
          {dataset.url.split('.').pop()?.toUpperCase() || 'DATA'}
        </span>
        <a
          href={dataset.submitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <User className="h-2.5 w-2.5" />
          {dataset.submitter.split('/').pop()}
        </a>
      </div>

      <div className="flex items-center justify-between border-t border-border/50 pt-4">
        <span className="text-xs text-muted-foreground">{dataset.size}</span>
        <Button
          size="sm"
          variant="ghost"
          className="group/btn gap-1 text-primary hover:text-primary"
          onClick={() => onViewDetails(dataset)}
        >
          View Details
          <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
};

export default DatasetCard;
