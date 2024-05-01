import ExtendedClient from "./modules/bot/client/extended-client.interface";
import MainModule from "./modules/main.module";
import Music from "./modules/music";

export default class Main {
    private readonly mainModule: MainModule

    constructor() {
        this.mainModule = new MainModule()
    }

    getDiscordClient(): ExtendedClient {
        const botModule = this.mainModule.allModules.botModule
        return botModule.botModuleProviders.discordClient
    }

    getMusicClient(): Music {
        const musicModule = this.mainModule.allModules.musiscModule
        const musicClient = musicModule.musicModuleProviders.musicClient

        return musicClient
    }
}

const bot = new Main()

const discordClient = bot.getDiscordClient()
const musicClient = bot.getMusicClient()

export {
    discordClient,
    musicClient
}