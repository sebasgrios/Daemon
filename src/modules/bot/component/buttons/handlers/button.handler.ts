import { ActionRowBuilder, ButtonBuilder, ButtonInteraction } from "discord.js";

import IButtonAction from "../interfaces/button-action.interface";
import SongResultInterface from "../../../../music/interfaces/song-results.interface";
import { ErrorHandler } from "../../../../../shared/error.handler";
import { isUserInVoiceChat } from "../utils";
import ResumeButton from "../resume.button";
import PauseButton from "../pause.button";
import SkipButton from "../skip.button";
import { EventEmitter } from "events";
import ExtendedClient from "../../../client/extended-client.interface";
import { MusicMemoryOptions } from "../../../../music/music.module";

// TOD@A VER QUE HACER CON ESTO (PROBABLEMENTE ELIMINAR)
export class ButtonActionHandler extends EventEmitter {
    private client: ExtendedClient
    private song: SongResultInterface | null
    private interaction: ButtonInteraction | null

    private ResumeButton: ResumeButton
    private PauseButton: PauseButton
    private SkipButton: SkipButton

    private buttonAction: IButtonAction = {
        'resume-button': (song: SongResultInterface, interaction: ButtonInteraction) => this.ResumeButton.execute(song, interaction, this.getGroupButton),
        'pause-button': (song: SongResultInterface, interaction: ButtonInteraction) => this.PauseButton.execute(song, interaction, this.getGroupButton),
        'skip-button': (song: SongResultInterface, interaction: ButtonInteraction) => this.SkipButton.execute(song, interaction, this.getGroupButton),
    };

    constructor(client: ExtendedClient) {
        super();
        this.client = client;
        this.song = this.client.music?.get(MusicMemoryOptions.currentSong);
        this.interaction = null;
        this.ResumeButton = new ResumeButton()
        this.PauseButton = new PauseButton()
        this.SkipButton = new SkipButton()
    }

    // TOD@ get an enum instead of string
    getGroupButton(group: string) {
        if (group === 'resume') {
            return new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    this.PauseButton.embed,
                    this.SkipButton.embed
                );
        }
        if (group === 'pause') {
            return new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    this.ResumeButton.embed,
                    this.SkipButton.embed
                );
        }
    }

    execute(interaction: ButtonInteraction) {
        this.song = this.client.music?.get(MusicMemoryOptions.currentSong);
        this.interaction = interaction;
        const action = this.buttonAction[this.interaction.customId];

        console.log('interaction.customId', interaction.customId);
        console.log('action', action);
        

        if (!action) {
            new ErrorHandler('▶️', 'There was an error trying to execute button action', 'buttonAction not found');
            return;
        }

        if (!isUserInVoiceChat(interaction)) {
            return;
        }

        if (!this.song) {
            return;
        }

        action(this.song, this.interaction);
    }
}
