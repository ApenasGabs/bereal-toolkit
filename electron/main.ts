import { dialog, ipcMain } from "electron";

// electron/main.ts
import { processFiles } from "./processor";

ipcMain.handle("process:files", async (event, folderPath) => {
  return await processFiles(folderPath);
});

ipcMain.handle("dialog:selectFolder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (!result.canceled) {
    return result.filePaths[0];
  }
  return null;
});
