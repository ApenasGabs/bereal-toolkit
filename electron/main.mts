import { dialog, ipcMain } from "electron";
import processFiles from "./processor";

ipcMain.handle(
  "process:files",
  async (
    _event: Electron.IpcMainInvokeEvent,
    folderPath: string
  ): Promise<any> => {
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
