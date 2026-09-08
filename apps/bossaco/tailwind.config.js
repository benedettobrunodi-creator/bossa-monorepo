/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          white: "#FFFFFF",
          offwhite: "#F7F4EF",
          graphite: "#2C2C2C",
          latao: "#BC8E14",
          blue: "#1D3557",
          "blue-soft": "#A8B8CC",
          gray: "#7A7A7A",
          "gray-light": "#E8E8E8",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
