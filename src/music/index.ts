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

    constructor() {}

    async playSong(channel: VoiceBasedChannel) {

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
    
        const resource = createAudioResource('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', {
            inputType: StreamType.Arbitrary
        });
    
        player.play(resource);
    
        player.on('error', error => {
            new ErrorHandler('[🎶]', 'Error cargando la canción', error)
        });
    
        player.on(AudioPlayerStatus.Playing, () => {
            console.log('Audio player is playing.');
        });
    
        player.on(AudioPlayerStatus.Idle, () => {
            console.log('Audio player is idle.');
        });
    
        return new Promise<void>((resolve, reject) => {
            player.once(AudioPlayerStatus.Idle, () => {
                resolve();
            });
    
            player.once('error', (error) => {
                reject(error);
            });
        });
    }

}