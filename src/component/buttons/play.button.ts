import { ButtonStyle, CommandInteraction, MessageComponentInteraction } from "discord.js";
import { isUserInVoiceChat } from "./utils";
import { discordClient, musicClient } from "../..";
import { MusicMemoryOptions, MusicMemoryStatusOptions } from "../../music/music.module";
import Button from "./button";
import musicInfo from "../embed/music-info.embed";
import playGroupButton from "./play-group.button";
import SongResultInterface from "../../music/interfaces/song-results.interface";

export default class PlayButton extends Button {
    constructor(
        customId: string = 'play-button',
        label: string = '▶️',
        style: ButtonStyle = ButtonStyle.Success
    ) {
        super(customId, label, style);
    }

    async execute(song: SongResultInterface, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction): Promise<void> {
        if (!isUserInVoiceChat(interaction)) {
            return;
        }

        musicClient.resumeSong();

        // TOD@ delete this and do it in button event handler
        discordClient.music?.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.play);

        interactionCollector.update({
            embeds: [musicInfo(song, interactionCollector, 'resume')],
            components: [playGroupButton]
        });
    }
}