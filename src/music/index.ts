import {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
    AudioPlayer,
} from '@discordjs/voice'
import { GatewayIntentBits } from 'discord-api-types/v9'
import { Client, Guild, VoiceBasedChannel } from 'discord.js'
import providers from '../providers/bot-config.provider'
import MusicInterface from './interfaces/music-interface'
import MusicAdapter from './interfaces/adapter'
import { ErrorHandler } from '../shared/error-handler'

export default class Music implements MusicInterface {
    private token!: string
    private player: AudioPlayer
    private musicAdapter!: MusicAdapter
    
    constructor (
        private channel: VoiceBasedChannel,
        private guild: Guild
    ) {
        this.token = providers.BotConfigProvider.discordConfig.token;
        this.player = createAudioPlayer()
        this.musicAdapter = new MusicAdapter(channel, guild)
    }

    async connectToChannel(channel: VoiceBasedChannel) {
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: this.musicAdapter.createDiscordJSAdapter(this.channel)
        })

        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 30_000)

            return connection
        } catch (error) {
            connection.destroy()
            new ErrorHandler('🎶', 'There was an error connecting to channel', error)
        }
    }


}