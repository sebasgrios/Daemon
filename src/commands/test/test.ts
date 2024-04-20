import { Client, CommandInteraction, EmbedBuilder, GuildMember, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import ICommand from "../../interfaces/command.interface";

export const task: ICommand = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('command to test SlashCommand functionallities')
        .addStringOption((option: SlashCommandStringOption): SlashCommandStringOption => (
            option
                .setName('option')
                .setDescription('option string description')
                .setRequired(true)
                .addChoices(
                    { name: 'text 1', value: 'value 1' }, 
                    {name: 'text 2', value: 'value 2'}
                )
        )),
    run: async (client: Client, interaction: CommandInteraction) => {
        const member: GuildMember = (interaction.member as GuildMember);

        const embed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('Test')
            .setAuthor({
                name: `${member.nickname} executed test command`,
                iconURL: `${interaction.user.avatarURL()}`
            });

        interaction.reply({ embeds: [embed] });
    }
};