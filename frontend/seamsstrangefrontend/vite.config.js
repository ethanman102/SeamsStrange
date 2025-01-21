import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 4173, // Use Heroku's $PORT or default to 4173
    host: true, // Expose Vite to the public network
    https: true
  },
})