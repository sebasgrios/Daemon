import { CommandInteraction } from "discord.js";

export default interface IEvent {
    data: {
        name: string;
        once: boolean;
    };
    execute: (interaction: CommandInteraction) => void;
}