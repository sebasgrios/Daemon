import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    entersState,
    StreamType,
    AudioPlayerStatus,
    VoiceConnectionStatus,
    AudioPlayer,
    NoSubscriberBehavior,
} from '@discordjs/voice'
import { Client, Guild, VoiceBasedChannel } from 'discord.js'
import MusicInterface from './interfaces/music-interface'
import { ErrorHandler } from '../shared/error.handler'

export default class Music implements MusicInterface {

    //https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
    private queue: string[];
    private isPlaying: boolean;

    constructor() {
        this.queue = [];
        this.isPlaying = false;
    }

    private async playNextSong(channel: VoiceBasedChannel) {
        if (this.queue.length === 0) {
            this.isPlaying = false;
            return;
        }

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause
            }
        });

        connection.subscribe(player);

        const resource = createAudioResource(this.queue.shift()!, {
            inputType: StreamType.Arbitrary
        });

        player.play(resource);

        player.on('error', error => {
            new ErrorHandler('[🎶]', 'Error cargando la canción', error);
            this.playNextSong(channel);
        });

        player.once(AudioPlayerStatus.Idle, () => {
            console.log('Audio player is idle.');
            this.playNextSong(channel);
        });
    }

    private async addToQueue(query: string) {
        this.queue.push(query);
    }

    async playSong(channel: VoiceBasedChannel, query: string) {
        await this.addToQueue(query);

        if (!this.isPlaying) {
            this.isPlaying = true;
            this.playNextSong(channel);
        }
    }
}
