import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { ImageColorServiceService } from '../services/image-color-service.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';
import { AudioService } from '../services/AudioLogic/audio-service';

@Injectable({
  providedIn: 'root',
})
export class PlayerUiService {
  private colorService = inject(ImageColorServiceService);
  private audioService = inject(AudioService);
  private platformId = inject(PLATFORM_ID);

  isFullScreen = signal<boolean>(false);
  currentTrack = this.audioService.currentTrack;

  bgColor = rxResource<string, string | undefined>({
    params: () => this.currentTrack()?.coverUrl,
    stream: ({ params: url }) => {
      if (!isPlatformBrowser(this.platformId) || !url) {
        return of('#323838');
      }
      return this.colorService.getDominantColor(url);
    },
  });

  toggleFullScreen() {
    this.isFullScreen.set(!this.isFullScreen());
  }
}
