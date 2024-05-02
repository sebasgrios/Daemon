import { ActionRowBuilder, ButtonBuilder, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

import ICommand from "../../../interfaces/command.interface";
import ExtendedClient from "../../extended-client.interface";
import playGroupButton from "../../../component/buttons/resume-group.button";
import testButton from "../../buttons/test/test";

const testCommand: ICommand = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command'),
    run: async (client: ExtendedClient, interaction: CommandInteraction) => {
        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Latencia')
            .setDescription(`La latencia de **${client.user?.username}** es de **${client.ws.ping}ms**`);

        const buttons = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                testButton.data
            )
        interaction.reply({ embeds: [embed], components:[buttons] });
    }
};

export default testCommand;