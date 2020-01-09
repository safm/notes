const webpack = require("webpack");
const HWP = require("html-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = options => {
  return [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    }),
    new HWP({
      template: options.APP_DIR + "/index.html"
    }),
    new AssetsPlugin({
      filename: options.BUILD_FOLDER_NAME + "/assets.json",
      includeManifest: "manifest",
      fullPath: true,
      manifestFirst: "true",
      prettyPrint: true
    }),
    new webpack.SourceMapDevToolPlugin({
      append: false,
      filename: "hidden-sm/[file].map",
      exclude: [/npm\..*\.js/, /manifest.*\.js/]
    })
  ];
};
