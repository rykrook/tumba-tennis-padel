/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#183c86',
        secondary: '#0070ba',
        accent:    '#ebb869',
      },
    },
  },
  plugins: [],
}