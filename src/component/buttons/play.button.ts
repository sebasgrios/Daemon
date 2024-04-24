import { ButtonStyle, MessageComponentInteraction } from "discord.js";
import Button from "./button";

export default class PlayButton extends Button {
    constructor(
        customId: string = 'play-button',
        label: string = '▶️',
        style: ButtonStyle = ButtonStyle.Success
    ) {
        super(customId, label, style);
    }

    async execute(interactionCollector: MessageComponentInteraction): Promise<void> {
        // interactionCollector.update({
        //     embeds: [musicInfo(client, interaction, 'play')],
        //     components: [playGroupButton]
        // });

        interactionCollector.reply('gonna play the song');
    }
}