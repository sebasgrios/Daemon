// @ts-ignore
import Youtube from 'simple-youtube-api';
import providers from '../../../providers/bot-config.provider';

export default class YoutubeModule {
    private readonly youtube: Youtube
    constructor() {
        this.youtube = new Youtube(providers.BotConfigProvider.youtubeConfig.apiKey)
    }

    get client() {
        return {
            youtube: this.youtube
        }
    }
}