import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: "#AAB5AB",
        "app-panel": "#F4F4F2",
        "card-surface": "#ECEFEA",
        "card-border": "#E2E6DF",
        "dark-pill": "#121418",
        "dark-hover": "#22262C",
        "accent-lime": "#EBF98F",
        "accent-lime-dark": "#D5E56E",
        "accent-teal": "#C5EBE1",
        "text-main": "#121418",
        "text-muted": "#7A827B",
        "text-subtle": "#9EA69F",
      },
      borderRadius: {
        '4xl': '2.5rem', // 40px
        '3xl': '1.85rem', // 30px
        '2.5xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'panel': '0 25px 60px -15px rgba(35, 45, 38, 0.25), 0 10px 25px -10px rgba(0, 0, 0, 0.1)',
        'card-soft': '0 2px 10px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
};
export default config;
