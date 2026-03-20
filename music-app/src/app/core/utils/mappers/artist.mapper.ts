import { ApiArtistShort } from '../../../models/api-artists-interface';
import { Artist } from '../../../models/api-artists-interface';
import { ArtistResponse } from '../../../models/api-artist-page-interface';
import { ArtistProfile } from '../../../models/api-artist-page-interface';
import { getBest } from '../helpers/get-best-resolution';

export function transformToArtist(data: ApiArtistShort): Artist {
  const bestCover = getBest(data.image);

  return {
    id: data.id,
    name: data.name,
    role: data.role,
    image: bestCover.url,
  };
}

export function artistByIdMapper(data: ArtistResponse): ArtistProfile {
  const apiData = data.data;
  const bestImg = getBest(apiData.image);

  return {
    id: apiData.id,
    name: apiData.name,
    image: bestImg?.url,
    fanCount: apiData.fanCount,
    twitter: apiData.twitter,

    topSongs: apiData.topSongs.map((song) => ({
      id: song.id,
      title: song.name,
      artist: song.artists.primary[0].name ?? 'Unknown artist',
      artistId: song.artists.primary[0].id,
      album: song.album.id ?? '',
      duration: Number(song.duration),
      coverUrl: getBest(song?.image)?.url ?? '',
      audioUrl: getBest(song.downloadUrl).url,
    })),

    topAlbums: apiData.topAlbums.map((album) => ({
      id: album.id,
      name: album.name,
      year: album.year,
      image: getBest(album.image).url || '',
    })),

    similarArtists: (apiData.similarArtists || []).map((artist) => ({
      id: artist.id || '',
      name: artist.name || 'Unknown artist',
      image: getBest(artist?.image).url || '',
    })),
  };
}
