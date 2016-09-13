# electron-main-notification

Easily display native desktop applications from your Electron main process.

Because Notifications use the HTML 5 Notification API, this usually only works
from renderer processes.

However, this modules simplifies this whole thing a bit and automatically
creates an invisible browser window over which those notifications can be
displayed.

## Usage

Actually really easy to use:

```javascript
const { app } = require('electron')
const notify = require('electron-main-notification')

app.on('ready', () => {
  notify('This is a notification!', { body: 'See? Really easy to use!' }, () => {
    console.log('The notification got clicked on!')
  })
})
```
