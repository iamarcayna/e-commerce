/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        gotham: ["Gotham", "sans-serif"],
        "dancing-script": ["Dancing Script", "cursive"],
      },
      backgroundImage: {
        hero: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0.1)), url('./assets/images/hero-bg.jpg')",
      },
      animation: {
        showIn: "showIn 200ms cubic-bezier(0, 0, 0.2, 1) forwards",
      },
      keyframes: {
        showIn: {
          "0%": {
            transform: "scale(0)",
            opacity: "0",
          },
          "20%": {
            transform: "scale(0.2)",
            opacity: "0.2",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
