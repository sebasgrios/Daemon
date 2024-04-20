import { VoiceConnection } from "@discordjs/voice";
import { VoiceBasedChannel } from "discord.js";

export default interface MusicInterface {
    connectToChannel(channel: VoiceBasedChannel): Promise<VoiceConnection | undefined>
}