/** @type {import ('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui_components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "440px",
        sm: "600px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(0, 1fr))",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          xl: "1rem",
          "2xl": "1rem",
        },
      },
      backgroundImage: {
        primaryGradient:
          "linear-gradient(132deg, #01090F 31.04%, #032942 100%)",
      },
      transitionTimingFunction: {
        elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
    boxShadow: ["responsive", "hover", "focus"],
  },

  corePlugins: {
    backdropOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    ringOpacity: false,
    textOpacity: false,
  },
};
