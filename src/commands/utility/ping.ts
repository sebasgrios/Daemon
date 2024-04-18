import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName(`ping`)
    .setDescription(`Shows bot's latency`);

export const execute = (client: any, interaction: any) => {
    interaction.reply({ content: `The ${client.user.username} latency is: ${client.ws.ping} ms` });
};
