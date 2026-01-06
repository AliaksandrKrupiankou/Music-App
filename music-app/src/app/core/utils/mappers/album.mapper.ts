import { ApiAlbumResponse } from '../../../models/api-interface';
import { Album } from '../../../models/app-interface';
import { transformToTrack } from './track.mapper';
import { getBest } from '../helpers/get-best-resolution';

export function albumByIdMapper(response: ApiAlbumResponse): Album {
  const data = response.data;
  const bestCover = getBest(data.image);

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    year: data.year,
    coverUrl: bestCover.url,
    artistName: data.artists.primary[0].name,
    artistId: data.artists.primary[0].id,
    tracks: data.songs.map((song) => transformToTrack(song)),
  };
}
