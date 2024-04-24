import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, CommandInteraction, ComponentType, EmbedBuilder, GuildMember, MessageComponentInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import ICommand from "../../interfaces/command.interface";
import pauseButton from "../../component/buttons/pause.button";
import volumeDownButton from "../../component/buttons/volume-down.button";
import backButton from "../../component/buttons/back.button";
import skipButton from "../../component/buttons/skip.button";
import volumeUpButton from "../../component/buttons/volume-up.button";
import playButton from "../../component/buttons/play.button";
import notInVoiceChat from "../../component/embed/not-voice-chat.embed";
import musicInfo from "../../component/embed/music-info.embed";
import Music from "../../music";

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
                embeds: [notInVoiceChat(client, interaction)]
            });
            return;
        }

        const buttonGroup = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                volumeDownButton,
                backButton,
                pauseButton,
                skipButton,
                volumeUpButton
            );



        const reply = await interaction.reply({
            embeds: [musicInfo(client, interaction, 'play')],
            components: [buttonGroup]
        });

        const music = new Music();

        music.playSong(member.voice.channel);
        
        // TODO automate this with a method in each button doing is func
        // Create a collector (is like a listener) to listen client interactions with buttons

        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.Button
        });

        collector.on('collect', (interactionCollector: MessageComponentInteraction) => {
            if (interactionCollector.customId === 'pause-button') {
                const buttonGroup2 = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        volumeDownButton,
                        backButton,
                        playButton,
                        skipButton,
                        volumeUpButton
                    );

                interactionCollector.update({
                    embeds: [musicInfo(client, interaction, 'pause')],
                    components: [buttonGroup2]
                });
            }

            if (interactionCollector.customId === 'play-button') {
                interactionCollector.update({
                    embeds: [musicInfo(client, interaction, 'play')],
                    components: [buttonGroup]
                });
            }
        });

    }
};

export default playCommand;