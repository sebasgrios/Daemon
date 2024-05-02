import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";

import IButton from "../../../interfaces/button.interface";
import ExtendedClient from "../../extended-client.interface";

const resumeButton: IButton = {
    data: new ButtonBuilder()
        .setCustomId('resume-button')
        .setLabel('▶️')
        .setStyle(ButtonStyle.Success),
    run: (client: ExtendedClient, interaction: ButtonInteraction) => {
        interaction.reply({ content: 'resume button' });
    }
}

export default resumeButton;