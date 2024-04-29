import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    StreamType,
    AudioPlayerStatus,
    NoSubscriberBehavior,
} from '@discordjs/voice'
import { VoiceBasedChannel } from 'discord.js'
import MusicInterface from './interfaces/music-interface'
import { ErrorHandler } from '../shared/error.handler'
import YoutubeHandler from './apis/youtube/youtube';
import ytdDiscord from 'ytdl-core-discord'
import { Readable } from 'stream';
import SongNotFoundException from './apis/exceptions/song-not-found.exception';

export default class Music implements MusicInterface {
    private queue: Readable[];
    private isPlaying: boolean;
    private readonly youtubeHandler: YoutubeHandler;
    private player: any;

    constructor() {
        this.queue = []
        this.isPlaying = false
        this.youtubeHandler = new YoutubeHandler()
        this.player = createAudioPlayer()
    }

    private async playNextSong(channel: VoiceBasedChannel) {
        if (this.queue.length === 0) {
            this.isPlaying = false
            return;
        }

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        connection.subscribe(this.player);

        const resource = createAudioResource(this.queue.shift()!, {
            inputType: StreamType.Opus,
        });

        this.player.play(resource);

        this.player.on('error', (error: any) => {
            new ErrorHandler('[🎶]', 'Error cargando la canción', error)
            this.playNextSong(channel)
        });

        this.player.once(AudioPlayerStatus.Idle, () => {
            this.playNextSong(channel)
        });
    }

    private async addToQueue(query: Readable) {
        this.queue.push(query)
    }

    async playSong(channel: VoiceBasedChannel, query: string) {
        const song = await this.youtubeHandler.search(query)

        if (!song) {
            throw new SongNotFoundException(`No song found for query ${query}`);
        };    

        const stream = await ytdDiscord(song.url, { highWaterMark: 1 << 25 })

        await this.addToQueue(stream)

        if (!this.isPlaying) {
            this.isPlaying = true
            this.playNextSong(channel)
        }
    }

    async pauseSong() {
        this.player.pause();
    }

    async resumeSong() {
        this.player.unpause();
    }
}