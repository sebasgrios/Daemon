import BotModule from "./bot/bot.module";
import MusicModule from "./music/music.module";

export default class MainModule {

    private readonly botModule: BotModule
    private readonly musicModule: MusicModule

    constructor () {
        this.botModule = new BotModule()
        this.musicModule = new MusicModule(
            this.botModule.botModuleProviders.discordClient
        )
    }

    get allModules () {
        return {
            botModule: this.botModule,
            musiscModule: this.musicModule
        }
    }
}