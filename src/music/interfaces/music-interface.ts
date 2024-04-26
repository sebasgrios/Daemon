import { VoiceConnection } from "@discordjs/voice";
import { VoiceBasedChannel } from "discord.js";

export default interface MusicInterface {
    playSong(channel: VoiceBasedChannel, query: string): Promise<void>
}