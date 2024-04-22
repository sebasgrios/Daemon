import { ButtonBuilder, ButtonStyle } from "discord.js";

export default new ButtonBuilder()
    .setCustomId('back-button')
    .setLabel('⏮️')
    .setStyle(ButtonStyle.Primary);