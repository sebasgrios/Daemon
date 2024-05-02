import { CommandInteraction, CommandInteractionOptionResolver, ComponentType, GuildMember, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import playGroupButton from "../../../component/buttons/resume-group.button";

import { musicClient }  from "../../../../..";
import error from "../../../component/embed/error.embed";
import ICommand from "../../../interfaces/command.interface";
import musicInfo from "../../../component/embed/music-info.embed";
import musicQueue from "../../../component/embed/music-queue.embed";
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
        interaction.reply({
            embeds: [error('This command mustn\'t run this')]
        })
    }
};

export default playCommand;