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
        "primary-dark": "#0275a7",
        green: "#92e2a8",
        biru: "#7BB3B4",
        birumuda: "#CFE9E6",
        putih: "#ffff",
        abumuda: "#F3F3F3",
        deepBlue: "#0B61AA",
        orange: "#F8B75B",
        powderBlue: "#78AED6",
        paleBlue: "#CAE6F9",
        birutua: "#0B61AA",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-in-out",
        "pull-down": "pullDown 0.5s ease-in-out",
        'click-bounce': 'clickBounce 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        clickBounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '75%': { transform: 'scale(1.05)' },
        },
        pullDown: {
          "0%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-custom": "linear-gradient(to right, #DEF6FF, #0B61AA)",
      },
      boxShadow: {
        customShadow: "0 40px 40px rgba(0, 0, 0, 0.25)",
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
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        bodoni: ['"Libre Bodoni"', "serif"],
      },
    },
  },
  plugins: [],
};

