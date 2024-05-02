import { Events, CommandInteraction } from "discord.js";

import IEvent from "../../../interfaces/event.interface";

const interactionCreateEvent : IEvent = {
    data: {
        name: Events.InteractionCreate,
        once: false,
    }
};

export default interactionCreateEvent;