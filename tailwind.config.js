/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:   '#1BBCD8',
        secondary: '#0DEAFF',
        dark:      '#040C10',
        darker:    '#061A25',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'scroll-up': 'scrollUp 35s linear infinite',
        'scroll-down': 'scrollDown 35s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'floatY 6s ease-in-out infinite',
      },
      keyframes: {
        scrollUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        scrollDown: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(79,142,247,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(79,142,247,0.8), 0 0 60px rgba(0,212,255,0.3)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
      },
    },
  },
  plugins: [],
}
