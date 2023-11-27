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
    },
  },
  plugins: [],
};
