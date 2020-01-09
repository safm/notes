const VENDOR_CHUNKS = {
  react: ["react", "react-dom"],
  styleLoader: ["css-loader", "style-loader"]
};

module.exports = options => {
  return {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name(module) {
            let chunkName;

            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            let packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            packageName = packageName.replace("@", "");

            Object.keys(VENDOR_CHUNKS).forEach(key => {
              const listOfPackageName = VENDOR_CHUNKS[key];

              if (listOfPackageName.includes(packageName)) {
                chunkName = `npm.${key}`;
              }
            });

            return chunkName || `npm.${packageName}`;
          },
          priority: 10,
          enforce: true
        }
      }
    }
  };
};
