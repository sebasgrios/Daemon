import { CommandInteraction, MessageComponentInteraction } from "discord.js";

import IButtonAction from "../interfaces/button-action.interface";
import SongResultInterface from "../../../../music/interfaces/song-results.interface";
import { ErrorHandler } from "../../../../../shared/error.handler";
import { isUserInVoiceChat } from "../utils";
import PlayButton from "../play.button";
import PauseButton from "../pause.button";
import SkipButton from "../skip.button";
import { EventEmitter } from "events";

export class ButtonActionHandler extends EventEmitter {
    private song: SongResultInterface
    private interaction: CommandInteraction
    private interactionCollector: MessageComponentInteraction
    private buttonAction: IButtonAction = {
        'play-button': () => this.playButton(),
        'pause-button': () => this.pauseButton(),
        'back-button': () => this.backButton(),
        'skip-button': () => this.skipButton(),
        'volume_down-button': () => this.volumeDownButton(),
        'volume_up-button': () => this.volumeUpButton(),
    };

    constructor(
        song: SongResultInterface,
        interaction: CommandInteraction,
        interactionCollector: MessageComponentInteraction
    ) {
        super();
        this.song = song;
        this.interaction = interaction;
        this.interactionCollector = interactionCollector;
    }

    execute() {
        const action = this.buttonAction[this.interactionCollector.customId];

        if (!action) {
            new ErrorHandler('▶️', 'There was an error trying to execute button action', 'buttonAction not found');
            return;
        }

        if (!isUserInVoiceChat(this.interaction)) {
            return;
        }

        action();
    }

    playButton() {
        new PlayButton().execute(this.song, this.interaction, this.interactionCollector)
    }
    pauseButton() {
        new PauseButton().execute(this.song, this.interaction, this.interactionCollector)
    }
    backButton() { }
    skipButton() {
        new SkipButton().execute(this.song, this.interaction, this.interactionCollector)
    }
    volumeDownButton() { }
    volumeUpButton() { }
}
