import { Injectable, signal } from '@angular/core';
import { Track } from '../../models/app-interface';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  currentTrack = signal<Track | null>(null);
  isPlaying = signal<boolean>(false);
  currentPlaylist = signal<Track[]>([]);
  currentIndex = signal<number | null>(null);
  currentTime = signal<number>(0)
  player = new Audio();

  constructor(){

      fromEvent(this.player, 'ended').subscribe(() => {
        this.playNextTrack();
      })

      fromEvent(this.player, 'timeupdate').subscribe(() => {
        this.currentTime.set(this.player.currentTime);
      })
  }
  
  playTrack(track: Track){
    if(this.currentTrack()?.id !== track.id){
      this.currentTime.set(0);
      this.player.src = track.audioUrl;
      this.currentTrack.set(track);
    }

    this.player.play()
    .then(() => this.isPlaying.set(true))
    .catch(err => {
      this.isPlaying.set(false)
      console.log(`Error: ${err}`)
    }
    );
  }

  changeVolume(value: string){

    this.player.volume = Number(value);
  }


  playNextTrack(){
    if(this.currentIndex() === this.currentPlaylist().length - 1){
      this.stop();
    } else {
          this.currentTime.set(0);
          this.playTrack(this.currentPlaylist()[this.currentIndex()! + 1]);
          this.currentIndex.set(this.currentIndex()! + 1);

        }
  }


  seekTo(newTime: number){
    this.currentTime.set(newTime);
    this.player.currentTime = newTime;
  }

  playPastTrack(){
    this.currentTime.set(0);
    if(this.currentIndex() === 0){
      this.player.currentTime = 0;
      this.playTrack(this.currentTrack()!);
    } else {
      this.playTrack(this.currentPlaylist()[this.currentIndex()! - 1]);
      this.currentIndex.set(this.currentIndex()! - 1);
    }
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
