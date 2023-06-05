import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
// https://vitejs.dev/config/
export default defineConfig({
  root,
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser"
    }
  },
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    chunkSizeWarningLimit: 2048,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        about: resolve(root, "about", "index.html"),
        create: resolve(root, "create", "index.html"),
        explore: resolve(root, "explore", "index.html"),
      }
    }
  }
});
