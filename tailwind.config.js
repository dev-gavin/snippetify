/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sun: {
          DEFAULT: "#F6CA83",
          50: "#FEF8EE",
          100: "#FDF3E2",
          200: "#FBE8CA",
          300: "#F9DEB3",
          400: "#F8D49B",
          500: "#F6CA83",
          600: "#F1AE40",
          700: "#DA8D10",
          800: "#98620B",
          900: "#553706",
          950: "#342204",
        },
        midnight: {
          DEFAULT: "#011627",
          50: "#F9FCFF",
          100: "#D6ECFE",
          200: "#91CCFC",
          300: "#4BACFA",
          400: "#068CF8",
          500: "#0565B2",
          600: "#033D6D",
          700: "#011627",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
      },
    },
  },
  plugins: [],
};
