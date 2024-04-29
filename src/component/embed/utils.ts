import { Thumbnail } from "../../music/interfaces/song-results.interface";

export const getDurationSong = (duration: number): string => {
    const minutes = Math.floor(duration / 60).toLocaleString('es-ES', {
        minimumIntegerDigits: 2
    });
    const seconds = (duration % 60).toLocaleString('es-ES', {
        minimumIntegerDigits: 2
    });

    return `${minutes}:${seconds}`;
};

export const getBestImage = (thumbnails: Thumbnail[]): string => {
    let bestWidth = 0;
    let bestHeight = 0;
    let bestThumbnail = thumbnails[0];

    thumbnails.forEach((thumbnail) => {
        if (thumbnail.width > bestWidth && thumbnail.height > bestHeight) {
            bestWidth = thumbnail.width;
            bestHeight = thumbnail.height;
            bestThumbnail = thumbnail;
        }
    });

    return bestThumbnail.url;
};