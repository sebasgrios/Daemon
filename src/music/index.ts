import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    StreamType,
    AudioPlayerStatus,
    NoSubscriberBehavior,
} from '@discordjs/voice';
import { VoiceBasedChannel } from 'discord.js';
import MusicInterface, { InfoToCommand } from './interfaces/music-interface';
import { ErrorHandler } from '../shared/error.handler';
import YoutubeHandler from './apis/youtube/youtube';
import ytdDiscord from 'ytdl-core-discord';
import { Readable } from 'stream';
import SongNotFoundException from './apis/exceptions/song-not-found.exception';
import SongResultInterface from './interfaces/song-results.interface';

export default class Music implements MusicInterface {
    private queue: Readable[];
    private queueInfo: SongResultInterface[] = []
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

        this.queueInfo.shift()!;

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

    private async addToQueue(query: Readable, song: SongResultInterface) {
        this.queue.push(query)
        this.queueInfo.push(song)
    }

    async playSong(channel: VoiceBasedChannel, query: string): Promise<InfoToCommand | SongNotFoundException> {
        const song = await this.youtubeHandler.search(query)

        if (!song) {
            throw new SongNotFoundException(`No se ha encontrado la canción: \`${query}\``);
        };

        const stream = await ytdDiscord(song.url, { highWaterMark: 1 << 25 })

        await this.addToQueue(stream, song)

        if (!this.isPlaying) {
            this.isPlaying = true
            this.playNextSong(channel)
        }

        return {
            song: song,
            queue: this.queueInfo
        }
    }

    async pauseSong() {
        this.player.pause();
    }

    async resumeSong() {
        this.player.unpause();
    }

    async skipSong(channel: VoiceBasedChannel) {
        this.player.stop();

        this.playNextSong(channel);
    }
}