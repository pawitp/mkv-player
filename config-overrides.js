const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = function override(config, env) {
  config.plugins.unshift(
    new CopyWebpackPlugin({
      patterns: [
        {
          context:
            path.resolve(__dirname, "node_modules") + "/libass-wasm/dist/js",
          from: "*",
          to: "subtitles-octopus",
          globOptions: {
            ignore: "*.asm.js" // Not used
          }
        }
      ]
    })
  );
  return config;
};
