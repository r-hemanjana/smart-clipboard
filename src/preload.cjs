const { contextBridge } = require("electron");

// expose API to react world
contextBridge.exposeInMainWorld("clipboardAPI", {
  getAppVersion: () => "1.0.0",
});