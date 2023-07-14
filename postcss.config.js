const postcssPresetEnv = require("postcss-preset-env");

const config = {
  plugins: [
    postcssPresetEnv({
      browsers: "last 2 versions",
      stage: 3,
    }),
  ],
};

module.exports = config;
