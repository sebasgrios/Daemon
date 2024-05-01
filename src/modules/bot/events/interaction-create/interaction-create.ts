import { Events, CommandInteraction } from "discord.js";
import IEvent from "../../interfaces/event.interface";
import { discordClient } from "../../../..";

const interactionCreateEvent : IEvent = {
    data: {
        name: Events.InteractionCreate,
        once: false,
    },
    execute (interaction: CommandInteraction) {
        const command = discordClient.commands?.get(interaction.commandName);

        if (!command) return;

        command.run(interaction);
    }
};

export default interactionCreateEvent;