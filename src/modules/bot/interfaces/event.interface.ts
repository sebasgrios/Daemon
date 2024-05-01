import { CommandInteraction } from "discord.js";
import ExtendedClient from "../client/extended-client.interface";

export default interface IEvent {
    data: {
        name: string;
        once: boolean;
    };
    execute: (client: ExtendedClient, interaction: CommandInteraction) => void;
}