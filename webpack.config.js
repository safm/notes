const webpack = require("webpack");
const path = require("path");
const webpackPlugins = require("./config/webpack.plugins.js");
const webpackOptimization = require("./config/webpack.optimization.js");
const webpackRules = require("./config/webpack.rules.js");

const BUILD_FOLDER_NAME = "dist";
const BUILD_DIR = path.resolve(__dirname, BUILD_FOLDER_NAME);
const APP_DIR = path.resolve(__dirname, "src/client");

const config = {
  entry: APP_DIR + "/App.jsx",
  devtool: false,
  output: {
    path: BUILD_DIR,
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js"
  },
  optimization: webpackOptimization({}),
  module: {
    rules: []
  },
  plugins: webpackPlugins({
    APP_DIR,
    BUILD_FOLDER_NAME
  })
};

module.exports = (env, argv) => {
  if (argv.hot) {
    // Use 'hash' when hot reloading is enabled.
    config.output.filename = "[name].js";
  }

  config.module.rules = webpackRules({
    hmr: !!argv.hot,
    APP_DIR
  });

  return config;
};
