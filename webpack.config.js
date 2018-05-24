const path = require('path')
const webpack = require("webpack")

module.exports = {
  entry: {
    main: "./src/client/js/main.ts",
    login: "./src/client/js/login.ts"
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
