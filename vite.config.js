import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three-core'
          }

          if (id.includes('node_modules/@react-three/fiber')) {
            return 'r3f-vendor'
          }

          if (id.includes('node_modules/@react-three/drei')) {
            return 'drei-vendor'
          }

          if (id.includes('node_modules/gsap')) {
            return 'gsap-vendor'
          }

          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})
