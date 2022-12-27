/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-gray-100": "#b9bbbe",
        "dark-gray-300": "#36393f",
        "dark-gray-500": "#2f3136",
        "dark-gray-700": "#292b2f",
        "dark-gray-900": "202225",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
