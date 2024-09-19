import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir: '../backend/src/public',  // This specifies where to output the build files
    emptyOutDir: true,  // This ensures the output directory is cleaned before building
  }
})
