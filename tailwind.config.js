/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF5F8', 100: '#FCE4EC', 200: '#F3D6DF', 300: '#F48FB1',
          400: '#F7A8C4', 500: '#F7A8C4', 600: '#F48FB1', 700: '#EC6B95',
          800: '#D14A7A', 900: '#A3325A', 950: '#6B1F3C',
        },
        sand: {
          50: '#FFF9FB', 100: '#FFF5F8', 200: '#FCE4EC', 300: '#F3D6DF',
          400: '#F7A8C4', 500: '#F48FB1', 600: '#EC6B95', 700: '#D14A7A',
          800: '#A3325A', 900: '#7A2344', 950: '#4E162C',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        ink: {
          DEFAULT: '#2C2C2C',
          soft: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
      },
    },
  },
  plugins: [],
}
