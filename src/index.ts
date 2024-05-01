import DiscordClient from "./client/client";
import ExtendedClient from "./client/extended-client.interface";
import Music from "./music";
import MusicModule from "./music/music.module";
import { ErrorHandler } from "./shared/error.handler";

export default class Bot {
    private readonly discordClient: DiscordClient

    constructor ( ) {
        this.discordClient = new DiscordClient()
    }

    async start () {
        try {
            await this.discordClient.login()
            await this.discordClient.loadCommands()
            await this.discordClient.loadEvents()
        } catch (error) {
            new ErrorHandler('🤖', 'There was an error starting the bot', error)
        }
    }

    getDiscordClient(): ExtendedClient {
        return this.discordClient.getClient()
    }

    getMusicClient(): Music {
        const discordClient = this.getDiscordClient()
        return new MusicModule(discordClient).music
    }
}

const bot = new Bot()
bot.start()

const discordClient = bot.getDiscordClient()
const musicClient = bot.getMusicClient()

export {
    discordClient,
    musicClient
}

//TOD@ all exports & always extended client