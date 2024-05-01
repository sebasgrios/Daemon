import { CommandInteraction, SlashCommandBuilder } from "discord.js";

import ExtendedClient from "../client/extended-client.interface";

export default interface ICommand {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    run: (client: ExtendedClient, interaction: CommandInteraction) => void;
}