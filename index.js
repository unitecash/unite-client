const electron = require('electron')
const app = electron.app
const path = require('path')
const url = require('url')
const options = require('./src/application/config/options')
const AppManager = require('./src/application/main/AppManager')

const appManager = new AppManager(app, options)
