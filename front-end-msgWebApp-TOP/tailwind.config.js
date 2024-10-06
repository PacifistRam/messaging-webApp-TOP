/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        pageLayout: 'auto 1fr auto'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui:{
    themes: ["forest", "dark", "aqua",]
  }
}

