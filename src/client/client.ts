import { BaseInteraction, Client, Collection, CommandInteraction, DiscordAPIError, REST, Routes } from "discord.js";
import providers from "../providers/bot-config.provider";
import IBotConfigProvider from "../interfaces/bot-config.interface";
import ICommand from "../interfaces/command.interface";
import { getCommands } from "../handlers/command.handler";
import { getEvents } from "../handlers/event.handler";
import { ErrorHandler } from "../shared/error-handler";

export default class DiscordClient {
    private client: Client;
    private botConfigProvider: IBotConfigProvider;
    public commands: Collection<string, ICommand>;

    constructor() {
        this.client = new Client(providers.clientConfigProvider);
        this.botConfigProvider = providers.BotConfigProvider;
        this.commands = new Collection<string, ICommand>;
    };

    async getClient(): Promise<void> {
        console.clear();
        console.info('[🔄] [🤖] Connecting client...');

        await this.client.login(this.botConfigProvider.discordConfig.token)
            .then(() => console.info(`[✅] [🤖] ${this.client.user?.username} is running`))
            .catch((error: DiscordAPIError) => new ErrorHandler('🤖', 'There was an error initializating bot', error));
    };

    async loadCommands(): Promise<void> {
        console.info('\n[🔄] [🤖] Loading commands...');

        await getCommands()
            .then(async commands => {
                this.commands = commands;
                
                await new REST({ version: '10' })
                    .setToken(this.botConfigProvider.discordConfig.token)
                    .put(
                        Routes.applicationCommands(this.botConfigProvider.discordConfig.clientId),
                        {
                            body: commands.map(command => command.data.toJSON())
                        }
                    )
                    .then(() => console.info(`[✅] [🤖] Commands loaded`))
                    .catch((error: any) => new ErrorHandler('🤖', 'There was an error loading commands', error));
            })
            .catch((error: any) => new ErrorHandler('🤖', 'There was an error loading commands', error));
    };

    async loadEvents(): Promise<void> {
        console.info('\n[🔄] [🤖] Loading events...');

        await getEvents()
            .then(async events => {
                events.forEach(event => {
                    if (event.data.once) {
                        this.client.once(event.data.name, (interaction: CommandInteraction) => {
                            event.execute(this.client, interaction);
                        });
                    } else {
                        this.client.on(event.data.name, (interaction: CommandInteraction) => {
                            event.execute(this.client, interaction);
                        });
                    }
                });
                console.info(`[✅] [🤖] Events loaded`);
            })
            .catch((error: any) => new ErrorHandler('🤖', 'There was an error loading events', error));
    };
};