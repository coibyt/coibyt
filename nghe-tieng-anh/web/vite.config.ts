import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" lets the built site run from any folder or subdomain on Hostinger.
export default defineConfig({
  base: "./",
  plugins: [react()],
  css: { postcss: {} }, // do not pick up the parent folder's Tailwind config
  build: { outDir: "dist", assetsDir: "assets", chunkSizeWarningLimit: 600 },
});
