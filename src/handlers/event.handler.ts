import { Collection } from "discord.js";
import IEvent from "../interfaces/event.interface";
import { getFilesByDir } from "../utils/files-by-dir";

export const getEvents = async () : Promise<Collection<string, IEvent>> => {
    const collection = new Collection<string, IEvent>();
    const files = await getFilesByDir('events');

    files.forEach(file => collection.set(file.data.name, file));

    return collection;
};