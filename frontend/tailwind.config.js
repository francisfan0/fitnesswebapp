/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "2rem", // default padding
          sm: "4rem",
          lg: "8rem",
          xl: "10rem",
          "2xl": "12rem",
        },
      },
    },
  },
  plugins: [],
};
