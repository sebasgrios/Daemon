import DiscordClient from "./client/client"

export default class BotModule {
    private readonly discordClient: DiscordClient

    constructor () {
        this.discordClient = new DiscordClient()
        this.discordClient.login()
        this.discordClient.loadCommands()
        this.discordClient.loadEvents()
    }

    get botModuleProviders () {
        return {
            discordClient: this.discordClient.getClient()
        }
    }
}