export interface Dataset {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  formats: string[];
  size: string;
  rows: string;
  license: string;
  source: string;
  lastUpdated: string;
}

export const formats = ["CSV", "JSON"];

export const datasets: Dataset[] = [
  {
    id: "1",
    name: "Global Stock Prices 2024",
    description: "Daily stock prices for 5,000+ companies across 40 exchanges worldwide.",
    fullDescription: "Comprehensive dataset containing daily open, high, low, close prices and trading volumes for over 5,000 publicly traded companies across 40 stock exchanges worldwide. Includes adjusted close prices and dividend data.",
    formats: ["CSV", "Parquet"],
    size: "2.3 GB",
    rows: "12.5M",
    license: "MIT",
    source: "Global Financial Data Corp",
    lastUpdated: "2024-12-15",
  },
];
