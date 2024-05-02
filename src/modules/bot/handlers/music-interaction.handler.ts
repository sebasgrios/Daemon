import { ButtonInteraction, CommandInteraction, CommandInteractionOptionResolver, GuildMember } from "discord.js";

import ExtendedClient from "../client/extended-client.interface";
import EventHandler from "./event.handler";
import { musicClient } from "../../..";
import error from "../component/embed/error.embed";
import { MusicMemoryOptions, MusicMemoryStatusOptions } from "../../music/music.module";
import musicQueue from "../component/embed/music-queue.embed";
import { InfoToCommand } from "../../music/interfaces/music-interface";
import musicInfo from "../component/embed/music-info.embed";
import resumeGroupButton from "../component/buttons/resume-group.button";
import SongNotFoundException from "../../music/apis/exceptions/song-not-found.exception";
import pauseGroupButton from "../component/buttons/pause-group.button";
import musicSkip from "../component/embed/music-skip.embed";

export default class MusicInteractionHandler {
    private client: ExtendedClient;
    private interactionDjPanel: CommandInteraction | null

    constructor(eventInstance: EventHandler, client: ExtendedClient) {
        eventInstance.on('play-song', this.playSong.bind(this));
        eventInstance.on('pause-song', this.pauseSong.bind(this));

        this.client = client;
        this.interactionDjPanel = null;
    }

    async playSong({ interaction }: { interaction: CommandInteraction }) {
        const member: GuildMember = (interaction.member as GuildMember);
        const query: string | null = (interaction.options as CommandInteractionOptionResolver).getString('query');
        const currentSong = this.client.music?.get(MusicMemoryOptions.currentSong);

        if (!member.voice.channel) {
            interaction.reply({
                embeds: [error('No estás en un canal de voz')],
                ephemeral: true
            });
            return;
        }


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
                // TOD@ CREATE NEW TEMP MESSAGE WITH EPHEMERAL
                interaction.reply({
                    embeds: [musicQueue(song, interaction)]
                });
                return;
            }

            this.client.music?.set(MusicMemoryOptions.currentSong, song);

            interaction.reply({
                embeds: [musicInfo(song, interaction, 'play')],
                components: [resumeGroupButton]
            });

            this.interactionDjPanel = interaction;

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

    // TOD@ REFACTOR - mirar que hacer con funcionalidad de los botones
    pauseSong({ interaction }: { interaction: CommandInteraction | ButtonInteraction }) {
        const member: GuildMember = (interaction.member as GuildMember);
        const song = this.client.music?.get(MusicMemoryOptions.currentSong);

        if (!member.voice.channel) {
            interaction.reply({
                embeds: [error('No estás en un canal de voz')],
                ephemeral: true
            });
            return;
        }

        musicClient.pauseSong();

        this.interactionDjPanel?.editReply({
            embeds: [musicInfo(song, interaction, 'pause')],
            components: [pauseGroupButton]
        });
    }

    // TOD@ REFACTOR - mirar que hacer con funcionalidad de los botones
    skipSong({ interaction }: { interaction: CommandInteraction | ButtonInteraction }) {
        const member: GuildMember = (interaction.member as GuildMember);
        const song = this.client.music?.get(MusicMemoryOptions.currentSong);

        if (!member.voice.channel) {
            interaction.reply({
                embeds: [error('No estás en un canal de voz')],
                ephemeral: true
            });
            return;
        }

        const nextSong = this.client.music?.get(MusicMemoryOptions.queue)[0];

        // TOD@ Comentar a Krawer que me pase siguiente canción por el método
        musicClient.skipSong(member.voice.channel);

        // TOD@ do this in button event handler
        if (nextSong) {
            // TOD@ create new interaction and save it in this.interactionDjPanel
            interaction.followUp({
                embeds: [musicInfo(nextSong, interaction, 'play')],
                components: [resumeGroupButton]
            });
        }

        this.interactionDjPanel?.editReply({
            embeds: [musicSkip(song, interaction)],
            components: []
        });
    }
}