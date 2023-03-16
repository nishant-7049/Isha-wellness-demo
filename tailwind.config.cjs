/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,}', './src/**/*'],
  theme: {
    extend: {},
    screens: {
      sm: { max: '480px' },
      md: { max: '768px' },
      lg: { max: '1024px' },
      xl: { max: '1440px' },
    },
  },
  plugins: [],
}
