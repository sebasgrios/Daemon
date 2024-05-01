import { VoiceBasedChannel } from "discord.js"
import { Readable } from "stream"

import Music from ".."
import SongResultInterface from "../interfaces/song-results.interface"
import ExtendedClient from "../../client/extended-client.interface"
import { MusicMemoryOptions } from "../music.module"

export default class MusicEventHandler {
    private client: ExtendedClient

    constructor(musicInstance: Music, client: ExtendedClient) {
        musicInstance.on('playing-song', this.handlePlayingSong.bind(this))
        musicInstance.on('add-song-to-queue', this.handleAddSongToQueue.bind(this))
        this.client = client
    }

    async handlePlayingSong({ channel, song } : { channel: VoiceBasedChannel, song: SongResultInterface}) {
        this.client.music?.set(MusicMemoryOptions.currentSong, song)
    }

    handleAddSongToQueue({ query, song } : { query: Readable, song: SongResultInterface}) {
        console.log(`Added song ${song.title} to queue..`)
    }
    
}