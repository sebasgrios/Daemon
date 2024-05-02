import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

import ICommand from "../../../interfaces/command.interface";
import ExtendedClient from "../../extended-client.interface";
import playGroupButton from "../../../component/buttons/resume-group.button";

const testCommand: ICommand = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command'),
    run: async (client: ExtendedClient, interaction: CommandInteraction) => {
        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Latencia')
            .setDescription(`La latencia de **${client.user?.username}** es de **${client.ws.ping}ms**`);


        interaction.reply({ embeds: [embed], components:[playGroupButton] });
    }
};

export default testCommand;