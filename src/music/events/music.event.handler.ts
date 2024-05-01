import { VoiceBasedChannel } from "discord.js"
import { Readable } from "stream"

import Music from ".."
import SongResultInterface from "../interfaces/song-results.interface"
import ExtendedClient from "../../client/extended-client.interface"
import { MusicMemoryOptions, MusicMemoryStatusOptions } from "../music.module"

export default class MusicEventHandler {
    private client: ExtendedClient

    constructor(musicInstance: Music, client: ExtendedClient) {
        musicInstance.on('playing-song', this.handlePlayingSong.bind(this))
        musicInstance.on('add-song-to-queue', this.handleAddSongToQueue.bind(this))
        musicInstance.on('skip-song', this.handleSkipSong.bind(this))
        musicInstance.on('pause-song', this.handlePauseSong.bind(this))
        musicInstance.on('resume-song', this.handleResumeSong.bind(this))
        this.client = client
    }

    private handlePlayingSong({ channel, song } : { channel: VoiceBasedChannel, song: SongResultInterface}) {
        this.client.music?.set(MusicMemoryOptions.currentSong, song)
    }

    private handleAddSongToQueue({ query, song } : { query: Readable, song: SongResultInterface}) {
        //TOD@ add song to queue
    }

    private handleSkipSong() {
        //Devolver en current song la nueva canción que se está reproduciendo
        //Editar cola en caché
        //TOD@ skip song
    }

    private handlePauseSong() {
        this.client.music?.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.pause)
    }

    private handleResumeSong() {
        this.client.music?.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.play)
    }

}