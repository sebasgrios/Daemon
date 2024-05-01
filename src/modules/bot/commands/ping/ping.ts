import { ColorResolvable, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import ICommand from '../../interfaces/command.interface';
import discordClient from '../../../..';

const getColorByPing = (ping: number): ColorResolvable => {
    if (ping < 60) {
        return [0, 255, 0];
    }
    if (ping < 100) {
        return [255, 191, 0];
    }
    if (ping > 100) {
        return [255, 0, 0];
    }

    return [0, 0, 0];
};

const pingCommand: ICommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Muestra la latencia del servidor'),
    run: async (interaction: CommandInteraction) => {
        const embed = new EmbedBuilder()
            .setColor(getColorByPing(discordClient.getClient().ws.ping))
            .setTitle('Latencia')
            .setDescription(`La latencia de **${discordClient.getClient().user?.username}** es de **${discordClient.getClient().ws.ping}ms**`);


        interaction.reply({ embeds: [embed] });
    }
};

export default pingCommand;