/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '30em',     // 480px
        sm: '40em',     // 640px
        md: '48em',     // 768px
        lg: '64em',     // 1024px
        xl: '80em',     // 1280px
        '2xl': '96em',  // 1536px
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out infinite 2s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      colors: {
        primary: "#21047c",
        secondary: "#024CAA",
        tertiary: "#0B192C",
      },
    },
  },
  plugins: [],
};
