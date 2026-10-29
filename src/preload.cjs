const { contextBridge, ipcRenderer } = require("electron");

// expose API to react world
contextBridge.exposeInMainWorld("clipboardAPI", {
  getAppName: () => ipcRenderer.invoke("app:get-name"),
  getHistory: () => ipcRenderer.invoke("clipboard:get-history"),
});