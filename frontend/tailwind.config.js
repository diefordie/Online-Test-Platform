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
      fontFamily: {
        poppins: ['Poppins'],
      },
      colors: {
        primary: "#5684AB",          // Warna utama
        secondary: "#62A4D1",        // Warna sekunder
        'primary-dark': '#0275a7',   // Warna primary lebih gelap
        green: '#C5E4FF',   
        putih: '#FFF7F7',
        birutua: '#0E3876',// Warna hijau tambahan
        birumuda: '#78AED6',
        birulangit: '#77BEE1',
        hitam: "#000000",
        abu: "#6B7280",
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
