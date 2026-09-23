import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Micro Interactive Design Reference Studio — Vite config
// Smallest stable stack per ZED-START-HERE §3 and 03-STUDIO-CONSTRUCTION-SPEC.
export default defineConfig({
  plugins: [react()],
  // Relative base so the built studio can be served from any subpath.
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsInlineLimit: 512,
  },
})
