import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dustyRose: "#B78686",
        roseTaupe: "#A87373",
        warmWhite: "#FAF8F7",
        champagne: "#F3ECE8",
        graphite: "#2B2B2B",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -15px rgba(43, 43, 43, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
