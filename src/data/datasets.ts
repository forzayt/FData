export interface Dataset {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  formats: string[];
  size: string;
  license: string;
  source: string;
  lastUpdated: string;
}

export const formats = ["CSV", "JSON"];

export const datasets: Dataset[] = [
  {
    id: "1",
    name: "All India Pincode Dataset",
    description: "Dataset containing pincode-wise information for all 6,000+ pincodes in India.",
    fullDescription: "Comprehensive dataset containing daily open, high, low, close prices and trading volumes for over 5,000 publicly traded companies across 40 stock exchanges worldwide. Includes adjusted close prices and dividend data.",
    formats: ["CSV", "JSON"],
    size: "45 MB",
    license: "MIT",
    source: "data.gov.in",
    lastUpdated: "2024-12-15",
  },
];
