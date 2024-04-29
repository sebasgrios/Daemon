import { Client, CommandInteraction, CommandInteractionOptionResolver, ComponentType, GuildMember, MessageComponentInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import ICommand from "../../interfaces/command.interface";
import notInVoiceChat from "../../component/embed/not-voice-chat.embed";
import musicInfo from "../../component/embed/music-info.embed";
import playGroupButton from "../../component/buttons/play-group.button";
import { handleButtonAction } from "../../component/buttons/handlers/button.handler";
import { musicClient } from "../..";
import SongNotFoundException from "../../music/apis/exceptions/song-not-found.exception";
import { InfoToCommand } from "../../music/interfaces/music-interface";

const playCommand: ICommand = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('play a song')
        .addStringOption((option: SlashCommandStringOption): SlashCommandStringOption => (
            option
                .setName('query')
                .setDescription('add name/url of song')
                .setRequired(true)
        )),
    run: async (client: Client, interaction: CommandInteraction) => {
        const member: GuildMember = (interaction.member as GuildMember);

        if (!member.voice.channel) {
            interaction.reply({
                embeds: [notInVoiceChat(client, interaction)],
                ephemeral: true
            });
            return;
        }

        // Query + music
        const query: string | null = (interaction.options as CommandInteractionOptionResolver).getString('query');

        if (!query) return; // TODO: Respuesta del mensaje

        try {
<<<<<<< HEAD
            const song = await musicClient.playSong(member.voice.channel, query);
=======
            const {song, queue} = (await musicClient.playSong(member.voice.channel, query)) as InfoToCommand;

>>>>>>> 8c0e7c3e26c8bc89bd7d524f4938c2e4c6c4dd7d
        } catch (error: any) {
            switch (error.constructor) {
                case SongNotFoundException:
                    await interaction.followUp({ content: error.message, ephemeral: true });
                    break;
                default:
                    console.error('Error reproduciendo la canción:', error);
                    await interaction.followUp({ content: 'No se pudo reproducir la canción.', ephemeral: true });
                    break;
            }
            return;
        }
        // End Query + music        

        const reply = await interaction.reply({
            embeds: [musicInfo(client, interaction, 'play')],
            components: [playGroupButton]
        });

        // TODO: Refactor collector
        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.Button
        });

        collector.on('collect', (interactionCollector: MessageComponentInteraction) => {
            handleButtonAction(client, interaction, interactionCollector);
        });
    }
};

export default playCommand;