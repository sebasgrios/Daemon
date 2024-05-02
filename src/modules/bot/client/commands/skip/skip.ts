import { CommandInteraction, SlashCommandBuilder } from "discord.js";

import ICommand from "../../../interfaces/command.interface";
import ExtendedClient from "../../extended-client.interface";
import error from "../../../component/embed/error.embed";

const skipCommand: ICommand = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Salta la música'),
    run: async (client: ExtendedClient, interaction: CommandInteraction) => {
        interaction.reply({
            embeds: [error(`You mustn't look this ${interaction.commandName} interaction`)]
        });
    }
};

export default skipCommand;