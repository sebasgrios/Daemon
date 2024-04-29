import { CommandInteraction, MessageComponentInteraction } from "discord.js";
import { ErrorHandler } from "../../../shared/error.handler";
import BackButton from "../back.button";
import ExtendedClient from "../../../client/extended-client.interface";
import PauseButton from "../pause.button";
import PlayButton from "../play.button";
import SkipButton from "../skip.button";
import VolumeDownButton from "../volume-down.button";
import VolumeUpButton from "../volume-up.button";
import { InfoToCommand } from "../../../music/interfaces/music-interface";

interface IButtonAction {
    [key: string]: (arg0: InfoToCommand, arg1: ExtendedClient, arg2: CommandInteraction, arg3: MessageComponentInteraction) => Promise<void>;
}

const buttonAction: IButtonAction = {
    'play-button': (song: InfoToCommand, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new PlayButton().execute(song, client, interaction, interactionCollector),
    'pause-button': (song: InfoToCommand, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new PauseButton().execute(song, client, interaction, interactionCollector),
    // 'back-button': (client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new BackButton().execute(client, interaction, interactionCollector),
    // 'skip-button': (client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new SkipButton().execute(client, interaction, interactionCollector),
    // 'volume_down-button': (client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new VolumeDownButton().execute(client, interaction, interactionCollector),
    // 'volume_up-button': (client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new VolumeUpButton().execute(client, interaction, interactionCollector),
};

export const handleButtonAction = (song: InfoToCommand, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => {
    const action = buttonAction[interactionCollector.customId];

    action ? action(song, client, interaction, interactionCollector) : new ErrorHandler('▶️', 'There was an error trying to execute button action', 'buttonAction not found');
}; 