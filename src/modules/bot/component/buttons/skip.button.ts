import { ButtonInteraction, ButtonStyle } from "discord.js";

import Button from "./button";

export default class SkipButton extends Button {
    constructor(
        customId: string = 'skip-button',
        label: string = '⏭︎',
        style: ButtonStyle = ButtonStyle.Primary
    ) {
        super(customId, label, style);
    }

    async execute(interaction: ButtonInteraction): Promise<void> {

    }
}