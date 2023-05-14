const defaultTheme = require( 'tailwindcss/defaultTheme' )

/** @type {import('tailwindcss').Config} */

export default {

  content: [

    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {

      height: {

        '100dvh': '100dvh'
      },

      width: {

        '100dvw': '100dvw'
      },fontFamily: {

        FiraCode: ['Fira Code'],
        Poppins: ['Poppins']
      },

      colors: {

        dev_primary: {

          "green": "#16A34A",

          "gray-900": "#1E1E1E",
          "gray-800": "#27272A",
          "gray-700": "#525252",
          "gray-400": "#D6D3D1",

          "white-50": "#FFFFFF",
        }
      },screens: {


        'xs': '460px',

        // 'xs': {'min': '460px'},
        ...defaultTheme.screens,




      }
    },
  },
  plugins: [],

}
