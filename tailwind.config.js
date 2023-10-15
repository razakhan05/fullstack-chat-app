/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [daisyui, tailwindScrollbar],
  daisyui: {
    themes: ["forest"],
  },
};
