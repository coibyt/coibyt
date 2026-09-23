import type { Config } from "tailwindcss";

// Design tokens sampled from timma.fi's live palette (brand direction requested
// by the client) and adapted for VaraaAi.Com. See docs/BRAND.md.
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0d1718",
          50: "#f4f6f6",
          100: "#e4e9e9",
          400: "#5b6b6c",
          700: "#25302f",
          900: "#0d1718",
        },
        peach: {
          50: "#fff8f5",
          100: "#ffece4",
          200: "#ffd9c9",
          300: "#ffbfa3",
        },
        primary: {
          50: "#f4f1fa",
          100: "#e6dff3",
          200: "#dad0ef",
          300: "#b7a4dc",
          400: "#8b76b9",
          500: "#624f89",
          600: "#513f74",
          700: "#40325c",
          800: "#2f2544",
          900: "#1f182d",
        },
        teal: {
          50: "#e6f2f2",
          100: "#cce6e6",
          400: "#03878f",
          500: "#02646b",
          600: "#024f54",
          700: "#013a3e",
        },
        coral: {
          50: "#fef1ec",
          100: "#fddcce",
          400: "#f0855f",
          500: "#ec6a47",
          600: "#d54f2c",
        },
        berry: {
          50: "#fbeaee",
          400: "#d54a6c",
          500: "#c6274d",
          600: "#a31f3f",
        },
        sage: {
          50: "#eef1ef",
          400: "#7d9083",
          500: "#687b6e",
          600: "#54645a",
        },
        mist: {
          50: "#f2f5f5",
          100: "#e6ebeb",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 10px -2px rgb(13 23 24 / 0.08), 0 1px 3px -1px rgb(13 23 24 / 0.06)",
        popover: "0 12px 32px -8px rgb(13 23 24 / 0.18)",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 180ms ease-out",
        "slide-up": "slide-up 220ms cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
