/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fefdf8',
          100: '#fdf8e4',
          200: '#f9edc0',
          300: '#f2d880',
          400: '#e8c158',
          500: '#c9a84c',
          600: '#a68b3f',
          700: '#8a7333',
          800: '#6b5a28',
          900: '#4a3f1c',
        },
        dark: {
          50: '#f8f8f8',
          100: '#e8e8e8',
          200: '#d0d0d0',
          300: '#a8a8a8',
          400: '#787878',
          500: '#505050',
          600: '#383838',
          700: '#282828',
          800: '#1a1a1a',
          900: '#111111',
          950: '#000000',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
