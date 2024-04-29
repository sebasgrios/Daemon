import { ButtonStyle, CommandInteraction, MessageComponentInteraction } from "discord.js";
import { musicClient } from "../..";
import { MusicMemoryOptions, MusicMemoryStatusOptions } from "../../music/music.module";
import Button from "./button";
import ExtendedClient from "../../client/extended-client.interface";
import musicInfo from "../embed/music-info.embed";
import pauseGroupButton from "./pause-group.button";
import { InfoToCommand } from "../../music/interfaces/music-interface";

export default class PauseButton extends Button {
    constructor(
        customId: string = 'pause-button',
        label: string = '⏸︎',
        style: ButtonStyle = ButtonStyle.Danger
    ) {
        super(customId, label, style);
    }

    async execute(song: InfoToCommand, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction): Promise<void> {
        musicClient.pauseSong();

        client.music?.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.pause);
        
        interactionCollector.update({
            embeds: [musicInfo(song, interactionCollector, 'pause')],
            components: [pauseGroupButton]
        });
    }
}