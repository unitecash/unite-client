const path = require('path')
const webpack = require("webpack")

module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    login: "./src/client/js/login.js"
  },
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
