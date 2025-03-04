/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textShadow: {
        sm: '0 0 2px var(--tw-shadow-color)',
      },
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(-50%) rotate(0deg)' },
          '25%': { transform: 'translateX(-50%) rotate(-5deg)' },
          '75%': { transform: 'translateX(-50%) rotate(5deg)' }
        }
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out',
        'shake': 'shake 1s ease-in-out infinite'
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    },
  ],
}; 
