import { CommandInteraction, CommandInteractionOptionResolver, ComponentType, GuildMember, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import playGroupButton from "../../../component/buttons/play-group.button";

import { musicClient }  from "../../../../..";
import error from "../../../component/embed/error.embed";
import ICommand from "../../../interfaces/command.interface";
import musicInfo from "../../../component/embed/music-info.embed";
import musicQueue from "../../../component/embed/music-queue.embed";
import ButtonCollector from "../../../collector/button/button.collector";
import { MusicMemoryOptions } from "../../../../music/music.module";
import { InfoToCommand } from "../../../../music/interfaces/music-interface";
import SongNotFoundException from "../../../../music/apis/exceptions/song-not-found.exception";
import ExtendedClient from "../../../client/extended-client.interface";

const playCommand: ICommand = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Reproduce música')
        .addStringOption((option: SlashCommandStringOption): SlashCommandStringOption => (
            option
                .setName('query')
                .setDescription('añade el nombre/url de la canción')
                .setRequired(true)
        )),
    run: async (client: ExtendedClient, interaction: CommandInteraction) => {
        const member: GuildMember = (interaction.member as GuildMember);
        const currentSong = client.music?.get(MusicMemoryOptions.currentSong);

        if (!member.voice.channel) {
            interaction.reply({
                embeds: [error('No estás en un canal de voz')],
                ephemeral: true
            });
            return;
        }

        const query: string | null = (interaction.options as CommandInteractionOptionResolver).getString('query');

        if (!query) {
            interaction.reply({
                embeds: [error('Falta el parámetro "query"')],
                ephemeral: true
            });
            return;
        }

        try {
            const { song } = (await musicClient.playSong(member.voice.channel, query)) as InfoToCommand;

            if (currentSong) {
                interaction.reply({
                    embeds: [musicQueue(song, interaction)]
                });
                return;
            }

            client.music?.set(MusicMemoryOptions.currentSong, song);

            const reply = await interaction.reply({
                embeds: [musicInfo(song, interaction, 'play')],
                components: [playGroupButton]
            });

            new ButtonCollector(client, reply.createMessageComponentCollector({
                componentType: ComponentType.Button
            })).startCollecting(song, interaction);

        } catch (error: any) {
            switch (error.constructor) {
                case SongNotFoundException:
                    await interaction.followUp({ content: error.message, ephemeral: true });
                    break;
                default:
                    console.error('Error reproduciendo la canción:', error);
                    await interaction.followUp({ content: 'No se pudo reproducir la canción.', ephemeral: true });
                    break;
            }
            return;
        }
    }
};

export default playCommand;