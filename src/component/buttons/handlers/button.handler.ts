import { MessageComponentInteraction } from "discord.js";
import { ErrorHandler } from "../../../shared/error.handler";
import PlayButton from "../play.button";
import PauseButton from "../pause.button";
import BackButton from "../back.button";
import SkipButton from "../skip.button";
import VolumeDownButton from "../volume-down.button";
import VolumeUpButton from "../volume-up.button";

interface IButtonAction {
    [key: string]: (arg0: MessageComponentInteraction) => Promise<void>;
}

const buttonAction: IButtonAction = {
    'play-button': (interactionCollector: MessageComponentInteraction) => new PlayButton().execute(interactionCollector),
    'pause-button': (interactionCollector: MessageComponentInteraction) => new PauseButton().execute(interactionCollector),
    'back-button': (interactionCollector: MessageComponentInteraction) => new BackButton().execute(interactionCollector),
    'skip-button': (interactionCollector: MessageComponentInteraction) => new SkipButton().execute(interactionCollector),
    'volume_down-button': (interactionCollector: MessageComponentInteraction) => new VolumeDownButton().execute(interactionCollector),
    'volume_up-button': (interactionCollector: MessageComponentInteraction) => new VolumeUpButton().execute(interactionCollector),
};

export const handleButtonAction = (interactionCollector: MessageComponentInteraction) => {
    const action = buttonAction[interactionCollector.customId];

    action ? action(interactionCollector) : new ErrorHandler('▶️', 'There was an error trying to execute button action', 'buttonAction not found');
}; 