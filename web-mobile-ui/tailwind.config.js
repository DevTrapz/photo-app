const flowbite = require("flowbite-react/tailwind");
const konstaConfig = require("konsta/config");

/** @type {import('tailwindcss').Config} */
module.exports = konstaConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
  theme: {
    textColor: (theme) => theme("colors"),
    textColor: {
      primary: "#3490dc",
      secondary: "#ffed4a",
      danger: "#e3342f",
      white: "#ffffff",
      "bg-main": "#27272a",
    },
  },
});
