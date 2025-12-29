import { inject, Injectable, signal } from '@angular/core';
import { Track } from '../../models/app-interface';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  localStorageService = inject(LocalStorageService);
  localStorageKey = 'likedSongs';
  
  likedTracks = signal<Track[]>(this.localStorageService.get(this.localStorageKey) !== null ? this.localStorageService.get(this.localStorageKey) : []);

  

  addToLiked(track: Track){
    this.likedTracks.update(() => [track, ...this.likedTracks()]);
    this.localStorageService.set(this.localStorageKey, this.likedTracks());
  }

  isLiked(track: Track | null){
    if(this.likedTracks() !== null &&  track !== null && this.likedTracks().some(t => t.id === track.id )){
      return true;
    } else{
      return false;
    }
  }

  removeFromLiked(track: Track){
    this.likedTracks.update(() => [...this.likedTracks().filter(song => song.id !== track.id)]);
    this.localStorageService.set(this.localStorageKey, this.likedTracks());
  }

  toggleLike(track: Track | null){
    if(track === null){
      return false;
    } else if(this.isLiked(track)){
      this.removeFromLiked(track);
      return false;
    } else {
      this.addToLiked(track);
      return true;
    }
  }
}
