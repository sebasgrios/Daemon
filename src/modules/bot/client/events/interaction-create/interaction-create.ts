import { Events, CommandInteraction } from "discord.js";

import IEvent from "../../../interfaces/event.interface";
import ExtendedClient from "../../../client/extended-client.interface";

const interactionCreateEvent : IEvent = {
    data: {
        name: Events.InteractionCreate,
        once: false,
    },
    execute (client: ExtendedClient, interaction: CommandInteraction) {
        const command = client.commands?.get(interaction.commandName);

        if (!command) return;

        command.run(client, interaction);
    }
};

export default interactionCreateEvent;