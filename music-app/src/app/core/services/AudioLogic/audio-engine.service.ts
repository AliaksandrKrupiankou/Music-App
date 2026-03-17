import { inject, Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { LocalStorageService } from '../data-services/local-storage-service';
import { Track } from '../../../models/app-interface';

@Injectable({
  providedIn: 'root',
})
export class AudioEngineService {
  player = new Audio();

  onEnded = fromEvent(this.player, 'ended');
  onTimeUpdate = fromEvent(this.player, 'timeupdate');

  constructor() {
    this.player.crossOrigin = 'anonymous';
  }

  setVolume(volume: number) {
    this.player.volume = volume;
  }

  setTrack(url: string) {
    if (this.player.src.includes(url) && url !== '') {
      return;
    }

    this.player.src = url;
  }

  play() {
    return this.player.play();
  }

  pause() {
    this.player.pause();
  }

  seek(time: number) {
    this.player.currentTime = time;
  }

  get currentTime(): number {
    return this.player.currentTime;
  }
}
