import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Album, Track } from '../../../models/app-interface';
import { MusicApiService } from './music-api-service';
import { transformToTrack } from '../../utils/mappers/track.mapper';
import { Artist } from '../../../models/api-artists-interface';
import { artistByIdMapper, transformToArtist } from '../../utils/mappers/artist.mapper';
import { ArtistProfile } from '../../../models/api-artist-page-interface';
import { albumByIdMapper } from '../../utils/mappers/album.mapper';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  private api = inject(MusicApiService);

  searchTracks(query: string): Observable<Track[]> {
    const params = { query, limit: 10, page: 0 };

    return this.api.searchSongs(params).pipe(
      map((response) => {
        const songs = response.data?.results || [];
        return songs.map((track) => transformToTrack(track));
      })
    );
  }

  searchArtists(query: string): Observable<Artist[]> {
    const params = { query: query, page: 0, limit: 10, language: 'english' };

    return this.api.searchArtists(params).pipe(
      map((response) => {
        const artists = response.data?.results || [];
        return artists.map((artist) => transformToArtist(artist));
      })
    );
  }

  getArtistById(id: string): Observable<ArtistProfile> {
    const params = {
      page: 0,
      songCount: 5,
      albumCount: 10,
      sortBy: 'popularity',
      sortOrder: 'desc',
    };

    return this.api.getArtistById(id, params).pipe(
      map((response) => {
        return artistByIdMapper(response);
      })
    );
  }

  getAlbumById(id: string): Observable<Album> {
    const params = {
      id: id,
    };

    return this.api.getAlbumById(params).pipe(
      map((response) => {
        return albumByIdMapper(response);
      })
    );
  }
}
