import { ButtonInteraction, ButtonStyle } from "discord.js";

import Button from "./button";

export default class ResumeButton extends Button {
    constructor(
        customId: string = 'resume-button',
        label: string = '▶️',
        style: ButtonStyle = ButtonStyle.Success
    ) {
        super(customId, label, style);
    }

    async execute(interaction: ButtonInteraction): Promise<void> {
        
    }
}