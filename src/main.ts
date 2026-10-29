import { app, BrowserWindow, clipboard, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.loadURL("http://localhost:5173");
  window.webContents.openDevTools();
}

ipcMain.handle("app:get-name", () => {
  return "Smart Clipboard";
});

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

function watchClipboard(onHistoryChange: (history: string[]) => void) {
  let previousText = clipboard.readText();
  let history: string[] = [];
  const limit = 100;

  const intervalId = setInterval(() => {
    const currentText = clipboard.readText();
    if (currentText !== previousText) {
      console.log("Clipboard changed:", currentText);
      previousText = currentText;

      addToHistory(history, currentText, limit);
      onHistoryChange([...history]);
    }
  }, 500);
  
  return {
    stop: () => clearInterval(intervalId),
    getHistory: () => [...history],
  }
}

app.whenReady().then(() => {
  createWindow();
  const watcher = watchClipboard(history => {
    console.log("Clipboard history updated:", history);
  });

  ipcMain.handle("clipboard:get-history", () => {
    return watcher.getHistory();
  });

  app.on("before-quit", () => {
    console.log("Clipboard watcher stopped.");
    watcher.stop();
  });
});