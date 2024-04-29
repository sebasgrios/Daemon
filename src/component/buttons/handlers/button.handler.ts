import { CommandInteraction, MessageComponentInteraction } from "discord.js";
import { ErrorHandler } from "../../../shared/error.handler";
import BackButton from "../back.button";
import ExtendedClient from "../../../client/extended-client.interface";
import PauseButton from "../pause.button";
import PlayButton from "../play.button";
import SkipButton from "../skip.button";
import SongResultInterface from "../../../music/interfaces/song-results.interface";
import VolumeDownButton from "../volume-down.button";
import VolumeUpButton from "../volume-up.button";

interface IButtonAction {
    [key: string]: (arg0: SongResultInterface, arg1: ExtendedClient, arg2: CommandInteraction, arg3: MessageComponentInteraction) => Promise<void>;
}

const buttonAction: IButtonAction = {
    'play-button': (song: SongResultInterface, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new PlayButton().execute(song, client, interaction, interactionCollector),
    'pause-button': (song: SongResultInterface, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new PauseButton().execute(song, client, interaction, interactionCollector),
    'back-button': (song: SongResultInterface, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new BackButton().execute(song, client, interaction, interactionCollector),
    'skip-button': (song: SongResultInterface, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new SkipButton().execute(song, client, interaction, interactionCollector),
    'volume_down-button': (song: SongResultInterface, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new VolumeDownButton().execute(song, client, interaction, interactionCollector),
    'volume_up-button': (song: SongResultInterface, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new VolumeUpButton().execute(song, client, interaction, interactionCollector),
};

export const handleButtonAction = (song: SongResultInterface, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => {
    const action = buttonAction[interactionCollector.customId];

    action ? action(song, client, interaction, interactionCollector) : new ErrorHandler('▶️', 'There was an error trying to execute button action', 'buttonAction not found');
}; 