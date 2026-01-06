import { ApiSong } from '../../../models/api-interface';
import { Track } from '../../../models/app-interface';
import { getBest } from '../helpers/get-best-resolution';

export function transformToTrack(data: ApiSong): Track {
  const bestCover = getBest(data.image);
  const bestSound = getBest(data.downloadUrl);
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
