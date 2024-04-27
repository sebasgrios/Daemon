import { Client, GuildMember, Message } from "discord.js";

export class CanModifyQueueValidator {
    constructor(client: Client) {}

    canModifyQueue(message: Message, member: GuildMember) {
        const { channelId }= member.voice
        /* message.member.guild.me.voice.channelId */

        //TOD@ checker if bot is not in same channel as member to use command
    }
}