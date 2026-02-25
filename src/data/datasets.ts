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
  url: string;
}

export const formats = ["CSV", "JSON"];

export const datasets: Dataset[] = [
  {
    id: "1",
    name: "All India Pincode Dataset",
    description: "Dataset containing pincode-wise information for all 6,000+ pincodes in India.",
    fullDescription: "Comprehensive dataset containing pincode-wise information for all 6,000+ pincodes in India. Includes details such as city, state, district, and sub-district.",
    formats: ["CSV"],
    size: "45 MB",
    license: "MIT",
    source: "data.gov.in",
    lastUpdated: "2024-12-15",
    url: "https://forzayt.github.io/FData/src/data/datasets/India_All_Pincode.csv"
  },
];
