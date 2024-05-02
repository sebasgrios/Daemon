import { ButtonInteraction, CommandInteraction, CommandInteractionOptionResolver, GuildMember } from "discord.js";

import ExtendedClient from "../client/extended-client.interface";
import EventHandler from "./event.handler";
import { embedHandler, musicClient } from "../../..";
import error from "../component/embed/error.embed";
import { MusicMemoryOptions, MusicMemoryStatusOptions } from "../../music/music.module";
import musicQueue from "../component/embed/music-queue.embed";
import { InfoToCommand } from "../../music/interfaces/music-interface";
import musicInfo from "../component/embed/music-info.embed";
import resumeGroupButton from "../component/buttons/groups/resume-group.button";
import SongNotFoundException from "../../music/apis/exceptions/song-not-found.exception";
import pauseGroupButton from "../component/buttons/groups/pause-group.button";
import musicSkip from "../component/embed/music-skip.embed";

export default class MusicInteractionHandler {
    private client: ExtendedClient;

    constructor(client: ExtendedClient) {
        this.client = client;
    }

    async playSong(interaction: CommandInteraction) {
        const member: GuildMember = (interaction.member as GuildMember);
        const query: string | null = (interaction.options as CommandInteractionOptionResolver).getString('query');

        if (!member.voice.channel) {
            interaction.deleteReply();

            interaction.channel?.send({
                embeds: [error('No estás en un canal de voz')]
            });
            return;
        }


        if (!query) {
            interaction.deleteReply();

            interaction.channel?.send({
                embeds: [error('Falta el parámetro "query"')]
            });
            return;
        }

        // TOD@ add validations

        embedHandler.generateLoader(interaction);
        embedHandler.loadLastInteraction(interaction);

        musicClient.playSong(member.voice.channel, query);
    }

    async resumeSong(interaction: CommandInteraction | ButtonInteraction) {
        // TOD@ add validations

        embedHandler.loadLastInteraction(interaction);

        musicClient.resumeSong();
    }

    async pauseSong(interaction: CommandInteraction | ButtonInteraction) {
        // TOD@ add validations

        embedHandler.loadLastInteraction(interaction);

        musicClient.pauseSong();
    }

    async skipSong(interaction: CommandInteraction | ButtonInteraction) {
        const member: GuildMember = (interaction.member as GuildMember);

        if (!member.voice.channel) {
            interaction.deleteReply();

            interaction.channel?.send({
                embeds: [error('No estás en un canal de voz')]
            });
            return;
        }

        // TOD@ add validations

        embedHandler.loadLastInteraction(interaction);

        musicClient.skipSong(member.voice.channel);
    }

}