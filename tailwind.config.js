/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Primary from design system
        cta: {
          50: '#E9F2FF',
          100: '#D8E8FF',
          200: '#B8D3FF',
          300: '#8EB5FF',
          400: '#618BFF',
          500: '#3D63FF',
          600: '#1B36FF',
          700: '#1F34F2',
          800: '#1125C2',
          900: '#182A97',
          950: '#0E165B',
          DEFAULT: '#3D63FF',
        },
        surface: '#FFFFFF',
        subtle: '#FAFAFA',
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
          '"Inter"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        heading: [
          '"Google Sans"',
          '"Google Sans Display"',
          '"Inter"',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        'search': '0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'dropdown': '0 16px 36px -8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        'float': '0 20px 40px -10px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
