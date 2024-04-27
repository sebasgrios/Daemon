// @ts-ignore
import YoutubeModule from '../apis/youtube/youtube.module';

export default class MusicProviders {
    private readonly youtube: YoutubeModule
    constructor() {
        this.youtube = new YoutubeModule()
    }

    get musicProviders() {
        return {
            youtube: this.youtube.client
        }
    }

    
}