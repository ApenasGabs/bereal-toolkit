const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  selectFolder: () => ipcRenderer.invoke("dialog:selectFolder"),
  processFiles: (files) => ipcRenderer.invoke("process:files", files),
});
