const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = options => {
  let defaultCSSLoaders = ["css-loader", "postcss-loader", "sass-loader"];
  let cssLoaders = [];

  if (!options.hmr) {
    cssLoaders = [
      {
        loader: MiniCssExtractPlugin.loader
      },
      ...defaultCSSLoaders
    ];
  } else {
    cssLoaders = ["style-loader", ...defaultCSSLoaders];
  }

  let rules = [
    {
      test: /\.(js|jsx)$/,
      include: options.APP_DIR,
      use: ["babel-loader"]
    },
    {
      test: /\.scss$/,
      use: cssLoaders,
      exclude: /\.module\.scss$/
    },
    {
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: true
          }
        },
        "postcss-loader",
        "sass-loader"
      ],
      include: /\.module\.scss$/
    }
  ];

  return rules;
};
