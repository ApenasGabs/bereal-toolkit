import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    // electron({
    //   entry: "packages/electron-core/src/main.ts",
    // }),
  ],
  build: {
    outDir: "dist/react",
  },
});
