import { ButtonStyle, MessageComponentInteraction } from "discord.js";
import Button from "./button";
import { musicClient } from "../..";
import ExtendedClient from "../../client/extended-client.interface";
import { MusicMemoryOptions, MusicMemoryStatusOptions } from "../../music/music.module";

export default class PauseButton extends Button {
    constructor(
        customId: string = 'pause-button',
        label: string = '⏸︎',
        style: ButtonStyle = ButtonStyle.Danger
    ) {
        super(customId, label, style);
    }

    async execute(client: ExtendedClient, interactionCollector: MessageComponentInteraction): Promise<void> {
        // interactionCollector.update({
        //     embeds: [musicInfo(client, interaction, 'pause')],
        //     components: [pauseGroupButton]
        // });

        musicClient.pauseSong()
        
        console.log('CLIENT', client)
        const status = client.music?.get(MusicMemoryOptions.status)

        if (status === MusicMemoryStatusOptions.play) {
            client.music?.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.pause)
            musicClient.pauseSong()
            interactionCollector.reply('You paused the song')
            return;
        }

        client.music?.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.play)
        musicClient.resumeSong()
        interactionCollector.reply('You played the song again')
        return;
    }
}