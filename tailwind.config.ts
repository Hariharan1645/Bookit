import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        hdYellow: "#FFD500",
        hdGray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          500: "#6B7280",
        },
      },
      boxShadow: {
        card: "0 6px 20px rgba(15, 23, 42, 0.06)",
        nav: "0 6px 14px rgba(15, 23, 42, 0.06)",
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  plugins: [],
} satisfies Config;
