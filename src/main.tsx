
import { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [history, setHistory] = useState<string[]>([
    "Hello world",
    "npm run dev:ui",
    "https://example.com",
  ]);

  return (
    <main style={{ padding: "24px", fontFamily: "sans-serif" }}>
        <h3> App version: {window.clipboardAPI.getAppVersion()}</h3>
      <h1>Smart Clipboard</h1>
      <p>Your recent copies</p>

      {history.length === 0 ? (
        <p>No clipboard history yet.</p>
      ) : (
        <ul>
          {history.map((text, index) => (
            <li key={`${text}-${index}`} style={{ marginBottom: "8px" }}>
              {text}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => setHistory([])}>Clear history</button>
      <button onClick={() => setHistory(["New copied text", ...history])}>
        Add sample
      </button>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
