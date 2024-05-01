import { CommandInteraction, EmbedBuilder, GuildMember } from "discord.js";
import { getBestImage, getDurationSong } from "./utils";
import { discordClient, musicClient } from "../../../..";
import defaultUserIcon from "../images/default-user-icon";
import { MusicMemoryOptions } from "../../../music/music.module";
import SongResultInterface from "../../../music/interfaces/song-results.interface";

const musicQueue = (song: SongResultInterface, interaction: CommandInteraction) => {
    const queue = discordClient.music?.get(MusicMemoryOptions.queue);
    const member: GuildMember = (interaction.member as GuildMember);

    return new EmbedBuilder()
        .setColor('Green')
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setAuthor({
            name: `${member.nickname ?? interaction.user.username} añadió una canción a la cola`,
            iconURL: `${interaction.user.avatarURL() ?? defaultUserIcon}`
        })
        .setThumbnail(getBestImage(song.thumbnail))
        .addFields(
            { name: 'Posición', value: `${queue.length}`, inline: true },
            { name: 'Duración', value: `${getDurationSong(parseInt(song.duration))}`, inline: true }
        );
};

export default musicQueue;