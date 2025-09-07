import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000
  },
  // Disable TypeScript checking since this is a plain HTML/JS project
  define: {
    global: 'globalThis'
  }
})