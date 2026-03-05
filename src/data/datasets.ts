export interface Dataset {
  name: string;
  extension: string;
  size: string;
  url: string;
}

const files = import.meta.glob('./datasets/*.*');

export const datasets: Dataset[] = Object.keys(files).map((filePath) => {
  const fileNameWithExt = filePath.split('/').pop() || '';
  const lastDot = fileNameWithExt.lastIndexOf('.');
  const name = lastDot !== -1 ? fileNameWithExt.substring(0, lastDot) : fileNameWithExt;
  const extension = lastDot !== -1 ? fileNameWithExt.substring(lastDot + 1) : '';

  return {
    name: name.replace(/_/g, ' '),
    extension: extension,
    size: "Unknown",
    url: `https://forzayt.github.io/FData/src/data/datasets/${fileNameWithExt}`,
  };
});

export const formats = Array.from(new Set(datasets.map(d => d.extension.toUpperCase())));
