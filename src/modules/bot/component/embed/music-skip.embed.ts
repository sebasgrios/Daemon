import { CommandInteraction, EmbedBuilder, GuildMember, MessageComponentInteraction } from "discord.js";
import { getBestImage, getDurationSong } from "./utils";
import { discordClient } from "../../../..";
import defaultUserIcon from "../images/default-user-icon";
import { MusicMemoryOptions } from "../../../music/music.module";
import SongResultInterface from "../../../music/interfaces/song-results.interface";

const musicSkip = (song: SongResultInterface, interaction: CommandInteraction | MessageComponentInteraction) => {
    const queue = discordClient.music?.get(MusicMemoryOptions.queue);
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