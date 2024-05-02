import { ButtonInteraction } from "discord.js";
import SongResultInterface from "../../../../music/interfaces/song-results.interface";

export default interface IButtonAction {
    [key: string]: (song: SongResultInterface, interaction: ButtonInteraction) => void;
}