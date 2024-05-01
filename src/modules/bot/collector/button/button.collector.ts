import { ButtonInteraction, CommandInteraction, InteractionCollector, MessageComponentInteraction } from "discord.js";

import { ButtonActionHandler } from "../../component/buttons/handlers/button.handler";
import SongResultInterface from "../../../music/interfaces/song-results.interface";
import ExtendedClient from "../../client/extended-client.interface";
import ButtonEventHandler from "../../component/events/button.event.handler";

export default class ButtonCollector {
    private collector: InteractionCollector<ButtonInteraction>;
    private client: ExtendedClient

    constructor (client: ExtendedClient, collector: InteractionCollector<ButtonInteraction>) {
        this.client = client;
        this.collector = collector;
    }

    startCollecting (song: SongResultInterface, interaction: CommandInteraction) {
        this.collector.on('collect', (interactionCollector: MessageComponentInteraction) => {
            const buttonActionHandler = new ButtonActionHandler(song, interaction, interactionCollector);

            buttonActionHandler.execute();
            new ButtonEventHandler(buttonActionHandler, this.client);
        });
    }
}