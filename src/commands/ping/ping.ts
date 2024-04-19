import { Client, ColorResolvable, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import ICommand from '../../interfaces/command.interface';

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

export const task: ICommand = {
    data: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`Shows bot's latency`),
    run: async (client: Client, interaction: CommandInteraction) => {
        const embed = new EmbedBuilder()
            .setColor(getColorByPing(client.ws.ping))
            .setTitle(`Latency`)
            .setDescription(`The latency of ${client.user?.username} is: ${client.ws.ping} ms`);


        interaction.reply({ embeds: [embed] });
    }
};