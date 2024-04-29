import { ButtonStyle, CommandInteraction, GuildMember, MessageComponentInteraction } from "discord.js";
import { isUserInVoiceChat } from "./utils";
import { musicClient } from "../..";
import Button from "./button";
import ExtendedClient from "../../client/extended-client.interface";
import musicInfo from "../embed/music-info.embed";
import pauseGroupButton from "./pause-group.button";
import SongResultInterface from "../../music/interfaces/song-results.interface";

export default class SkipButton extends Button {
    constructor(
        customId: string = 'skip-button',
        label: string = '⏭︎',
        style: ButtonStyle = ButtonStyle.Primary
    ) {
        super(customId, label, style);
    }

    async execute(song: SongResultInterface, client: ExtendedClient, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction): Promise<void> {
        const member: GuildMember = (interaction.member as GuildMember)

        if (!isUserInVoiceChat(interaction) || !member.voice.channel) {
            return;
        }

        musicClient.skipSong(member.voice.channel);

        interaction.followUp({
            embeds: [musicInfo(musicClient.getQueueInfo()[0], interaction, 'play')],
            components: [pauseGroupButton]
        });
    }
}