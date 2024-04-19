import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import ICommand from '../../interfaces/command.interface';

export const task: ICommand = {
    data: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`Shows bot's latency`),
    run: async (client: Client, interaction: CommandInteraction) => {
        interaction.reply(`The latency of ${client.user?.username} is: ${client.ws.ping} ms`);
    }
};