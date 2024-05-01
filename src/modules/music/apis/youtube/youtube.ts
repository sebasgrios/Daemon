import MusicProviders from '../../providers/music-providers';
import ytdl from 'ytdl-core';
import YoutubeUrlFactory from './url-factory';
import YoutubeModule from './youtube.module';
import { ErrorHandler } from '../../../../shared/error.handler';

export enum SearchElements {
    query = 'query',
    url = 'url'
};

export default class YoutubeHandler {
    private musicProviders: MusicProviders
    private validUrl!: string

    constructor () {
        this.musicProviders = MusicProviders.musicProviders
    }

    async search(query: string) {
        try {
            const youtube: YoutubeModule = this.musicProviders.getProviders().youtube
            const searchString = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/i.test(query) ? query : `ytsearch:${query}`
            const isURL = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/i.test(searchString)

            const videos = await youtube.getVideos(searchString)
            
            if (!videos || !videos.length) {
                new ErrorHandler('🎬 ', 'YOUTUBE-HANDLER', `No results found for ${query}`);
                return null;
            }

            const firstVideo = videos[0]; // First video found 
            const videoId = firstVideo?.id?.videoId; //Id for first video found

            if (!videoId) {
                new ErrorHandler('🎬 ', 'YOUTUBE-HANDLER', `No valid video ID found for ${query}`);
                return null;
            }
            
            if (!isURL) {
                const urlFactory = new YoutubeUrlFactory(videoId)
                this.validUrl= urlFactory.getUrl()
            }

            const basicInfo = await ytdl.getBasicInfo((isURL) ? searchString : this.validUrl)

            const song = {
                found_by: SearchElements.url,
                url: basicInfo.videoDetails.video_url,
                title: basicInfo.videoDetails.title,
                thumbnail: basicInfo.videoDetails.thumbnails,
                duration: basicInfo.videoDetails.lengthSeconds,
            }

            return song;
        
        } catch (error) {
            new ErrorHandler('🎬 ', 'YOUTUBE-HANDLER', error)
            return null;
        }
    }
    
}
