const path = require('path')

const webpack = require('webpack')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SriPlugin = require('webpack-subresource-integrity')

const exclude = /(node_modules|tests|public)/

const config = {
  devtool: 'source-map',
  entry: {
    app:      './src/App.js',
    login:    './src/pages/login.js',
    newPosts: './src/pages/newPosts.js',
    profile:  './src/pages/profile.js',
    post:     './src/pages/post.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'javascript/[name].js',
    crossOriginLoading: 'anonymous'
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: exclude
      },
      {
        test: /\.(js|jsx)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'env']
            }
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
                minimize: true,
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
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'login.html',
      inject: 'body',
      chunks: ['app', 'login']
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'profile.html',
      inject: 'body',
      chunks: ['app', 'profile']
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'post.html',
      inject: 'body',
      chunks: ['app', 'post']
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'newposts.html',
      inject: 'body',
      chunks: ['app', 'newPosts']
    }),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: false // disabled due to it breaking file:// functionality
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, 'src/images/icon.svg'),
      prefix: 'icons/',
      inject: true,
      background: '#223',
      title: 'Unite',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true
      }
    }),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('styles/style.css')
      }
    }),
    new webpack.DefinePlugin({
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
    })
  ],
  node: {
    fs: 'empty'
  }
}

module.exports = config
