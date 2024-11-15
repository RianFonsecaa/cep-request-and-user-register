/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#5A2DFF',
        secondaryColor: '#8E6FFF',
      },
      fontFamily: {
        russo: ['"Russo One"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

