import { createServer } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@/components/ui': path.resolve(__dirname, '../@/components/ui'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});

try {
  console.log('Starting development server...');
  const server = await createServer(config);
  await server.listen();
  console.log(`Server running at http://localhost:${server.config.server.port}`);
} catch (error) {
  console.error('Dev server failed:', error.message);
  process.exit(1);
}