import { Client, Events, CommandInteraction } from "discord.js";
import IEvent from "../interfaces/event.interface";
import discordClient from "..";

export const task : IEvent = {
    data: {
        name: Events.InteractionCreate,
        once: false,
    },
    execute (client: Client, interaction: CommandInteraction) {
        const command = discordClient.commands.get(interaction.commandName);

        if (!command) return;

        command.run(client, interaction);
    }
};