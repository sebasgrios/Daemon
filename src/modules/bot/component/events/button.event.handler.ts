import { MusicMemoryOptions } from "../../../music/music.module";
import ExtendedClient from "../../client/extended-client.interface";
import Button from "../buttons/button";

// TOD@ instance class 
export default class ButtonEventHandler {
    private client: ExtendedClient;

    constructor (buttonInstance: Button, client: ExtendedClient) {
        // buttonInstance.on('play-song', this.handlePlaySong);
        this.client = client;
    }

    handlePlaySong() {
        const song = this.client.music?.get(MusicMemoryOptions.currentSong);
        const queue = this.client.music?.get(MusicMemoryOptions.queue);
        const { channelId, messageId } = this.client.music?.get(MusicMemoryOptions.interaction);
        // Set interactions
        // this.client.music?.set(MusicMemoryOptions.interaction, { channelId: '', messageId: '' });

        const message = this.client.channels.cache.get(channelId)?.fetch(messageId);

        console.log('message', message);
    }

    handleSkipSong() {

    }

    handleEndSong() {

    }
};