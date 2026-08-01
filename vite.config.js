import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Set VITE_BASE_PATH to your repository name, for example:
  // VITE_BASE_PATH=/medical-billing-portal/ npm run build
  // The included GitHub Actions workflow sets this automatically.
  base: '/medical-billing-portal/',
}));
