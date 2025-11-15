/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // 扫描所有 React 文件
  ],
  theme: {
    extend: {
      colors: {
        primary: "#165DFF",  // 主色调（蓝色）
        secondary: "#6B7280", // 辅助色（灰色）
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}