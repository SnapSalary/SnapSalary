const { textSpanContainsPosition } = require("typescript");

module.exports = {
  content: ["./*.{tsx, ts, html}", "./components/*.tsx"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
