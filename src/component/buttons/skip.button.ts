import { ButtonStyle, CommandInteraction, GuildMember, MessageComponentInteraction } from "discord.js";
import { isUserInVoiceChat } from "./utils";
import discordClient, { musicClient } from "../..";
import Button from "./button";
import musicInfo from "../embed/music-info.embed";
import SongResultInterface from "../../music/interfaces/song-results.interface";
import playGroupButton from "./play-group.button";
import musicSkip from "../embed/music-skip.embed";
import { MusicMemoryOptions } from "../../music/music.module";

export default class SkipButton extends Button {
    constructor(
        customId: string = 'skip-button',
        label: string = '⏭︎',
        style: ButtonStyle = ButtonStyle.Primary
    ) {
        super(customId, label, style);
    }

    async execute(song: SongResultInterface, interaction: CommandInteraction, interactionCollector: MessageComponentInteraction): Promise<void> {
        const member: GuildMember = (interaction.member as GuildMember);

        if (!isUserInVoiceChat(interaction) || !member.voice.channel) {
            return;
        }
        const nextSong = discordClient.getClient().music?.get(MusicMemoryOptions.queue);

        musicClient.skipSong(member.voice.channel);
        
        if (nextSong) {
            // TODO not reply and create new interaction
            interaction.followUp({
                embeds: [musicInfo(nextSong, interaction, 'play')],
                components: [playGroupButton]
            });
        }

        interaction.editReply({
            embeds: [musicSkip(song, interactionCollector)],
            components: []
        });
    }
}