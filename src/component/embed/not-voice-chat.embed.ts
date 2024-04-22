import { Client, CommandInteraction, EmbedBuilder } from "discord.js";

const notInVoiceChat = (client: Client, interaction: CommandInteraction) => {
    return new EmbedBuilder()
        .setColor('Red')
        .setTitle('❌ You aren\'t in a voice channel');
};

export default notInVoiceChat;