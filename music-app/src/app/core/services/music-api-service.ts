import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiAlbumResponse, ApiSearchResponse } from '../../models/api-interface';
import { ApiArtistSearchResponse } from '../../models/api-artists-interface';
import { ArtistResponse } from '../../models/api-artist-page-interface';
import { API } from '../utils/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class MusicApiService {
  private http = inject(HttpClient);

  searchSongs(params: any) {
    return this.http.get<ApiSearchResponse>(`${API.URL}${API.SEARCH}${API.SONGS}`, { params });
  }

  searchArtists(params: any) {
    return this.http.get<ApiArtistSearchResponse>(`${API.URL}${API.SEARCH}${API.ARTISTS}`, {
      params,
    });
  }

  getArtistById(id: string, params: any) {
    return this.http.get<ArtistResponse>(`${API.URL}${API.ARTISTS}/${id}`, { params });
  }

  getAlbumById(params: any) {
    return this.http.get<ApiAlbumResponse>(`${API.URL}${API.ALBUMS}`, { params });
  }
}
