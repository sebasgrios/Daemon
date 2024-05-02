import { ColorResolvable, CommandInteraction, EmbedBuilder, GuildMember, MessageComponentInteraction } from "discord.js";

import { getBestImage, getDurationSong } from "./utils";
import defaultUserIcon from "../images/default-user-icon";
import SongResultInterface from "../../../music/interfaces/song-results.interface";
import { StatusList } from "./status.types";

const getColorByStatus = (status: StatusList): ColorResolvable => {
    if (status === StatusList.play || status === StatusList.resume) {
        return 'Green';
    }

    if (status === StatusList.pause) {
        return 'Red';
    }

    return 'Grey';
}

const musicInfo = (song: SongResultInterface, interaction: CommandInteraction | MessageComponentInteraction, status: StatusList): EmbedBuilder => {
    const member: GuildMember = (interaction.member as GuildMember);

    return new EmbedBuilder()
        .setColor(getColorByStatus(status))
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setAuthor({
            name: `${member.nickname ?? interaction.user.username} ${status} la canción`,
            iconURL: `${interaction.user.avatarURL() ?? defaultUserIcon}`
        })
        .setImage(getBestImage(song.thumbnail))
        .addFields(
            // TOD@ changed to song.request_by
            { name: 'Solicitada por', value: `${member.nickname ?? interaction.user.username}`, inline: true },
            { name: 'Duración', value: `${getDurationSong(parseInt(song.duration))}`, inline: true }
        )
        .setTimestamp();
};

export default musicInfo;