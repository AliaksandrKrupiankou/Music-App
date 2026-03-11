import { computed, effect, inject, Injectable } from '@angular/core';
import { AudioService } from './audio-service';

@Injectable({
  providedIn: 'root',
})
export class MediaSessionService {
  audioService = inject(AudioService);

  constructor() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        this.audioService.playTrack(this.audioService.currentTrack()!);
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        this.audioService.toggle(this.audioService.currentTrack()!);
      });

      navigator.mediaSession.setActionHandler('nexttrack', () => {
        this.audioService.playNextTrack();
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        this.audioService.playPastTrack();
      });
    }
  }

  metadataUpdate = effect(() => {
    const data = this.audioService.currentTrack();

    if (data) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: data?.title,
        artist: data?.artist,
        album: data?.album,
        artwork: [
          {
            src: data?.coverUrl,
          },
        ],
      });
    }
  });
}
