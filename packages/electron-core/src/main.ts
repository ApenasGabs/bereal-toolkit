import { IpcMainInvokeEvent } from "electron";
import processFiles from "../processor";
import ProcessFilesResponse from "../types";

const { dialog, ipcMain } = Electron;

ipcMain.handle(
  "process:files",
  async (
    _event: IpcMainInvokeEvent,
    folderPath: string
  ): Promise<ProcessFilesResponse[]> => {
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
