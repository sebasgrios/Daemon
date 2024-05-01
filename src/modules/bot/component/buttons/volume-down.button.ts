import { ButtonStyle, CommandInteraction, MessageComponentInteraction } from "discord.js";
import Button from "./button";
import ExtendedClient from "../../client/extended-client.interface";
import SongResultInterface from "../../../../music/interfaces/song-results.interface";

// export default new ButtonBuilder()
//     .setCustomId('volume_down-button')
//     .setLabel('🔉')
//     .setStyle(ButtonStyle.Secondary);

export default class VolumeDownButton extends Button {
    constructor(
        customId: string = 'volume_down-button',
        label: string = '🔉',
        style: ButtonStyle = ButtonStyle.Secondary
    ) {
        super(customId, label, style);
    }

    async execute(song: SongResultInterface, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction): Promise<void> {
        // interactionCollector.update({
        //     embeds: [musicInfo(client, interaction, 'pause')],
        //     components: [pauseGroupButton]
        // });
        
        interactionCollector.reply('gonna volume down the song');
    }
}