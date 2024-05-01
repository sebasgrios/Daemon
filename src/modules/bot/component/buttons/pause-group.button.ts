import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import volumeDownButton from "./volume-down.button";
import backButton from "./back.button";
import PlayButton from "./play.button";
import skipButton from "./skip.button";
import volumeUpButton from "./volume-up.button";

export default new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new volumeDownButton().embed,
        new backButton().embed,
        new PlayButton().embed,
        new skipButton().embed,
        new volumeUpButton().embed
    );