import { VoiceBasedChannel } from "discord.js"
import { Readable } from "stream"

import Music from ".."
import SongResultInterface from "../interfaces/song-results.interface"
import MusicModule, { MusicMemoryOptions, MusicMemoryStatusOptions } from "../music.module"
import ExtendedClient from "../../bot/client/extended-client.interface"
import { EventEmitter } from "events"
import { musicEventEmitter } from "../../.."
import { MusicEventsList } from "./event.types"

export default class MusicEventHandler extends EventEmitter {
    private client: ExtendedClient

    constructor(musicInstance: Music, client: ExtendedClient) {
        super()
        musicInstance.on(MusicEventsList.play_song, this.handlePlayingSong.bind(this))
        musicInstance.on('add-song-to-queue', this.handleAddSongToQueue.bind(this))
        musicInstance.on(MusicEventsList.skip_song, this.handleSkipSong.bind(this))
        musicInstance.on(MusicEventsList.pause_song, this.handlePauseSong.bind(this))
        musicInstance.on(MusicEventsList.resume_song, this.handleResumeSong.bind(this))
        this.client = client
    }

    private handlePlayingSong({ channel, song } : { channel: VoiceBasedChannel, song: SongResultInterface}) {
        this.client.music?.set(MusicMemoryOptions.currentSong, song)
        musicEventEmitter.emit(MusicEventsList.playing_song)
    }

    private handleAddSongToQueue({ query, song } : { query: Readable, song: SongResultInterface}) {
        //TOD@ add song to queue
    }

    private handleSkipSong() {
        //Devolver en current song la nueva canción que se está reproduciendo
        //Editar cola en caché
        //TOD@ skip song
        musicEventEmitter.emit(MusicEventsList.skipped_song)
    }

    private handlePauseSong() {
        this.client.music?.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.pause)
        musicEventEmitter.emit(MusicEventsList.paused_song)
    }

    private handleResumeSong() {
        this.client.music?.set(MusicMemoryOptions.status, MusicMemoryStatusOptions.play)
        musicEventEmitter.emit(MusicEventsList.resumed_song)
    }

}