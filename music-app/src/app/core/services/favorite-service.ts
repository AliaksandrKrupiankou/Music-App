import { Injectable, signal } from '@angular/core';
import { Track } from '../../models/app-interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  likedTracks = signal<Track[]>([]);
  
  addToLiked(track: Track){
    this.likedTracks.update(() => [...this.likedTracks(), track]);
  }

  isLiked(track: Track){
    if(this.likedTracks().includes(track)){
      return true;
    } else{
      return false;
    }
  }

  toggleLike(){
    
  }
}
