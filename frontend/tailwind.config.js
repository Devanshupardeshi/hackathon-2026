/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(139, 92, 246, 0.35)"
      }
    }
  },
  plugins: []
};
