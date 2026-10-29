/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Primary from design system
        cta: {
          50: '#F3F6FC',
          100: '#E5ECF9',
          200: '#C6D7F1',
          300: '#93B6E6',
          400: '#5A90D6',
          500: '#3D63FF', // Figma CTA color: cta/background/default (#3d63ff)
          600: '#2A4EEB',
          700: '#1F3DD4',
          800: '#172FB0',
          900: '#132488',
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
