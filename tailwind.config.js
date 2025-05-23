/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d253f',
        secondary: '#01b4e4',
        accent: '#e50914',
      },
    },
  },
  plugins: [],
}