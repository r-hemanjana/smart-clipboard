export {};

declare global {
  interface Window {
    clipboardAPI: {
      getAppName: () => Promise<string>;
      getHistory: () => Promise<string[]>;
    };
  }
}