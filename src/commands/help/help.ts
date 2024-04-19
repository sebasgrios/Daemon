import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import ICommand from '../../interfaces/command.interface';

export const task: ICommand = {
    data: new SlashCommandBuilder()
        .setName(`help`)
        .setDescription(`Shows all commands`),
    run: async (client: Client, interaction: CommandInteraction) => {
        interaction.reply(`help command works!`);
    }
};