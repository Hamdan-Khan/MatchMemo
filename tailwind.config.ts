import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#222831",
        secondary: "#393E46",
        textPrimary: "#D8D9DA",
        textHeading: "#2dd46a",
        outer: "rgb(45,51,63)",
        inner: "rgb(51,65,85)",
      },
    },
  },
  plugins: [],
};
export default config;
