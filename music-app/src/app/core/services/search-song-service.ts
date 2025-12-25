import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Track } from '../../models/app-interface';
import { map, Observable } from 'rxjs';
import { ApiSearchResponse, ApiSong } from '../../models/api-interface';

@Injectable({
  providedIn: 'root',
})
export class SearchSongService {
  songs = signal<Track[]>([]);
  loading = signal(false);
  error = signal<unknown>(null);

  http = inject(HttpClient);

  url = 'https://saavn.sumit.co/api/search/songs';

  searchSongs(query: string): Observable<Track[]>{

    const params = {
      query: query,
      page: 0,
      limit: 10,
    }

    return this.http.get<ApiSearchResponse>(this.url, { params }).pipe(
      map((response) => {
        const songs = response.data?.results || [];
        return songs.map(track => this.trasforToTrack(track));
      })
    )
  }

  trasforToTrack(data: ApiSong): Track{
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

}
