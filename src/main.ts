import { app, BrowserWindow, clipboard } from "electron";

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
  });

  window.loadURL("https://example.com");
}

function watchClipboard() {
  let previousText = clipboard.readText();
  let history: string[] = [];

  setInterval(() => {
    const currentText = clipboard.readText();
    if (currentText !== previousText) {
      console.log("Clipboard changed:", currentText);
      previousText = currentText;

      const existingIndex = history.indexOf(currentText);

      if (existingIndex !== -1) {
        history.splice(existingIndex, 1);
      }

      history.unshift(currentText);
      console.log("Clipboard history:", history);
    }
  }, 500);
}

app.whenReady().then(() => {
  createWindow();
  watchClipboard();
});