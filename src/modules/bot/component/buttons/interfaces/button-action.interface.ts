import { ButtonInteraction } from "discord.js";
import SongResultInterface from "../../../../music/interfaces/song-results.interface";

export default interface IButtonAction {
    [key: string]: (interaction: ButtonInteraction) => void;
}