const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  callAI: (text) => ipcRenderer.invoke('call-ai', text)
});
