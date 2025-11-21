/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#0070ba',
        secondary: '#183c86',
        accent:    '#ebb869',
      },
    },
  },
  plugins: [],
}