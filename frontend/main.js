const { app, BrowserWindow } = require('electron')
const url = require('url');
const path = require('path');

let win;

function createWindow (){ 
	win = new BrowserWindow({
		show: false,
		WebPreferences: {
			nodeIntegration: true
		}
//	       icon: `file://${__dirname}/dist/assets/logo.png`                
	})
	win.maximize();
	win.show();
	win.removeMenu();
	win.loadURL(
		url.format({
			pathname: path.join(__dirname, `/dist/billing/index.html`),
			protocol: 'file:',
			slashes: true
		})
	);

	//win.loadURL(`file://${__dirname}/dist/index.html`);
	// uncomment below to open the DevTools.
	// win.webContents.openDevTools()
	
	win.on('closed', function () {
		win = null
        })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') { app.quit() }
})

app.on('activate', function () {
	// macOS specific close process
	if (win === null) createWindow()
})
