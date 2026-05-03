export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accordia: {
          paper: "#fffaf4",
          shell: "#f6eee4",
          ink: "#181612",
          muted: "#655d54",
          line: "#e6ddd1",
          night: "#10222c",
          red: "#d4847f",
          ocean: "#2d7288",
        },
      },
      fontFamily: {
        sans: ["SF Pro Text", "Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["SF Pro Display", "Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
