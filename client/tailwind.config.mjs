/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:      '#183c86',
        'primary-dark': '#12306e',
        secondary:    '#0070ba',
        accent:       '#ebb869',
        'accent-dark': '#d9a449',
        surface:      '#f5f8fd',
        cream:        '#fdf8ef',
      },
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(24, 60, 134, 0.12)',
      },
    },
  },
  plugins: [],
}
