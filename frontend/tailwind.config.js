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
        primary2: "#06549D",   
        secondary: "#c3e8e7",   
        secondary2: "#9CCEFC",
        'primary-dark': '#0275a7',   
        green: '#92e2a8',  
        biru: '#7BB3B4',  
        birumuda: '#CFE9E6', 
        putih: '#ffff', // ubah punya sipa jadi putih
        abumuda: '#F3F3F3', 
        deepBlue: '#0B61AA', 
        orange :'#F8B75B',
        powderBlue : '#78AED6',
        paleBlue : '#CAE6F9',  
        'blue-light': '#CFE9E6',
        'login-bg': '#f4f7fc',
        'form-gray': '#e2e8f0',
        'button-hover': '#004e92',
        'custom-gray': '#D9D9D9',    // Warna abu-abu custom
        customBlue: '#0B61AA',       // Warna biru custom yang diperbarui
        newHeaderColor: '#77BEE1',

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
      },
      spacing: {
        '69': '17.25rem',
        '71': '17.75rem',
      },
      fontSize: {
        '2xl': '1.5rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
      },
      fontFamily: {
        appearance: ['Appearance', 'sans-serif', 'Poppins'], // Add Appearance font
        poppins: ['Poppins', 'sans-serif'],
      },
      width: {
        '1/3': '33.3333%',
        '2/3': '66.6667%',
      },
      minWidth: {
        '320': '320px', // Example min-width
      },

     
      
    },
  },
  plugins: [],
};

