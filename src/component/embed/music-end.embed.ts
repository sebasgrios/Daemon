import { CommandInteraction, EmbedBuilder, GuildMember } from "discord.js";
import SongResultInterface from "../../music/interfaces/song-results.interface";
import { getBestImage, getDurationSong } from "./utils";
import { musicClient } from "../..";

const musicEnd = (song: SongResultInterface, interaction: CommandInteraction) => {
    const queue = musicClient.getQueueInfo();
    const member: GuildMember = (interaction.member as GuildMember);

    return new EmbedBuilder()
        .setColor('Red')
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setAuthor({
            name: 'Se ha terminado de reproducir',
        })
        .setThumbnail(getBestImage(song.thumbnail))
        .addFields(
            { name: 'Posición', value: `${queue.length}`, inline: true },
            { name: 'Duración', value: `${getDurationSong(parseInt(song.duration))}`, inline: true }
        );
};

export default musicEnd;