interface Window {
  electronAPI: {
    selectFolder: () => Promise<string>;
    processFiles: (files: string[]) => Promise<void>;
  };
}
