import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    proxy: {
      '/auth': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
      '/complaints': 'http://localhost:5000',
      '/departments': 'http://localhost:5000',
      '/branches': 'http://localhost:5000',
      '/dashboard': 'http://localhost:5000',
      '/notifications': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
      '/health': 'http://localhost:5000',
    },
  },
});
