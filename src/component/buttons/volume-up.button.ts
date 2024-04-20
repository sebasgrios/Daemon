import { ButtonBuilder, ButtonStyle } from "discord.js";

export default new ButtonBuilder()
    .setCustomId('volume_up-button')
    .setLabel('🔊')
    .setStyle(ButtonStyle.Secondary);