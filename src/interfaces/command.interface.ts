import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface ICommand {
    data: SlashCommandBuilder;
    run: (client: Client, interaction: CommandInteraction) => void;
}