import { effect, inject, Injectable, linkedSignal, NgZone, signal } from '@angular/core';
import { PlayingStrategy, Track } from '../../../models/app-interface';
import { LocalStorageService } from '../data-services/local-storage-service';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ImageColorServiceService } from '../image-color-service.service';
import { AudioEngineService } from './audio-engine.service';
import { ProgressBarService } from '../progress-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  engine = inject(AudioEngineService);
  progressService = inject(ProgressBarService);

  colorService = inject(ImageColorServiceService);
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

  currentTime = linkedSignal({
    source: () => this.currentTrack()?.id,
    computation: () => 0,
  });

  bgColor = rxResource<string, string | undefined>({
    params: () => this.currentTrack()?.coverUrl,
    stream: ({ params: url }) => {
      return this.colorService.getDominantColor(url) ?? '#323838';
    },
  });

  toggleFullScreen() {
    this.isFullScreen.set(!this.isFullScreen());
  }

  constructor() {
    const prvUsngTrack = this.localStorageService.get('lastTrack') as Track;
    const prvUsngVol = this.localStorageService.get('volume');

    if (prvUsngTrack && prvUsngVol) {
      this.currentTrack.set(prvUsngTrack);
      this.currentVolume.set(prvUsngVol);
    }

    effect(() => {
      const track = this.currentTrack();
      if (track) {
        this.engine.setTrack(track.audioUrl);
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

    this.engine.onTimeUpdate.pipe(takeUntilDestroyed()).subscribe(() => {
      this.currentTime.set(this.engine.currentTime);
    });
  }

  playTrack(track: Track) {
    this.currentTrack.set(track);
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

  seekTo(newTime: number) {
    this.currentTime.set(newTime);
    this.engine.seek(newTime);
    this.progressService.currentTime.set(newTime);
  }

  playPastTrack() {
    const cIndx = this.currentIndex();
    if (cIndx === 0 || cIndx === -1) {
      this.seekTo(0);
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
