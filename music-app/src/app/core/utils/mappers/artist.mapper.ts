import { ApiArtistShort } from '../../../models/api-artists-interface';
import { Artist } from '../../../models/api-artists-interface';
import { ArtistResponse } from '../../../models/api-artist-page-interface';
import { ArtistProfile } from '../../../models/api-artist-page-interface';

export function transformToArtist(data: ApiArtistShort): Artist {
  const bestCover = data.image[data.image.length - 1];
  return {
    id: data.id,
    name: data.name,
    role: data.role,
    image: bestCover.url,
  };
}

export function artistByIdMapper(data: ArtistResponse): ArtistProfile {
  const apiData = data.data;
  const bestImg = apiData.image[apiData.image.length - 1];

  return {
    id: apiData.id,
    name: apiData.name,
    image: bestImg.url,
    fanCount: apiData.fanCount,

    topSongs: apiData.topSongs.map((song) => ({
      id: song.id,
      title: song.name,
      artist: song.artists.primary[0].name ?? 'Unknown artist',
      artistId: song.artists.primary[0].id,
      album: song.album.id ?? '',
      duration: Number(song.duration),
      coverUrl: song.image?.[song.image.length - 1]?.url ?? '',
      audioUrl: song.downloadUrl[song.downloadUrl.length - 1].url,
    })),

    topAlbums: apiData.topAlbums.map((album) => ({
      id: album.id,
      name: album.name,
      year: album.year,
      image: album.image[album.image.length - 1].url || '',
    })),

    similarArtists: (apiData.similarArtists || []).map((artist) => ({
      id: artist.id || '',
      name: artist.name || 'Unknown artist',
      image: artist.image?.[artist.image?.length - 1].url || '',
    })),
  };
}
