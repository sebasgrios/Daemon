import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, CommandInteraction, ComponentType, EmbedBuilder, GuildMember, MessageComponentInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import ICommand from "../../interfaces/command.interface";
import pauseButton from "../../component/buttons/pause.button";
import volumeDownButton from "../../component/buttons/volume-down.button";
import backButton from "../../component/buttons/back.button";
import skipButton from "../../component/buttons/skip.button";
import volumeUpButton from "../../component/buttons/volume-up.button";
import playButton from "../../component/buttons/play.button";

export const task: ICommand = {
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
        const query = interaction.options.get('query');
        const embed = new EmbedBuilder();

        if (!member.voice.channel) {
            embed.setColor('Red')
                .setTitle('❌ You aren\'t in a voice channel')
        }

        embed.setColor('Green')
            .setTitle(`Playing: ${query?.value}`)
            .setAuthor({
                name: `${member.nickname} played a song`,
                iconURL: `${interaction.user.avatarURL()}`
            })
            .setTimestamp()
            .setFooter({
                text: `Queue length: ${1}`
            });

        const buttonGroup = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                volumeDownButton,
                backButton,
                pauseButton,
                skipButton,
                volumeUpButton
            );



        const reply = await interaction.reply({
            embeds: [embed],
            components: [buttonGroup]
        });

        // TODO automate this with a method in each button doing is func
        // Create a collector (is like a listener) to listen client interactions with buttons
        
        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.Button
        });

        collector.on('collect', (interaction: MessageComponentInteraction) => {
            if (interaction.customId === 'pause-button') {
                embed.setColor('Red')
                    .setTitle(`Playing: ${query?.value}`)
                    .setAuthor({
                        name: `${member.nickname} paused a song`,
                        iconURL: `${interaction.user.avatarURL()}`
                    })
                    .setTimestamp()
                    .setFooter({
                        text: `Queue length: ${1}`
                    });

                const buttonGroup2 = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        volumeDownButton,
                        backButton,
                        playButton,
                        skipButton,
                        volumeUpButton
                    );

                interaction.update({
                    embeds: [embed],
                    components: [buttonGroup2]
                });
            }

            if (interaction.customId === 'play-button') {
                embed.setColor('Green')
                    .setTitle(`Playing: ${query?.value}`)
                    .setAuthor({
                        name: `${member.nickname} played a song`,
                        iconURL: `${interaction.user.avatarURL()}`
                    })
                    .setTimestamp()
                    .setFooter({
                        text: `Queue length: ${1}`
                    });

                interaction.update({
                    embeds: [embed],
                    components: [buttonGroup]
                });
            }
        });
        
    }
};