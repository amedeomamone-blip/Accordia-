import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'puck',
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: '../dist-puck',
    emptyOutDir: true
  }
});
