import { ColorResolvable, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import ICommand from '../../../interfaces/command.interface';
import ExtendedClient from '../../../client/extended-client.interface';

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
    run: async (client: ExtendedClient, interaction: CommandInteraction) => {
        const embed = new EmbedBuilder()
            .setColor(getColorByPing(client.ws.ping))
            .setTitle('Latencia')
            .setDescription(`La latencia de **${client.user?.username}** es de **${client.ws.ping}ms**`);


        interaction.reply({ embeds: [embed] });
    }
};

export default pingCommand;