const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/bgimg.jpg')",
      },
    },
  },
  plugins: [],
});
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/bgimg.jpg')",
      },
    },
  },
  plugins: [],
});
