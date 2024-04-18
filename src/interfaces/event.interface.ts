import { Client, CommandInteraction } from "discord.js";

export default interface IEvent {
    data: {
        name: string;
        once: boolean;
    };
    execute: (Client: Client, interaction: CommandInteraction) => void;
}