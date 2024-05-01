import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import ICommand from '../../../interfaces/command.interface';
import ExtendedClient from '../../../client/extended-client.interface';

const helpCommand: ICommand = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Muestra todos los comandos'),
    run: async (client: ExtendedClient, interaction: CommandInteraction) => {
        const embed = new EmbedBuilder()
            .setColor([0, 153, 255])
            .setTitle('Comandos')
            .setDescription(`Lista con los comandos de ${client.user?.username}:`);

        interaction.reply({ embeds: [embed] });
    }
};

export default helpCommand;