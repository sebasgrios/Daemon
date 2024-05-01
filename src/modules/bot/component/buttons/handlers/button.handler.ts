import { CommandInteraction, MessageComponentInteraction } from "discord.js";
import { ErrorHandler } from "../../../../../shared/error.handler";
import BackButton from "../back.button";
import PauseButton from "../pause.button";
import PlayButton from "../play.button";
import SkipButton from "../skip.button";
import VolumeDownButton from "../volume-down.button";
import VolumeUpButton from "../volume-up.button";
import SongResultInterface from "../../../../music/interfaces/song-results.interface";

interface IButtonAction {
    [key: string]: (arg0: SongResultInterface, arg1: CommandInteraction, arg3: MessageComponentInteraction) => Promise<void>;
}

const buttonAction: IButtonAction = {
    'play-button': (song: SongResultInterface, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new PlayButton().execute(song, interaction, interactionCollector),
    'pause-button': (song: SongResultInterface, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new PauseButton().execute(song, interaction, interactionCollector),
    'back-button': (song: SongResultInterface, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new BackButton().execute(song, interaction, interactionCollector),
    'skip-button': (song: SongResultInterface, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new SkipButton().execute(song, interaction, interactionCollector),
    'volume_down-button': (song: SongResultInterface, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new VolumeDownButton().execute(song, interaction, interactionCollector),
    'volume_up-button': (song: SongResultInterface, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => new VolumeUpButton().execute(song, interaction, interactionCollector),
};

export class ButtonActionHandler {
    private song: SongResultInterface
    private interaction: CommandInteraction
    private interactionCollector: MessageComponentInteraction

    constructor(
        song: SongResultInterface, 
        interaction: CommandInteraction, 
        interactionCollector: MessageComponentInteraction
    ) {
        this.song = song;
        this.interaction = interaction;
        this.interactionCollector = interactionCollector;
    }

    execute() {
        const action = buttonAction[this.interactionCollector.customId];
        
        if (!action) {
            new ErrorHandler('▶️', 'There was an error trying to execute button action', 'buttonAction not found');
        }

        action(this.song, this.interaction, this.interactionCollector);
    }
}

// export const handleButtonAction = (song: SongResultInterface, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction) => {
//     const action = buttonAction[interactionCollector.customId];

//     action ? action(song, interaction, interactionCollector) : new ErrorHandler('▶️', 'There was an error trying to execute button action', 'buttonAction not found');
// }; 