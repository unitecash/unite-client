const webpack = require('./webpack.config.js')

const karmaConf = {
  basePath: '.',

  browsers: [
    'ChromeHeadless',
    'FirefoxHeadless'
  ],

  // browsers: [
  //   'Chrome',
  //   'Firefox'
  // ],

  customLaunchers: {
    FirefoxHeadless: {
      base: 'Firefox',
      flags: ['-headless']
    }
  },

  reporters: ['mocha'],

  frameworks: ['mocha'],

  webpack: webpack,

  preprocessors: {
    './feature/loader.js': ['webpack'],
    './unit/loader.js': ['webpack']
  },

  files: [
    './feature/loader.js',
    './unit/loader.js'
  ],

  client: {
    mocha: {
      reporter: 'html'
    }
  }
}

module.exports = function (config) {
  config.set(karmaConf)
}
