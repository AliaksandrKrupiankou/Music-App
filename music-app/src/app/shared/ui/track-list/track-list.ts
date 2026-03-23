import { ChangeDetectionStrategy, Component, inject, input, TemplateRef } from '@angular/core';
import { Track } from '../../../models/app-interface';
import { AudioService } from '../../../core/services/AudioLogic/audio-service';
import { TrackRowComponent } from '../track-row/track-row.component';
import { FavoriteService } from '../../../core/services/favorite-service';
import { NgTemplateOutlet } from '@angular/common';
import { QueueStore } from '../../../core/store/queue.store';

@Component({
  selector: 'app-track-list',
  imports: [TrackRowComponent, NgTemplateOutlet],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackList {
  tracks = input.required<Track[]>();
  player = inject(AudioService);
  like = inject(FavoriteService);
  queueStore = inject(QueueStore);

  actionTemplate = input<TemplateRef<any> | null>(null);

  toggleLike(track: Track) {
    this.like.toggleLike(track);
  }

  isLiked(track: Track) {
    return this.like.isLiked(track);
  }

  playTrack(track: Track) {
    this.queueStore.setQueue(this.tracks())
    this.player.toggle(track);
  }
}
