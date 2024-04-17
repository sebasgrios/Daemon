import { ActivityType, Client, DiscordAPIError, IntentsBitField } from "discord.js";
import { ApiConfigService } from "./shared/api-config.service";

export default class DiscordClient {
    private apiConfigService: ApiConfigService;

    constructor () {
        this.apiConfigService = new ApiConfigService();
    };

    async getClient (): Promise<Client> {
        console.clear();
        console.info('[🔄] Connecting client...');

        const client = new Client({
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
        });

        await client.login(this.apiConfigService.discordConfig.token)
            .then(() => console.info(`[✅] ${client.user?.username} is running`))
            .catch((error: DiscordAPIError) => console.error(`[❌] DiscordClient getClient | There was an error initializating bot: ${error}`));

        return client;
    };
}
