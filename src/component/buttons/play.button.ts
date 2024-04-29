import { ButtonStyle, CommandInteraction, MessageComponentInteraction } from "discord.js";
import { musicClient } from "../..";
import { MusicMemoryOptions, MusicMemoryStatusOptions } from "../../music/music.module";
import Button from "./button";
import ExtendedClient from "../../client/extended-client.interface";
import musicInfo from "../embed/music-info.embed";
import playGroupButton from "./play-group.button";
import { InfoToCommand } from "../../music/interfaces/music-interface";

export default class PlayButton extends Button {
    constructor(
        customId: string = 'play-button',
        label: string = '▶️',
        style: ButtonStyle = ButtonStyle.Success
    ) {
        super(customId, label, style);
    }

    async execute(song: InfoToCommand, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction): Promise<void> {
        musicClient.resumeSong();

        client.music?.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.play);

        interactionCollector.update({
            embeds: [musicInfo(song, interactionCollector, 'play')],
            components: [playGroupButton]
        });
    }
}