import { ButtonStyle, MessageComponentInteraction } from "discord.js";
import Button from "./button";

export default class SkipButton extends Button {
    constructor(
        customId: string = 'skip-button',
        label: string = '⏭︎',
        style: ButtonStyle = ButtonStyle.Primary
    ) {
        super(customId, label, style);
    }

    async execute(interactionCollector: MessageComponentInteraction): Promise<void> {
        // interactionCollector.update({
        //     embeds: [musicInfo(client, interaction, 'pause')],
        //     components: [pauseGroupButton]
        // });
        
        interactionCollector.reply('gonna skip the song');
    }
}