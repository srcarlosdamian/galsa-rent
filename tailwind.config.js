/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cta: '#1F34F2',
        'cta-hover': '#1629c4',
        surface: '#FFFFFF',
        subtle: '#FBFBFB',
        edge: '#EBEBEB',
        'edge-light': '#F0F0F0',
        ink: {
          900: '#111827',
          800: '#1F2937',
          700: '#374151',
          600: '#4B5563',
          500: '#6B7280',
          400: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: [
          '"Google Sans"',
          '"Google Sans Display"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'search': '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
        'dropdown': '0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)',
        'float': '0 24px 48px -12px rgba(0, 0, 0, 0.14)',
      }
    },
  },
  plugins: [],
}
