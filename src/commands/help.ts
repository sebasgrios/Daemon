import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('shows all commands')

export default { data };