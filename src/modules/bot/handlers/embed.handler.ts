import { ButtonInteraction, CommandInteraction, InteractionResponse, Message } from "discord.js";
import SongResultInterface from "../../music/interfaces/song-results.interface";
import musicInfo from "../component/embed/music-info.embed";
import resumeGroupButton from "../component/buttons/groups/resume-group.button";
import pauseGroupButton from "../component/buttons/groups/pause-group.button";
import { StatusList } from "../component/embed/status.types";

export default class EmbedHandler {
    private message: InteractionResponse | Message | null;
    private lastInteraction: CommandInteraction | ButtonInteraction | null; // TOD@ mirar como obtener mejor la última interacción
    private currentSong: SongResultInterface | null;

    constructor() {
        this.message = null;
        this.lastInteraction = null;
        this.currentSong = null;
    }

    async generateLoader(interaction: CommandInteraction): Promise<void> {
        const loader = await interaction.deferReply();

        this.message = loader;
    }

    loadLastInteraction(interaction: CommandInteraction | ButtonInteraction) {
        this.lastInteraction = interaction;
    }

    async generatePanel(song: SongResultInterface) {
        this.currentSong = song;
        await this.message?.edit({
            embeds: [musicInfo(this.currentSong as SongResultInterface, this.lastInteraction as CommandInteraction | ButtonInteraction, StatusList.play)],
            components: [resumeGroupButton]
        });
    }

    async pausePanel() {
        await this.lastInteraction?.deferReply();

        await this.message?.edit({
            embeds: [musicInfo(this.currentSong as SongResultInterface, this.lastInteraction as CommandInteraction | ButtonInteraction, StatusList.pause)],
            components: [pauseGroupButton]
        });

        await this.lastInteraction?.deleteReply();
    }

    async resumePanel() {
        await this.lastInteraction?.deferReply();

        await this.message?.edit({
            embeds: [musicInfo(this.currentSong as SongResultInterface, this.lastInteraction as CommandInteraction | ButtonInteraction, StatusList.resume)],
            components: [resumeGroupButton]
        });

        await this.lastInteraction?.deleteReply();
    }
}