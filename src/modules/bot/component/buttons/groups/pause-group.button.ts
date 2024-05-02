import { ActionRowBuilder, ButtonBuilder } from "discord.js";

import resumeButton from "../../../client/buttons/resume/resume";
import skipButton from "../../../client/buttons/skip/skip";

export default new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        resumeButton.data,
        skipButton.data
    );