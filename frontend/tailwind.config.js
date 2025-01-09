/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ajuste para seus arquivos
  theme: {
    extend: {
      colors: {
        primary: "#11002b",
        primaryDark: '#0b001c',
        secondary: '#ffade9', // Tons secundários
        accent: {
          DEFAULT: "#ffa599",
          hover: "#bb7066",
          light: "#747bff",
          lightHover: "#5b64e6",
        },
      },
    },
  },
  plugins: [],
};
