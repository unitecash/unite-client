const path = require('path')

module.exports = {
  entry: './src/client/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js')
  }
};