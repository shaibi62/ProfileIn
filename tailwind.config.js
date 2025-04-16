/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/layout/**/*.{js,jsx,ts,tsx}",
  ],
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
  plugins: [],
}