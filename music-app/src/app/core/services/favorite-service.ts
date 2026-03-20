import { inject, Injectable } from '@angular/core';
import { Track } from '../../models/app-interface';
import { DbService } from './data-services/db-service';
import { AuthService } from './auth-service';
import { Observable, of, switchMap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  dbService = inject(DbService);
  localStorageKey = 'likedSongs';
  auth = inject(AuthService);

  likedTracks = rxResource<Track[], string | undefined>({
    params: () => this.auth.user()?.uid,
    stream: ({ params: id }) => {
      if (id) {
        return this.dbService.getFavoriteSongs(id);
      } else {
        return of([]);
      }
    },
  });

  addToLiked(track: Track) {
    this.dbService.addSongToFavorite(this.auth.user()?.uid!, track);
  }

  isLiked(track: Track | null) {
    if (
      this.likedTracks !== null &&
      track !== null &&
      this.likedTracks.value()?.some((t) => t.id === track.id)
    ) {
      return true;
    } else {
      return false;
    }
  }

  removeFromLiked(track: Track) {
    this.dbService.removeLike(this.auth.user()?.uid!, track.id);
  }

  toggleLike(track: Track | null) {
    if (track === null) {
      return false;
    } else if (this.isLiked(track)) {
      this.removeFromLiked(track);
      return false;
    } else {
      this.addToLiked(track);
      return true;
    }
  }
}
