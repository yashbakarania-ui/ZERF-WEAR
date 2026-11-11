import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: "#111111",
          light: "#F5F3EE",
          subtle: "#181818",
          card: "#202020",
          elevated: "#282828",
        },
        brand: {
          black: "#111111",
          offwhite: "#F5F3EE",
          grey: "#777777",
          muted: "#9E9E9E",
          lime: "#C8FF4D",
          limeHover: "#B4E840",
        },
        border: {
          subtle: "#2A2A2A",
          muted: "#383838",
          strong: "#4A4A4A",
          light: "#E5E2D9",
        },
        status: {
          success: "#38E088",
          warning: "#FFB347",
          danger: "#FF5A5A",
          info: "#60A5FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.08em",
        wider: "0.15em",
        widest: "0.25em",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

