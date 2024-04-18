import { Collection } from "discord.js";
import IEvent from "../interfaces/event.interface";
import { getFilesByDir } from "../utils/files-by-dir";

export const getEvents = async () : Promise<Collection<string, IEvent>> => {
    return await getFilesByDir('events');
};