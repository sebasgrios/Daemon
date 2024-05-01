import { ButtonInteraction, InteractionCollector, MessageComponentInteraction } from "discord.js";
import { ButtonActionHandler } from "../../component/buttons/handlers/button.handler";

export default class ButtonCollector {
    private collector: InteractionCollector<ButtonInteraction>;

    constructor (collector: InteractionCollector<ButtonInteraction>) {
        this.collector = collector;
    }

    startCollecting (song: any, interaction: any) {
        this.collector.on('collect', (interactionCollector: MessageComponentInteraction) => {
            new ButtonActionHandler(song, interaction, interactionCollector).execute();
        });
    }
}