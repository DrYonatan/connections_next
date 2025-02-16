import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightTheme: {
          primary: "bisque",
          secondary: "#e3c29b",
          effect1: "#d0b28e",
          effect2: "#9d8669",
          text: "black",
          red: "#e54666",
          green: "#46a758",
          blue: "#3e63dd",
          purple: "#8e4ec6",
        },
        darkTheme: {
          primary: "#293132",
          secondary: "#424047",
          effect1: "#474552",
          effect2: "#4f5165",
          text: "white",
          red: "#a13248",
          green: "#2e703a",
          purple: "#63378a",
          blue: "#2d489f",
        },
      },
    },
  },
  plugins: [],
  darkMode: "selector",
} satisfies Config;
