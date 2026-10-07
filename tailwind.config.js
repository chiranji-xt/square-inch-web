/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Primary surfaces: deep warm charcoals, never flat black.
        ink: "#181715",
        night: "#211F1B",
        surface: "#2A2722",
        // Light side: warm paper tones for text and light accents.
        bone: "#F1ECE3",
        sand: "#D8D0C3",
        // Text hierarchy on dark.
        fog: "#AAA196",
        warmgrey: "#777168",
        // Brand vermilion — architectural marking, used sparingly.
        accent: "#F0442E",
        ember: "#C93828",
        // Hairline borders.
        line: "#3A3630",
        lineLight: "#615A51",
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
