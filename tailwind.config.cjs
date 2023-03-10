/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,}', './src/**/*'],
  theme: {
    extend: {},
    screens: {
      sm: 'max-width: 480px',
      md: 'max-width: 768px',
      lg: 'max-width: 1024px',
      xl: 'max-width: 1440px',
    },
  },
  plugins: [],
}
