/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          offwhite: "#F7F4EF",
          graphite: "#2C2C2C",
          green: "#3D5A47",
          sand: "#C9B99A",
          gray: "#7A7A7A",
          "gray-light": "#E8E6E0",
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
