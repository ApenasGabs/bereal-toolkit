const electron = require("electron");
const { IpcMainInvokeEvent } = require("electron");
const processFiles = require("./processor.ts");
const { dialog, ipcMain } = electron;

interface ProcessFilesResponse {}

ipcMain.handle(
  "process:files",
  async (
    _event: typeof IpcMainInvokeEvent,
    folderPath: string
  ): Promise<ProcessFilesResponse> => {
    return await processFiles(folderPath);
  }
);

ipcMain.handle("dialog:selectFolder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (!result.canceled) {
    return result.filePaths[0];
  }
  return null;
});
