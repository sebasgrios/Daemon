import { ColorResolvable, CommandInteraction, EmbedBuilder, GuildMember, MessageComponentInteraction } from "discord.js";
import { getBestImage, getDurationSong } from "./utils";
import SongResultInterface from "../../music/interfaces/song-results.interface";
import defaultUserIcon from "../images/default-user-icon";

const getColorByStatus = (status: string): ColorResolvable => {
    if (status === 'play' || status === 'resume') {
        return 'Green';
    }

    if (status === 'pause') {
        return 'Red';
    }

    return 'Grey';
}

const getStatus = (status: string): string => {
    if (status === 'play') {
        return 'puso';
    }

    if (status === 'pause') {
        return 'pausó';
    }

    if (status === 'resume') {
        return 'reanudó';
    }

    return '';
};

const musicInfo = (song: SongResultInterface, interaction: CommandInteraction | MessageComponentInteraction, status: string): EmbedBuilder => {
    const member: GuildMember = (interaction.member as GuildMember);

    return new EmbedBuilder()
        .setColor(getColorByStatus(status))
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setAuthor({
            name: `${member.nickname ?? interaction.user.username} ${getStatus(status)} la canción`,
            iconURL: `${interaction.user.avatarURL() ?? defaultUserIcon}`
        })
        .setImage(getBestImage(song.thumbnail))
        .addFields(
            { name: 'Solicitada por', value: `${member.nickname ?? interaction.user.username}`, inline: true },
            { name: 'Duración', value: `${getDurationSong(parseInt(song.duration))}`, inline: true }
        )
        .setTimestamp();
};

export default musicInfo;