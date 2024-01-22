import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "10rem",
    },
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        border: "#000000",
        background: "#FFFFFF",
        foreground: "#000000",
        primary: {
          DEFAULT: "#9E77ED",
          foreground: "#FFFFFF",
          "25": "#FCFAFF",
          "50": "#F9F5FF",
          "100": "#F4EBFF",
          "200": "#E9D7FE",
          "300": "#D6BBFB",
          "400": "#B692F6",
          "500": "#9E77ED",
          "600": "#7F56D9",
          "700": "#6941C6",
          "800": "#53389E",
          "900": "#42307D"
        },
        pink: {
          DEFAULT: "#F670C7",
          foreground: "#851651",
          "25": "#FEF6FB",
          "50": "#FDF2FA",
          "100": "#FCE7F6",
          "200": "#FCCEEE",
          "300": "#FAA7E0",
          "400": "#F670C7",
          "500": "#EE46BC",
          "600": "#DD2590",
          "700": "#C11574",
          "800": "#9E165F",
          "900": "#851651"
        },
        info: {
          DEFAULT: "#36BFFA",
          foreground: "#0B4A6F",
          "25": "#F5FBFF",
          "50": "#F0F9FF",
          "100": "#E0F2FE",
          "200": "#B9E6FE",
          "300": "#7CD4FD",
          "400": "#36BFFA",
          "500": "#0BA5EC",
          "600": "#0086C9",
          "700": "#026AA2",
          "800": "#065986",
          "900": "#0B4A6F"
        },
        success: {
          DEFAULT: "#32D583",
          foreground: "#054F31",
          "25": "#F6FEF9",
          "50": "#ECFDF3",
          "100": "#D1FADF",
          "200": "#A6F4C5",
          "300": "#6CE9A6",
          "400": "#32D583",
          "500": "#12B76A",
          "600": "#039855",
          "700": "#027A48",
          "800": "#05603A",
          "900": "#054F31"
        },
        secondary: {
          DEFAULT: "#FDB022",
          foreground: "#7A2E0E",
          "25": "#FFFCF5",
          "50": "#FFFAEB",
          "100": "#FEF0C7",
          "200": "#FEDF89",
          "300": "#FEC84B",
          "400": "#FDB022",
          "500": "#F79009",
          "600": "#DC6803",
          "700": "#B54708",
          "800": "#93370D",
          "900": "#7A2E0E"
        },
        error: {
          DEFAULT: "#F97066",
          foreground: "#7A271A",
          "25": "#FFFBFA",
          "50": "#FEF3F2",
          "100": "#FEE4E2",
          "200": "#FECDCA",
          "300": "#FDA29B",
          "400": "#F97066",
          "500": "#F04438",
          "600": "#D92D20",
          "700": "#B42318",
          "800": "#912018",
          "900": "#7A271A"
        },
        gray: {
          DEFAULT: "#667085",
          foreground: "#000000",
          "25": "#FCFCFD",
          "50": "#F9FAFB",
          "100": "#F2F4F7",
          "200": "#EAECF0",
          "300": "#D0D5DD",
          "400": "#98A2B3",
          "500": "#667085",
          "600": "#475467",
          "700": "#344054",
          "800": "#1D2939",
          "900": "#101828"
        },
        destructive: {
          DEFAULT: "#F97066",
          foreground: "#000000",
        },
        popover: {
          DEFAULT: "#FFFFFF",
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
        shake: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.5)' },
        }

      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'shake': 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config