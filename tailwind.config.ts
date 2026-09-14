import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        mist: "#f4f7fb",
        navy: "#0f1f38",
        violet: "#6d4aff",
        aqua: "#13b8a6"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(21, 31, 56, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
