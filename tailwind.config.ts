import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        "text-primary": "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        stroke: "hsl(var(--stroke))",
        accent: "hsl(var(--accent))",
        gold:      { DEFAULT:"#d4af37", light:"#e8c670", pale:"#f5e6a3", dark:"#b8962e" },
        charcoal:  "#0f0f0f",
        concrete:  "#1a1a1a",
        stone:     "#3a3a3a",
        offwhite:  "#f0ece4",
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      animation: {
        "ken-burns": "ken-burns 18s ease-out forwards",
        ticker:      "ticker 30s linear infinite",
        "ticker-slow": "ticker 60s linear infinite",
        shimmer:     "shimmer 1.2s linear infinite",
        "scroll-down": "scroll-down 1.5s ease-in-out infinite",
        "word-fade-in": "word-fade-in 0.4s ease-out forwards",
        "gradient-shift": "gradient-shift 5s ease infinite",
        "float-y": "float-y 6s ease-in-out infinite",
      },
      keyframes: {
        "ken-burns": { "0%":{ transform:"scale(1)" }, "100%":{ transform:"scale(1.08)" } },
        ticker:      { "0%":{ transform:"translateX(0)" }, "100%":{ transform:"translateX(-50%)" } },
        shimmer:     { "0%":{ backgroundPosition:"-200% 0" }, "100%":{ backgroundPosition:"200% 0" } },
        "scroll-down": { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(200%)" } },
        "word-fade-in": { "0%": { opacity: "0", filter: "blur(4px)", transform: "translateY(10px) rotateX(-20deg)" }, "100%": { opacity: "1", filter: "blur(0px)", transform: "translateY(0) rotateX(0)" } },
        "gradient-shift": { "0%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" }, "100%": { backgroundPosition: "0% 50%" } },
        "float-y": { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-12px)" } }
      },
    },
  },
  plugins: [],
};

export default config;
