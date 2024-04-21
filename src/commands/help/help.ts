import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import ICommand from '../../interfaces/command.interface';

const helpCommand: ICommand = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows all commands'),
    run: async (client: Client, interaction: CommandInteraction) => {
        const embed = new EmbedBuilder()
            .setColor([0, 153, 255])
            .setTitle('Comandos')
            .setDescription(`Lista con los comandos de ${client.user?.username}`);

        interaction.reply({ embeds: [embed] });
    }
};

export default helpCommand;