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
          50: '#f2f5f2',
          100: '#dce5dc',
          200: '#b8c9b8',
          300: '#8fa88f',
          400: '#6b8a6b',
          500: '#4a6b4a',
          600: '#3a5a3a',
          700: '#2a452a',
          800: '#1f351f',
          900: '#162816',
          950: '#0f1f0f',
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
