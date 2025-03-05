
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./*.{js,ts}"], // ✅ 確保 Tailwind 讀取 HTML & JS 檔案
    theme: {
        extend: {
            colors: {
                primary: "#1A0A08", // 主要背景 / 深色主色
                background: "#FEFCFB", // 整體背景色
                accent: "#FBCB3A", // 鮮黃色（主要按鈕 / 重點）
                secondary: "#D1DE8F", // 黃綠色（次要按鈕）
                highlight: "#94D46B", // 強調色（滑鼠懸停、標示）
                textPrimary: "#1A0A08", // 主要文字色
                textSecondary: "#4A3F3C", // 次要文字色
            },
            fontFamily: {
                sans: ["Jaldi", "sans-serif"], // 設定 Jaldi 為預設字型
            }
        }
    },
    plugins: [],
};
