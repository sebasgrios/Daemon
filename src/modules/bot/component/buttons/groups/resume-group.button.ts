import { ActionRowBuilder, ButtonBuilder } from "discord.js";

import pauseButton from "../../../client/buttons/pause/pause";
import skipButton from "../../../client/buttons/skip/skip";

export default new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        pauseButton.data,
        skipButton.data
    );