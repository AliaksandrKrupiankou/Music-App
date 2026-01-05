import { HttpClient, HttpHandler } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Album, Track } from '../../models/app-interface';
import { map, Observable, tap } from 'rxjs';
import { ApiAlbumFull, ApiAlbumResponse, ApiSearchResponse, ApiSong } from '../../models/api-interface';
import { ApiArtistSearchResponse, ApiArtistShort, Artist } from '../../models/api-artists-interface';
import { ArtistProfile, ArtistResponse } from '../../models/api-artist-page-interface';

@Injectable({
  providedIn: 'root',
})
export class SearchSongService {
  songs = signal<Track[]>([]);
  loading = signal(false);
  error = signal<unknown>(null);
  

  http = inject(HttpClient);

  url = 'https://music-app-api-two.vercel.app/api/';

  searchSongs(query: string): Observable<Track[]>{

    const params = {
      query: query,
      page: 0,
      limit: 10,
    }

    return this.http.get<ApiSearchResponse>(`${this.url}search/songs`, { params }).pipe(
      map((response) => {
        const songs = response.data?.results || [];
        return songs.map(track => this.trasformToTrack(track));
      })
    )
  }

  trasformToTrack(data: ApiSong): Track{
    const bestCover = data.image[data.image.length - 1];
    const bestSound = data.downloadUrl[data.downloadUrl.length - 1];
    const numberDuration = Number(data.duration);
    return {
      id: data.id,
      title: data.name,
      artist: data.artists.primary[0]?.name || 'Unknown',
      artistId: data.artists.primary[0].id,
      album: data.album.name || '',
      duration: numberDuration,
      audioUrl: bestSound.url,
      coverUrl: bestCover.url,
    }
  }


  searchArtists(query: string){

    const params = {
      query: query,
      page: 0,
      limit: 10,
      language: 'english',
    };

    return this.http.get<ApiArtistSearchResponse>(`${this.url}search/artists`, { params }).pipe(
      map((response) => {
        const artists = response.data?.results || [];
        return artists.map(artist => this.transformToArtist(artist));
      })

    )
  }

  transformToArtist(data: ApiArtistShort): Artist{
    const bestCover = data.image[data.image.length - 1];
    return{
      id: data.id,
      name: data.name,
      role: data.role,
      image: bestCover.url,
    }
  }


  getArtistById(id: string){

    const params = {
      page: 0,
      songCount: 5,
      albumCount: 10,
      sortBy: 'popularity',
      sortOrder: 'desc',
    };

    return this.http.get<ArtistResponse>(`${this.url}artists/${id}`, { params }).pipe(
      tap(response => console.log('API Response:', response)),
      map((response) => {
        return this.artistByIdMapper(response);
      })
    )
  }

  artistByIdMapper(data: ArtistResponse): ArtistProfile{
    const apiData = data.data;
    const bestImg = apiData.image[apiData.image.length - 1]

    return {
      id: apiData.id,
      name: apiData.name,
      image: bestImg.url,
      fanCount: apiData.fanCount,

      topSongs: apiData.topSongs.map(song => ({
        id: song.id,
        title: song.name,
        artist: song.artists.primary[0].name ?? 'Unknown artist',
        artistId: song.artists.primary[0].id,
        album: song.album.id ?? '',
        duration: Number(song.duration),
        coverUrl: song.image?.[song.image.length - 1]?.url ?? '',
        audioUrl: song.downloadUrl[song.downloadUrl.length - 1].url,
      })),

      topAlbums: apiData.topAlbums.map(album => ({
        id: album.id,
        name: album.name,
        year: album.year,
        image: album.image[album.image.length - 1].url || ''
      })),

      similarArtists: (apiData.similarArtists || []).map(artist => ({
        id: artist.id || '',
        name: artist.name || 'Unknown artist',
        image: artist.image?.[artist.image?.length - 1].url || '',
      }))
    }
  }

  getAlbumById(id: string){

    const params = {
      id: id
    }

    return this.http.get<ApiAlbumResponse>(`${this.url}albums`, { params }).pipe(
      map((response) => {
        return this.albumByIdMapper(response);
      }
      )
    )

  }

  albumByIdMapper(response: ApiAlbumResponse): Album{
    const data = response.data;
    const bestCover = data.image[data.image.length - 1].url; 
    return{
      id: data.id,
      name: data.name,
      description: data.description,
      year: data.year,
      coverUrl: bestCover,
      artistName: data.artists.primary[0].name,
      artistId: data.artists.primary[0].id,
      tracks: data.songs.map(song => this.trasformToTrack(song))
    }
  }
}
