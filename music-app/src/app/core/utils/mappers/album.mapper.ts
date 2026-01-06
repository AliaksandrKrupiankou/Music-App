import { ApiAlbumResponse } from '../../../models/api-interface';
import { Album } from '../../../models/app-interface';
import { transformToTrack } from './track.mapper';

export function albumByIdMapper(response: ApiAlbumResponse): Album {
  const data = response.data;
  const bestCover = data.image[data.image.length - 1].url;
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    year: data.year,
    coverUrl: bestCover,
    artistName: data.artists.primary[0].name,
    artistId: data.artists.primary[0].id,
    tracks: data.songs.map((song) => transformToTrack(song)),
  };
}
