import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    host: true,
    port: process.env.PORT || 5173,
    allowedHosts: [
      'goldensyrianstore.onrender.com',
      '.onrender.com'
    ]
  },
  preview: {
    host: true,
    port: process.env.PORT || 4173,
    allowedHosts: [
      'goldensyrianstore.onrender.com',
      '.onrender.com'
    ]
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        admin: resolve(__dirname, 'checkout-admin-admin.html'),
        orders: resolve(__dirname, 'my-ordered-products.html')
      }
    }
  }
})
