const webpack = require('../webpack.config.js')

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
    'loader.js': ['webpack']
  },

  files: [
    'loader.js'
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
