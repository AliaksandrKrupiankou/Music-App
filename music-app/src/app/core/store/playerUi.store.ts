import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject, PLATFORM_ID } from '@angular/core';
import { QueueStore } from './queue.store';
import { ImageColorServiceService } from '../services/image-color-service.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';

export const PlayerUiStore = signalStore(
  { providedIn: 'root' },
  withState({
    dafaultColor: '#323838',
    isFullScreen: false,
  }),
  withComputed(
    (
      store,
      queueStore = inject(QueueStore),
      colorService = inject(ImageColorServiceService),
      platformId = inject(PLATFORM_ID),
    ) => {
      const mainColor = rxResource<string, string | undefined>({
        params: () => queueStore.currentTrack()?.coverUrl,
        stream: ({ params: url }) => {
          if (!isPlatformBrowser(platformId) || !url) {
            return of('#323838');
          }
          return colorService.getDominantColor(url);
        },
      });

      return {
        mainColor: computed(() => mainColor.value() ?? store.dafaultColor()),
      };
    },
  ),
  withMethods((store) => ({
    toggleFullScreen() {
      const val = !store.isFullScreen();
      patchState(store, { isFullScreen: val });
    },
  })),
);
