import { EmbedBuilder } from "discord.js";

const error = (text: string) => {
    return new EmbedBuilder()
        .setColor('Red')
        .setTitle(`❌ ${text}`);
};

export default error;