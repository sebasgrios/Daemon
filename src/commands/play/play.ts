import { Client, CommandInteraction, ComponentType, GuildMember, MessageComponentInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import ICommand from "../../interfaces/command.interface";
import notInVoiceChat from "../../component/embed/not-voice-chat.embed";
import musicInfo from "../../component/embed/music-info.embed";
import playGroupButton from "../../component/buttons/play-group.button";
import { handleButtonAction } from "../../component/buttons/handlers/button.handler";
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

        const reply = await interaction.reply({
            embeds: [musicInfo(client, interaction, 'play')],
            components: [playGroupButton]
        });

        const music = new Music();

        music.playSong(member.voice.channel);
        
        // TODO Refactor collector
        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.Button
        });

        collector.on('collect', (interactionCollector: MessageComponentInteraction) => {
            handleButtonAction(interactionCollector);
        });
    }
};

export default playCommand;