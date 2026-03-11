import { inject, Injectable } from '@angular/core';
import { Track } from '../../models/app-interface';
import { DbService } from './data-services/db-service';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from './auth-service';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  dbService = inject(DbService);
  localStorageKey = 'likedSongs';
  auth = inject(AuthService);

  likedTracks = rxResource({
    request: () => this.auth.user()?.uid,
    loader: ({ request: id }) => {
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
