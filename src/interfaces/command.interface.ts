import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface ICommand {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    run: (interaction: CommandInteraction) => void;
}