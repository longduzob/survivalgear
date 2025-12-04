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
        primary: {
          DEFAULT: '#0F5132',
          dark: '#1B4332',
        },
        accent: '#40916C',
        background: '#FFFFFF',
        text: '#1A1A1A',
      },
    },
  },
  plugins: [],
};
export default config;
