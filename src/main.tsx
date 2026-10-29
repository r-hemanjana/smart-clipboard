
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [history, setHistory] = useState<string[]>([]);
  const [appName, setAppName] = useState<string>("");

  useEffect(() => {
    window.clipboardAPI.getAppName().then(setAppName);
    window.clipboardAPI.getHistory().then(setHistory);
  }, []);

  return (
    <main style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1>{appName || "Loading..."}</h1>
      <h2>Clipboard history</h2>

      {history.length === 0 ? (
        <p>No clipboard history yet. Copy some text!</p>
      ) : (
        <ul>
          {history.map((text, index) => (
            <li key={`${text}-${index}`}>{text}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
