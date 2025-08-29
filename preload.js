const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  callAI: (prompt) => ipcRenderer.invoke('call-ai', prompt)
});
