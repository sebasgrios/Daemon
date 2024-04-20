import { ButtonBuilder, ButtonStyle } from "discord.js";

export default new ButtonBuilder()
    .setCustomId('play-button')
    .setLabel('▶️')
    .setStyle(ButtonStyle.Primary);;