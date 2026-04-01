import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isProd = mode === 'production';

  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      hmr: env.DISABLE_HMR !== 'true',
    },

    base: isProd ? '/worksphere-hr/' : '/',  // REQUIRED FOR GH PAGES

    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  };
});