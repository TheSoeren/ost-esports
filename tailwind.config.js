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
    screens: {
      xs: '319px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  variants: {
    animation: ['motion-safe'],
  },
  plugins: [require('@tailwindcss/typography')],
}
