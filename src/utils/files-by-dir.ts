import { join } from "path";
import { readdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Collection } from "discord.js";
import { ErrorHandler } from "../shared/error-handler";

export const getFilesByDir = async (folderName: string): Promise<Collection<string, any>> => {
    const __fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(__fileName)
    const files = readdirSync(
        join(__dirname, `../${folderName}`),
        { withFileTypes: true, recursive: true }
    )
        .filter(file => !file.isDirectory());
    const fileCollection = new Collection<string, any>();

    for (const file of files) {
        const filePath = join(file.path, `${file.name}`);

        const { task } = await import(`file://${filePath}`);

        try {
            fileCollection.set(task.data.name, task);
            console.info(`[✅] [📂] '${file.name}' file loaded`);
        } catch (error) {
            new ErrorHandler('📂', `There was an error loading '${file.name}' file`, error);
        }
    }

    return fileCollection;
}
