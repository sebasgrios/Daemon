import { MusicMemoryOptions } from "../../../music/music.module";
import ExtendedClient from "../../client/extended-client.interface";
import { ButtonActionHandler } from "../buttons/handlers/button.handler";

export default class ButtonEventHandler {
    private client: ExtendedClient;

    constructor(buttonInstance: ButtonActionHandler, client: ExtendedClient) {
        buttonInstance.on('play-song', this.handlePlaySong.bind(this));
        buttonInstance.on('pause-song', this.handlePauseSong.bind(this));
        this.client = client;
    }

    handlePlaySong() {
        console.log('handlePlaySong');

        const song = this.client.music?.get(MusicMemoryOptions.currentSong);
        const queue = this.client.music?.get(MusicMemoryOptions.queue);
        const { channelId, messageId } = this.client.music?.get(MusicMemoryOptions.interaction);
        // Set interactions
        // this.client.music?.set(MusicMemoryOptions.interaction, { channelId: '', messageId: '' });

        const message = this.client.channels.cache.get(channelId)?.fetch(messageId);

        console.log('message', message);
    }

    handlePauseSong() {
        console.log('handlePauseSong');
    }

    handleSkipSong() {

    }

    handleEndSong() {

    }
};