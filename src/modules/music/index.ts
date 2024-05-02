import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    StreamType,
    AudioPlayerStatus,
} from '@discordjs/voice';
import { VoiceBasedChannel } from 'discord.js';
import { Readable } from 'stream';
import ytdDiscord from 'ytdl-core-discord';
import { EventEmitter } from 'events';

import MusicInterface, { InfoToCommand } from './interfaces/music-interface';
import YoutubeHandler from './apis/youtube/youtube';
import SongNotFoundException from './apis/exceptions/song-not-found.exception';
import SongResultInterface from './interfaces/song-results.interface';
import { ErrorHandler } from '../../shared/error.handler';
import { MusicEventsList } from './events/event.types';

export default class Music extends EventEmitter implements MusicInterface  {
    
    private queue: Readable[]; //Extract Readables from memory getter
    private queueInfo: SongResultInterface[] = []
    private isPlaying: boolean;
    private readonly youtubeHandler: YoutubeHandler;
    private player: any;

    constructor() {
        super()
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
            this.emit(MusicEventsList.playing_error)
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
        
        this.emit(MusicEventsList.play_song, { channel, song })

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
        this.emit(MusicEventsList.pause_song)
        this.player.pause();
    }

    async resumeSong() {
        this.player.unpause();
    }

    async skipSong(channel: VoiceBasedChannel) {
        this.player.stop();
        this.playNextSong(channel);
        this.emit(MusicEventsList.skip_song)
    }
}