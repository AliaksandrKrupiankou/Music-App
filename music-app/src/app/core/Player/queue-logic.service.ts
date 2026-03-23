import { computed, Injectable, signal } from '@angular/core';
import { Track } from '../../models/app-interface';

@Injectable({
  providedIn: 'root',
})
export class QueueLogicService {
  currentPlaylist = signal<Track[]>([]);
  currentTrackId = signal<string | null>(null);

  currentIndex = computed(() => {
    const playlist = this.currentPlaylist();
    const id = this.currentTrackId();
    return playlist.findIndex((t) => t.id === id);
  });

  updateQueue(tracks: Track[]) {
    this.currentPlaylist.set(tracks);
  }

  getNextTrack() {
    const idx = this.currentIndex();
    if (idx !== -1 && idx < this.currentPlaylist().length - 1) {
      return this.currentPlaylist()[idx + 1];
    }
    return null;
  }

  getPreviousTrack() {
    const idx = this.currentIndex();
    if (idx > 0) {
      return this.currentPlaylist()[idx - 1];
    }
    return null;
  }
}
