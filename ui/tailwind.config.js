/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'dark-blue': '#031C30',

      },
      height:{
        '89':'89%',
      },
      fontSize:{
        'xxs' : '0.5rem'
      }
    },
  },
  plugins: [],
}