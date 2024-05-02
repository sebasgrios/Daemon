import { ButtonInteraction, ButtonStyle } from "discord.js";

import Button from "./button";

export default class PauseButton extends Button {
    constructor(
        customId: string = 'pause-button',
        label: string = '⏸︎',
        style: ButtonStyle = ButtonStyle.Danger
    ) {
        super(customId, label, style);
    }

    async execute(interaction: ButtonInteraction): Promise<void> {
        
    }
}