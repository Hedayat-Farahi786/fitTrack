// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/spoonacular': {
        target: 'https://api.spoonacular.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/spoonacular/, ''),
      },
      '/api/wger': {
        target: 'https://wger.de',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wger/, ''),
      },
    },
  },
});
