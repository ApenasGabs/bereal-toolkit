import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: "packages/electron-core/src/main.ts",
    }),
  ],
  build: {
    outDir: "dist/react",
  },
});
