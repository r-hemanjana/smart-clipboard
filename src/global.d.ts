export {};

declare global {
  interface Window {
    clipboardAPI: {
      getAppVersion: () => string;
    };
  }
}