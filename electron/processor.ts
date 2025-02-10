import { ExifTool } from "exiftool-vendored";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const exiftool = new ExifTool();

const processFiles = async (folderPath: string) => {
  const files = fs.readdirSync(folderPath);
  //REVIEW - Revisar as tipagens
  type Result =
    | { original: string; converted: string; status: "success" }
    | { original: string; error: string; status: "failed" };

  const results: Result[] = [];

  for (const file of files) {
    if (file.endsWith(".webp")) {
      const filePath = path.join(folderPath, file);
      const outputPath = path.join(folderPath, `${path.parse(file).name}.jpg`);

      try {
        // Converter WebP para JPEG
        await sharp(filePath).jpeg({ quality: 90 }).toFile(outputPath);

        // Adicionar metadados
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
