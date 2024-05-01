import YoutubeModule from '../apis/youtube/youtube.module';

export default class MusicProviders {
    private static _instance: MusicProviders;
    private readonly youtube: YoutubeModule;

    private constructor() {
        this.youtube = new YoutubeModule();
    }

    static get musicProviders(): MusicProviders {
        //Check if musicProviers is instantiated
        if (!MusicProviders._instance) {
            MusicProviders._instance = new MusicProviders();
        }
        return MusicProviders._instance;
    }

    getProviders() {
        return {
            youtube: this.youtube
        };
    }
}
