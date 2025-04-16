import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        'primary-accent': '#3B82F6',
        'secondary': '#6366F1',
        'background': '#F3F4F6',
        'surface-cards': '#FFFFFF',
        'text-primary': '#111827',
        'text-muted': '#6B7280',
        'success-cta': '#10B981',
        'error': '#EF4444',
        'border-light': '#E5E7EB',
      },
    },
  },
  plugins: [react(),tailwindcss()],
})
