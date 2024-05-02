import Enmap from "enmap";
import Music from ".";
import MusicEventHandler from "./events/music.event.handler";
import ExtendedClient from "../bot/client/extended-client.interface";
import MusicEventEmitter from "./events/music.event.emitter";
import MusicInteractionEventHandler from "../bot/events/music-interaction.event.handler";

export enum MusicMemoryOptions {
    volume = 'volume',
    queue = 'queue',
    providers = 'providers',
    status = 'status',
    currentSong = 'currentSong'
};

export enum MusicMemoryStatusOptions {
    play = 'play',
    pause = 'pause',
    stop = 'stop'
};

export default class MusicModule {
    private musicClient: Music
    private musicEventEmitter: MusicEventEmitter
    
    constructor (
        client: ExtendedClient
    ) {
        this.musicClient = new Music()
        new MusicEventHandler(this.musicClient, client)
        client.music = new Enmap({ name: 'music' })
        client.music.set(MusicMemoryOptions.volume, 50)
        client.music.set(MusicMemoryOptions.queue, [])
        client.music.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.stop)
        client.music.set(MusicMemoryOptions.currentSong, null)
        this.musicEventEmitter = new MusicEventEmitter()
        new MusicInteractionEventHandler(this.musicEventEmitter)
    }

    get musicModuleProviders() {
        return { 
            musicClient: this.musicClient,
            musicEventEmitter: this.musicEventEmitter
        }
    }

    //GET
    //this.client.music.get(MusicMemoryOptions.volume)
    //SET
    //this.client.music.set(MusicMemoryOptions.queue, 'value')
}
