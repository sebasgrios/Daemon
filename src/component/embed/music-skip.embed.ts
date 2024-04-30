import { CommandInteraction, EmbedBuilder, GuildMember, MessageComponentInteraction } from "discord.js";
import SongResultInterface from "../../music/interfaces/song-results.interface";
import { getBestImage, getDurationSong } from "./utils";
import { musicClient } from "../..";
import defaultUserIcon from "../images/default-user-icon";

const musicSkip = (song: SongResultInterface, interaction: CommandInteraction | MessageComponentInteraction) => {
    const queue = musicClient.getQueueInfo();
    const member: GuildMember = (interaction.member as GuildMember);

    return new EmbedBuilder()
        .setColor('Red')
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setAuthor({
            name: `${member.nickname ?? interaction.user.username} ha saltado la canción`,
            iconURL: `${interaction.user.avatarURL() ?? defaultUserIcon}`
        })
        .setThumbnail(getBestImage(song.thumbnail))
        .addFields(
            { name: 'Duración', value: `${getDurationSong(parseInt(song.duration))}`, inline: true }
        );
};

export default musicSkip;