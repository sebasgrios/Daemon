import MusicProviders from '../../providers/music-providers';
import ytdl from 'ytdl-core';
import { ErrorHandler } from '../../../shared/error.handler';

export enum SearchElements {
    query = 'query',
    url = 'url'
};

export default class YoutubeHandler {
    private musicProviders: MusicProviders
    constructor () {
        this.musicProviders = new MusicProviders()
    }

    async search(query: string) {
        try {
            // URL CASES
            const youtube = this.musicProviders.musicProviders.youtube.youtube;
            const searchString = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/i.test(query) ? query : `ytsearch:${query}`;

            const videos = await youtube.searchVideos(searchString, 1);

            if (!videos) {
                //TOD@ no resultados en youtube por URL
                //TOD@ search for string
                new ErrorHandler('🎬 ', 'YOUTUBE-HANDLER', 'No results found for url search')
                return null
            }

            const basicInfo = await ytdl.getBasicInfo(searchString)

            const song = {
                found_by: SearchElements.url,
                url: basicInfo.videoDetails.video_url,
                title: basicInfo.videoDetails.title,
                thumbnail: basicInfo.videoDetails.thumbnail,
                duration: basicInfo.videoDetails.lengthSeconds,
            };

            return song;
        
        } catch (error) {
            new ErrorHandler('🎬 ', 'YOUTUBE-HANDLER', error)
            return null;
        }
    }
    
    
}
