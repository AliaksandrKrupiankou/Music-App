import { effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { Track } from '../../../models/app-interface';
import { LocalStorageService } from '../data-services/local-storage-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AudioEngineService } from './audio-engine.service';
import { ProgressBarService } from '../../Player/progress-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  engine = inject(AudioEngineService);
  progressService = inject(ProgressBarService);
  localStorageService = inject(LocalStorageService);

  currentTrack = signal<Track | null>(null);
  currentVolume = signal<number>(0.5);
  isFullScreen = signal<boolean>(false);
  isPlaying = signal<boolean>(false);
  currentPlaylist = signal<Track[]>([]);

  currentIndex = linkedSignal({
    source: () => ({ track: this.currentTrack(), playlist: this.currentPlaylist() }),
    computation: ({ track, playlist }) =>
      track ? playlist.findIndex((itm) => itm.id === track.id) : -1,
  });

  constructor() {
    const prvUsngTrack = this.localStorageService.get('lastTrack') as Track;
    const prvUsngVol = this.localStorageService.get('volume');

    effect(() => {
      this.currentTrack();
      this.progressService.reset();
    });

    if (prvUsngTrack && prvUsngVol) {
      this.currentTrack.set(prvUsngTrack);
      this.currentVolume.set(prvUsngVol);
    }

    effect(() => {
      const track = this.currentTrack();
      if (track) {
        this.localStorageService.set('lastTrack', this.currentTrack());
      }
    });

    effect(() => {
      const volume = this.currentVolume();

      if (volume !== undefined) {
        this.engine.setVolume(volume);
        this.localStorageService.set('volume', this.currentVolume());
      }
    });

    this.engine.onEnded.pipe(takeUntilDestroyed()).subscribe(() => {
      this.playNextTrack();
    });
  }

  playTrack(track: Track) {
    this.currentTrack.set(track);
    this.engine.setTrack(this.currentTrack()?.audioUrl!);
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
    this.currentPlaylist.set(playlist);
    this.playTrack(playlist[0]);
  }

  changeVolume(value: string) {
    this.currentVolume.set(Number(value));
  }

  playNextTrack() {
    const cIndx = this.currentIndex();
    console.log(cIndx);
    if (cIndx !== null && cIndx >= 0 && cIndx < this.currentPlaylist().length - 1) {
      this.playTrack(this.currentPlaylist()[cIndx + 1]);
    } else {
      this.stop(); // add logic of recomendation tracks
    }
  }

  playPastTrack() {
    const cIndx = this.currentIndex();
    console.log(cIndx);
    if (cIndx === 0 || cIndx === -1) {
      this.progressService.onChange(0);
    } else {
      this.playTrack(this.currentPlaylist()[cIndx - 1]);
    }
  }

  stop() {
    this.engine.pause();
    this.isPlaying.set(false);
    this.progressService.stop();
  }

  toggle(track: Track) {
    if (this.isPlaying() === true && track.id === this.currentTrack()?.id) {
      this.stop();
    } else {
      this.playTrack(track);
    }
  }

  toggleVolume() {
    if (this.currentVolume() !== 0) {
      this.currentVolume.set(0);
    } else {
      this.currentVolume.set(this.localStorageService.get('volume'));
    }
  }
}
