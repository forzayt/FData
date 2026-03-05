import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

function datasetSizes() {
  return {
    name: 'dataset-sizes',
    resolveId(id: string) {
      if (id === 'virtual:dataset-sizes') {
        return '\0virtual:dataset-sizes';
      }
    },
    load(id: string) {
      if (id === '\0virtual:dataset-sizes') {
        const dir = path.resolve(__dirname, 'src/data/datasets');
        const sizes: Record<string, number> = {};
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir);
          files.forEach(f => {
            const stat = fs.statSync(path.join(dir, f));
            if (stat.isFile()) {
              sizes[f] = stat.size;
            }
          });
        }
        return `export default ${JSON.stringify(sizes)};`;
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    datasetSizes()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
