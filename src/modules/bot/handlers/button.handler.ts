import { Collection } from "discord.js";
import { EventEmitter } from "events";

import ExtendedClient from "../client/extended-client.interface";
import IButton from "../interfaces/button.interface";
import { getFilesByDir } from "../utils/files-by-dir";

export class ButtonActionHandler extends EventEmitter {
    private client: ExtendedClient
    private buttons: Collection<string, IButton>

    constructor(client: ExtendedClient) {
        super();
        this.client = client;
        this.buttons = new Collection<string, IButton>;
    }

    async getButtonsFromFiles(): Promise<Collection<string, IButton>> {
        const collection = new Collection<string, IButton>();
        const files = await getFilesByDir('buttons');

        files.forEach(file => collection.set(file.data.data.custom_id, file));

        this.buttons = collection;

        return collection;
    }

    getButtons() {
        return this.buttons;
    }
}
