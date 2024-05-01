import { ButtonStyle, CommandInteraction, MessageComponentInteraction } from "discord.js";

import { isUserInVoiceChat } from "./utils";
import { discordClient, musicClient } from "../..";
import { MusicMemoryOptions, MusicMemoryStatusOptions } from "../../music/music.module";
import Button from "./button";
import musicInfo from "../embed/music-info.embed";
import pauseGroupButton from "./pause-group.button";
import SongResultInterface from "../../music/interfaces/song-results.interface";

export default class PauseButton extends Button {
    constructor(
        customId: string = 'pause-button',
        label: string = '⏸︎',
        style: ButtonStyle = ButtonStyle.Danger
    ) {
        super(customId, label, style);
    }

    async execute(song: SongResultInterface, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction): Promise<void> {
        if (!isUserInVoiceChat(interaction)) {
            return;
        }
        
        musicClient.pauseSong();

        discordClient.music?.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.pause);
        
        interactionCollector.update({
            embeds: [musicInfo(song, interactionCollector, 'pause')],
            components: [pauseGroupButton]
        });
    }
}