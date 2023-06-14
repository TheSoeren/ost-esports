/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        'ost-black': '#191919',
        'ost-pink': '#8C195F',
        'ost-orange': '#D72864',
      },
    },
  },
  variants: {
    animation: ['motion-safe'],
  },
  plugins: [require('@tailwindcss/typography')],
}
