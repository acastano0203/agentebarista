/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-burgundy": "#4a0e0e",
        "brand-forest": "#0e3a2b",
        "brand-lime": "#a3d433",
        "brand-cream": "#fdf8e1",
        "brand-gold": "#f39c12",
        "coffee-50": "#fdf8e1",
        "coffee-100": "#f5f0d5",
        "coffee-200": "#e8e0b5",
        "coffee-300": "#a3d433",
        "coffee-400": "#8ab52b",
        "coffee-500": "#f39c12",
        "coffee-600": "#0e3a2b",
        "coffee-700": "#0a2b20",
        "coffee-800": "#4a0e0e",
        "coffee-900": "#2d0909",
      },
    },
  },
  plugins: [],
}

