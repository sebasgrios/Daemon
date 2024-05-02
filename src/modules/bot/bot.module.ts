import DiscordClient from "./client/client"
import EmbedHandler from "./handlers/embed.handler"

export default class BotModule {
    private readonly discordClient: DiscordClient
    private readonly embedHandler: EmbedHandler

    constructor () {
        this.discordClient = new DiscordClient()
        this.discordClient.login()
        this.discordClient.loadCommands()
        this.discordClient.loadEvents()

        this.embedHandler = new EmbedHandler();
    }

    get botModuleProviders () {
        return {
            discordClient: this.discordClient.getClient(),
            embedHandler: this.embedHandler
        }
    }
}