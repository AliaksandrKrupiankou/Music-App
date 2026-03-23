import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/data-services/local-storage-service';

export const AudioStore = signalStore(
  { providedIn: 'root' },
  withState({
    volume: 0.5,
    isPlaying: false,
    isMuted: false,
    lastVolumeBeforMute: 0.5,
  }),
  withMethods((store, storage = inject(LocalStorageService)) => ({
    setPlaying(isPlaying: boolean) {
      patchState(store, { isPlaying: isPlaying });
    },
    setVolume(volume: number) {
      patchState(store, { volume: volume });
      storage.set('volume', volume);
    },
    toogleMute() {
      if (!store.isMuted()) {
        patchState(store, { lastVolumeBeforMute: store.volume(), isMuted: true, volume: 0 });
      } else {
        patchState(store, { isMuted: false, volume: store.lastVolumeBeforMute() });
      }
    },
  })),
  withHooks({
    onInit(store, storage = inject(LocalStorageService)) {
      const lastVol = storage.get('volume');
      if (lastVol) patchState(store, { volume: Number(lastVol) });
    },
  }),
);
