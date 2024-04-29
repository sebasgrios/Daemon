import MusicProviders from '../../providers/music-providers';
import ytdl from 'ytdl-core';
import { ErrorHandler } from '../../../shared/error.handler';
import YoutubeUrlFactory from './url-factory';

export enum SearchElements {
    query = 'query',
    url = 'url'
};

export default class YoutubeHandler {
    private musicProviders: MusicProviders
    private validUrl!: string

    constructor () {
        this.musicProviders = new MusicProviders()
    }

    async search(query: string) {
        try {
            const youtube = this.musicProviders.musicProviders.youtube.youtube
            const searchString = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/i.test(query) ? query : `ytsearch:${query}`
            const isURL = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/i.test(searchString)

            const videos = await youtube.searchVideos(searchString, 1)

            console.log('IS URL', isURL)
            console.log('SEARCH STRING', searchString)
            console.log('VIDEOS', videos)
            
            if (!videos) {
                new ErrorHandler('🎬 ', 'YOUTUBE-HANDLER', `No results found for ${query}`)
                return null
            }
            if (!isURL) {
                const urlFactory = new YoutubeUrlFactory(videos[0].id)
                this.validUrl= urlFactory.getUrl()
            }


            const basicInfo = await ytdl.getBasicInfo((isURL) ? searchString : this.validUrl)

            const song = {
                found_by: SearchElements.url,
                url: basicInfo.videoDetails.video_url,
                title: basicInfo.videoDetails.title,
                thumbnail: basicInfo.videoDetails.thumbnail,
                duration: basicInfo.videoDetails.lengthSeconds,
            }

            return song;
        
        } catch (error) {
            new ErrorHandler('🎬 ', 'YOUTUBE-HANDLER', error)
            return null;
        }
    }
    
    
}
