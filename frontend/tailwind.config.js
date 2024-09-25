/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3887a7",         
        secondary: "#c3e8e7",       
        'primary-dark': '#0275a7',   
        green: '#92e2a8',  
        biru: '#7BB3B4',  
        birumuda: '#CFE9E6', 
        putih: '#ffff',
        abumuda: '#F3F3F3', 
        deepBlue: '#0B61AA', 
        orange :'#F8B75B',
        powderBlue : '#78AED6',
        paleBlue : '#CAE6F9',  
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to right, #DEF6FF, #0B61AA)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        bodoni: ['"Libre Bodoni"', 'serif'],
      },
      boxShadow: {
        'customShadow': '0 40px 40px rgba(0, 0, 0, 0.25)',
      }

      
    },
  },
  plugins: [],
};

