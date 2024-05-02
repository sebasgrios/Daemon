import { embedHandler } from "../../..";
import { MusicEventsList } from "../../music/events/event.types";
import MusicEventEmitter from "../../music/events/music.event.emitter";
import { MusicMemoryOptions } from "../../music/music.module";
import ExtendedClient from "../client/extended-client.interface";

export default class MusicInteractionEventHandler {
    private client: ExtendedClient;

    constructor(
        musicEventEmitter: MusicEventEmitter,
        client: ExtendedClient
    ) {
        this.client = client;
        musicEventEmitter.on(MusicEventsList.playing_song, this.handleGeneratePanel.bind(this))
        musicEventEmitter.on(MusicEventsList.song_added_to_queue, this.handleUpdatePanelQueue.bind(this))
        musicEventEmitter.on(MusicEventsList.skipped_song, this.handleSkipPanel.bind(this))
        musicEventEmitter.on(MusicEventsList.paused_song, this.handlePausePanel.bind(this))
        musicEventEmitter.on(MusicEventsList.resumed_song, this.handleResumeSong.bind(this))
        musicEventEmitter.on(MusicEventsList.volume_gone_up, this.handleVolumeUpPanel.bind(this))
        musicEventEmitter.on(MusicEventsList.volume_gone_down, this.handleVolumeDownPanel.bind(this))
        musicEventEmitter.on(MusicEventsList.playing_error, this.handleErrorPanel.bind(this))
    }

    handleGeneratePanel() {
        console.log('MusicInteractionEventHandler - handleGeneratePanel()');

        const song = this.client.music?.get(MusicMemoryOptions.currentSong);

        embedHandler.generatePanel(song);
    }

    handleUpdatePanelQueue() {
        console.log('MusicInteractionEventHandler - handleUpdatePanelQueue()');

        // TOD@
    }

    handleSkipPanel() {
        console.log('MusicInteractionEventHandler - handleSkipPanel()');
        
        // TOD@
    }
    
    handlePausePanel() {
        console.log('MusicInteractionEventHandler - handlePausePanel()');

        embedHandler.pausePanel();
    }

    handleResumeSong() {
        console.log('MusicInteractionEventHandler - handleResumeSong()');
        
        embedHandler.resumePanel();
    }

    handleVolumeUpPanel() {
        console.log('MusicInteractionEventHandler - handleVolumeUpPanel()');
        
        // TOD@
    }

    handleVolumeDownPanel() {
        console.log('MusicInteractionEventHandler - handleVolumeDownPanel()');
        
        // TOD@
    }

    handleErrorPanel() {
        console.log('MusicInteractionEventHandler - handleErrorPanel()');
        
        // TOD@
    }
}