import Enmap from "enmap";
import ExtendedClient from "../client/extended-client.interface";
import Music from ".";
import MusicEventHandler from "./events/music.event.handler";

export enum MusicMemoryOptions {
    volume = 'volume',
    queue = 'queue',
    providers = 'providers',
    status = 'status',
    currentInteractionSong = 'currentInteractionSong',
    currentSong = 'currentSong'
};

export enum MusicMemoryStatusOptions {
    play = 'play',
    pause = 'pause',
    stop = 'stop'
};

export default class MusicModule {
    private musicClient: Music
    private musicEventHandler: MusicEventHandler
    constructor (
        client: ExtendedClient
    ) {
        this.musicClient = new Music()
        this.musicEventHandler = new MusicEventHandler(this.musicClient, client)
        client.music = new Enmap({ name: 'music' })
        client.music.set(MusicMemoryOptions.volume, 50)
        client.music.set(MusicMemoryOptions.queue, [])
        client.music.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.stop)
        client.music.set(MusicMemoryOptions.currentInteractionSong, null)
        client.music.set(MusicMemoryOptions.currentSong, null)
    }

    get music(): Music {
        return this.musicClient
    }

    //GET
    //this.client.music.get(MusicMemoryOptions.volume)
    //SET
    //this.client.music.set(MusicMemoryOptions.queue, 'value')
}
