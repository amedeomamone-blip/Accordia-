import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import PinyVite from "@pinegrow/piny-vite";

export default defineConfig({
  plugins: [react(), PinyVite()],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});
