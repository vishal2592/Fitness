/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        darkTheme: {
          bg: "#0F172A",
          card: "#1E293B",
          sidebar: "#111827",
          navbar: "#111827",
          border: "#334155",
          text: "#F8FAFC",
          muted: "#94A3B8",
          primary: "#3B82F6",
        },
      },
    },
  },

  plugins: [],
};