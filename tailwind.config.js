/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#F5F3EE",
        ink: "#111111",
        night: "#0E0E0E",
        accent: "#E88932",
        warmgrey: "#8A867F",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: { mega: "0.35em" },
    },
  },
  plugins: [],
}
