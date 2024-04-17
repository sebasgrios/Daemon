import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ver la latencia del bot');

export const run = (client: any, interaction: any) => {
    interaction.reply({ content: `El ping de Sebas es de ${client.ws.ping} ms` });
};
