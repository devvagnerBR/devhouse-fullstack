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
        FiraCode: ['Fira Code']
      }
    },
  },
  plugins: [],

}
