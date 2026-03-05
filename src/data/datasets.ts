import sizes from 'virtual:dataset-sizes';

export interface Dataset {
  name: string;
  extension: string;
  size: string;
  url: string;
}

const files = import.meta.glob('./datasets/*.*');

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizeKeys = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizeKeys[i]}`;
}

export const datasets: Dataset[] = Object.keys(files).map((filePath) => {
  const fileNameWithExt = filePath.split('/').pop() || '';
  const lastDot = fileNameWithExt.lastIndexOf('.');
  const name = lastDot !== -1 ? fileNameWithExt.substring(0, lastDot) : fileNameWithExt;
  const extension = lastDot !== -1 ? fileNameWithExt.substring(lastDot + 1) : '';

  const sizeInBytes = sizes[fileNameWithExt] || 0;

  return {
    name: name.replace(/_/g, ' '),
    extension: extension,
    size: sizeInBytes ? formatBytes(sizeInBytes) : "Unknown",
    url: `https://forzayt.github.io/FData/src/data/datasets/${fileNameWithExt}`,
  };
});

export const formats = Array.from(new Set(datasets.map(d => d.extension.toUpperCase())));
