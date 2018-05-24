const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const exclude = /(node_modules|tests)/
const webpack = require('webpack')

const config = {
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  entry: {
    main: "./src/client/js/main.ts",
    login: "./src/client/js/login.ts"
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: exclude
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: false,
                sourceMap: true
              }
            }
          ]
        }),
        exclude: exclude
      },
      {
        test: /\.(png|jpg|ico|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ],
        exclude: exclude
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ],
        exclude: exclude
      },
      {
        test: /\.txt$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ],
        exclude: exclude
      },
      {
        test: /\.(mp3|wav|ogg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'audio/'
            }
          }
        ],
        exclude: exclude
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ],
        exclude: exclude
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'src/index.html'
    // }),
    // new FaviconsWebpackPlugin('images/favicon/favicon.png'),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('css/styles.css')
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  node: {
    fs: 'empty'
  }
}

module.exports = config
