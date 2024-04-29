import Enmap from "enmap";
import ExtendedClient from "../client/extended-client.interface";

export enum MusicMemoryOptions {
    volume = 'volume',
    queue = 'queue',
    providers = 'providers',
    status = 'status'
};

export enum MusicMemoryStatusOptions {
    play = 'play',
    pause = 'pause',
    stop = 'stop'
};

export default class MusicModule {
    private client: ExtendedClient
    constructor (
        client: ExtendedClient
    ) {
        this.client = client;
        client.music = new Enmap({ name: 'music' })
        client.music.set(MusicMemoryOptions.volume, 50)
        client.music.set(MusicMemoryOptions.queue, [])
        client.music.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.stop)
    }

    //GET
    //this.client.music.get(MusicMemoryOptions.volume)
    //SET
    //this.client.music.set(MusicMemoryOptions.queue, 'value')
}
