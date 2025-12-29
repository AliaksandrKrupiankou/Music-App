import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Track } from '../../models/app-interface';
import { map, Observable } from 'rxjs';
import { ApiSearchResponse, ApiSong } from '../../models/api-interface';
import { ApiArtistSearchResponse, ApiArtistShort, Artist } from '../../models/api-artists-interface';

@Injectable({
  providedIn: 'root',
})
export class SearchSongService {
  songs = signal<Track[]>([]);
  loading = signal(false);
  error = signal<unknown>(null);
  

  http = inject(HttpClient);

  url = 'https://music-app-api-two.vercel.app/api/search/';

  searchSongs(query: string): Observable<Track[]>{

    const params = {
      query: query,
      page: 0,
      limit: 10,
    }

    return this.http.get<ApiSearchResponse>(`${this.url}songs`, { params }).pipe(
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

    return this.http.get<ApiArtistSearchResponse>(`${this.url}artists`, { params }).pipe(
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

}
