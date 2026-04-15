/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0b1f3a',
          700: '#173b6b',
          500: '#2a5d9f',
        },
      },
    },
  },
  plugins: [],
};
