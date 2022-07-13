/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      strokeWidth: {
        '1.5': '1.5px',
      },
      borderWidth: {
        1: '1px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
