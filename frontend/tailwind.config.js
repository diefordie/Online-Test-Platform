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
        primary: "#3887a7",          // Warna utama
        secondary: "#c3e8e7",        // Warna sekunder
        'primary-dark': '#0275a7',   // Warna primary lebih gelap
        green: '#92e2a8',  
        biru: '#7BB3B4',  
        birumuda: '#CFE9E6', 
        putih: '#ffff',
        abumuda: '#F1F4F5', // Warna hijau tambahan
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
    },
  },
  plugins: [],
};
