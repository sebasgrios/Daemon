// @ts-ignore
import { ErrorHandler } from '../../../../shared/error.handler';
import { youtube_v3, google } from 'googleapis';
import providers from '../../../bot/providers/bot-config.provider';

export default class YoutubeModule {
    public youtube: youtube_v3.Youtube;

    constructor() {
        this.youtube = google.youtube({
            version: 'v3',
            auth: providers.BotConfigProvider.youtubeConfig.apiKey
        });
    }

    get client() {
        return {
            youtube: this.youtube
        }
    }

    async getVideos(query: string) {
        try {
            const videos = await this.youtube.search.list({
                q: query,
                maxResults: 3,
                part: ['snippet'],
                regionCode: 'es',
            });

            return videos.data.items;
        } catch (error) {
            new ErrorHandler('', 'YOUTUBE-MODULE', error)
        }
    }    
}