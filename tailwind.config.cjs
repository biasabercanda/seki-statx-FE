/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  rippleui: {
		// You will have all the properties available
    
	},
  theme: {
    extend: {},
    fontFamily:{
      sans:['Plus Jakarta Sans']
    }
  },
  plugins: [require("rippleui")],
}
