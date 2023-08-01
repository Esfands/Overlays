import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      {
        find: '@events',
        replacement: fileURLToPath(new URL('./src/overlays/events', import.meta.url)),
      },
      {
        find: '@server',
        replacement: fileURLToPath(new URL('./server', import.meta.url)),
      },
      {
        find: '@types',
        replacement: fileURLToPath(new URL('./types', import.meta.url)),
      },
    ],
  },
});
