const electron = require('electron')
const path = require('path')
const Tray = electron.Tray
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow

class AppManager {

	constructor (app, options) {
		this.app = app
		this.options = options = {}
		this.bindEvents()
	}

	bindEvents () {
		this.app.on('ready', this.onReady.bind(this))
		this.app.on('window-all-closed', this.onWindowAllClosed.bind(this))
		this.app.on('activate', this.onActivate.bind(this))
	}

	onReady () {
		this.createWindow()
	}

	onWindowAllClosed () {
		if (process.platform !== 'darwin') {
			this.app.quit()
		}
	}

	onActivate () {
		if (this.app.mainWindow === null) {
			this.createWindow()
		}
	}

	createWindow () {
		this.contextMenu = Menu.buildFromTemplate([
			{
				label: 'Show App',
				click: function () {
					this.mainWindow.show()
				}
			},
			{
				label: 'Quit',
				click: function () {
					this.app.isQuiting = true
					this.app.quit()
				}
			}
		])

		this.tray = new Tray(path.join(__dirname, 'public/images/icon.ico'))
		this.tray.setContextMenu(contextMenu)
		this.tray.on('click', this.onClick)

		this.mainWindow = new BrowserWindow(this.options)
		this.mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'public/index.html'),
			protocol: 'file:',
			slashes: true
		}))
		this.mainWindow.tray = tray
		this.mainWindow.on('close', this.onClose)
	}

	onClick () {
		this.mainWindow.show()
	}

	onClose (e) {
		if (this.app.isQuiting) {
			this.mainWindow = null
		} else {
			e.preventDefault()
			this.mainWindow.hide()
		}
	}

}

module.exports = AppManager
