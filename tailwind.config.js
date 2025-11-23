/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roche: {
          blue: '#0044CC',
          'blue-dark': '#002F99',
          'blue-light': '#3366DD',
          light: '#E1F0FF',
        },
        joy: {
          orange: '#FF6B35',
          yellow: '#FFD93D',
        },
        energy: {
          orange: '#FF6B35',
          yellow: '#FFD93D',
        },
        growth: {
          green: '#06D6A0',
        },
        vitality: {
          purple: '#6A4C93',
        },
        alert: '#EF476F',
        success: '#06D6A0',
        warning: '#FFB627',
        error: '#EF476F',
        info: '#118AB2',
        text: {
          main: '#1F2937',
          sub: '#6B7280',
          gray: '#6B7280',
          dark: '#111827',
        },
        bg: {
          'gradient-start': '#F0F4FF',
          'gradient-end': '#FFF5E6',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      minHeight: {
        'touch': '80px',
        'touch-comfortable': '96px',
      },
      minWidth: {
        'touch': '80px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease',
        'slide-up': 'slideUp 0.4s ease',
        'bounce-in': 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'pulse-ring': 'pulseRing 2s infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 4px rgba(0, 68, 204, 0.2)' },
          '50%': { boxShadow: '0 0 0 8px rgba(0, 68, 204, 0)' },
        },
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}