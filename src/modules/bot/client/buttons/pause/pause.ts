import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";

import IButton from "../../../interfaces/button.interface";
import ExtendedClient from "../../extended-client.interface";
import error from "../../../component/embed/error.embed";

const pauseButton: IButton = {
    data: new ButtonBuilder()
        .setCustomId('pause-button')
        .setLabel('⏸︎')
        .setStyle(ButtonStyle.Danger),
    run: (client: ExtendedClient, interaction: ButtonInteraction) => {
        interaction.reply({
            embeds: [error(`You mustn't look this ${interaction.customId} interaction`)]
        });
    }
}

export default pauseButton;