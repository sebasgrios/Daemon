import ExtendedClient from "./modules/bot/client/extended-client.interface";
import EmbedHandler from "./modules/bot/handlers/embed.handler";
import MainModule from "./modules/main.module";
import Music from "./modules/music";
import MusicEventEmitter from "./modules/music/events/music.event.emitter";

export default class Main {
    private readonly mainModule: MainModule

    constructor() {
        this.mainModule = new MainModule()
    }

    getDiscordClient(): ExtendedClient {
        const botModule = this.mainModule.allModules.botModule
        return botModule.botModuleProviders.discordClient
    }

    getEmbedHandler(): EmbedHandler {
        return this.mainModule.allModules.botModule.botModuleProviders.embedHandler
    }

    getMusicClient(): Music {
        const musicModule = this.mainModule.allModules.musiscModule
        const musicClient = musicModule.musicModuleProviders.musicClient

        return musicClient
    }

    getMusicEventEmitter(): MusicEventEmitter {
        return this.mainModule.allModules.musiscModule.musicModuleProviders.musicEventEmitter
    }
}

const bot = new Main()

const discordClient = bot.getDiscordClient()
const embedHandler = bot.getEmbedHandler()
const musicClient = bot.getMusicClient()
const musicEventEmitter = bot.getMusicEventEmitter()

export {
    discordClient,
    embedHandler,
    musicClient,
    musicEventEmitter,
}