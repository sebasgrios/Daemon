import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";

import IButton from "../../../interfaces/button.interface";
import ExtendedClient from "../../extended-client.interface";
import error from "../../../component/embed/error.embed";

const skipButton: IButton = {
    data: new ButtonBuilder()
        .setCustomId('skip-button')
        .setLabel('⏭︎')
        .setStyle(ButtonStyle.Primary),
    run: (client: ExtendedClient, interaction: ButtonInteraction) => {
        interaction.reply({
            embeds: [error(`You mustn't look this ${interaction.customId} interaction`)]
        });
    }
}

export default skipButton;