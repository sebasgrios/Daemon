import { ButtonBuilder, ButtonInteraction } from "discord.js";

import ExtendedClient from "../client/extended-client.interface";

export default interface IButton {
    data: ButtonBuilder;
    run: (client: ExtendedClient, interaction: ButtonInteraction) => void;
}