import { ButtonBuilder, ButtonStyle } from "discord.js";

export default new ButtonBuilder()
    .setCustomId('pause-button')
    .setLabel('⏸︎')
    .setStyle(ButtonStyle.Primary);;