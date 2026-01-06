import { ApiSong } from '../../../models/api-interface';
import { Track } from '../../../models/app-interface';

export function transformToTrack(data: ApiSong): Track {
  const bestCover = data.image[data.image.length - 1];
  const bestSound = data.downloadUrl[data.downloadUrl.length - 1];
  const numberDuration = Number(data.duration);

  return {
    id: data.id,
    title: data.name,
    artist: data.artists.primary[0]?.name || 'Unknown',
    artistId: data.artists.primary[0]?.id,
    album: data.album.name || '',
    duration: numberDuration,
    audioUrl: bestSound.url,
    coverUrl: bestCover.url,
  };
}
