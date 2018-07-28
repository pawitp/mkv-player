const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = function override(config, env) {
  config.plugins.unshift(
    new CopyWebpackPlugin([
      {
        context:
          path.resolve(__dirname, "node_modules") +
          "/JavascriptSubtitlesOctopus/js/wasm",
        from: "*",
        to: "subtitles-octopus",
        ignore: "*.asm.js" // Not used
      }
    ])
  );
  return config;
};
