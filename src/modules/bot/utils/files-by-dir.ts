import { join } from "path";
import { readdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { InfoHandler } from "../../../shared/info.handler";
import { ErrorHandler } from "../../../shared/error.handler";


export const getFilesByDir = async (folderName: string): Promise<any[]> => {
    const __fileName = fileURLToPath(import.meta.url);
    const __dirname = dirname(__fileName)
    const files = readdirSync(
        join(__dirname, `../${folderName}`),
        { withFileTypes: true, recursive: true }
    )
        .filter(file => !file.isDirectory());
    const fileCollection = [];

    for (const file of files) {
        const filePath = join(file.path, `${file.name}`);

        const fileContent = await import(`file://${filePath}`);

        try {
            fileCollection.push(fileContent.default)
            // fileCollection.set(task.data.name, task);
            new InfoHandler('📂', `'${file.name}' file loaded`, 'ok');
        } catch (error) {
            new ErrorHandler('📂', `There was an error loading '${file.name}' file`, error);
        }
    }

    return fileCollection;
}
