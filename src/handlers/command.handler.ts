import { Collection } from "discord.js";
import ICommand from "../interfaces/command.interface";
import { getFilesByDir } from "../utils/files-by-dir";

export const getCommands = async () : Promise<Collection<string, ICommand>> => {
    return await getFilesByDir('commands');
};