import { ButtonBuilder, ButtonStyle } from "discord.js";

export default new ButtonBuilder()
    .setCustomId('skip-button')
    .setLabel('⏭︎')
    .setStyle(ButtonStyle.Secondary);