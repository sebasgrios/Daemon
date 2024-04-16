import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

export const getFilesByDir = (folderName: string) => {
    const files = [];
    const __fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(__fileName);
    const filesPath = path.join(__dirname, `../../${folderName}`);    
    const fileNames = fs.readdirSync(filesPath).filter((file: String) => file.endsWith('.ts'));    

    for (const file of fileNames) {
        const filePath = path.join(filesPath, file);
        const command = import(filePath);

        files.push(command);
    }

    return files;
}