import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

export const getFilesByDir = async (folderName: string) => {
    const files: any[] = [];
    const __fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(__fileName);
    const filesPath = path.join(__dirname, `../../${folderName}`);

    // Subdirectories filter
    const directories = fs.readdirSync(filesPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    // Run every subdirectory looking for commands
    for (const directory of directories) {
        const directoryPath = path.join(filesPath, directory);
        const fileNames = fs.readdirSync(directoryPath).filter((file: string) => file.endsWith('.ts'));

        for (const fileName of fileNames) {
            const filePath = path.join(directoryPath, fileName);
            const command = await import(`file://${filePath}`);
            console.log(`[✅] File '${fileName}' loaded`)
            files.push(command);
        }
    }

    return files;
}
