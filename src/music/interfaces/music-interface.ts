import { VoiceBasedChannel } from "discord.js";
import SongNotFoundException from "../apis/exceptions/song-not-found.exception";
import SongResultInterface from "./song-results.interface";

export interface InfoToCommand {
    song: SongResultInterface,
    queue: SongResultInterface[]
}
export default interface MusicInterface {
    playSong(channel: VoiceBasedChannel, query: string): Promise<InfoToCommand | SongNotFoundException>
    pauseSong(): Promise<void>
    resumeSong(): Promise<void>
}