/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cozy: {
          bg: '#fdf6e3',
          paper: '#fffcf5',
          text: '#5c4b37',
          accent: '#d4a373',
          soft: '#e9edc9',
          warm: '#faedcd',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', 'serif'],
        sans: ['"Gowun Batang"', 'serif'],
      }
    },
  },
  plugins: [],
}
