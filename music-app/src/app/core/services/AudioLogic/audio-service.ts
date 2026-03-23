import { effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { Track } from '../../../models/app-interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AudioEngineService } from './audio-engine.service';
import { ProgressBarService } from '../../Player/progress-bar.service';
import { QueueStore } from '../../store/queue.store';
import { AudioStore } from '../../store/audio.store';
//////////////////// PROGRESS SERVICE RESET В ЭФФЕКТЕ
@Injectable({
  providedIn: 'root',
})
export class AudioService {
  engine = inject(AudioEngineService);
  progressService = inject(ProgressBarService);

  queueStore = inject(QueueStore);
  audioStore = inject(AudioStore);

  currentTrack = this.queueStore.currentTrack;
  currentVolume = this.audioStore.volume;
  isPlaying = this.audioStore.isPlaying;

  constructor() {
    effect(() => {
      this.currentTrack();
      this.progressService.reset();
    });

    this.engine.onEnded.pipe(takeUntilDestroyed()).subscribe(() => {
      this.playNextTrack();
    });
  }

  playTrack(track: Track) {
    this.queueStore.setTrackId(track.id);
    this.engine.setTrack(track.audioUrl);
    this.engine
      .play()
      .then(() => {
        this.audioStore.setPlaying(true);
        this.progressService.start();
      })
      .catch(() => {
        this.audioStore.setPlaying(false);
        this.progressService.stop();
      });
  }

  playFirstTrack(playlist: Track[]) {
    this.queueStore.setQueue(playlist);
    this.playTrack(playlist[0]);
  }

  playNextTrack() {
    const next = this.queueStore.getNextTrack();
    if (next) {
      this.playTrack(next);
    } else {
      this.stop(); // add logic of recomendation tracks
    }
  }

  playPastTrack() {
    const prev = this.queueStore.getPreviousTrack();
    if (prev) {
      this.playTrack(prev);
    } else {
      this.progressService.onChange(0);
    }
  }

  stop() {
    this.engine.pause();
    this.audioStore.setPlaying(false);
    this.progressService.stop();
  }

  toggle(track: Track) {
    if (this.isPlaying() && track.id === this.currentTrack()?.id) {
      this.stop();
    } else {
      this.playTrack(track);
    }
  }
}
