import { Injectable, signal } from '@angular/core';
import { Track } from '../../models/app-interface';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  currentTrack = signal<Track | null>(null);
  isPlaying = signal<boolean>(false);

  player = new Audio();

  playTrack(track: Track){
    if(this.currentTrack()?.id !== track.id){
      this.player.src = track.audioUrl;
      this.currentTrack.set(track);
    }
    this.player.play()
    .then(() => this.isPlaying.set(true))
    .catch(err => console.log(`Error: ${err}`));
  }

  stop(){
    this.player.pause();
    this.isPlaying.set(false);
  }

  toggle(track: Track){
    if(this.isPlaying() === true && track.id === this.currentTrack()?.id){
      this.stop();
    } else{
      this.playTrack(track);
    }
  }
}
