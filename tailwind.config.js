/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        gotham: ["Gotham", "sans-serif"],
        "dancing-script": ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
