'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let count;
function createWindow() {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // mainWindow.loadURL('http://localhost:3333/');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

}

function createMenu() {
    let template = [{
      label: 'Edit',
      submenu: [{
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }]
    }, {
      label: 'View',
      submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            // on reload, start fresh and close any old
            // open secondary windows
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach(function (win) {
                if (win.id > 1) {
                  win.close()
                }
              })
            }
            focusedWindow.reload()
          }
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F'
          } else {
            return 'F11'
          }
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I'
          } else {
            return 'F12'
          }
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.toggleDevTools()
          }
        }
      }, {
        type: 'separator'
      }]
    }, {
      label: 'Window',
      role: 'window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      }, {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }]
    }, {
      label: 'Help',
      role: 'help',
      submenu: [{
        label: 'Learn More',
        click: function () {
          electron.shell.openExternal('http://electron.atom.io')
        }
      }]
    }]

    function addUpdateMenuItems (items, position) {
      const version = electron.app.getVersion()
      let updateItems = [{
        label: `Version ${version}`,
        enabled: false
      }, {
        label: 'Checking for Update',
        enabled: false,
        key: 'checkingForUpdate'
      }, {
        label: 'Check for Update',
        visible: false,
        key: 'checkForUpdate',
        click: function () {
          electron.autoUpdater.checkForUpdates()
        }
      }, {
        label: 'Restart and Install Update',
        enabled: true,
        visible: false,
        key: 'restartToUpdate',
        click: function () {
          electron.autoUpdater.quitAndInstall()
        }
      }]

      items.splice.apply(items, [position, 0].concat(updateItems))
    }

    if (process.platform === 'darwin') {
      const name = electron.app.getName()
      template.unshift({
        label: name,
        submenu: [{
          label: `About ${name}`,
          role: 'about'
        }, {
          type: 'separator'
        }, {
          label: 'Services',
          role: 'services',
          submenu: []
        }, {
          type: 'separator'
        }, {
          label: `Hide ${name}`,
          accelerator: 'Command+H',
          role: 'hide'
        }, {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        }, {
          label: 'Show All',
          role: 'unhide'
        }, {
          type: 'separator'
        }, {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function () {
            app.quit()
          }
        }]
      })
      // Window menu.
      template[3].submenu.push({
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        role: 'front'
      })

      addUpdateMenuItems(template[0].submenu, 1)
    }

    if (process.platform === 'win32') {
      const helpMenu = template[template.length - 1].submenu
      addUpdateMenuItems(helpMenu, 0)
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

app.on('will-finish-launching', () => {
  if (process.platform == 'darwin' && !/:(\/)usr\1local\1bin/g.test(process.env.PATH)) {
    process.env.PATH += ':/usr/local/bin';
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  createWindow();
  createMenu();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-finish-lauching', () => {
});

app.on('activate', function () {

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
