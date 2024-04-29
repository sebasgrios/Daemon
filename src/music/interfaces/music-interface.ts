import { VoiceBasedChannel } from "discord.js";
import SongNotFoundException from "../apis/exceptions/song-not-found.exception";

export default interface MusicInterface {
    playSong(channel: VoiceBasedChannel, query: string): Promise<void | SongNotFoundException>
    pauseSong(): Promise<void>
    resumeSong(): Promise<void>
}