const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/js/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    library: 'App',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
}
