/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx,}", "./src/**/*"],
  theme: {
    extend: {
      keyframes: {
        "bounce-1": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12%)" },
        },
        loading: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "bounce-1": "bounce 2s ease-out 2",
        loading: "loading 3s ease-in-out",
      },
    },
    screens: {
      xl: { max: "1440px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "480px" },
    },
  },
  plugins: [],
};
