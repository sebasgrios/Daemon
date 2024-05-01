import { Collection } from "discord.js";

import ICommand from "../interfaces/command.interface";
import { getFilesByDir } from "../utils/files-by-dir";

export default class CommandHandler {

    constructor() { }

    async getCommandsFromFiles(): Promise<Collection<string, ICommand>> {
        const collection = new Collection<string, ICommand>();
        const files = await getFilesByDir('commands');

        files.forEach(file => collection.set(file.data.name, file));

        return collection;
    }
}