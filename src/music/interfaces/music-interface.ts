import { VoiceBasedChannel } from "discord.js";

export default interface MusicInterface {
    playSong(channel: VoiceBasedChannel, query: string): Promise<void>
    pauseSong(): Promise<void>
    resumeSong(): Promise<void>
}