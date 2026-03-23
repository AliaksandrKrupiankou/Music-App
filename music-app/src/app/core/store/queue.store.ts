import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntity, setAllEntities, withEntities } from '@ngrx/signals/entities';
import { Track } from '../../models/app-interface';
import { computed, effect, inject } from '@angular/core';
import { LocalStorageService } from '../services/data-services/local-storage-service';

export const QueueStore = signalStore(
  { providedIn: 'root' },
  withEntities<Track>(),
  withState({
    currentTrackId: null as null | string,
  }),
  withComputed((store) => ({
    currentIndex: computed(() => {
      const id = store.currentTrackId();
      return id ? store.ids().indexOf(id) : -1;
    }),
    currentTrack: computed(() => {
      const id = store.currentTrackId();
      return id ? store.entityMap()[id] : null;
    }),
  })),
  withMethods((store, storage = inject(LocalStorageService)) => ({
    _initFromLocalStorage() {
      const lastTrack = storage.get('lastTrack') as Track;
      if (lastTrack) {
        patchState(store, addEntity(lastTrack), { currentTrackId: lastTrack.id });
      }
    },
    setQueue(playlist: Track[]): void {
      patchState(store, setAllEntities(playlist));
    },
    setTrackId(id: string): void {
      patchState(store, { currentTrackId: id });
    },
    getNextTrack(): Track | null {
      const indx = store.currentIndex();
      const ids = store.ids();
      console.log(indx);
      if (indx !== -1 && indx < ids.length - 1) {
        const nextId = ids[indx + 1];
        return store.entityMap()[nextId];
      }
      return null;
    },
    getPreviousTrack(): Track | null {
      const indx = store.currentIndex();
      const ids = store.ids();
      if (indx !== -1 && indx !== 0) {
        const prevId = ids[indx - 1];
        return store.entityMap()[prevId];
      }
      return null;
    },
  })),
  withHooks({
    onInit(store, storage = inject(LocalStorageService)) {
      store._initFromLocalStorage();

      effect(() => {
        const track = store.currentTrack();
        if (track) {
          storage.set('lastTrack', track);
        }
      });
    },
  }),
);
