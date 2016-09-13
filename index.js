const { ipcMain, BrowserWindow } = require('electron')
const uuid = require('uuid')

var window = null
var callbacks = {}

module.exports = function (title, opts, onClick) {
  if (window) return sendNotification(title, opts, onClick)

  window = new BrowserWindow({
    show: false
  })
  window.loadURL('file://' + __dirname + '/fake-browser.html')
  window.on('ready-to-show', () => {
    sendNotification(title, opts, onClick)
  })

  ipcMain.on('display-notification-onclick', (event, uid) => {
    if (!callbacks[uid]) return
    callbacks[uid].call(this)
  })
}

function sendNotification (title, opts, onClick) {
  var uid = uuid.v1()
  if (onClick) callbacks[uid] = onClick
  window.webContents.send('display-notification', {
    title: title,
    opts: opts,
    uid: uid
  })
}
