// /** @type {import('tailwindcss').Config} */
// export default {
//   mode: 'jit',
//   content: ["*"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


// // tailwind.config.js
// module.exports = {
//   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: []
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}