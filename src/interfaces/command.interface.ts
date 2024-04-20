import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface ICommand {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    run: (client: Client, interaction: CommandInteraction) => void;
}