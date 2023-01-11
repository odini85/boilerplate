const { merge } = require("webpack-merge");
const path = require("path");
const baseConfig = require("./base.js");

const config = {
  mode: "development",
  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname),
    },
    client: {
      overlay: true,
    },
  },
};

module.exports = merge(baseConfig, config);
