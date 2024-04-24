import { Client, ColorResolvable, CommandInteraction, EmbedBuilder, GuildMember } from "discord.js";

const getColorByStatus = (status: string): ColorResolvable => {
    if (status === 'play') {
        return 'Green';
    }

    if (status === 'pause') {
        return 'Red';
    }

    return 'Grey';
}

const getStatus = (status: string): string => {
    if (status === 'play') {
        return 'played';
    }

    if (status === 'pause') {
        return 'paused';
    }

    return '';
};

const musicInfo = (client: Client, interaction: CommandInteraction, status: string): EmbedBuilder => {
    const member: GuildMember = (interaction.member as GuildMember);
    const query = interaction.options.get('query');

    return new EmbedBuilder()
        .setColor(getColorByStatus(status))
        .setTitle(`${query?.value}`)
        .setAuthor({
            name: `${member.nickname ?? interaction.user.username} ${getStatus(status)} a song`,
            iconURL: `${interaction.user.avatarURL()}`
        })
        .setTimestamp()
        .setFooter({
            text: `Queue length: ${1}`
        });
};

export default musicInfo;