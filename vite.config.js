import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: process.env.PORT || 5173,
    allowedHosts: [
      'goldensyrianstore.onrender.com',
      '.onrender.com'  // Allows all render.com subdomains
    ]
  },
  preview: {
    host: true,
    port: process.env.PORT || 4173,
    allowedHosts: [
      'goldensyrianstore.onrender.com',
      '.onrender.com'
    ]
  }
})
