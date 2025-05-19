/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi-Regular", "sans-serif"],
        "satoshi-bold": ["Satoshi-Bold", "sans-serif"],
        "satoshi-light": ["Satoshi-Light", "sans-serif"],
        "satoshi-medium": ["Satoshi-Medium", "sans-serif"],
        "satoshi-black": ["Satoshi-Black", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#A069FF0A",
          200: "#A069FF1A",
          300: "#A069FF",
        },
        accent: {
          100: "#FFFFFF",
          200: "#F3F0F8",
          300: "#848484",
        },
        black: {
          DEFAULT: "#000000",
          100: "#303037",
          200: "#5F5F5F",
        },
        danger: {
          DEFAULT: "#DF1C0C",
          100: "#FDE4E2",
        },
        success: {
          100: "#099E7B",
          200: "#3EE5A6",
          300: "#6CEBBB",
        },
        alert: {
          DEFAULT: "#FF8D24",
          100: "#FBF2DC",
        },
      },
    },
  },
  plugins: [],
};
