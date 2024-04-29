import { CommandInteraction, EmbedBuilder, GuildMember } from "discord.js";
import SongResultInterface from "../../music/interfaces/song-results.interface";
import { getBestImage, getDurationSong } from "./utils";

const musicQueue = (song: SongResultInterface, queue: SongResultInterface[], interaction: CommandInteraction) => {
    const member: GuildMember = (interaction.member as GuildMember);

    return new EmbedBuilder()
        .setColor('Green')
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setAuthor({
            name: `${member.nickname ?? interaction.user.username} añadió una canción a la cola`,
            iconURL: `${interaction.user.avatarURL()}`
        })
        .setThumbnail(getBestImage(song.thumbnail))
        .addFields(
            { name: 'Posición', value: `${queue.length + 1}`, inline: true },
            { name: 'Duración', value: `${getDurationSong(parseInt(song.duration))}`, inline: true }
        );
};

export default musicQueue;