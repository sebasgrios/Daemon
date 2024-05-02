import { ButtonInteraction, CommandInteraction, GuildMember, VoiceBasedChannel } from "discord.js";
import error from "../embed/error.embed";

export const isUserInVoiceChat = (interaction: CommandInteraction | ButtonInteraction): VoiceBasedChannel | null => {
    const member: GuildMember = (interaction.member as GuildMember);

    if (!member.voice.channel) {
        interaction.reply({
            embeds: [error('No estás en un canal de voz')],
            ephemeral: true
        });
    }

    return member.voice.channel;
}