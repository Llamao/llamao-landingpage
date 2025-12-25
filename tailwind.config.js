import { heroui } from "@heroui/react";
import path from "path";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    path.join(process.cwd(), "app/**/*.{js,ts,jsx,tsx,mdx}"),
    path.join(process.cwd(), "components/**/*.{js,ts,jsx,tsx,mdx}"),
    path.join(
      process.cwd(),
      "node_modules/@heroui/*/dist/**/*.{js,ts,jsx,tsx,mjs}"
    ),
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
