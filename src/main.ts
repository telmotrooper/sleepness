import { app, BrowserWindow } from 'electron'
import { join } from 'path'

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile(join(__dirname, '../index.html'))
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS, activating the app when no windows are available should open a new one.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  // Quit the app when all windows are closed (except on macOS).
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
