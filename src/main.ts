import { app, BrowserWindow, clipboard } from "electron";

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
  });

  window.loadURL("https://example.com");
}

function addToHistory(history: string[], text: string, limit: number) {
  const existingIndex = history.indexOf(text);
  if (!text) return;
  if (existingIndex !== -1) {
    history.splice(existingIndex, 1);
  }
  history.unshift(text);
  if (history.length > limit) {
    history.pop();
  }
}

function watchClipboard() {
  let previousText = clipboard.readText();
  let history: string[] = [];
  const limit = 100;

  const intervalId = setInterval(() => {
    const currentText = clipboard.readText();
    if (currentText !== previousText) {
      console.log("Clipboard changed:", currentText);
      previousText = currentText;

      addToHistory(history, currentText, limit);
    }
  }, 500);

  return {
    stop: () => clearInterval(intervalId),
    getHistory: () => [...history],
  }
}

app.whenReady().then(() => {
  createWindow();
  const watcher = watchClipboard();

  setTimeout(() => {
    console.log("Clipboard history:", watcher.getHistory());
  }, 10000);

  app.on("before-quit", () => {
    console.log("Clipboard watcher stopped.");
    watcher.stop();
  });
});