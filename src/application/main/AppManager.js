const electron = require('electron')
const path = require('path')
const url = require('url')
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

	onClose (e) {
		if (this.isQuitting) {
			this.mainWindow = null
		} else {
			e.preventDefault()
			this.mainWindow.hide()
		}
	}

	onClick () {
		this.mainWindow.show()
	}

	onTrayExit () {
		this.isQuitting = true
		this.mainWindow.close()
	}

	createWindow () {
		this.isQuitting = false

		this.contextMenu = Menu.buildFromTemplate([
			{
				label: 'Show App',
				click: this.onClick.bind(this)
			},
			{
				label: 'Quit',
				click: this.onTrayExit.bind(this)
			}
		])

		this.tray = new Tray('./public/images/icon.ico')
		this.tray.setContextMenu(this.contextMenu)
		this.tray.on('click', this.onClick.bind(this))

		this.mainWindow = new BrowserWindow(this.options)
		this.mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, '../../../public/index.html'),
			protocol: 'file:',
			slashes: true
		}))
		this.mainWindow.tray = this.tray
		this.mainWindow.on('close', this.onClose.bind(this))
	}

}

module.exports = AppManager
