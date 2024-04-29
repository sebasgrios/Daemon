import { ButtonStyle, CommandInteraction, MessageComponentInteraction } from "discord.js";
import Button from "./button";
import ExtendedClient from "../../client/extended-client.interface";

export default class VolumeUpButton extends Button {
    constructor(
        customId: string = 'volume_up-button',
        label: string = '🔊',
        style: ButtonStyle = ButtonStyle.Secondary
    ) {
        super(customId, label, style);
    }

    async execute(client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction): Promise<void> {
        // interactionCollector.update({
        //     embeds: [musicInfo(client, interaction, 'pause')],
        //     components: [pauseGroupButton]
        // });
        
        interactionCollector.reply('gonna volume up the song');
    }
}