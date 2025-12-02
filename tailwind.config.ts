import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Catppuccin Colors
        ctp: {
          rosewater: "hsl(var(--ctp-rosewater))",
          flamingo: "hsl(var(--ctp-flamingo))",
          pink: "hsl(var(--ctp-pink))",
          mauve: "hsl(var(--ctp-mauve))",
          red: "hsl(var(--ctp-red))",
          maroon: "hsl(var(--ctp-maroon))",
          peach: "hsl(var(--ctp-peach))",
          yellow: "hsl(var(--ctp-yellow))",
          green: "hsl(var(--ctp-green))",
          teal: "hsl(var(--ctp-teal))",
          sky: "hsl(var(--ctp-sky))",
          sapphire: "hsl(var(--ctp-sapphire))",
          blue: "hsl(var(--ctp-blue))",
          lavender: "hsl(var(--ctp-lavender))",
          text: "hsl(var(--ctp-text))",
          subtext1: "hsl(var(--ctp-subtext1))",
          subtext0: "hsl(var(--ctp-subtext0))",
          overlay2: "hsl(var(--ctp-overlay2))",
          overlay1: "hsl(var(--ctp-overlay1))",
          overlay0: "hsl(var(--ctp-overlay0))",
          surface2: "hsl(var(--ctp-surface2))",
          surface1: "hsl(var(--ctp-surface1))",
          surface0: "hsl(var(--ctp-surface0))",
          base: "hsl(var(--ctp-base))",
          mantle: "hsl(var(--ctp-mantle))",
          crust: "hsl(var(--ctp-crust))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
