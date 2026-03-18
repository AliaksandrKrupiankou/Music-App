import { afterNextRender, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { EMPTY, fromEvent, Observable, Subject } from 'rxjs';
import { LocalStorageService } from '../data-services/local-storage-service';
import { Track } from '../../../models/app-interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AudioEngineService {
  platformId = inject(PLATFORM_ID);
  player: HTMLAudioElement | null = null;

  onEnded = new Subject<Event>();
  onTimeUpdate = new Subject<Event>();

  constructor() {
    afterNextRender(() => {
      this.player = new Audio();
      this.player.crossOrigin = 'anonymous';

      fromEvent(this.player, 'ended')
      .pipe(takeUntilDestroyed())
      .subscribe((e) => this.onEnded.next(e));

      fromEvent(this.player, 'timeupdate')
      .pipe(takeUntilDestroyed())
      .subscribe((e) => this.onTimeUpdate.next(e));
    });
  }

  setVolume(volume: number) {
    if (this.player) {
      return (this.player.volume = volume);
    }
    return null;
  }

  setTrack(url: string) {
    if ((this.player !== null && this.player.src.includes(url) && url !== '') || !this.player) {
      return;
    }
    this.player.src = url;
  }

  play() {
    if (this.player !== null) {
      return this.player.play();
    } else {
      return Promise.resolve();
    }
  }

  pause() {
    if (this.player) {
      this.player.pause();
    }
  }

  seek(time: number) {
    if (this.player) {
      this.player.currentTime = time;
    }
  }

  get currentTime(): number {
    return this.player ? this.player.currentTime : 0;
  }
}
