import { ButtonInteraction, CommandInteraction } from "discord.js";

export default interface IMusicInteractions {
    [key: string]: (interction: CommandInteraction | ButtonInteraction) => void;
}