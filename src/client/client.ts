import { BaseInteraction, Client, Collection, CommandInteraction, DiscordAPIError, REST, Routes } from "discord.js";
import providers from "../providers/bot-config.provider";
import IBotConfigProvider from "../interfaces/bot-config.interface";
import ICommand from "../interfaces/command.interface";
import { getCommands } from "../handlers/command.handler";
import { getEvents } from "../handlers/event.handler";
import { ErrorHandler } from "../shared/error.handler";
import { InfoHandler } from "../shared/info.handler";
import ExtendedClient from "./extended-client.interface";
import MusicModule from "../music/music.module";

export default class DiscordClient {
    private client: ExtendedClient;
    private botConfigProvider: IBotConfigProvider;
    public commands: Collection<string, ICommand>;

    constructor() {
        this.client = new Client(providers.clientConfigProvider);
        this.botConfigProvider = providers.BotConfigProvider;
        this.commands = new Collection<string, ICommand>;
        new MusicModule(this.client)
    };

    async getClient(): Promise<void> {
        console.clear();
        new InfoHandler('🤖', 'Client is connecting...', 'loading');

        await this.client.login(this.botConfigProvider.discordConfig.token)
            .then(() => new InfoHandler('🤖', `${this.client.user?.username} is running`, 'ok', true))
            .catch((error: DiscordAPIError) => new ErrorHandler('🤖', 'There was an error initializating bot', error));
    };

    async loadCommands(): Promise<void> {
        new InfoHandler('🤖', 'Commands are loading...', 'loading');

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
                    .then(() => new InfoHandler('🤖', 'Commands are loaded', 'ok', true))
                    .catch((error: any) => new ErrorHandler('🤖', 'There was an error loading commands', error));
            })
            .catch((error: any) => new ErrorHandler('🤖', 'There was an error loading commands', error));
    };

    async loadEvents(): Promise<void> {
        new InfoHandler('🤖', 'Events are loading...', 'loading');

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
                new InfoHandler('🤖', 'Events are loaded', 'ok', true);
            })
            .catch((error: any) => new ErrorHandler('🤖', 'There was an error loading events', error));
    };
};