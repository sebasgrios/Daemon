import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

export const getFilesByDir = async (folderName: string) => {
    const files: any[] = [];
    const __fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(__fileName);
    const filesPath = path.join(__dirname, `../../${folderName}`);

    // Filtro de subdirectorios
    const directories = fs.readdirSync(filesPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    // Recorrido de subdirectorios en busca de comandos
    for (const directory of directories) {
        const directoryPath = path.join(filesPath, directory);
        const fileNames = fs.readdirSync(directoryPath).filter((file: string) => file.endsWith('.ts'));

        for (const fileName of fileNames) {
            const filePath = path.join(directoryPath, fileName);
            console.log(`[✅] ${fileName} cargado correctamente`)
            const command = await import(filePath);
            files.push(command);
        }
    }

    return files;
}
