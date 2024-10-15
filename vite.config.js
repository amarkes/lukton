import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Adicionar o alias para "src"
    },

  },
  server: {
    proxy: {
      '/services': {
        target: 'http://localhost:5252', // O servidor backend para o proxy
        changeOrigin: true,               // Se true, modifica o "origin" da requisição para o target
        rewrite: (path) => path.replace(/^\/services/, '') // Remove "/api" do início da URL
      }
    }
  }
})