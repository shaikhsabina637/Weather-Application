/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens:{
        'sm':'350px'
      },
      colors: {
        customGray: '#F5F5F5',
        dark:'#424242'
      },
    },
  },
  plugins: [],
}