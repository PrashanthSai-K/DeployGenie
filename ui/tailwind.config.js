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
        'xxs' : '0.5rem',
        'xms' : '0.7rem',
      },
      animation: {
            shimmer: "shimmer 2s linear infinite"
          },
          "keyframes": {
            shimmer: {
              from: {
                "backgroundPosition": "0 0"
              },
              to: {
                "backgroundPosition": "-200% 0"
              }
            }
          }
    },
  },
  plugins: [],
}