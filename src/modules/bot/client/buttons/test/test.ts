import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";

import IButton from "../../../interfaces/button.interface";
import ExtendedClient from "../../extended-client.interface";

const testButton: IButton = {
    data: new ButtonBuilder()
        .setCustomId('test-button')
        .setLabel('test')
        .setStyle(ButtonStyle.Danger),
    run: (client: ExtendedClient, interaction: ButtonInteraction) => {
        interaction.reply({ content: 'test button' });
    }
}

export default testButton;