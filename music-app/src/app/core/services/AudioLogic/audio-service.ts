import { effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { Track } from '../../../models/app-interface';
import { LocalStorageService } from '../data-services/local-storage-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AudioEngineService } from './audio-engine.service';
import { ProgressBarService } from '../../Player/progress-bar.service';
import { QueueLogicService } from '../../Player/queue-logic.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  engine = inject(AudioEngineService);
  progressService = inject(ProgressBarService);
  localStorageService = inject(LocalStorageService);
  playlistService = inject(QueueLogicService);

  currentTrack = signal<Track | null>(null);
  currentVolume = signal<number>(0.5);
  isPlaying = signal<boolean>(false);

  constructor() {
    const prvUsngTrack = this.localStorageService.get('lastTrack') as Track;
    const prvUsngVol = this.localStorageService.get('volume');

    effect(() => {
      this.currentTrack();
      this.progressService.reset(); ////////////////////
    });

    if (prvUsngTrack && prvUsngVol) {
      this.currentTrack.set(prvUsngTrack);
      this.currentVolume.set(prvUsngVol);
    }

    this.engine.onEnded.pipe(takeUntilDestroyed()).subscribe(() => {
      this.playNextTrack();
    });
  }

  playTrack(track: Track) {
    this.currentTrack.set(track);
    this.playlistService.currentTrackId.set(track.id);
    this.localStorageService.set('lastTrack', track);
    this.engine.setTrack(track.audioUrl);
    this.engine
      .play()
      .then(() => {
        this.isPlaying.set(true);
        this.progressService.start();
      })
      .catch(() => {
        this.isPlaying.set(false);
        this.progressService.stop();
      });
  }

  playFirstTrack(playlist: Track[]) {
    this.playlistService.updateQueue(playlist);
    this.playTrack(playlist[0]);
  }

  changeVolume(value: string) {
    this.currentVolume.set(Number(value));
    this.localStorageService.set('volume', Number(value));
  }

  playNextTrack() {
    const next = this.playlistService.getNextTrack();
    if (next) {
      this.playTrack(next);
    } else {
      this.stop(); // add logic of recomendation tracks
    }
  }

  playPastTrack() {
    const prev = this.playlistService.getPreviousTrack();
    if (prev) {
      this.playTrack(prev);
    } else {
      this.progressService.onChange(0);
    }
  }

  stop() {
    this.engine.pause();
    this.isPlaying.set(false);
    this.progressService.stop();
  }

  toggle(track: Track) {
    if (this.isPlaying() && track.id === this.currentTrack()?.id) {
      this.stop();
    } else {
      this.playTrack(track);
    }
  }

  toggleVolume() {
    if (this.currentVolume() !== 0) {
      this.localStorageService.set('volume', this.currentVolume());
      this.currentVolume.set(0);
    } else {
      this.currentVolume.set(this.localStorageService.get('volume'));
    }
  }
}
