/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // STRICT THEME — Dark charcoal surfaces.
        ink: "#1B1A18",
        night: "#25231F",
        surface: "#302B25",
        // STRICT THEME — Warm ivory / stone light side.
        bone: "#F1ECE3",
        ivory: "#F0EBE2",
        sand: "#E9E3D8",
        stone: "#CFC5B7",
        beige: "#A99E91",
        // Text hierarchy.
        // On dark: body #B8AEA2, muted #8C8379. On light: body #6D665E, muted #847B71.
        fog: "#B8AEA2",
        mist: "#8C8379",
        warmgrey: "#6D665E",
        taupe: "#847B71",
        // Brand vermilion — architectural marking, used sparingly.
        accent: "#F0442E",
        ember: "#C93828",
        // Hairline borders: dark bg #3A3630, light bg #B9B0A5.
        line: "#3A3630",
        lineLight: "#B9B0A5",
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
