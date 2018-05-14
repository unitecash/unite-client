const electron = require('electron');
const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow () {
	mainWindow = new BrowserWindow({
		width: 800, 
		height: 600, 
		frame: true, 
		transparent: false,
		icon: './webroot/res/icon.png',
		autoHideMenuBar: true,
		backgroundColor: '#223'
	});
	
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '/webroot/index.html'),
		protocol: 'file:',
		slashes: true
	}));
	
	mainWindow.on('closed', function () {
		if(app.isQuiting){
			mainWindow = null;
		}
	});
	
	var tray = new Tray(path.join(__dirname, 'webroot/res/icon.ico'));
	
	mainWindow.tray = tray;
	
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                mainWindow.show();
            }
        },
        {
            label: 'Quit', click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);
	
	tray.on('click', function(event){
		mainWindow.show();
	});
	
    tray.setContextMenu(contextMenu);

    mainWindow.on('close', function (event) {
		if(!app.isQuiting){
			event.preventDefault();
			mainWindow.hide();
		}else{
			mainWindow = null;
		}
    });
	
	
	
}




app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
})