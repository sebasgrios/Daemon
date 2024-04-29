import { ColorResolvable, CommandInteraction, EmbedBuilder, GuildMember, MessageComponentInteraction } from "discord.js";
import { InfoToCommand } from "../../music/interfaces/music-interface";
import { getBestImage, getDurationSong } from "./utils";

const getColorByStatus = (status: string): ColorResolvable => {
    if (status === 'play') {
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

    return '';
};

const musicInfo = (songData: InfoToCommand, interaction: CommandInteraction | MessageComponentInteraction, status: string): EmbedBuilder => {
    const { song, queue } = songData;
    const member: GuildMember = (interaction.member as GuildMember);

    return new EmbedBuilder()
        .setColor(getColorByStatus(status))
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setAuthor({
            name: `${member.nickname ?? interaction.user.username} ${getStatus(status)} una canción`,
            iconURL: `${interaction.user.avatarURL()}`
        })
        .setImage(getBestImage(song.thumbnail))
        .addFields(
            { name: 'Solicitada por', value: `${member.nickname ?? interaction.user.username}`, inline: true },
            { name: 'Duración', value: `${getDurationSong(parseInt(song.duration))}`, inline: true }
        )
        .setTimestamp();
};

export default musicInfo;