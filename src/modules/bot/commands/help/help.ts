import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import ICommand from '../../interfaces/command.interface';
import discordClient from '../../../..';

const helpCommand: ICommand = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Muestra todos los comandos'),
    run: async (interaction: CommandInteraction) => {
        const embed = new EmbedBuilder()
            .setColor([0, 153, 255])
            .setTitle('Comandos')
            .setDescription(`Lista con los comandos de ${discordClient.getClient().user?.username}:`);

        interaction.reply({ embeds: [embed] });
    }
};

export default helpCommand;