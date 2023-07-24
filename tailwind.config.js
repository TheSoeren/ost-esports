/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        'ost-black': '#191919',
        'ost-purple': '#8C195F',
        'ost-pink': '#D72864',
        'light-white': '#f9f9f9',
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
  plugins: [
    require('@tailwindcss/typography'),
    require('preline/plugin'),
    // expose colors as css variables
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey]
          const cssVariable =
            colorKey === 'DEFAULT'
              ? `--color${colorGroup}`
              : `--color${colorGroup}-${colorKey}`

          const newVars =
            typeof value === 'string'
              ? { [cssVariable]: value }
              : extractColorVars(value, `-${colorKey}`)

          return { ...vars, ...newVars }
        }, {})
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      })
    },
  ],
}
