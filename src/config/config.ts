import { ActivityType, ClientOptions, IntentsBitField } from "discord.js";

export const clientConfig: ClientOptions = {
    intents: [
        // https://discord.com/developers/docs/topics/gateway#list-of-intents
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildVoiceStates,
    ],
    presence: {
        status: 'online',
        activities: [
            {
                name: '/help',
                type: ActivityType.Listening
            }
        ]
    }
};