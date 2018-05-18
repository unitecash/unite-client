const path = require('path')
const webpack = require("webpack")

module.exports = {
  entry: [
    "./src/client/js/main.js"
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'public/js')
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  node: {
    fs: 'empty'
  }
};
