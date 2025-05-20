// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
