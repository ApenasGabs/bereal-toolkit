import { ExifTool } from "exiftool-vendored";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import ProcessFilesResponse from "./types";

const exiftool = new ExifTool();

const processFiles = async (
  folderPath: string
): Promise<ProcessFilesResponse[]> => {
  const files = fs.readdirSync(folderPath);

  const results: ProcessFilesResponse[] = [];

  for (const file of files) {
    if (file.endsWith(".webp")) {
      const filePath = path.join(folderPath, file);
      const outputPath = path.join(folderPath, `${path.parse(file).name}.jpg`);

      try {
        await sharp(filePath).jpeg({ quality: 90 }).toFile(outputPath);
        // REVIEW: Rever quais metadados são interessantes de manter,
        // TODO - Pesquisar sobre geo-localização e metadados de imagens
        await exiftool.write(outputPath, {
          Software: "BeReal Toolkit",
          DateTimeOriginal: new Date().toISOString(),
        });

        results.push({
          original: file,
          converted: path.basename(outputPath),
          status: "success",
        });
      } catch (error) {
        results.push({
          original: file,
          error: (error as Error).message,
          status: "failed",
        });
      }
    }
  }

  await exiftool.end();
  return results;
};

export default processFiles;
