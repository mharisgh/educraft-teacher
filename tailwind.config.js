/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./**/*.{html,js}","./index.html"],
  theme: {
    extend: {
      colors: {
        primary: '#9c663b',
        primaryDark: '#8f5c34',
        primaryLight: '#fcf7f0',
        primaryStudents: '#f6782c',
      },
      fontFamily: {
        sans: ['Poppins', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}