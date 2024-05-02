import { ButtonInteraction, ButtonStyle } from "discord.js";

import { isUserInVoiceChat } from "./utils";
import { discordClient, musicClient } from "../../../..";
import Button from "./button";
import musicInfo from "../embed/music-info.embed";
import resumeGroupButton from "./resume-group.button";
import SongResultInterface from "../../../music/interfaces/song-results.interface";
import { MusicMemoryOptions, MusicMemoryStatusOptions } from "../../../music/music.module";

export default class ResumeButton extends Button {
    constructor(
        customId: string = 'resume-button',
        label: string = '▶️',
        style: ButtonStyle = ButtonStyle.Success
    ) {
        super(customId, label, style);
    }

    async execute(song: SongResultInterface, interaction: ButtonInteraction, getGroupButton: any): Promise<void> {
        if (!isUserInVoiceChat(interaction)) {
            return;
        }

        musicClient.resumeSong();

        // TOD@ delete this and do it in button event handler
        discordClient.music?.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.play);

        // TOD@ update interaction parent
        interaction.update({
            embeds: [musicInfo(song, interaction, 'resume')],
            components: [getGroupButton('resume')]
        });
        /*
        interactionParent.update({
            embeds: [musicInfo(song, interaction, 'resume')],
            components: [resumeGroupButton]
        });
        */
    }
}