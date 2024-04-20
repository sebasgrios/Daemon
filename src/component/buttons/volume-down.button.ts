import { ButtonBuilder, ButtonStyle } from "discord.js";

export default new ButtonBuilder()
    .setCustomId('volume_down-button')
    .setLabel('🔉')
    .setStyle(ButtonStyle.Secondary);