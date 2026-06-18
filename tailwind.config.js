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
          100: '#fef9e7',
          200: '#fef3cf',
          300: '#fde68a',
          400: '#d4a574',
          500: '#b8860b',
          600: '#966b0a',
          700: '#7a5709',
          800: '#5c4308',
          900: '#3d2c05',
        },
        dark: {
          50: '#f8f6f4',
          100: '#ede8e3',
          200: '#d9d0c7',
          300: '#b8a99a',
          400: '#9a8776',
          500: '#7d6b5a',
          600: '#6b5a4b',
          700: '#574a3e',
          800: '#483d34',
          900: '#1c1714',
          950: '#0f0c0a',
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
