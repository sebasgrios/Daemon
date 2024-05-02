import { ButtonInteraction, ButtonStyle, GuildMember } from "discord.js";

import { isUserInVoiceChat } from "./utils";
import { discordClient, musicClient } from "../../../..";
import Button from "./button";
import musicInfo from "../embed/music-info.embed";
import playGroupButton from "./resume-group.button";
import musicSkip from "../embed/music-skip.embed";
import { MusicMemoryOptions } from "../../../music/music.module";
import SongResultInterface from "../../../music/interfaces/song-results.interface";

export default class SkipButton extends Button {
    constructor(
        customId: string = 'skip-button',
        label: string = '⏭︎',
        style: ButtonStyle = ButtonStyle.Primary
    ) {
        super(customId, label, style);
    }

    async execute(song: SongResultInterface, interaction: ButtonInteraction, getGroupButton: any): Promise<void> {
        console.log('se ha presionado el botón de skip');
        
        const member: GuildMember = (interaction.member as GuildMember);

        if (!isUserInVoiceChat(interaction) || !member.voice.channel) {
            return;
        }
        
        const nextSong = discordClient.music?.get(MusicMemoryOptions.queue)[0];
        
        musicClient.skipSong(member.voice.channel);
        
        // TOD@ do this in button event handler
        if (nextSong) {
            // TOD@ not reply and create new interaction
            interaction.followUp({
                embeds: [musicInfo(nextSong, interaction, 'play')],
                components: [getGroupButton('resume')]
            });
        }

        // TOD@ update interaction parent
        interaction.editReply({
            embeds: [musicSkip(song, interaction)],
            components: []
        });
        /*
        interactionParent.editReply({
            embeds: [musicSkip(song, interaction)],
            components: []
        });
        */
    }
}