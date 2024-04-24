import { ButtonBuilder, ButtonStyle } from "discord.js";

export default class Button {
    private customId: string;
    private label: string;
    private style: ButtonStyle;

    constructor(customId: string, label: string, style: ButtonStyle) {
        this.customId = customId;
        this.label = label;
        this.style = style;
    }

    get embed(): ButtonBuilder {
        return new ButtonBuilder()
            .setCustomId(this.customId)
            .setLabel(this.label)
            .setStyle(this.style);
    }
}