const { app, BrowserWindow, ipcMain } = require('electron');
const fetch = require('node-fetch');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: `${__dirname}/preload.js`
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('call-ai', async (event, prompt) => {
  try {
    
    const url = `http://192.168.1.148:8080/ask?prompt=${encodeURIComponent(prompt)}`;
    const response = await fetch(url);
    const data = await response.text(); 
    return data;
  } catch (err) {
    console.error(err);
    return "Сервертэй холболт амжилтгүй боллоо.";
  }
});
