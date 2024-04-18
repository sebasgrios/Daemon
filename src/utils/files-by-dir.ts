import path from "path";
import { readdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Collection } from "discord.js";

export const getFilesByDir = async (folderName: string): Promise<Collection<string, any>> => {
    const __fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(__fileName)
    const files = readdirSync(path.join(__dirname, `../${folderName}`));
    const fileCollection = new Collection<string, any>();

    for (const fileName of files) {
        const filePath = path.join(__dirname, `../${folderName}/${fileName}`);
        const { task } = await import(`file://${filePath}`);

        try {
            fileCollection.set(task.data.name, task);
            console.info(`[✅] '${fileName}' file loaded`)
        } catch (error) {
            console.error(`[❌] There was an error loading '${fileName}' file : ${error}`)
        }
    }

    return fileCollection;
}
