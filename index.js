const { ipcMain, BrowserWindow } = require('electron')
const uuid = require('uuid')
const path = require('path')

var window = null
var callbacks = {}

module.exports = function (title, opts, onClick, onClose) {
  if (window) return sendNotification(title, opts, onClick, onClose)

  window = new BrowserWindow({
    show: false
  })
  window.loadURL('file://' + path.join(__dirname, '/fake-browser.html'))
  window.on('ready-to-show', () => {
    sendNotification(title, opts, onClick, onClose)
  })

  ipcMain.on('display-notification-onclick', (event, uid) => {
    if (!callbacks[uid].onClick) return
    callbacks[uid].onClick.call(this)
  })
  ipcMain.on('display-notification-onclose', (event, uid) => {
    if (!callbacks[uid].onClose) return
    callbacks[uid].onClose.call(this)
  })
}

function sendNotification (title, opts, onClick, onClose) {
  var uid = uuid.v1()
  callbacks[uid] = {}
  if (onClick) callbacks[uid].onClick = onClick
  if (onClose) callbacks[uid].onClose = onClose
  window.webContents.send('display-notification', {
    title: title,
    opts: opts,
    uid: uid
  })
}
